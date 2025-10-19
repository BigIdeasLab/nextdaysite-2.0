import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
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
    const body = await request.json()

    const {
      planId,
      billingCycle,
      includeHosting,
      email,
      companyName,
      notes,
      userId,
      paymentType,
    } = body

    if (!planId || !email || !billingCycle || paymentType === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 },
      )
    }

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
      billingCycle === 'yearly' ? plan.yearly_price : plan.monthly_price
    const hostingPrice = includeHosting
      ? billingCycle === 'yearly'
        ? plan.hosting_yearly_price || 0
        : plan.hosting_monthly_price || 0
      : 0

    const subtotal = (basePrice || 0) + hostingPrice
    const tax = Math.round(subtotal * 0.07 * 100) / 100
    const total = subtotal + tax

    // Get or create Stripe customer
    let customerId: string

    if (userId) {
      // Check if user already has a Stripe customer
      const { data: user } = await supabase
        .from('users')
        .select('stripe_customer_id')
        .eq('id', userId)
        .single()

      if (user?.stripe_customer_id) {
        customerId = user.stripe_customer_id
      } else {
        // Create new Stripe customer
        const customer = await stripe.customers.create({
          email,
          name: companyName || email,
          metadata: {
            user_id: userId,
          },
        })
        customerId = customer.id

        // Update user with Stripe customer ID
        await supabase
          .from('users')
          .update({ stripe_customer_id: customerId })
          .eq('id', userId)
      }
    } else {
      // Create guest customer
      const customer = await stripe.customers.create({
        email,
        name: companyName || email,
      })
      customerId = customer.id
    }

    // Create checkout session
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = []

    if (paymentType === 'one-time') {
      // One-time payment
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: plan.name,
            description: plan.summary,
          },
          unit_amount: Math.round(total * 100),
        },
        quantity: 1,
      })
    } else {
      // Subscription payment
      const pricePerMonth = basePrice / (billingCycle === 'yearly' ? 12 : 1)
      const hostingPerMonth =
        hostingPrice / (billingCycle === 'yearly' ? 12 : 1)

      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: plan.name,
            description: plan.summary,
          },
          unit_amount: Math.round(pricePerMonth * 100),
          recurring: {
            interval: 'month',
            interval_count: 1,
          },
        },
        quantity: 1,
      })

      if (includeHosting && hostingPerMonth > 0) {
        lineItems.push({
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Managed Hosting',
              description: 'Deployed on Vercel with uptime monitoring and SSL',
            },
            unit_amount: Math.round(hostingPerMonth * 100),
            recurring: {
              interval: 'month',
              interval_count: 1,
            },
          },
          quantity: 1,
        })
      }
    }

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      customer: customerId,
      line_items: lineItems,
      mode: paymentType === 'one-time' ? 'payment' : 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/checkout-cancel`,
      client_reference_id: userId || undefined,
      metadata: {
        plan_id: planId,
        billing_cycle: billingCycle,
        include_hosting: includeHosting.toString(),
        user_id: userId || 'guest',
        payment_type: paymentType,
        company_name: companyName || '',
        notes: notes || '',
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
