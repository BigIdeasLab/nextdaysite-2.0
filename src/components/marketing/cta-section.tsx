import Link from 'next/link'

export function CtaSection() {
  return (
    <section className='w-full px-3 py-16 transition-colors duration-300 md:px-12 lg:px-52'>
      <div className='relative mx-auto flex min-h-[400px] w-full max-w-[1022px] items-center justify-center overflow-hidden rounded-[30px] bg-[#161616] py-12 md:h-[555px] md:rounded-[50px]'>
        <svg
          width='1022'
          height='526'
          viewBox='0 0 1022 526'
          fill='none'
          className='absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2'
        >
          <defs>
            <filter
              id='filter0_f_2531_739'
              x='-24.5049'
              y='-1.52588e-05'
              width='1071.01'
              height='1071.01'
              filterUnits='userSpaceOnUse'
              colorInterpolationFilters='sRGB'
            >
              <feFlood floodOpacity='0' result='BackgroundImageFix' />
              <feBlend
                mode='normal'
                in='SourceGraphic'
                in2='BackgroundImageFix'
                result='shape'
              />
              <feGaussianBlur
                stdDeviation='67.7524'
                result='effect1_foregroundBlur_2531_739'
              />
            </filter>
            <filter
              id='filter1_f_2531_739'
              x='124.224'
              y='148.729'
              width='773.555'
              height='773.554'
              filterUnits='userSpaceOnUse'
              colorInterpolationFilters='sRGB'
            >
              <feFlood floodOpacity='0' result='BackgroundImageFix' />
              <feBlend
                mode='normal'
                in='SourceGraphic'
                in2='BackgroundImageFix'
                result='shape'
              />
              <feGaussianBlur
                stdDeviation='67.7524'
                result='effect1_foregroundBlur_2531_739'
              />
            </filter>
          </defs>
          <g filter='url(#filter0_f_2531_739)'>
            <path
              d='M511 135.505L561.912 484.593L911 535.505L561.912 586.417L511 935.505L460.088 586.417L111 535.505L460.088 484.593L511 135.505Z'
              fill='#FF7700'
            />
          </g>
          <g filter='url(#filter1_f_2531_739)'>
            <path
              d='M511.001 284.233L542.982 503.524L762.273 535.505L542.982 567.487L511.001 786.777L479.019 567.487L259.729 535.505L479.019 503.524L511.001 284.233Z'
              fill='white'
              fillOpacity='0.6'
            />
          </g>
        </svg>

        <div className='relative z-10 flex w-full max-w-[684px] flex-col items-center justify-center gap-12 px-6 md:gap-[50px]'>
          <div className='flex flex-col items-center justify-center gap-5 text-center'>
            <h2 className='text-balance text-[32px] font-medium capitalize leading-[1.08] text-[#F7F6FF] md:text-[48px] lg:text-[60px] lg:leading-[64.8px]'>
              From Concept to Clicks Your product Live in Days, Not Months
            </h2>
            <p className='w-full max-w-[562px] text-balance text-center text-[16px] leading-[24px] text-[#B9B9B9] md:text-[18px] md:leading-[26px] lg:text-[20px] lg:leading-[28px]'>
              Start your subscription today and let our team design, host, and
              manage your website.
            </p>
          </div>

          <div className='flex flex-wrap items-center justify-center gap-2.5'>
            <Link
              href='/checkout'
              className='flex h-[48px] items-center justify-center rounded-[30px] border border-[#FF8C00] bg-[#FF8C00] px-[24px] text-[16px] font-medium leading-[24px] text-[#F7F6FF] transition-opacity hover:opacity-90 md:h-[54px] md:px-[30px] md:text-[18px]'
            >
              Get Started
            </Link>
            <Link
              href='#portfolio'
              className='flex h-[48px] items-center justify-center rounded-[30px] bg-[#090808] px-[20px] text-[16px] font-medium leading-[24px] text-[#F7F6FF] transition-opacity hover:opacity-90 md:h-[54px] md:px-[26px] md:text-[18px]'
            >
              View Our Work
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
