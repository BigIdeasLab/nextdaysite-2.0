'use client'

import { useState } from 'react'
import Image from 'next/image'

type PricingTab = 'fixed-rate' | 'payment-plan'

interface PricingCardData {
  title: string
  description: string
  price: string
  savings: string
  image: string
  features: string[]
}

const pricingData: PricingCardData[] = [
  {
    title: 'Web',
    description: 'Modern 3–5 page website fast.',
    price: '$1,500',
    savings: 'Save $200',
    image:
      'https://api.builder.io/api/v1/image/assets/TEMP/06425d9733f6cda11821dac6f1e21cfb4b1b479f?width=682',
    features: [
      '3–5 pages',
      'Performance & accessibility pass',
      'Responsive + basic SEO',
      'Staging preview',
      '1 concept + 2 revisions',
      'Delivery: 3–5 business days',
      '5 stock images + icons',
    ],
  },
  {
    title: 'Brand Identity',
    description: 'Brand Identity',
    price: '$2,500',
    savings: 'Save $200',
    image:
      'https://api.builder.io/api/v1/image/assets/TEMP/4a5be1fa16475440fc28cd6281b77aff9149e73e?width=682',
    features: [
      'Logo suite',
      '3 flyer/post templates',
      'Color + type system',
      'Mini brand guide (PDF)',
      'Social kit',
      'Business card + letterhead',
    ],
  },
  {
    title: 'Complete',
    description: 'Website + branding handled end - to - end.',
    price: '$5,000',
    savings: 'Save $200',
    image:
      'https://api.builder.io/api/v1/image/assets/TEMP/83c0293a4b0a380ce136ccd0b0b921feae17c0b5?width=682',
    features: [
      'Everything in Web + Identity',
      'Launch checklist',
      '6–10 pages',
      '7 day post launch tweaks',
      'AI copy draft for key pages',
      'SEO essentials',
    ],
  },
]

export function RedesignedPricing() {
  const [activeTab, setActiveTab] = useState<PricingTab>('fixed-rate')

  return (
    <section className='w-full bg-black px-4 py-12 md:px-8 md:py-16 lg:py-24'>
      <div className='mx-auto flex w-full max-w-[1023px] flex-col items-start gap-12 md:gap-[70px]'>
        {/* Header */}
        <div className='flex w-full flex-col items-center gap-5'>
          <h2 className='text-center text-[32px] font-medium leading-[40px] text-white md:text-[40px] md:leading-[50px]'>
            Our Pricing plan
          </h2>

          {/* Toggle Button */}
          <div className='flex items-center rounded-[30px] border border-[#3E3E3E] bg-[#161616]'>
            <button
              onClick={() => setActiveTab('fixed-rate')}
              className={`flex h-[42px] items-center justify-center rounded-[30px] px-5 transition-all ${
                activeTab === 'fixed-rate'
                  ? 'border border-[#F7F6FF] bg-[#F7F6FF] text-black'
                  : 'border-transparent bg-transparent text-white'
              }`}
            >
              <span className='text-sm font-medium leading-[18.655px]'>
                Fixed Rate
              </span>
            </button>
            <button
              onClick={() => setActiveTab('payment-plan')}
              className={`flex h-[42px] items-center justify-center rounded-[30px] px-6 transition-all ${
                activeTab === 'payment-plan'
                  ? 'border border-[#F7F6FF] bg-[#F7F6FF] text-black'
                  : 'border-transparent bg-transparent text-white'
              }`}
            >
              <span className='text-sm font-medium leading-[18.655px]'>
                Payment Plan
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className='flex w-full flex-col items-start gap-[15px]'>
          {pricingData.map((card, index) => (
            <PricingCard key={index} {...card} />
          ))}
        </div>
      </div>
    </section>
  )
}

