import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createClient } from '@supabase/supabase-js'
import type Stripe from 'stripe'
import type { Database } from '@/types/database'

console.log('API route loaded: /api/checkout-session')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Supabase configuration is missing')
}

const supabase = createClient<Database>(supabaseUrl, supabaseServiceKey)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { planId, billingCycle } = body

    if (!planId || !billingCycle) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 },
      )
    }

    // Default to monthly and recurring (subscription)
    const resolvedBillingCycle = billingCycle || 'monthly'

    // Fetch plan details from database
    const { data: plan, error: planError } = await supabase
      .from('plans')
      .select('*')
      .eq('id', planId)
      .single()

    if (planError || !plan) {
      return NextResponse.json({ error: 'Plan not found' }, { status: 404 })
    }

    // Calculate prices
    const basePrice =
      resolvedBillingCycle === 'yearly' ? plan.yearly_price : plan.monthly_price

    // Create Stripe customer without email (Stripe will collect it)
    const customer = await stripe.customers.create({
      metadata: {
        plan_id: planId,
      },
    })
    const customerId = customer.id

    // Create subscription checkout session
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: plan.name,
            description: plan.summary,
          },
          unit_amount: Math.round(basePrice * 100),
          recurring: {
            interval: resolvedBillingCycle === 'yearly' ? 'year' : 'month',
            interval_count: 1,
          },
        },
        quantity: 1,
      },
    ]

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      customer: customerId,
      line_items: lineItems,
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/checkout-cancel`,
      billing_address_collection: 'required',
      metadata: {
        plan_id: planId,
        billing_cycle: resolvedBillingCycle,
      },
    }

    const session = await stripe.checkout.sessions.create(sessionParams)

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    })
  } catch (error) {
    console.error('Checkout session error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 },
    )
  }
}
