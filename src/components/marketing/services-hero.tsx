export function ServicesHero() {
  return (
    <section className='relative flex min-h-[600px] w-full flex-col items-center gap-[90px] px-6 py-14 md:px-12 lg:px-52'>
      <div className='z-10 flex w-full max-w-[684px] flex-col items-center gap-2.5'>
        <p className='text-balance text-center text-[16px] leading-[24px] text-[#9BA1A6] md:text-[18px] md:leading-[26px] lg:text-[20px] lg:leading-[28px]'>
          Everything You Need to Build and Grow Online
        </p>
        <h1 className='text-balance text-center text-[40px] font-normal leading-[1.08] text-[#000] dark:text-[var(--foreground)] md:text-[50px] lg:text-[60px] lg:leading-[64.8px]'>
          Our Services
        </h1>
      </div>

      <div className='h-[575px] w-full max-w-5xl overflow-hidden rounded-[30px] bg-[var(--testimonial-bg)]' />
    </section>
  )
}
