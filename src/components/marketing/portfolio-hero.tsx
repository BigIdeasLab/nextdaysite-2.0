import Image from 'next/image'

export function PortfolioHero() {
  return (
    <section className='relative flex w-full flex-col items-center gap-8 px-6 py-16 md:px-12 lg:px-52'>
      <div className='absolute left-[179px] -top-[6px] hidden lg:block'>
        <Image
          src='https://api.builder.io/api/v1/image/assets/TEMP/9cca8bfc73a13a685e861bc869aaa5e2f645c9f4?width=398'
          alt=''
          width={199}
          height={224}
          className='h-56 w-auto'
        />
      </div>

      <div className='z-10 flex w-full max-w-[684px] flex-col items-center gap-2.5'>
        <p className='text-balance text-center text-[16px] leading-[24px] text-[#9BA1A6] md:text-[18px] md:leading-[26px] lg:text-[20px] lg:leading-[28px]'>
          See What We&apos;ve Built for Our Clients
        </p>
        <h1 className='text-balance text-center text-[40px] font-normal leading-[1.08] text-[#000] dark:text-[var(--foreground)] md:text-[50px] lg:text-[60px] lg:leading-[64.8px]'>
          Our Works
        </h1>
      </div>
    </section>
  )
}
