import { NextRequest, NextResponse } from 'next/server'
import { stripe, getStripeWebhookSecret } from '@/lib/stripe'
import { createClient } from '@supabase/supabase-js'
import type Stripe from 'stripe'
import type { InvoicesRow } from '@/types/models'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Supabase configuration is missing')
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')

    if (!signature) {
      return NextResponse.json(
        { error: 'No signature provided' },
        { status: 401 },
      )
    }

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        getStripeWebhookSecret(),
      )
    } catch (err) {
      console.error('Webhook signature verification failed:', err)
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    // Check if this event has already been processed
    const { data: existingEvent } = await supabase
      .from('stripe_events')
      .select('id')
      .eq('id', event.id)
      .maybeSingle()

    if (existingEvent) {
      console.log(`Event ${event.id} already processed`)
      return NextResponse.json({ received: true })
    }

    // Log this event as processed
    await supabase.from('stripe_events').insert({ id: event.id })

    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(
          event.data.object as Stripe.Checkout.Session,
        )
        break

      case 'invoice.payment_succeeded':
      case 'payment_intent.succeeded':
      case 'customer.subscription.created':
        // Do nothing. checkout.session.completed is the source of truth.
        break

      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(
          event.data.object as Stripe.Subscription,
        )
        break

      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(
          event.data.object as Stripe.Subscription,
        )
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 },
    )
  }
}

async function handleCheckoutSessionCompleted(
  session: Stripe.Checkout.Session,
) {
  try {
    const userId = session.client_reference_id
    const metadata = session.metadata || {}
    const projectId = metadata.project_id || metadata.projectId || null
    const planId = metadata.plan_id || metadata.planId || null

    if (!userId || userId === 'guest') {
      console.log(
        'Guest checkout completed, not creating invoice or subscription',
      )
      return
    }

    const paymentIntentId =
      typeof session.payment_intent === 'string'
        ? session.payment_intent
        : session.payment_intent?.id

    const { data: existingInvoice } = await supabase
      .from('invoices')
      .select('id')
      .or(
        `metadata->>checkout_session_id.eq.${session.id},metadata->>payment_intent_id.eq.${paymentIntentId},stripe_invoice_id.eq.${session.invoice}`,
      )
      .maybeSingle()

    if (existingInvoice) {
      console.log(`Invoice already exists for session ${session.id}`)
      return
    }

    // Create an invoice record
    const invoiceData: Omit<InvoicesRow, 'id' | 'created_at'> = {
      user_id: userId,
      project_id: projectId,
      status: 'paid',
      subtotal: (session.amount_subtotal || 0) / 100,
      tax: (session.total_details?.amount_tax || 0) / 100,
      total: (session.amount_total || 0) / 100,
      currency: session.currency?.toUpperCase() || 'USD',
      issued_at: new Date().toISOString().split('T')[0],
      due_date: new Date().toISOString().split('T')[0],
      metadata: {
        checkout_session_id: session.id,
        payment_intent_id:
          typeof session.payment_intent === 'string'
            ? session.payment_intent
            : session.payment_intent?.id,
        plan_id: planId,
        company_name: metadata.company_name,
        notes: metadata.notes,
      },
      download_url: null,
      stripe_invoice_id: session.invoice
        ? typeof session.invoice === 'string'
          ? session.invoice
          : session.invoice.id
        : null,
    }

    const { error: newInvoiceError } = await supabase
      .from('invoices')
      .insert(invoiceData)

    if (newInvoiceError) {
      console.error('Error creating invoice:', newInvoiceError)
      return // Stop if invoice creation fails
    }

    // For subscriptions, the subscription ID will be populated after payment
    if (session.subscription) {
      const subscription = await stripe.subscriptions.retrieve(
        session.subscription as string,
      )

      const sub = subscription as unknown as Stripe.Subscription & {
        current_period_start: number
        current_period_end: number
      }

      const subscriptionData = {
        user_id: userId,
        plan_id: planId,
        stripe_subscription_id: subscription.id,
        billing_cycle: metadata.billing_cycle || 'monthly',
        include_hosting: metadata.include_hosting === 'true',
        status: subscription.status,
        base_amount: (subscription.items.data[0]?.price.unit_amount || 0) / 100,
        hosting_amount: subscription.items.data[1]?.price.unit_amount
          ? (subscription.items.data[1].price.unit_amount || 0) / 100
          : 0,
        subtotal: (subscription.items.data[0]?.price.unit_amount || 0) / 100,
        tax: 0,
        total: (subscription.items.data[0]?.price.unit_amount || 0) / 100,
        currency: 'usd',
        current_period_start: new Date(
          (sub.current_period_start ?? Math.floor(Date.now() / 1000)) * 1000,
        ).toISOString(),
        current_period_end: new Date(
          (sub.current_period_end ?? Math.floor(Date.now() / 1000)) * 1000,
        ).toISOString(),
        metadata: {
          company_name: metadata.company_name,
          notes: metadata.notes,
        },
        project_id: projectId,
      }

      const { error: subError } = await supabase
        .from('subscriptions')
        .insert(subscriptionData)
      if (subError) {
        console.error('Error creating subscription:', subError)
      }
    }

    // Update project status and plan
    if (projectId && planId) {
      const { error: projectUpdateError } = await supabase
        .from('projects')
        .update({ status: 'active', plan_id: planId })
        .eq('id', projectId)

      if (projectUpdateError) {
        console.error('Error updating project:', projectUpdateError)
      }
    }

    // Update user's plan
    if (planId) {
      const customerId = session.customer as string
      const { error: userUpdateError } = await supabase
        .from('users')
        .update({
          plan_id: planId,
          stripe_customer_id: customerId,
        })
        .eq('id', userId)

      if (userUpdateError) {
        console.error('Error updating user:', userUpdateError)
      }
    }
  } catch (error) {
    console.error('Error handling checkout session completed:', error)
  }
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  try {
    const sub = subscription as Stripe.Subscription & {
      current_period_start: number
      current_period_end: number
    }
    const { error } = await supabase
      .from('subscriptions')
      .update({
        status: subscription.status,
        current_period_start: new Date(
          (sub.current_period_start ?? Math.floor(Date.now() / 1000)) * 1000,
        ).toISOString(),
        current_period_end: new Date(
          (sub.current_period_end ?? Math.floor(Date.now() / 1000)) * 1000,
        ).toISOString(),
        cancel_at_period_end: subscription.cancel_at_period_end,
      })
      .eq('stripe_subscription_id', subscription.id)

    if (error) {
      console.error('Error updating subscription:', error)
    }
  } catch (error) {
    console.error('Error handling subscription updated:', error)
  }
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  try {
    const { error } = await supabase
      .from('subscriptions')
      .update({
        status: 'canceled',
      })
      .eq('stripe_subscription_id', subscription.id)

    if (error) {
      console.error('Error deleting subscription:', error)
    }
  } catch (error) {
    console.error('Error handling subscription deleted:', error)
  }
}
