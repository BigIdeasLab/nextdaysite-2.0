# Stripe Payment Setup Guide

This guide provides instructions for setting up Stripe payments on the customer end with support for both one-time and subscription (payment plan) options.

## Database Schema

The Stripe integration uses the following existing database tables:

### subscriptions table
Stores recurring subscription information:
- `user_id`: Reference to the user
- `plan_id`: Reference to the selected plan
- `stripe_subscription_id`: Stripe subscription ID
- `billing_cycle`: 'monthly' or 'yearly'
- `include_hosting`: Boolean for managed hosting option
- `status`: Subscription status (active, past_due, canceled, etc.)
- `base_amount`: Base plan cost
- `hosting_amount`: Hosting cost (if included)
- `subtotal`, `tax`, `total`: Cost breakdown
- `currency`: ISO currency code
- `current_period_start`, `current_period_end`: Current billing cycle dates
- `metadata`: Additional information (company_name, notes, etc.)

### invoices table
Stores one-time payments and recurring invoice records:
- `user_id`: Reference to the user
- `stripe_invoice_id`: Stripe invoice ID
- `status`: 'draft', 'open', 'paid', 'overdue'
- `subtotal`, `tax`, `total`: Cost breakdown
- `currency`: ISO currency code
- `issued_at`, `due_date`: Invoice dates

### users table
Updated with payment information:
- `stripe_customer_id`: Stripe customer ID for the user
- `plan_id`: Current active plan

## Environment Variables Required

The following environment variables need to be set:

```
# Stripe API Keys
STRIPE_SECRET_KEY=sk_...              # Get from Stripe Dashboard -> Developers -> API keys
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_...  # Get from Stripe Dashboard -> Developers -> API keys

# Stripe Webhook Secret
STRIPE_WEBHOOK_SECRET=whsec_...       # Get from Stripe Dashboard -> Developers -> Webhooks

# App URL for redirects
NEXT_PUBLIC_APP_URL=http://localhost:3000  # Set to your deployment URL in production
```

## Setting Up Environment Variables

### Option 1: Using the Developer Settings (Recommended)

1. Open the project settings
2. Navigate to Environment Variables
3. Add the following variables:
   - `STRIPE_SECRET_KEY` (set as secret)
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_WEBHOOK_SECRET` (set as secret)
   - `NEXT_PUBLIC_APP_URL`

### Option 2: Local Development

1. Create a `.env.local` file in the project root
2. Add the environment variables from above
3. **Important**: Never commit `.env.local` to version control

## Getting Stripe API Keys

1. Go to https://dashboard.stripe.com
2. Log in to your Stripe account (or create one)
3. Navigate to **Developers** → **API keys**
4. You'll see:
   - **Publishable key** (starts with `pk_`)
   - **Secret key** (starts with `sk_`)
5. Copy these values and add them to your environment variables

## Setting Up Webhook

Stripe needs to send webhook events to your app for payment confirmations:

1. In Stripe Dashboard, go to **Developers** → **Webhooks**
2. Click **Add endpoint**
3. Enter your endpoint URL: `https://yourdomain.com/api/webhooks/stripe`
   - For local development with ngrok: `https://your-ngrok-url.ngrok.io/api/webhooks/stripe`
4. Select events to listen for:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Click **Add endpoint**
6. Click on your endpoint to view the signing secret (starts with `whsec_`)
7. Copy this and add to `STRIPE_WEBHOOK_SECRET`

## API Endpoints

### POST /api/checkout-session

Creates a Stripe Checkout session for either one-time or recurring payments.

**Request:**
```json
{
  "planId": "plan-web",
  "billingCycle": "monthly",
  "includeHosting": true,
  "email": "customer@example.com",
  "companyName": "Acme Corp",
  "notes": "Custom notes",
  "userId": "user-123",
  "paymentType": "one-time" | "recurring"
}
```

**Response:**
```json
{
  "sessionId": "cs_...",
  "url": "https://checkout.stripe.com/pay/cs_..."
}
```

### POST /api/webhooks/stripe

Receives webhook events from Stripe and updates the database with payment information.

## Payment Flow

### One-Time Payment
1. Customer selects plan and clicks "Pay Once"
2. System creates Stripe Checkout session with one-time payment
3. Customer completes payment on Stripe
4. Webhook updates user's plan and creates invoice record
5. User is redirected to success page

### Payment Plan (Subscription)
1. Customer selects plan and clicks "Payment Plan"
2. System creates Stripe Checkout session with recurring subscription
3. Customer completes first payment on Stripe
4. Webhook creates subscription record in database
5. Stripe automatically charges monthly/yearly based on billing cycle
6. Payment status updates via webhooks

## Key Features Implemented

✅ **Multiple Plans**: Customers can purchase different plan tiers
✅ **Flexible Payment Options**: 
  - One-time payment (full price upfront)
  - Payment plan (monthly subscription for 12 months)
✅ **Billing Cycles**: Monthly and yearly options with discounted annual pricing
✅ **Add-ons**: Optional managed hosting included in subscription
✅ **Tax Calculation**: Automatic tax calculation (7% default)
✅ **Webhook Integration**: Real-time payment status updates
✅ **Customer Portal**: Customers can manage subscriptions via Stripe
✅ **Secure Handling**: All sensitive payment data handled through Stripe

## Testing

### Test Stripe Cards

Use these test card numbers to test payments:

- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- **Requires Authentication**: `4000 0025 0000 3155`

Use any future date for expiry and any 3-digit number for CVC.

## Troubleshooting

### Webhook not receiving events
1. Make sure `STRIPE_WEBHOOK_SECRET` is correct
2. Verify endpoint URL is accessible from the internet
3. Check Stripe webhook logs in Dashboard

### Customer creation fails
1. Verify Stripe API keys are correct
2. Check Supabase connection
3. Review error logs in API endpoint

### Subscription not creating
1. Ensure webhook is being received
2. Check database subscriptions table for records
3. Verify plan_id matches existing plans in database

## Next Steps

1. **Connect to Stripe**: Set all required environment variables
2. **Test Locally**: Use Stripe test API keys with test cards
3. **Set Webhook**: Configure webhook endpoint in Stripe Dashboard
4. **Deploy**: Push to production and update environment variables
5. **Monitor**: Watch Stripe Dashboard for successful transactions
