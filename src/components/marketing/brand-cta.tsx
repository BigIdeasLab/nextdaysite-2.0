import Link from 'next/link'

export function BrandCta() {
  return (
    <section className='w-full px-6 py-16 md:px-12 lg:px-52'>
      <div className='relative mx-auto flex min-h-[400px] w-full max-w-5xl flex-col items-center justify-center gap-12 overflow-hidden rounded-[50px] bg-[var(--dark-card)] px-6 py-16 transition-colors duration-300'>
        <svg
          width='1022'
          height='526'
          viewBox='0 0 1022 526'
          fill='none'
          className='absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2'
        >
          <defs>
            <filter
              id='filter0_f_brand'
              x='-24.5'
              y='0.5'
              width='1071'
              height='1071'
              filterUnits='userSpaceOnUse'
            >
              <feGaussianBlur stdDeviation='67.75' />
            </filter>
            <filter
              id='filter1_f_brand'
              x='124.2'
              y='149.2'
              width='773.6'
              height='773.6'
              filterUnits='userSpaceOnUse'
            >
              <feGaussianBlur stdDeviation='67.75' />
            </filter>
          </defs>
          <g filter='url(#filter0_f_brand)'>
            <path
              d='M511 136L561.912 485.088L911 536L561.912 586.912L511 936L460.088 586.912L111 536L460.088 485.088L511 136Z'
              fill='#FF7700'
            />
          </g>
          <g filter='url(#filter1_f_brand)'>
            <path
              d='M511 284.729L542.981 504.019L762.272 536.001L542.981 567.982L511 787.273L479.018 567.982L259.728 536.001L479.018 504.019L511 284.729Z'
              fill='white'
              fillOpacity='0.6'
            />
          </g>
        </svg>

        <div className='relative z-10 flex w-full max-w-2xl flex-col items-center gap-8 text-center'>
          <h2 className='text-balance text-4xl font-medium leading-tight text-[var(--foreground)] md:text-5xl'>
            A Strong Brand Begins With A Bold Identity.
          </h2>
          <p className='text-balance text-lg leading-relaxed text-[#B9B9B9]'>
            From your logo to your message, every detail should tell your story
            with clarity and confidence.
          </p>
          <div className='flex flex-wrap items-center gap-3'>
            <Link
              href='/checkout'
              className='flex h-14 items-center justify-center rounded-full bg-[#FF8C00] px-8 text-lg font-medium text-white transition-transform hover:scale-105'
            >
              Get Started
            </Link>
            <Link
              href='/portfolio'
              className='flex h-14 items-center justify-center rounded-full bg-[#090808] px-7 text-lg font-medium text-white transition-transform hover:scale-105'
            >
              View Our Work
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
