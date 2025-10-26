'use client'

import { useMemo, useState } from 'react'
import { X } from 'lucide-react'

import { useAuth } from '@/context/auth-context'
import type { PlansRow } from '@/types/models'
import { formatCurrency } from '@/lib/utils/format'

const HOSTING_MONTHLY = 39
const HOSTING_YEARLY = 390
const TAX_RATE = 0.07

type CheckoutFlowProps = {
  plan: PlansRow
  onClose: () => void
}

type BillingCycle = 'monthly' | 'yearly'
type PaymentType = 'one-time' | 'payment-plan'
type SubmissionState = 'idle' | 'submitting' | 'error'

export function CheckoutFlow({ plan, onClose }: CheckoutFlowProps) {
  const { user } = useAuth()
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly')
  const [includeHosting, setIncludeHosting] = useState(true)
  const [paymentType, setPaymentType] = useState<PaymentType>('payment-plan')
  const [email, setEmail] = useState(user?.email || '')
  const [company, setCompany] = useState('')
  const [notes, setNotes] = useState('')
  const [submissionState, setSubmissionState] =
    useState<SubmissionState>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const summary = useMemo(() => {
    if (!plan) {
      return null
    }

    const base =
      billingCycle === 'monthly' ? plan.monthly_price : plan.yearly_price
    const hosting = includeHosting
      ? billingCycle === 'monthly'
        ? HOSTING_MONTHLY
        : HOSTING_YEARLY
      : 0
    const subtotal = base + hosting
    const tax = Math.round(subtotal * TAX_RATE * 100) / 100
    const total = subtotal + tax

    return {
      base,
      hosting,
      subtotal,
      tax,
      total,
    }
  }, [plan, billingCycle, includeHosting])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!plan || !summary) {
      return
    }

    setSubmissionState('submitting')
    setErrorMessage(null)

    const trimmedEmail = email.trim()
    const trimmedCompany = company.trim()
    const trimmedNotes = notes.trim()

    if (!trimmedEmail) {
      setSubmissionState('error')
      setErrorMessage(
        'Please provide a contact email so we can proceed with checkout.',
      )
      return
    }

    if (trimmedEmail !== email) {
      setEmail(trimmedEmail)
    }
    if (trimmedCompany !== company) {
      setCompany(trimmedCompany)
    }
    if (trimmedNotes !== notes) {
      setNotes(trimmedNotes)
    }

    try {
      const response = await fetch('/api/checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planId: plan.id,
          billingCycle,
          includeHosting,
          email: trimmedEmail,
          companyName: trimmedCompany || undefined,
          notes: trimmedNotes || undefined,
          userId: user?.id,
          paymentType: paymentType === 'one-time' ? 'one-time' : 'recurring',
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create checkout session')
      }

      const data = await response.json()

      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error('No checkout URL provided')
      }
    } catch (error) {
      console.error('Checkout error:', error)
      setSubmissionState('error')
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'We were unable to start the checkout session. Please try again.',
      )
    }
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm'>
      <div className='relative w-full max-w-4xl rounded-2xl bg-[var(--dark-bg)] p-8 shadow-2xl transition-colors duration-300'>
        <button
          onClick={onClose}
          className='absolute top-4 right-4 text-white/50 hover:text-white'
        >
          <X size={24} />
        </button>
        <div className='grid gap-8 lg:grid-cols-[2fr_1fr]'>
          <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
            <section className='flex flex-col gap-4 rounded-2xl border border-foreground/10 bg-background p-6 shadow-sm shadow-foreground/5'>
              <header className='flex flex-col gap-2'>
                <h2 className='text-lg font-semibold text-foreground'>
                  Payment Type
                </h2>
                <p className='text-sm text-foreground/70'>
                  Choose how you want to pay for your plan
                </p>
                <div className='mt-2 inline-flex self-start rounded-full border border-foreground/10 bg-foreground/5 p-1 text-xs font-medium text-foreground/70'>
                  <button
                    type='button'
                    className={`rounded-full px-3 py-1 transition ${
                      paymentType === 'one-time'
                        ? 'bg-background text-foreground shadow'
                        : ''
                    }`}
                    onClick={() => setPaymentType('one-time')}
                  >
                    Pay Once
                  </button>
                  <button
                    type='button'
                    className={`rounded-full px-3 py-1 transition ${
                      paymentType === 'payment-plan'
                        ? 'bg-background text-foreground shadow'
                        : ''
                    }`}
                    onClick={() => setPaymentType('payment-plan')}
                  >
                    Payment Plan
                  </button>
                </div>
              </header>
            </section>

            <section className='flex flex-col gap-4 rounded-2xl border border-foreground/10 bg-background p-6 shadow-sm shadow-foreground/5'>
              <header className='flex flex-col gap-2'>
                <h2 className='text-lg font-semibold text-foreground'>
                  Billing Cycle
                </h2>
                <div className='inline-flex self-start rounded-full border border-foreground/10 bg-foreground/5 p-1 text-xs font-medium text-foreground/70'>
                  <button
                    type='button'
                    className={`rounded-full px-3 py-1 transition ${
                      billingCycle === 'monthly'
                        ? 'bg-background text-foreground shadow'
                        : ''
                    }`}
                    onClick={() => setBillingCycle('monthly')}
                  >
                    Monthly
                  </button>
                  <button
                    type='button'
                    className={`rounded-full px-3 py-1 transition ${
                      billingCycle === 'yearly'
                        ? 'bg-background text-foreground shadow'
                        : ''
                    }`}
                    onClick={() => setBillingCycle('yearly')}
                  >
                    Yearly
                  </button>
                </div>
              </header>
            </section>

            <section className='flex flex-col gap-4 rounded-2xl border border-foreground/10 bg-background p-6 shadow-sm shadow-foreground/5'>
              <header className='flex flex-col gap-2'>
                <h2 className='text-lg font-semibold text-foreground'>
                  Add-ons
                </h2>
                <p className='text-sm text-foreground/70'>
                  Bundle managed hosting to keep your NextDaySite live with
                  automatic updates and monitoring.
                </p>
              </header>
              <div className='flex items-start justify-between gap-4 rounded-2xl border border-foreground/10 bg-foreground/5 p-4'>
                <div className='flex flex-col gap-1'>
                  <h3 className='text-sm font-semibold text-foreground'>
                    Managed hosting
                  </h3>
                  <p className='text-xs text-foreground/70'>
                    Deployed on Vercel with uptime monitoring and SSL.
                  </p>
                  <p className='text-xs font-medium text-foreground/60'>
                    {billingCycle === 'monthly'
                      ? `${formatCurrency(HOSTING_MONTHLY)} / month`
                      : `${formatCurrency(HOSTING_YEARLY)} / year`}
                  </p>
                </div>
                <button
                  type='button'
                  className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                    includeHosting
                      ? 'bg-foreground text-background'
                      : 'border border-foreground/30 bg-background text-foreground'
                  }`}
                  onClick={() => setIncludeHosting((prev) => !prev)}
                >
                  {includeHosting ? 'Included' : 'Add'}
                </button>
              </div>
            </section>

            <section className='flex flex-col gap-4 rounded-2xl border border-foreground/10 bg-background p-6 shadow-sm shadow-foreground/5'>
              <header className='flex flex-col gap-2'>
                <h2 className='text-lg font-semibold text-foreground'>
                  Account details
                </h2>
                <p className='text-sm text-foreground/70'>
                  Tell us where to send onboarding and draft deliverables.
                </p>
              </header>
              <div className='grid gap-4 md:grid-cols-2'>
                <label className='flex flex-col gap-2 text-sm text-foreground/70'>
                  Email
                  <input
                    type='email'
                    className='rounded-xl border border-foreground/15 bg-background px-3 py-2 text-sm text-foreground outline-none transition focus:border-foreground'
                    placeholder='you@company.com'
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                </label>
                <label className='flex flex-col gap-2 text-sm text-foreground/70'>
                  Company or project name
                  <input
                    type='text'
                    className='rounded-xl border border-foreground/15 bg-background px-3 py-2 text-sm text-foreground outline-none transition focus:border-foreground'
                    placeholder='Acme Labs'
                    value={company}
                    onChange={(event) => setCompany(event.target.value)}
                  />
                </label>
              </div>
              <label className='flex flex-col gap-2 text-sm text-foreground/70'>
                Notes for the launch team
                <textarea
                  className='min-h-[120px] rounded-xl border border-foreground/15 bg-background px-3 py-2 text-sm text-foreground outline-none transition focus:border-foreground'
                  placeholder='Share goals, timelines, or brand inspiration.'
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                />
              </label>
              <p className='rounded-xl bg-foreground/5 p-4 text-xs text-foreground/60'>
                Card details will be collected on the secure Stripe checkout
                page after you confirm this order.
              </p>
              {errorMessage ? (
                <p className='text-sm font-medium text-rose-500'>
                  {errorMessage}
                </p>
              ) : null}
              <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
                <p className='text-xs text-foreground/50'>
                  By continuing you agree to the NextDaySite terms and{' '}
                  {paymentType === 'payment-plan'
                    ? 'recurring billing'
                    : 'payment'}{' '}
                  policy.
                </p>
                <button
                  type='submit'
                  disabled={submissionState === 'submitting'}
                  className='inline-flex items-center justify-center rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-60'
                >
                  {submissionState === 'submitting'
                    ? 'Redirecting to Stripe...'
                    : 'Continue to payment'}
                </button>
              </div>
            </section>
          </form>
          <aside className='flex flex-col gap-4 rounded-2xl border border-foreground/10 bg-background p-6 shadow-sm shadow-foreground/5'>
            <h2 className='text-lg font-semibold text-foreground'>
              Order summary
            </h2>
            {plan && summary ? (
              <div className='flex flex-col gap-3 text-sm text-foreground/70'>
                <div className='flex items-center justify-between text-foreground'>
                  <span>{plan.name}</span>
                  <span>{formatCurrency(summary.base)}</span>
                </div>
                <div className='flex items-center justify-between'>
                  <span>Billing cycle</span>
                  <span className='capitalize'>{billingCycle}</span>
                </div>
                <div className='flex items-center justify-between'>
                  <span>Managed hosting</span>
                  <span>
                    {includeHosting ? formatCurrency(summary.hosting) : '$0'}
                  </span>
                </div>
                <div className='flex items-center justify-between'>
                  <span>Tax (7%)</span>
                  <span>{formatCurrency(summary.tax)}</span>
                </div>
                <div className='h-px bg-foreground/10' aria-hidden />
                <div className='flex items-center justify-between text-base font-semibold text-foreground'>
                  <span>
                    Total{' '}
                    {paymentType === 'one-time' ? 'due today' : 'per month'}
                  </span>
                  <span>{formatCurrency(summary.total)}</span>
                </div>
              </div>
            ) : (
              <p className='text-sm text-foreground/60'>
                Select a plan to see pricing.
              </p>
            )}
            <div className='rounded-xl bg-foreground/5 p-4 text-xs text-foreground/60'>
              <p className='font-semibold text-foreground'>
                What happens next?
              </p>
              <ul className='mt-2 list-disc space-y-1 pl-4'>
                <li>Securely complete payment on Stripe.</li>
                <li>
                  Complete onboarding questionnaire to kick off production.
                </li>
                <li>Meet your launch team within one business day.</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
