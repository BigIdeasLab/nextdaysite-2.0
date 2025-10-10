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
    <section
      id='pricing'
      className='w-full px-5 py-16 md:px-12 md:py-24 lg:px-52'
    >
      <div className='mx-auto flex w-full max-w-[1023px] flex-col items-start gap-16 md:gap-[106px]'>
        <h2 className='w-full text-center text-[28px] font-medium leading-[35px] text-[#F7F6FF] md:text-[40px] md:leading-[50px]'>
          Our Pricing plan
        </h2>

        <div className='flex w-full flex-col items-center justify-center gap-4 md:flex-row md:items-start md:gap-[15px]'>
          {plans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  )
}

function PricingCard({ plan }: { plan: (typeof plans)[0] }) {
  return (
    <div
      className={`relative flex h-auto w-full max-w-[331px] flex-col rounded-[20px] border bg-[#161616] md:h-[771px] ${plan.borderColor}`}
    >
      {/* Main Content */}
      <div className='flex flex-col gap-[30px] p-5'>
        {/* Header */}
        <div className='flex w-full max-w-[238px] flex-col gap-2'>
          <div className='flex items-center gap-2'>
            <svg
              width='24'
              height='24'
              viewBox='0 0 25 24'
              fill='none'
              className='h-6 w-6'
            >
              <g clipPath='url(#clip0)'>
                <mask
                  id='mask0'
                  style={{ maskType: 'luminance' }}
                  maskUnits='userSpaceOnUse'
                  x='0'
                  y='0'
                  width='25'
                  height='24'
                >
                  <path d='M24.5 0H0.5V24H24.5V0Z' fill='white' />
                </mask>
                <g mask='url(#mask0)'>
                  <path
                    d='M17.5 12C17.5 14.7614 15.2614 17.0001 12.5 17.0001C9.73859 17.0001 7.5 14.7614 7.5 12C7.5 9.23857 9.73859 7 12.5 7C15.2614 7 17.5 9.23857 17.5 12Z'
                    fill='white'
                    stroke='white'
                  />
                  <path
                    d='M12.5 2C12.1227 2.33333 11.5945 3.2 12.5 4.00001M12.5 20C12.8773 20.3333 13.4055 21.2 12.5 21.9999M20 4.50272C19.4685 4.46982 18.4253 4.72293 18.5042 5.99847M5.99576 17.4999C6.02866 18.0315 5.77555 19.0746 4.50001 18.9957M5.50271 4.5C5.46979 5.03202 5.72315 6.07631 7 5.99729M18.5 17.5026C19.0316 17.4714 20.0747 17.7108 19.9958 18.9168M22.5 12C22.1667 11.6227 21.3 11.0945 20.5001 12M4.50001 11.5C4.16668 11.8773 3.30001 12.4055 2.5 11.5'
                    stroke='white'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                  />
                </g>
              </g>
            </svg>
            <h3 className='text-[20px] font-medium leading-[24px] text-white'>
              {plan.title}
            </h3>
          </div>
          <p className='text-[16px] font-light leading-[24px] text-white/50'>
            {plan.description}
          </p>
        </div>

        {/* Price */}
        <div className='flex items-center gap-[5px]'>
          <span className='text-[45px] font-medium leading-[24px] text-white'>
            {plan.price}
          </span>
          <span className='text-[21px] font-normal leading-[24px] text-white/50'>
            {plan.period}
          </span>
        </div>

        {/* Subscribe Button */}
        <div className='flex flex-col gap-3'>
          <Link
            href='/checkout'
            className='flex h-[54px] w-full items-center justify-center rounded-[30px] border-2 border-[#CA7207] bg-[#FF8C00] px-5 text-[18px] font-medium leading-[24px] text-white transition-transform hover:scale-105'
          >
            Subscribe
          </Link>
        </div>

        {/* Features List */}
        <div className='flex flex-col gap-[15px]'>
          {plan.features.map((feature, index) => (
            <div key={index} className='flex items-center gap-[10px]'>
              <div className='relative h-6 w-6'>
                <svg
                  width='24'
                  height='24'
                  viewBox='0 0 25 24'
                  className='absolute left-0 top-0'
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
              <span className='text-[15px] leading-[24px] text-white/50'>
                {feature}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* First Divider */}
      <div className='h-px w-full bg-white/10' />

      {/* Add Managed Hosting Section */}
      <div className='flex items-center gap-[10px] p-5'>
        <div className='h-6 w-6 rounded-md border-2 border-[#2D2D2D]' />
        <div className='flex flex-col gap-[7px]'>
          <div className='flex items-center gap-[5px]'>
            <span className='text-[16px] font-medium leading-[24px] text-white'>
              Add Managed Hosting
            </span>
            <svg
              width='17'
              height='17'
              viewBox='0 0 18 17'
              fill='none'
              className='h-[17px] w-[17px]'
            >
              <path
                d='M8.29199 12.042H9.70866V7.79199H8.29199V12.042ZM9.00033 6.37533C9.20102 6.37533 9.36937 6.30733 9.50537 6.17133C9.64137 6.03533 9.70913 5.86721 9.70866 5.66699C9.70819 5.46677 9.64019 5.29866 9.50466 5.16266C9.36913 5.02666 9.20102 4.95866 9.00033 4.95866C8.79963 4.95866 8.63152 5.02666 8.49599 5.16266C8.36047 5.29866 8.29246 5.46677 8.29199 5.66699C8.29152 5.86721 8.35952 6.03556 8.49599 6.17203C8.63246 6.30851 8.80058 6.37627 9.00033 6.37533ZM9.00033 15.5837C8.02046 15.5837 7.09963 15.3976 6.23783 15.0255C5.37602 14.6534 4.62637 14.1488 3.98887 13.5118C3.35137 12.8748 2.8468 12.1251 2.47516 11.2628C2.10352 10.4005 1.91747 9.47971 1.91699 8.50033C1.91652 7.52094 2.10258 6.6001 2.47516 5.73783C2.84774 4.87555 3.35231 4.1259 3.98887 3.48887C4.62542 2.85184 5.37508 2.34727 6.23783 1.97516C7.10058 1.60305 8.02141 1.41699 9.00033 1.41699C9.97924 1.41699 10.9001 1.60305 11.7628 1.97516C12.6256 2.34727 13.3752 2.85184 14.0118 3.48887C14.6483 4.1259 15.1531 4.87555 15.5262 5.73783C15.8993 6.6001 16.0851 7.52094 16.0837 8.50033C16.0822 9.47971 15.8962 10.4005 15.5255 11.2628C15.1548 12.1251 14.6502 12.8748 14.0118 13.5118C13.3733 14.1488 12.6237 14.6536 11.7628 15.0262C10.902 15.3988 9.98113 15.5846 9.00033 15.5837Z'
                fill='#8A8A8A'
              />
            </svg>
          </div>
          <span className='text-[14px] font-light leading-[24px] text-white/50'>
            Modern 3–5 page website, fast.
          </span>
        </div>
      </div>

      {/* Second Divider */}
      <div className='h-px w-full bg-white/10' />

      {/* Customize Plan */}
      <div className='flex items-center justify-center gap-[10px] p-5'>
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
        <span className='text-[18px] leading-[24px] text-[#FF8C00]'>
          Customize plan
        </span>
      </div>
    </div>
  )
}
