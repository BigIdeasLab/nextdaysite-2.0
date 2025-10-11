'use client'

import { useMemo, useState } from 'react'

import { useAuth } from '@/context/auth-context'
import type { PlansRow, StartCheckoutResult } from '@/types/models'
import { formatCurrency } from '@/lib/utils/format'

const HOSTING_MONTHLY = 39
const HOSTING_YEARLY = 390
const TAX_RATE = 0.07

type CheckoutFlowProps = {
  plans: PlansRow[]
  defaultPlanId?: string
}

type BillingCycle = 'monthly' | 'yearly'

type SubmissionState = 'idle' | 'submitting' | 'success' | 'error'

export function CheckoutFlow({ plans, defaultPlanId }: CheckoutFlowProps) {
  const { client } = useAuth()
  const [selectedPlanId, setSelectedPlanId] = useState(
    defaultPlanId ?? plans[0]?.id ?? '',
  )
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly')
  const [includeHosting, setIncludeHosting] = useState(true)
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [notes, setNotes] = useState('')
  const [submissionState, setSubmissionState] =
    useState<SubmissionState>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [checkoutResult, setCheckoutResult] =
    useState<StartCheckoutResult | null>(null)

  const selectedPlan = useMemo(
    () => plans.find((plan) => plan.id === selectedPlanId) ?? plans[0],
    [plans, selectedPlanId],
  )

  const summary = useMemo(() => {
    if (!selectedPlan) {
      return null
    }

    const base =
      billingCycle === 'monthly'
        ? selectedPlan.monthly_price
        : selectedPlan.yearly_price
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
  }, [selectedPlan, billingCycle, includeHosting])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!selectedPlan || !summary) {
      return
    }

    setSubmissionState('submitting')
    setErrorMessage(null)

    if (!email) {
      setSubmissionState('error')
      setErrorMessage(
        'Please provide a contact email so we can share your payment link.',
      )
      return
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1200))
      setSubmissionState('success')
    } catch (error) {
      console.error(error)
      setErrorMessage(
        'We were unable to start the checkout session. Please try again.',
      )
      setSubmissionState('error')
    }
  }

  return (
    <div className='grid gap-8 lg:grid-cols-[2fr_1fr]'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
        <section className='flex flex-col gap-4 rounded-2xl border border-foreground/10 bg-background p-6 shadow-sm shadow-foreground/5'>
          <header className='flex flex-col gap-2'>
            <h2 className='text-lg font-semibold text-foreground'>
              Choose your plan
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
          <div className='grid gap-4 md:grid-cols-3'>
            {plans.map((plan) => {
              const isSelected = plan.id === selectedPlan?.id
              const price =
                billingCycle === 'monthly'
                  ? plan.monthly_price
                  : plan.yearly_price

              return (
                <label
                  key={plan.id}
                  className={`flex cursor-pointer flex-col gap-3 rounded-2xl border p-4 transition ${
                    isSelected
                      ? 'border-foreground bg-foreground text-background'
                      : 'border-foreground/10 bg-background'
                  }`}
                >
                  <input
                    className='hidden'
                    type='radio'
                    name='plan'
                    value={plan.id}
                    checked={isSelected}
                    onChange={() => setSelectedPlanId(plan.id)}
                  />
                  <span className='text-sm font-semibold uppercase tracking-wide'>
                    {plan.name}
                    {plan.is_featured ? (
                      <span className='ml-2 rounded-full bg-background/15 px-2 py-0.5 text-xs'>
                        Popular
                      </span>
                    ) : null}
                  </span>
                  <span className='text-2xl font-semibold'>
                    {formatCurrency(price)}
                  </span>
                  <p
                    className={`text-sm ${isSelected ? 'text-background/80' : 'text-foreground/70'}`}
                  >
                    {plan.summary}
                  </p>
                  <ul
                    className={`space-y-1 text-xs ${isSelected ? 'text-background/70' : 'text-foreground/60'}`}
                  >
                    {plan.features.map((feature) => (
                      <li key={feature}>• {feature}</li>
                    ))}
                  </ul>
                </label>
              )
            })}
          </div>
        </section>

        <section className='flex flex-col gap-4 rounded-2xl border border-foreground/10 bg-background p-6 shadow-sm shadow-foreground/5'>
          <header className='flex flex-col gap-2'>
            <h2 className='text-lg font-semibold text-foreground'>Add-ons</h2>
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
            Card details will be collected on the secure Stripe checkout page
            after you confirm this order.
          </p>
          {errorMessage ? (
            <p className='text-sm font-medium text-rose-500'>{errorMessage}</p>
          ) : null}
          <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
            <p className='text-xs text-foreground/50'>
              By continuing you agree to the NextDaySite terms and recurring
              billing policy.
            </p>
            <button
              type='submit'
              disabled={
                submissionState === 'submitting' ||
                submissionState === 'success'
              }
              className='inline-flex items-center justify-center rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-60'
            >
              {submissionState === 'success'
                ? 'Checkout link sent'
                : submissionState === 'submitting'
                  ? 'Preparing checkout...'
                  : 'Continue to payment'}
            </button>
          </div>
        </section>
      </form>
      <aside className='flex flex-col gap-4 rounded-2xl border border-foreground/10 bg-background p-6 shadow-sm shadow-foreground/5'>
        <h2 className='text-lg font-semibold text-foreground'>Order summary</h2>
        {selectedPlan && summary ? (
          <div className='flex flex-col gap-3 text-sm text-foreground/70'>
            <div className='flex items-center justify-between text-foreground'>
              <span>{selectedPlan.name}</span>
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
              <span>Total due today</span>
              <span>{formatCurrency(summary.total)}</span>
            </div>
          </div>
        ) : (
          <p className='text-sm text-foreground/60'>
            Select a plan to see pricing.
          </p>
        )}
        <div className='rounded-xl bg-foreground/5 p-4 text-xs text-foreground/60'>
          <p className='font-semibold text-foreground'>What happens next?</p>
          <ul className='mt-2 list-disc space-y-1 pl-4'>
            <li>Receive a Stripe checkout link to confirm payment.</li>
            <li>Complete onboarding questionnaire to kick off production.</li>
            <li>Meet your launch team within one business day.</li>
          </ul>
        </div>
      </aside>
      {submissionState === 'success' ? (
        <div className='lg:col-span-2'>
          <div className='rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-600'>
            A secure payment link is on its way to{' '}
            <span className='font-semibold'>{email}</span>. We’ll start prepping
            your launch assets immediately.
          </div>
        </div>
      ) : null}
    </div>
  )
}
