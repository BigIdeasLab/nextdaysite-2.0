import Link from 'next/link'

export function RedesignedHero() {
  return (
    <section className='relative flex min-h-[500px] w-full flex-col items-center gap-9 px-3 py-16 md:min-h-[600px] md:gap-24 md:px-12 lg:px-52'>
      <div className='flex w-full max-w-3xl flex-col items-center gap-9 md:gap-12'>
        <div className='flex flex-col items-center gap-[14px] text-center md:gap-5'>
          <h1 className='max-w-[369px] text-balance text-[42px] font-medium leading-[45px] text-[#F7F6FF] md:max-w-none md:text-5xl md:leading-tight lg:text-6xl lg:leading-[1.08]'>
            Own a Stunning Website Without Lifting a Finger
          </h1>
          <p className='max-w-[324px] text-balance text-sm leading-[19.5px] text-[#B5A29F] md:max-w-2xl md:text-xl md:leading-7'>
            NextDaySite builds, hosts, and manages your business website for a
            simple monthly fee. No hidden costs. No stress. Just results.
          </p>
        </div>

        <div className='flex flex-wrap items-center justify-center gap-[7px] md:gap-3'>
          <Link
            href='/checkout'
            className='flex h-[38px] items-center justify-center rounded-[21px] border border-[#3E3E3E] bg-[#FF8C00] px-[14px] text-[13px] font-medium text-white transition-transform hover:scale-105 md:h-14 md:rounded-full md:px-5 md:text-lg'
          >
            Get Started
          </Link>
          <Link
            href='#pricing'
            className='flex h-[38px] items-center justify-center rounded-[21px] border border-[#3E3E3E] bg-[#090808] px-[18px] text-[13px] font-medium text-white transition-transform hover:scale-105 md:h-14 md:rounded-full md:px-7 md:text-lg'
          >
            See Pricing
          </Link>
        </div>
      </div>

      <div className='h-[300px] w-full max-w-5xl overflow-hidden rounded-[30px] bg-[#1A1A1A] md:h-[500px]' />
    </section>
  )
}
