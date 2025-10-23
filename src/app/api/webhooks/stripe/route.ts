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
    const metadata = session.metadata || {}
    const planId = metadata.plan_id || metadata.planId || null
    const billingCycle = metadata.billing_cycle || 'monthly'

    // Get email from session
    const email = session.customer_details?.email
    if (!email) {
      console.error('No email found in checkout session')
      return
    }

    // Get or create user
    let userId: string
    const { data: existingUser } = await supabase.auth.admin.listUsers()
    const user = existingUser.users.find(u => u.email === email)

    if (user) {
      userId = user.id
    } else {
      // Create new user with passwordless signup
      const { data: newAuthUser, error: authError } = await supabase.auth.admin.createUser({
        email,
        email_confirm: false,
        user_metadata: {
          created_via: 'stripe_checkout',
        },
      })

      if (authError || !newAuthUser.user) {
        console.error('Error creating user:', authError)
        return
      }

      userId = newAuthUser.user.id

      // Create user record in public.users table
      await supabase
        .from('users')
        .insert({
          id: userId,
          email,
          stripe_customer_id: session.customer as string,
          plan_id: planId,
          created_at: new Date().toISOString(),
        })
        .then(result => {
          if (result.error) {
            console.error('Error creating user record:', result.error)
          }
        })
    }

    // Create a project for the user
    const projectTitle = `Project - ${new Date().toLocaleDateString()}`
    const projectSlug = `project-${userId.substring(0, 8)}-${Math.random().toString(36).substring(2, 8)}`

    const { data: newProject, error: projectError } = await supabase
      .from('projects')
      .insert({
        title: projectTitle,
        owner_id: userId,
        slug: projectSlug,
        status: 'active',
        plan_id: planId,
        created_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (projectError) {
      console.error('Error creating project:', projectError)
    }

    const projectId = newProject?.id || null

    // Check if invoice already exists
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

      // Still send magic link if user is new
      await sendMagicLinkToUser(email)
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
        billing_cycle: billingCycle,
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
    }

    // For subscriptions, create subscription record
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
        billing_cycle: billingCycle,
        include_hosting: false,
        status: subscription.status,
        base_amount: (subscription.items.data[0]?.price.unit_amount || 0) / 100,
        hosting_amount: 0,
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
        metadata: {},
        project_id: projectId,
      }

      const { error: subError } = await supabase
        .from('subscriptions')
        .insert(subscriptionData)
      if (subError) {
        console.error('Error creating subscription:', subError)
      }
    }

    // Send magic link to user
    await sendMagicLinkToUser(email)
  } catch (error) {
    console.error('Error handling checkout session completed:', error)
  }
}

async function sendMagicLinkToUser(email: string): Promise<void> {
  try {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard`,
      },
    })

    if (error) {
      console.error('Error sending magic link:', error)
    } else {
      console.log(`Magic link sent to ${email}`)
    }
  } catch (error) {
    console.error('Error in sendMagicLinkToUser:', error)
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
