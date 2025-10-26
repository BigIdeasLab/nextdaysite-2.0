'use client'

import { useState } from 'react'
import Image from 'next/image'

type PricingTab = 'fixed-rate' | 'payment-plan'

interface PricingCardData {
  title: string
  description: string
  price: string
  priceNote?: string
  savings: string
  totalPrice?: string
  image: string
  features: string[]
}

const fixedRatePricingData: PricingCardData[] = [
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

const paymentPlanPricingData: PricingCardData[] = [
  {
    title: 'Web',
    description: 'Modern 3–5 page website fast.',
    price: '$150',
    priceNote: '/ mo × 12',
    totalPrice: 'Total: $3,000',
    savings: '',
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
    price: '$250',
    priceNote: '/ mo × 12',
    totalPrice: 'Total: $3,000',
    savings: '',
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
    price: '$500',
    priceNote: '/ mo × 12',
    totalPrice: 'Total: $3,000',
    savings: '',
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

  const currentPricingData =
    activeTab === 'payment-plan' ? paymentPlanPricingData : fixedRatePricingData

  return (
    <section
      id='pricing'
      className='w-full bg-background px-4 py-12 transition-colors duration-300 md:px-8 md:py-16 lg:py-24'
    >
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
              className={`flex h-[42px] items-center justify-center rounded-[30px] border px-5 transition-all ${
                activeTab === 'fixed-rate'
                  ? 'border-[#F7F6FF] bg-[#F7F6FF] text-black'
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
          {currentPricingData.map((card, index) => (
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
  priceNote,
  savings,
  totalPrice,
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
            <h3 className='text-xl font-medium leading-[21px] text-[var(--foreground)]'>
              {title}
            </h3>
            <p className='text-[17px] font-light leading-[22px] text-[var(--text-secondary)]'>
              {description}
            </p>
          </div>

          {/* Price and Tag */}
          <div className='flex flex-col gap-[15px]'>
            <div className='flex items-center gap-[15px]'>
              <span className='text-[35px] font-bold leading-[21px] text-[#F7F6FF]'>
                {price}
              </span>
              {priceNote && (
                <span className='text-[17px] font-light leading-[22px] text-[#9BA1A6]'>
                  {priceNote}
                </span>
              )}
            </div>
            {totalPrice && (
              <div className='flex w-fit items-center gap-[5px] rounded-[10px] bg-[#FFE8CC] px-[10px] py-2'>
                <svg
                  width='17'
                  height='17'
                  viewBox='0 0 17 17'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-[17px] w-[17px] flex-shrink-0'
                >
                  <path
                    d='M12.1916 3.48438C12.7688 3.48438 13.2368 3.9523 13.2368 4.52952C13.2368 5.10674 12.7688 5.57466 12.1916 5.57466C11.6144 5.57466 11.1465 5.10674 11.1465 4.52952C11.1465 3.9523 11.6144 3.48438 12.1916 3.48438Z'
                    stroke='var(--orange-primary)'
                    strokeWidth='1.56771'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M1.93399 7.76468C1.23503 8.54533 1.21999 9.72307 1.86148 10.5516C3.13442 12.1957 4.52769 13.5889 6.17176 14.8618C7.00026 15.5033 8.178 15.4883 8.95865 14.7894C11.0781 12.8917 13.019 10.9085 14.8921 8.729C15.0773 8.51356 15.1931 8.24948 15.2191 7.96653C15.3341 6.71541 15.5703 3.11084 14.5914 2.13194C13.6125 1.15304 10.0079 1.38921 8.7568 1.50417C8.47384 1.53018 8.20977 1.64601 7.99426 1.8312C5.81488 3.70434 3.83167 5.64527 1.93399 7.76468Z'
                    stroke='var(--orange-primary)'
                    strokeWidth='1.56771'
                  />
                  <path
                    d='M9.60777 8.61645C9.62261 8.33705 9.701 7.8259 9.27618 7.43746M9.27618 7.43746C9.14471 7.31727 8.96508 7.20878 8.72045 7.12252C7.8449 6.81395 6.76947 7.8468 7.53024 8.79224C7.93917 9.30039 8.25445 9.45674 8.22477 10.0338C8.20387 10.4398 7.80511 10.8639 7.27954 11.0255C6.82296 11.1658 6.31931 10.98 6.00075 10.624C5.61179 10.1895 5.65107 9.77969 5.64774 9.60111M9.27618 7.43746L9.75563 6.95801M6.03541 10.6782L5.58008 11.1336'
                    stroke='var(--orange-primary)'
                    strokeWidth='1.56771'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
                <span className='text-[15px] font-normal leading-[52px] text-[#FF8C00]'>
                  {totalPrice}
                </span>
              </div>
            )}
            {savings && savings !== '' && (
              <div className='flex w-fit items-center gap-[5px] rounded-[10px] bg-[#FFE8CC] px-[10px] py-2'>
                <svg
                  width='17'
                  height='17'
                  viewBox='0 0 17 17'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-[17px] w-[17px] flex-shrink-0'
                >
                  <path
                    d='M12.1916 3.48438C12.7688 3.48438 13.2368 3.9523 13.2368 4.52952C13.2368 5.10674 12.7688 5.57466 12.1916 5.57466C11.6144 5.57466 11.1465 5.10674 11.1465 4.52952C11.1465 3.9523 11.6144 3.48438 12.1916 3.48438Z'
                    stroke='var(--orange-primary)'
                    strokeWidth='1.56771'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M1.93399 7.76468C1.23503 8.54533 1.21999 9.72307 1.86148 10.5516C3.13442 12.1957 4.52769 13.5889 6.17176 14.8618C7.00026 15.5033 8.178 15.4883 8.95865 14.7894C11.0781 12.8917 13.019 10.9085 14.8921 8.729C15.0773 8.51356 15.1931 8.24948 15.2191 7.96653C15.3341 6.71541 15.5703 3.11084 14.5914 2.13194C13.6125 1.15304 10.0079 1.38921 8.7568 1.50417C8.47384 1.53018 8.20977 1.64601 7.99426 1.8312C5.81488 3.70434 3.83167 5.64527 1.93399 7.76468Z'
                    stroke='var(--orange-primary)'
                    strokeWidth='1.56771'
                  />
                  <path
                    d='M9.60777 8.61645C9.62261 8.33705 9.701 7.8259 9.27618 7.43746M9.27618 7.43746C9.14471 7.31727 8.96508 7.20878 8.72045 7.12252C7.8449 6.81395 6.76947 7.8468 7.53024 8.79224C7.93917 9.30039 8.25445 9.45674 8.22477 10.0338C8.20387 10.4398 7.80511 10.8639 7.27954 11.0255C6.82296 11.1658 6.31931 10.98 6.00075 10.624C5.61179 10.1895 5.65107 9.77969 5.64774 9.60111M9.27618 7.43746L9.75563 6.95801M6.03541 10.6782L5.58008 11.1336'
                    stroke='var(--orange-primary)'
                    strokeWidth='1.56771'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
                <span className='text-[15px] font-normal leading-[52px] text-[#FF8C00]'>
                  {savings}
                </span>
              </div>
            )}
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
            className='flex h-12 w-full items-center justify-center rounded-[30px] bg-[#161616] px-5 transition-transform hover:scale-105 sm:w-[156px]'
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
