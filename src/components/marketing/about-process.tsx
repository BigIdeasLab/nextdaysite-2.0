export function AboutProcess() {
  const steps = [
    {
      number: '1.',
      title: 'Consulatation',
      description:
        "Our process begins with a free consultation to understand clients' needs and expectations. We also offer advice based on technical expertise at this stage.",
    },
    {
      number: '2.',
      title: 'Implementation',
      description:
        'We design and execute the demands of our clients in a timely fashion, paying attention to even the smallest details.',
    },
    {
      number: '3.',
      title: 'Development',
      description:
        'From 3D graphics to mobile app solutions, we provide the final touches to the requests of the clients. Our primary target here is utter perfection.',
    },
    {
      number: '4.',
      title: 'Delivery',
      description:
        'The unveiling stage. We look forward to the smiles and the "Wow!" exclamation our clients give when they see our results.',
    },
  ]

  return (
    <section className='w-full rounded-t-[50px] bg-[var(--dark-section)] px-6 py-20 md:px-12 lg:px-24'>
      <div className='mx-auto flex max-w-5xl flex-col gap-12 md:gap-16'>
        <h2 className='text-4xl font-medium leading-tight text-[var(--light-text)] md:text-5xl lg:text-6xl'>
          Our Process
        </h2>

        <div className='flex flex-col gap-12 md:gap-20'>
          {steps.map((step, index) => (
            <div key={index} className='flex flex-col gap-6 md:gap-8'>
              <div className='flex flex-col items-start gap-4 md:flex-row md:items-start md:justify-between'>
                <h3 className='text-2xl font-medium leading-tight text-[var(--light-text)] md:text-3xl'>
                  {step.number} {step.title}
                </h3>
                <p className='max-w-full text-base leading-relaxed text-[var(--pricing-label-text)] md:max-w-md md:text-lg'>
                  {step.description}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className='h-px w-full bg-white/20' />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
