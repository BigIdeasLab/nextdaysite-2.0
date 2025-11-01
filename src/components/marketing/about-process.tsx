export interface AboutProcessProps {
  step1Title: string
  step1Description: string
  step2Title: string
  step2Description: string
  step3Title: string
  step3Description: string
  step4Title: string
  step4Description: string
}

export function AboutProcess({
  step1Title,
  step1Description,
  step2Title,
  step2Description,
  step3Title,
  step3Description,
  step4Title,
  step4Description,
}: AboutProcessProps) {
  const steps = [
    {
      number: '1.',
      title: step1Title,
      description: step1Description,
    },
    {
      number: '2.',
      title: step2Title,
      description: step2Description,
    },
    {
      number: '3.',
      title: step3Title,
      description: step3Description,
    },
    {
      number: '4.',
      title: step4Title,
      description: step4Description,
    },
  ]

  return (
    <section className='w-full rounded-t-[50px] bg-[var(--dark-section)] px-6 py-20 md:px-12 lg:px-24'>
      <div className='mx-auto flex max-w-5xl flex-col gap-12 md:gap-16'>
        <h2 className='text-4xl font-medium leading-tight text-foreground md:text-5xl lg:text-6xl'>
          Our Process
        </h2>

        <div className='flex flex-col gap-12 md:gap-20'>
          {steps.map((step, index) => (
            <div key={index} className='flex flex-col gap-6 md:gap-8'>
              <div className='flex flex-col items-start gap-4 md:flex-row md:items-start md:justify-between'>
                <h3 className='text-2xl font-medium leading-tight text-foreground md:text-3xl'>
                  {step.number} {step.title}
                </h3>
                <p className='max-w-full text-base leading-relaxed text-[var(--pricing-label-text)] md:max-w-md md:text-lg'>
                  {step.description}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className='h-px w-full bg-foreground/20' />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
