type Metric = {
  value: string
  label: string
}

type MetricsSectionProps = {
  headline: string
  description: string
  metrics: Metric[]
}

export function MetricsSection({
  headline,
  description,
  metrics,
}: MetricsSectionProps) {
  return (
    <section className='grid gap-6 rounded-3xl border border-foreground/10 bg-foreground/5 p-8'>
      <div className='flex flex-col gap-2 text-center'>
        <h2 className='text-2xl font-semibold tracking-tight sm:text-3xl'>
          {headline}
        </h2>
        <p className='mx-auto max-w-2xl text-base leading-relaxed text-foreground/70 sm:text-lg'>
          {description}
        </p>
      </div>
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className='rounded-2xl bg-background p-6 shadow-sm shadow-foreground/10'
          >
            <p className='text-4xl font-semibold'>{metric.value}</p>
            <p className='mt-2 text-sm text-foreground/70'>{metric.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
