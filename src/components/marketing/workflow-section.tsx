type WorkflowBullet = {
  label: string
}

type WorkflowCard = {
  title: string
  description: string
}

type WorkflowSectionProps = {
  id?: string
  headline: string
  description: string
  bullets: WorkflowBullet[]
  cards: WorkflowCard[]
}

export function WorkflowSection({
  id,
  headline,
  description,
  bullets,
  cards,
}: WorkflowSectionProps) {
  return (
    <section id={id} className='grid gap-10 md:grid-cols-2'>
      <div className='flex flex-col gap-4'>
        <h2 className='text-2xl font-semibold tracking-tight sm:text-3xl'>
          {headline}
        </h2>
        <p className='text-base leading-relaxed text-foreground/70 sm:text-lg'>
          {description}
        </p>
        <ul className='space-y-3 text-sm text-foreground/70 sm:text-base'>
          {bullets.map((bullet) => (
            <li key={bullet.label} className='flex items-start gap-3'>
              <span
                className='mt-1 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-foreground/80'
                aria-hidden
              />
              {bullet.label}
            </li>
          ))}
        </ul>
      </div>
      <div className='grid gap-6 rounded-3xl border border-foreground/10 bg-foreground/5 p-6 sm:p-10'>
        {cards.map((card) => (
          <div
            key={card.title}
            className='rounded-2xl bg-background p-6 shadow-sm shadow-foreground/10'
          >
            <h3 className='text-lg font-semibold'>{card.title}</h3>
            <p className='mt-2 text-sm text-foreground/70'>
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