function PricingCard({
  title,
  description,
  price,
  savings,
  image,
  features,
}: PricingCardData) {
  return (
    <div className='flex w-full flex-col gap-6 rounded-[20px] bg-[#161616] p-5 md:flex-row md:gap-[25px] md:p-[22px_20px_21px_20px]'>
      {/* Image */}
      <div className='relative h-[250px] w-full flex-shrink-0 overflow-hidden rounded-[10px] md:h-[365px] md:w-[341px]'>
        <Image
          src={image}
          alt={title}
          fill
          className='object-cover'
          sizes='(max-width: 768px) 100vw, 341px'
        />
      </div>

      {/* Content */}
      <div className='flex flex-1 flex-col gap-5'>
        {/* Header Info */}
        <div className='flex flex-col gap-6 md:gap-[25px]'>
          {/* Title and Description */}
          <div className='flex flex-col gap-[15px]'>
            <h3 className='text-xl font-medium leading-[21px] text-[#F7F6FF]'>
              {title}
            </h3>
            <p className='text-[17px] font-light leading-[22px] text-[#9BA1A6]'>
              {description}
            </p>
          </div>

          {/* Price and Tag */}
          <div className='flex flex-col gap-[15px]'>
            <div className='text-[35px] font-bold leading-[21px] text-[#F7F6FF]'>
              {price}
            </div>
            <div className='flex w-fit items-center gap-[5px] rounded-[10px] bg-[#452600] px-[10px] py-2'>
              <svg
                width='16'
                height='16'
                viewBox='0 0 16 16'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M11.666 3.33398C12.2183 3.33398 12.666 3.7817 12.666 4.33398C12.666 4.88627 12.2183 5.33398 11.666 5.33398C11.1137 5.33398 10.666 4.88627 10.666 4.33398C10.666 3.7817 11.1137 3.33398 11.666 3.33398Z'
                  stroke='#FF8C00'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M1.85014 7.42992C1.18137 8.17685 1.16699 9.30372 1.78076 10.0965C2.99873 11.6695 4.33181 13.0026 5.90487 14.2205C6.69759 14.8343 7.82445 14.8199 8.57139 14.1512C10.5993 12.3355 12.4563 10.4379 14.2486 8.35258C14.4258 8.14645 14.5366 7.89378 14.5615 7.62305C14.6715 6.42597 14.8975 2.9771 13.9609 2.04048C13.0242 1.10386 9.57532 1.32983 8.37825 1.43982C8.10752 1.4647 7.85485 1.57554 7.64865 1.75272C5.5634 3.54496 3.66586 5.40206 1.85014 7.42992Z'
                  stroke='#FF8C00'
                />
                <path
                  d='M9.19162 8.24501C9.20582 7.97768 9.28082 7.48861 8.87435 7.11694M8.87435 7.11694C8.74855 7.00194 8.57668 6.89814 8.34262 6.81561C7.50488 6.52037 6.47591 7.50861 7.20382 8.41321C7.59508 8.89941 7.89675 9.04901 7.86835 9.60114C7.84835 9.98961 7.46682 10.3954 6.96395 10.55C6.52708 10.6843 6.04519 10.5065 5.74039 10.1659C5.36823 9.75008 5.40582 9.35801 5.40263 9.18714M8.87435 7.11694L9.33308 6.6582M5.77356 10.2177L5.33789 10.6534'
                  stroke='#FF8C00'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
              <span className='text-sm font-normal leading-[50px] text-[#FF8C00]'>
                {savings}
              </span>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className='rounded-[10px] bg-[#262627] p-[10px]'>
          <div className='grid grid-cols-1 gap-[13px] sm:grid-cols-2 sm:gap-x-[10px]'>
            {features.map((feature, index) => (
              <div key={index} className='flex items-center gap-[9px]'>
                <div className='relative h-[22px] w-[22px] flex-shrink-0'>
                  <svg
                    width='22'
                    height='22'
                    viewBox='0 0 22 22'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    className='absolute left-0 top-0'
                  >
                    <circle
                      cx='10.9013'
                      cy='10.9013'
                      r='10.9013'
                      fill='#2D2D2D'
                    />
                  </svg>
                  <svg
                    width='19'
                    height='19'
                    viewBox='0 0 19 19'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    className='absolute left-[2px] top-[2px]'
                  >
                    <path
                      d='M3.78516 10.5986L6.43477 13.2482L14.3836 4.9209'
                      stroke='#F7F6FF'
                      strokeWidth='1.36266'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </div>
                <span className='text-sm leading-[21.803px] text-[#9BA1A6]'>
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className='flex flex-col gap-[7px] sm:flex-row'>
          <button
            type='button'
            className='flex h-12 w-full items-center justify-center rounded-[30px] bg-[#FF8C00] px-5 transition-transform hover:scale-105 sm:w-[156px]'
          >
            <span className='text-base font-medium leading-5 text-[#F7F6FF]'>
              Subscribe
            </span>
          </button>
          <button
            type='button'
            className='flex h-12 w-full items-center justify-center rounded-[30px] bg-[#262627] px-5 transition-transform hover:scale-105 sm:w-[156px]'
          >
            <span className='text-base font-medium leading-5 text-[#F7F6FF]'>
              Customize
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
