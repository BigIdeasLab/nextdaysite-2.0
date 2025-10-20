import { NextRequest, NextResponse } from 'next/server'
import { stripe, getStripeWebhookSecret } from '@/lib/stripe'
import { createClient } from '@supabase/supabase-js'
import type Stripe from 'stripe'

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

    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(
          event.data.object as Stripe.Checkout.Session,
        )
        break

      case 'customer.subscription.created':
        await handleSubscriptionCreated(
          event.data.object as Stripe.Subscription,
        )
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

      case 'invoice.payment_succeeded':
        await handleInvoicePaymentSucceeded(event.data.object as Stripe.Invoice)
        break

      case 'invoice.payment_failed':
        await handleInvoicePaymentFailed(event.data.object as Stripe.Invoice)
        break

      case 'payment_intent.succeeded':
        await handlePaymentIntentSucceeded(
          event.data.object as Stripe.PaymentIntent,
        )
        break

      case 'payment_intent.payment_failed':
        await handlePaymentIntentFailed(
          event.data.object as Stripe.PaymentIntent,
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
    const projectId = metadata.projectId

    if (!userId || userId === 'guest') {
      console.log('Guest checkout completed, not creating subscription record')
      return
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

      await supabase.from('subscriptions').insert({
        user_id: userId,
        plan_id: metadata.plan_id,
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
      })
    }

    // Update project status and plan
    if (projectId && metadata.plan_id) {
      await supabase
        .from('projects')
        .update({ status: 'active', plan_id: metadata.plan_id })
        .eq('id', projectId)
    }

    // Update user's plan
    if (metadata.plan_id) {
      const customerId = session.customer as string
      await supabase
        .from('users')
        .update({
          plan_id: metadata.plan_id,
          stripe_customer_id: customerId,
        })
        .eq('id', userId)
    }
  } catch (error) {
    console.error('Error handling checkout session completed:', error)
  }
}

async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  try {
    const sub = subscription as Stripe.Subscription & {
      current_period_start: number
      current_period_end: number
    }
    const userId = subscription.metadata?.user_id

    if (!userId) {
      console.log('No user_id in subscription metadata')
      return
    }

    const { error } = await supabase.from('subscriptions').insert({
      user_id: userId,
      plan_id: subscription.metadata?.plan_id || '',
      stripe_subscription_id: subscription.id,
      billing_cycle: subscription.metadata?.billing_cycle || 'monthly',
      include_hosting: subscription.metadata?.include_hosting === 'true',
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
    })

    if (error) {
      console.error('Error inserting subscription:', error)
    }
  } catch (error) {
    console.error('Error handling subscription created:', error)
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

async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice) {
  try {
    const customerId = invoice.customer as string
    const customer = await stripe.customers.retrieve(customerId)
    const email = (customer as Stripe.Customer).email

    if (!email) return

    // Find or create user by email
    const { data: user } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single()

    if (!user) return

    // Create invoice record
    const { error } = await supabase.from('invoices').insert({
      user_id: user.id,
      stripe_invoice_id: invoice.id,
      status: 'paid',
      subtotal: (invoice.subtotal || 0) / 100,
      tax: ((invoice.total || 0) - (invoice.subtotal || 0)) / 100,
      total: (invoice.total || 0) / 100,
      currency: invoice.currency.toUpperCase(),
      issued_at: new Date(invoice.created * 1000).toISOString().split('T')[0],
      due_date: invoice.due_date
        ? new Date(invoice.due_date * 1000).toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0],
    })

    if (error) {
      console.error('Error creating invoice:', error)
    }
  } catch (error) {
    console.error('Error handling invoice payment succeeded:', error)
  }
}

async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  try {
    const customerId = invoice.customer as string
    const customer = await stripe.customers.retrieve(customerId)
    const email = (customer as Stripe.Customer).email

    if (!email) return

    // Find user by email
    const { data: user } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single()

    if (!user) return

    // Update subscription status
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
    })

    if (subscriptions.data.length > 0) {
      const sub = subscriptions.data[0]
      await supabase
        .from('subscriptions')
        .update({
          status: 'past_due',
        })
        .eq('stripe_subscription_id', sub.id)
    }
  } catch (error) {
    console.error('Error handling invoice payment failed:', error)
  }
}

async function handlePaymentIntentSucceeded(
  paymentIntent: Stripe.PaymentIntent,
) {
  try {
    if (!paymentIntent.customer) return

    const customerId = paymentIntent.customer as string
    const customer = await stripe.customers.retrieve(customerId)
    const email = (customer as Stripe.Customer).email

    if (!email) return

    const { data: user } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single()

    if (!user) return

    // Create invoice record for one-time payment
    const { error } = await supabase.from('invoices').insert({
      user_id: user.id,
      status: 'paid',
      subtotal: (paymentIntent.amount || 0) / 100,
      tax: 0,
      total: (paymentIntent.amount || 0) / 100,
      currency: (paymentIntent.currency || 'usd').toUpperCase(),
      issued_at: new Date().toISOString().split('T')[0],
      due_date: new Date().toISOString().split('T')[0],
      metadata: {
        payment_intent_id: paymentIntent.id,
      },
    })

    if (error) {
      console.error('Error creating invoice from payment intent:', error)
    }
  } catch (error) {
    console.error('Error handling payment intent succeeded:', error)
  }
}

async function handlePaymentIntentFailed(paymentIntent: Stripe.PaymentIntent) {
  try {
    console.log('Payment intent failed:', paymentIntent.id)
  } catch (error) {
    console.error('Error handling payment intent failed:', error)
  }
}
