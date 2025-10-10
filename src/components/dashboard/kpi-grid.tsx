import { TrendIcon } from './trend-icon'

type Trend = {
  direction: 'up' | 'down'
  label: string
}

type KpiMetric = {
  label: string
  value: string
  caption?: string
  trend?: Trend
}

type KpiGridProps = {
  items: KpiMetric[]
}

export function KpiGrid({ items }: KpiGridProps) {
  return (
    <section className='grid gap-4 md:grid-cols-2 xl:grid-cols-4'>
      {items.map((item) => (
        <article
          key={item.label}
          className='rounded-2xl border border-foreground/10 bg-background p-6 shadow-sm shadow-foreground/5'
        >
          <p className='text-sm font-medium text-foreground/60'>{item.label}</p>
          <p className='mt-3 text-3xl font-semibold text-foreground'>
            {item.value}
          </p>
          {item.caption ? (
            <p className='mt-2 text-sm text-foreground/60'>{item.caption}</p>
          ) : null}
          {item.trend ? (
            <span
              className={`mt-3 inline-flex items-center gap-2 text-sm font-medium ${
                item.trend.direction === 'up'
                  ? 'text-emerald-500'
                  : 'text-rose-500'
              }`}
            >
              <TrendIcon direction={item.trend.direction} />
              {item.trend.label}
            </span>
          ) : null}
        </article>
      ))}
    </section>
  )
}
