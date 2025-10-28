export function BrandHero() {
  return (
    <section className='relative flex w-full flex-col items-center gap-8 px-6 py-16 md:px-12 lg:px-52'>
      <div className='z-10 flex w-full max-w-[684px] flex-col items-center gap-2.5'>
        <p className='text-balance text-center text-[16px] leading-[24px] text-[#9BA1A6] md:text-[18px] md:leading-[26px] lg:text-[20px] lg:leading-[28px]'>
          We Design Brands That Stand Out.
        </p>
        <h1 className='text-balance text-center text-[40px] font-normal leading-[1.08] text-[#000] dark:text-[var(--foreground)] md:text-[50px] lg:text-[60px] lg:leading-[64.8px]'>
          Brand Identity
        </h1>
      </div>
    </section>
  )
}
