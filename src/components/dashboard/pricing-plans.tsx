'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'

export function PricingPlans() {
  const [selectedPayment, setSelectedPayment] = useState<
    'two-state' | 'one-time'
  >('two-state')

  const plans = [
    {
      name: 'Web',
      description: 'Modern 3–5 page website fast.',
      oneTimePrice: '$1,500',
      monthlyPrice: '$150',
      savingsBadge: 'Save $200',
      totalMonthly: 'Total $1,800',
      features: [
        '3–5 pages',
        'Responsive + basic SEO',
        '1 concept + 2 revisions',
        '5 stock images + icons',
        'Performance & accessibility pass',
        'Staging preview',
        'Delivery: 3–5 business days',
      ],
    },
    {
      name: 'Brand Identity',
      description: 'Logo suite, brand kit, and templates.',
      oneTimePrice: '$2,500',
      monthlyPrice: '$250',
      savingsBadge: 'Save $200',
      totalMonthly: 'Total $1,800',
      features: [
        'Logo suite',
        'Color + type system',
        'Social kit',
        'Business card + letterhead',
        '3 flyer/post templates',
        'Mini brand guide (PDF)',
      ],
    },
    {
      name: 'Complete',
      description: 'Website + branding handled end - to - end.',
      oneTimePrice: '$5,000',
      monthlyPrice: '$500',
      savingsBadge: 'Save $200',
      totalMonthly: 'Total $1,800',
      features: [
        'Everything in Web + Identity',
        '6–10 pages',
        'AI copy draft for key pages',
        'SEO essentials',
        'Launch checklist',
        '7 day post launch tweaks',
      ],
    },
  ]

  const comparisonRows = [
    {
      feature: 'Pages / Screens',
      web: '3–5 pages',
      brand: '—',
      complete: '6–10 pages',
    },
    {
      feature: 'Responsive Design',
      web: 'check',
      brand: '—',
      complete: 'check',
    },
    {
      feature: 'Basic SEO Setup',
      web: 'check',
      brand: '—',
      complete: 'check',
    },
    {
      feature: 'AI-Assisted Copy',
      web: 'check',
      brand: '—',
      complete: 'check',
    },
    {
      feature: 'Performance & Accessibility',
      web: 'check',
      brand: '—',
      complete: 'check',
    },
    {
      feature: 'Logo Suite',
      web: '—',
      brand: 'check',
      complete: '—',
    },
    {
      feature: 'Color Palette + Typography',
      web: '—',
      brand: 'check',
      complete: '—',
    },
    {
      feature: 'Development & Assets',
      web: 'check',
      brand: 'check',
      complete: 'check',
    },
    {
      feature: 'Delivery Time',
      web: '3–5 Days',
      brand: '5–7 Days',
      complete: '7–10 Days',
    },
    {
      feature: 'Managed Hosting Option',
      web: 'check',
      brand: 'check',
      complete: 'check',
    },
  ]

  return (
    <div className='w-full rounded-t-[30px] bg-[#131313] px-4 py-10 md:px-8 lg:px-12'>
      {/* Header Section */}
      <div className='mb-[35px] flex flex-col gap-[35px]'>
        <div className='flex flex-col gap-5'>
          <h2 className='text-[22px] font-medium leading-[50px] text-[#F7F6FF]'>
            Choose the Plan That Fits Your Vision.
          </h2>
          <p className='text-lg font-light leading-[22px] text-[#9BA1A6]'>
            Pay once for the best value or spread payments over 12 months.
          </p>
        </div>

        {/* Payment Toggle */}
        <div className='inline-flex w-fit items-center rounded-[30px] border border-[#3E3E3E] bg-[#161616]'>
          <button
            onClick={() => setSelectedPayment('two-state')}
            className={`rounded-[30px] px-5 py-2.5 text-sm font-medium transition-all ${
              selectedPayment === 'two-state'
                ? 'border border-[#F7F6FF] bg-[#F7F6FF] text-black'
                : 'border-none bg-transparent text-[#F7F6FF]'
            }`}
          >
            Two-state pill
          </button>
          <button
            onClick={() => setSelectedPayment('one-time')}
            className={`rounded-[30px] px-6 py-2.5 text-sm font-medium transition-all ${
              selectedPayment === 'one-time'
                ? 'border border-[#F7F6FF] bg-[#F7F6FF] text-black'
                : 'border-none bg-transparent text-[#F7F6FF]'
            }`}
          >
            One-Time
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className='mb-[50px] grid grid-cols-1 gap-2.5 md:grid-cols-2 lg:grid-cols-3'>
        {plans.map((plan, index) => (
          <PricingCard key={index} plan={plan} />
        ))}
      </div>

      {/* Comparison Table */}
      <div className='mb-[50px] flex flex-col items-center gap-[25px]'>
        <div className='hidden w-full overflow-x-auto rounded-[10px] bg-[#202020] px-5 py-6 lg:block'>
          <div className='mb-6 grid grid-cols-4 gap-4'>
            <div className='text-xl font-medium text-[#F7F6FF]'>
              Compare Plans
            </div>
            <div className='text-center text-xl font-normal text-[#F7F6FF]'>
              Web
            </div>
            <div className='text-center text-xl font-normal text-[#F7F6FF]'>
              Brand Identity
            </div>
            <div className='text-center text-xl font-normal text-[#F7F6FF]'>
              Complete
            </div>
          </div>

          <div className='flex flex-col gap-[30px]'>
            {comparisonRows.map((row, idx) => (
              <div
                key={idx}
                className='grid grid-cols-4 items-center gap-4 text-base'
              >
                <div className='font-normal text-[#F7F6FF]'>{row.feature}</div>
                <div className='flex justify-center'>
                  {row.web === 'check' ? (
                    <Check className='h-6 w-6 text-[#F7F6FF]' />
                  ) : row.web === '—' ? (
                    <span className='text-[#F7F6FF]'>—</span>
                  ) : (
                    <span className='text-center text-[#F7F6FF]'>
                      {row.web}
                    </span>
                  )}
                </div>
                <div className='flex justify-center'>
                  {row.brand === 'check' ? (
                    <Check className='h-6 w-6 text-[#F7F6FF]' />
                  ) : row.brand === '—' ? (
                    <span className='text-[#F7F6FF]'>—</span>
                  ) : (
                    <span className='text-center text-[#F7F6FF]'>
                      {row.brand}
                    </span>
                  )}
                </div>
                <div className='flex justify-center'>
                  {row.complete === 'check' ? (
                    <Check className='h-6 w-6 text-[#F7F6FF]' />
                  ) : row.complete === '—' ? (
                    <span className='text-[#F7F6FF]'>—</span>
                  ) : (
                    <span className='text-center text-[#F7F6FF]'>
                      {row.complete}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom CTA Section */}
      <div className='relative overflow-hidden rounded-[50px] bg-[#202020] px-6 py-[100px]'>
        {/* Background Gradient */}
        <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
          <svg
            width='800'
            height='463'
            viewBox='0 0 1022 463'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className='opacity-50'
          >
            <g filter='url(#filter0_f_2492_622)'>
              <path
                d='M511 135.055L561.912 484.143L911 535.055L561.912 585.966L511 935.055L460.088 585.966L111 535.055L460.088 484.143L511 135.055Z'
                fill='#FF7700'
              />
            </g>
            <g filter='url(#filter1_f_2492_622)'>
              <path
                d='M511.001 283.783L542.982 503.074L762.273 535.055L542.982 567.037L511.001 786.327L479.019 567.037L259.729 535.055L479.019 503.074L511.001 283.783Z'
                fill='white'
                fillOpacity='0.6'
              />
            </g>
            <defs>
              <filter
                id='filter0_f_2492_622'
                x='-24.5049'
                y='-0.450211'
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
                  result='effect1_foregroundBlur_2492_622'
                />
              </filter>
              <filter
                id='filter1_f_2492_622'
                x='124.224'
                y='148.278'
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
                  result='effect1_foregroundBlur_2492_622'
                />
              </filter>
            </defs>
          </svg>
        </div>

        {/* Content */}
        <div className='relative z-10 mx-auto flex max-w-[684px] flex-col items-center gap-[30px]'>
          <div className='flex flex-col items-center gap-5 text-center'>
            <h2 className='text-4xl font-medium capitalize leading-[64.8px] text-[#F7F6FF] md:text-[60px]'>
              Need something custom? Let&apos;s talk.
            </h2>
            <p className='text-xl font-normal leading-7 text-[#B9B9B9]'>
              Didn&apos;t see a plan that fits? We&apos;ll tailor one just for
              you.
            </p>
          </div>
          <button className='flex h-[54px] items-center justify-center rounded-[30px] border border-[#FF8C00] bg-[#FF8C00] px-[30px] text-lg font-medium leading-6 text-[#F7F6FF] transition-opacity hover:opacity-90'>
            Contact Us
          </button>
        </div>
      </div>
    </div>
  )
}

type PricingCardProps = {
  plan: {
    name: string
    description: string
    oneTimePrice: string
    monthlyPrice: string
    savingsBadge: string
    totalMonthly: string
    features: string[]
  }
}

function PricingCard({ plan }: PricingCardProps) {
  return (
    <div className='flex h-[750px] flex-col rounded-[15px] bg-[#202020] p-[17px]'>
      {/* Header */}
      <div className='mb-4 flex flex-col gap-[15px]'>
        <h3 className='text-lg font-medium leading-[21px] text-[#F7F6FF]'>
          {plan.name}
        </h3>
        <p className='text-base font-light leading-[22px] text-[#9BA1A6]'>
          {plan.description}
        </p>
      </div>

      {/* Divider */}
      <div className='mb-5 h-px w-full bg-white/10'></div>

      {/* Pricing */}
      <div className='mb-[108px] flex flex-col gap-[25px]'>
        {/* One Time */}
        <div className='flex flex-col gap-[15px]'>
          <div className='flex flex-col gap-[17px]'>
            <p className='text-base font-light leading-[22px] text-[#9BA1A6]'>
              One Time
            </p>
            <div className='flex items-center gap-[5px]'>
              <span className='text-[25px] font-bold leading-[21px] text-[#F7F6FF]'>
                {plan.oneTimePrice}
              </span>
            </div>
          </div>
          <div className='flex w-fit items-center gap-[5px] rounded-[10px] bg-[#452600] px-2.5 py-2'>
            <svg
              width='16'
              height='17'
              viewBox='0 0 16 17'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M11.666 3.86035C12.2183 3.86035 12.666 4.30806 12.666 4.86035C12.666 5.41264 12.2183 5.86035 11.666 5.86035C11.1137 5.86035 10.666 5.41264 10.666 4.86035C10.666 4.30806 11.1137 3.86035 11.666 3.86035Z'
                stroke='#FF8C00'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M1.85014 7.95629C1.18137 8.70322 1.16699 9.83008 1.78076 10.6228C2.99873 12.1959 4.33181 13.529 5.90487 14.7469C6.69759 15.3607 7.82445 15.3463 8.57139 14.6776C10.5993 12.8618 12.4563 10.9643 14.2486 8.87895C14.4258 8.67282 14.5366 8.42015 14.5615 8.14942C14.6715 6.95234 14.8975 3.50346 13.9609 2.56684C13.0242 1.63022 9.57532 1.8562 8.37825 1.96619C8.10752 1.99107 7.85485 2.1019 7.64865 2.27909C5.5634 4.07132 3.66586 5.92842 1.85014 7.95629Z'
                stroke='#FF8C00'
              />
              <path
                d='M9.19162 8.77138C9.20582 8.50404 9.28082 8.01498 8.87435 7.64331M8.87435 7.64331C8.74855 7.52831 8.57668 7.42451 8.34262 7.34198C7.50488 7.04674 6.47591 8.03498 7.20382 8.93958C7.59508 9.42578 7.89675 9.57538 7.86835 10.1275C7.84835 10.516 7.46682 10.9218 6.96395 11.0764C6.52708 11.2106 6.04519 11.0328 5.74039 10.6922C5.36823 10.2764 5.40582 9.88438 5.40263 9.71351M8.87435 7.64331L9.33308 7.18457M5.77356 10.7441L5.33789 11.1798'
                stroke='#FF8C00'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
            <span className='text-sm font-normal leading-[50px] text-[#FF8C00]'>
              {plan.savingsBadge}
            </span>
          </div>
        </div>

        {/* Payment Plan */}
        <div className='flex flex-col gap-[15px]'>
          <div className='flex flex-col gap-[15px]'>
            <p className='text-base font-light leading-[22px] text-[#9BA1A6]'>
              Payment Plan:
            </p>
            <div className='flex items-center gap-[5px]'>
              <span className='text-[25px] font-bold leading-[21px] text-[#F7F6FF]'>
                {plan.monthlyPrice}
              </span>
              <span className='text-base font-light leading-[21px] text-[#9BA1A6]'>
                / mo × 12
              </span>
            </div>
          </div>
          <div className='flex w-fit items-center gap-[5px] rounded-[10px] bg-[#452600] px-2.5 py-2'>
            <svg
              width='16'
              height='17'
              viewBox='0 0 16 17'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M14.6673 8.52702C14.6673 12.2089 11.6825 15.1937 8.00065 15.1937C4.31875 15.1937 1.33398 12.2089 1.33398 8.52702C1.33398 4.84512 4.31875 1.86035 8.00065 1.86035C11.6825 1.86035 14.6673 4.84512 14.6673 8.52702Z'
                stroke='#FF8C00'
              />
              <path
                d='M9.80745 7.23442C9.74138 6.72598 9.15758 5.9045 8.10785 5.90448C6.88812 5.90446 6.37489 6.57999 6.27075 6.91776C6.10828 7.36955 6.14078 8.29842 7.57045 8.39968C9.35758 8.52635 10.0735 8.73728 9.98245 9.83102C9.89132 10.9247 8.89511 11.161 8.10785 11.1356C7.32052 11.1103 6.03241 10.7487 5.98242 9.77588M7.98292 5.19238V5.9069M7.98292 11.1291V11.859'
                stroke='#FF8C00'
                strokeLinecap='round'
              />
            </svg>
            <span className='text-sm font-normal leading-[50px] text-[#FF8C00]'>
              {plan.totalMonthly}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className='mb-[78px] flex items-center gap-[9px]'>
        <button className='flex h-12 flex-1 items-center justify-center rounded-[30px] bg-[#FF8C00] px-5 text-base font-medium leading-5 text-[#F7F6FF] transition-opacity hover:opacity-90'>
          Pay One Time
        </button>
        <button className='flex h-12 flex-1 items-center justify-center rounded-[30px] bg-white px-5 text-base font-medium leading-5 text-black transition-opacity hover:opacity-90'>
          Pay For Plan
        </button>
      </div>

      {/* Features */}
      <div className='mb-7 flex flex-col gap-[15px]'>
        {plan.features.map((feature, idx) => (
          <div key={idx} className='flex items-center gap-[5px]'>
            <div className='relative h-5 w-5 flex-shrink-0'>
              <div className='absolute h-5 w-5 rounded-full bg-[#2D2D2D]'></div>
              <Check className='absolute left-0.5 top-0.5 h-[17px] w-[17px] text-[#F7F6FF]' />
            </div>
            <span className='text-sm font-normal leading-[22px] text-[#9BA1A6]'>
              {feature}
            </span>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className='mb-7 h-px w-full bg-white/10'></div>

      {/* Customize Link */}
      <div className='flex justify-center'>
        <button className='text-base font-normal leading-[22px] text-[#F7F6FF] underline transition-opacity hover:opacity-80'>
          Customize
        </button>
      </div>
    </div>
  )
}
