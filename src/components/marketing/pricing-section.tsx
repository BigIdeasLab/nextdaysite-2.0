import type { PlansRow } from '@/types/models'

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}

function getCtaLabel(plan: PlansRow) {
  switch (plan.slug) {
    case 'web-launch':
      return 'Start Web Launch'
    case 'identity-suite':
      return 'Explore Identity Suite'
    case 'complete-launch':
      return 'Launch Complete Package'
    default:
      return 'Choose this plan'
  }
}

type PricingSectionProps = {
  plans: PlansRow[]
}

export function PricingSection({ plans }: PricingSectionProps) {
  return (
    <section id='plans' className='grid gap-8'>
      <div className='flex flex-col gap-4 text-center'>
        <h2 className='text-2xl font-semibold tracking-tight sm:text-3xl'>
          Plans built for launch velocity.
        </h2>
        <p className='mx-auto max-w-2xl text-base leading-relaxed text-foreground/70 sm:text-lg'>
          Choose a plan that fits your timeline and ambition. Every plan
          includes project orchestration, AI-assisted copy, and a dedicated
          launch team.
        </p>
      </div>
      <div className='grid gap-6 md:grid-cols-3'>
        {plans.map((plan) => {
          const isFeatured = plan.is_featured
          const containerClasses = isFeatured
            ? 'flex flex-col gap-6 rounded-3xl border border-foreground/10 bg-foreground text-background p-6 shadow-sm shadow-foreground/10'
            : 'flex flex-col gap-6 rounded-3xl border border-foreground/10 bg-background p-6 shadow-sm shadow-foreground/5'

          return (
            <article key={plan.id} className={containerClasses}>
              <div className='flex flex-col gap-2'>
                <h3 className='text-lg font-semibold'>{plan.name}</h3>
                <p
                  className={
                    isFeatured
                      ? 'text-sm text-background/80'
                      : 'text-sm text-foreground/70'
                  }
                >
                  {plan.summary}
                </p>
              </div>
              <p className='text-3xl font-semibold'>
                {formatCurrency(plan.monthly_price)}
              </p>
              <ul
                className={
                  isFeatured
                    ? 'space-y-3 text-sm text-background/85'
                    : 'space-y-3 text-sm text-foreground/70'
                }
              >
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <a
                className={
                  isFeatured
                    ? 'inline-flex items-center justify-center rounded-full bg-background px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-background/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-foreground'
                    : 'inline-flex items-center justify-center rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-background transition hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background'
                }
                href='/checkout'
              >
                {getCtaLabel(plan)}
              </a>
            </article>
          )
        })}
      </div>
    </section>
  )
}
