'use client'

import Link from 'next/link'

export function RedesignedHero() {
  return (
    <section className='relative flex min-h-[700px] w-full flex-col items-center gap-9 px-3 py-16 md:min-h-[1200px] md:gap-[80px] md:px-12 lg:px-52'>
      <div className='flex w-full max-w-[684px] flex-col items-center gap-[30px] md:gap-[50px]'>
        <div className='flex w-full flex-col items-center gap-5'>
          <h1 className='text-5xl font-bold leading-tight text-white'>
            Own a Stunning Website
            <br />
            Without Lifting a Finger
          </h1>
        </div>

        <div className='flex flex-wrap items-center justify-center gap-[10px]'>
          <Link
            href='/checkout'
            className='flex h-[48px] items-center justify-center rounded-[30px] border border-[#3E3E3E] bg-[#FF8C00] px-5 text-[16px] font-medium text-white transition-transform hover:scale-105 md:h-[54px] md:px-5 md:text-[18px]'
          >
            Get Started
          </Link>
          <Link
            href='#pricing'
            className='flex h-[48px] items-center justify-center rounded-[30px] border border-[#3E3E3E] bg-[#090808] px-[22px] text-[16px] font-medium text-white transition-transform hover:scale-105 md:h-[54px] md:px-[26px] md:text-[18px]'
          >
            See Pricing
          </Link>
        </div>
      </div>
    </section>
  )
}
