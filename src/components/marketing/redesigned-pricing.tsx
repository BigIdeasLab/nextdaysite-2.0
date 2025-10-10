import Link from 'next/link'

const plans = [
  {
    id: 1,
    title: 'Website Development',
    description: 'Modern 3–5 page website, fast.',
    price: '$1500',
    period: '/ Month',
    features: [
      '3–5 pages',
      'Responsive + basic SEO',
      '1 concept + 2 revisions',
      '5 stock images + icons',
      'Performance & accessibility pass',
      'Staging preview',
      'Delivery: 3–5 business days',
    ],
    borderColor: 'border-transparent',
  },
  {
    id: 2,
    title: 'Brand Idnetity',
    description: 'Logo suite, brand kit, and templates.',
    price: '$2500',
    period: '/ Year',
    features: [
      'Logo suite',
      'Color + type system',
      'Social kit',
      'Business card + letterhead',
      '3 flyer/post templates',
      'Mini brand guide (PDF)',
    ],
    borderColor: 'border-transparent',
  },
  {
    id: 3,
    title: 'Complete',
    description: 'Website + branding handled end‑to‑end.',
    price: '$5100',
    period: '/ Year',
    features: [
      'Everything in Web + Identity',
      '6–10 pages',
      'AI copy draft for key pages',
      'SEO essentials',
      'Launch checklist',
      '7‑day post‑launch tweaks',
    ],
    borderColor: 'border-[#FF8C00]',
    featured: true,
  },
]

export function RedesignedPricing() {
  return (
    <section id='pricing' className='w-full px-6 py-16 md:px-12 lg:px-52'>
      <div className='mx-auto flex w-full max-w-5xl flex-col items-start gap-24'>
        <h2 className='w-full text-center text-4xl font-medium leading-[1.25] text-[#F7F6FF]'>
          Our Pricing plan
        </h2>

        <div className='flex w-full flex-col items-center justify-center gap-4 md:flex-row md:items-start'>
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`flex h-auto w-full max-w-[331px] flex-col rounded-3xl border bg-[#161616] ${plan.borderColor}`}
            >
              <div className='flex flex-col gap-8 p-5'>
                <div className='flex w-full max-w-[238px] flex-col gap-2'>
                  <div className='flex items-center gap-2'>
                    <svg
                      width='24'
                      height='24'
                      viewBox='0 0 25 24'
                      fill='none'
                      className='h-6 w-6'
                    >
                      <circle
                        cx='12.5'
                        cy='12'
                        r='5'
                        fill='white'
                        stroke='white'
                      />
                      <path
                        d='M12.5 2C12.1227 2.33333 11.5945 3.2 12.5 4.00001M12.5 20C12.8773 20.3333 13.4055 21.2 12.5 21.9999'
                        stroke='white'
                        strokeWidth='1.5'
                        strokeLinecap='round'
                      />
                    </svg>
                    <h3 className='text-xl font-medium text-white'>
                      {plan.title}
                    </h3>
                  </div>
                  <p className='text-base font-light leading-6 text-white/50'>
                    {plan.description}
                  </p>
                </div>

                <div className='flex items-center gap-1'>
                  <span className='text-[45px] font-medium leading-6 text-white'>
                    {plan.price}
                  </span>
                  <span className='text-[21px] font-normal leading-6 text-white/50'>
                    {plan.period}
                  </span>
                </div>

                <Link
                  href='/checkout'
                  className='flex h-14 items-center justify-center rounded-full border-2 border-[#CA7207] bg-[#FF8C00] px-5 text-lg font-medium text-white transition-transform hover:scale-105'
                >
                  Subscribe
                </Link>

                <div className='flex flex-col gap-4'>
                  {plan.features.map((feature, index) => (
                    <div key={index} className='flex items-center gap-2.5'>
                      <div className='relative h-6 w-6'>
                        <svg
                          width='24'
                          height='24'
                          viewBox='0 0 25 24'
                          className='absolute'
                        >
                          <circle cx='12.5' cy='12' r='12' fill='#2D2D2D' />
                        </svg>
                        <svg
                          width='20'
                          height='20'
                          viewBox='0 0 21 20'
                          className='absolute left-0.5 top-0.5'
                        >
                          <path
                            d='M4.66699 11.667L7.58366 14.5837L16.3337 5.41699'
                            stroke='white'
                            strokeWidth='1.5'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          />
                        </svg>
                      </div>
                      <span className='text-[15px] leading-6 text-white/50'>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className='mt-4 h-px w-full bg-white/10' />

              <div className='flex items-center justify-center gap-2.5 p-5'>
                <svg
                  width='20'
                  height='20'
                  viewBox='0 0 21 20'
                  fill='none'
                  className='h-5 w-5'
                >
                  <path
                    d='M4.66634 13.3334L3.83301 16.6667L7.16634 15.8334L16.8213 6.17841C17.1338 5.86586 17.3093 5.44201 17.3093 5.00007C17.3093 4.55813 17.1338 4.13429 16.8213 3.82174L16.678 3.67841C16.3655 3.36596 15.9416 3.19043 15.4997 3.19043C15.0577 3.19043 14.6339 3.36596 14.3213 3.67841L4.66634 13.3334Z'
                    stroke='#FF8C00'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M4.66634 13.3333L3.83301 16.6667L7.16634 15.8333L15.4997 7.5L12.9997 5L4.66634 13.3333Z'
                    fill='#FF8C00'
                  />
                  <path
                    d='M12.9997 5L15.4997 7.5M11.333 16.6667H17.9997'
                    stroke='#FF8C00'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
                <span className='text-lg text-[#FF8C00]'>Customize plan</span>
              </div>

              <div className='h-px w-full bg-white/10' />

              <div className='flex items-center gap-2.5 p-5'>
                <div className='h-6 w-6 rounded-md border-2 border-[#2D2D2D]' />
                <div className='flex flex-col gap-2'>
                  <div className='flex items-center gap-1'>
                    <span className='text-base font-medium text-white'>
                      Add Managed Hosting
                    </span>
                    <svg
                      width='17'
                      height='17'
                      viewBox='0 0 18 17'
                      fill='none'
                      className='h-4 w-4'
                    >
                      <path
                        d='M8.29199 12.042H9.70866V7.79199H8.29199V12.042ZM9.00033 6.37533C9.20102 6.37533 9.36937 6.30733 9.50537 6.17133C9.64137 6.03533 9.70913 5.86721 9.70866 5.66699C9.70819 5.46677 9.64019 5.29866 9.50466 5.16266C9.36913 5.02666 9.20102 4.95866 9.00033 4.95866C8.79963 4.95866 8.63152 5.02666 8.49599 5.16266C8.36047 5.29866 8.29246 5.46677 8.29199 5.66699C8.29152 5.86721 8.35952 6.03556 8.49599 6.17203C8.63246 6.30851 8.80058 6.37627 9.00033 6.37533Z'
                        fill='#8A8A8A'
                      />
                    </svg>
                  </div>
                  <span className='text-sm font-light leading-6 text-white/50'>
                    Modern 3–5 page website, fast.
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
