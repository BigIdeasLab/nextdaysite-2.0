export function ServicesHero() {
  return (
    <section className='relative flex min-h-[600px] w-full flex-col items-center gap-[90px] px-6 py-14 md:px-12 lg:px-52'>
      <div className='z-10 flex w-full max-w-3xl flex-col items-center gap-2.5'>
        <p className='max-w-xl text-balance text-center text-xl leading-7 text-secondary'>
          Everything You Need to Build and Grow Online
        </p>
        <h1 className='text-balance text-center text-5xl font-medium leading-tight text-primary md:text-6xl md:leading-[1.08]'>
          Our Services
        </h1>
      </div>

      <div className='h-[575px] w-full max-w-5xl overflow-hidden rounded-[30px] bg-[var(--testimonial-bg)]' />
    </section>
  )
}
