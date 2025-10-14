'use client'

import { useState } from 'react'
import { CheckoutFlow } from '@/components/forms/checkout-flow'
import { usePlans } from '@/hooks'
import type { PlansRow } from '@/types/models'

export function RedesignedPricing() {
  const { data: plans = [], isLoading } = usePlans()
  const [selectedPlan, setSelectedPlan] = useState<PlansRow | null>(null)
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>(
    'monthly',
  )
  const [addHosting, setAddHosting] = useState(false)

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <section
      id='pricing'
      className='w-full bg-black px-4 py-16 md:px-8 md:py-24 lg:px-12'
    >
      <div className='mx-auto flex w-full max-w-[1023px] flex-col items-center gap-16 md:gap-[70px]'>
        {/* Header */}
        <div className='flex flex-col items-center gap-5'>
          <h2 className='text-center text-[32px] font-medium leading-[40px] text-[#F7F6FF] md:text-[40px] md:leading-[50px]'>
            Our Pricing plan
          </h2>

          {/* Toggle Button */}
          <div className='flex items-center rounded-[30px] border border-[#3E3E3E] bg-[#161616] p-[0.777px]'>
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`flex h-[41.973px] items-center justify-center rounded-[30px] px-5 transition-all ${
                billingCycle === 'monthly'
                  ? 'border border-[#F7F6FF] bg-[#F7F6FF] text-black'
                  : 'border-transparent bg-transparent text-[#F7F6FF]'
              }`}
            >
              <span className='text-sm font-medium'>Monthly</span>
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`flex h-[41.973px] items-center justify-center rounded-[30px] px-6 transition-all ${
                billingCycle === 'yearly'
                  ? 'border border-[#F7F6FF] bg-[#F7F6FF] text-black'
                  : 'border-transparent bg-transparent text-[#F7F6FF]'
              }`}
            >
              <span className='text-sm font-medium'>Yearly</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className='relative w-full'>
          <div className='flex w-full flex-col items-center gap-4 md:flex-row md:items-start md:gap-[15px]'>
            {plans.map((plan) => (
              <div key={plan.id} className='relative w-full max-w-[331px]'>
                {plan.is_featured && (
                  <div className='absolute right-0 top-0 z-10 flex h-[33px] items-center justify-center gap-2.5 rounded-[20px_5px] bg-[#0094EA] px-2.5'>
                    <span className='text-lg font-medium leading-6 text-[#F7F6FF]'>
                      Popular
                    </span>
                  </div>
                )}
                <button
                  onClick={() => setSelectedPlan(plan)}
                  className='w-full text-left'
                >
                  <PricingCard
                    plan={plan}
                    billingCycle={billingCycle}
                    addHosting={addHosting}
                    setAddHosting={setAddHosting}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      {selectedPlan && (
        <CheckoutFlow
          plan={selectedPlan}
          onClose={() => setSelectedPlan(null)}
        />
      )}
    </section>
  )
}

function PricingCard({
  plan,
  billingCycle,
  addHosting,
  setAddHosting,
}: {
  plan: PlansRow
  billingCycle: 'monthly' | 'yearly'
  addHosting: boolean
  setAddHosting: (value: boolean) => void
}) {
  const price =
    (billingCycle === 'monthly' ? plan.monthly_price : plan.yearly_price) +
    (addHosting
      ? billingCycle === 'monthly'
        ? plan.hosting_monthly_price
        : plan.hosting_yearly_price
      : 0)
  const period = billingCycle === 'monthly' ? '/ Month' : '/ Year'

  return (
    <div
      className={`flex h-auto w-full flex-col overflow-hidden rounded-[20px] bg-[#161616] md:h-[771px] ${
        plan.is_featured ? 'border border-[#FF8C00]' : 'border-0'
      }`}
    >
      {/* Main Content */}
      <div className='flex flex-col gap-[30px] p-5'>
        {/* Header */}
        <div className='flex w-full max-w-[238px] flex-col gap-2'>
          <div className='flex items-center gap-2'>
            <svg
              width='24'
              height='25'
              viewBox='0 0 24 25'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <g clipPath='url(#clip0_2462_202)'>
                <mask
                  id='mask0_2462_202'
                  style={{ maskType: 'luminance' }}
                  maskUnits='userSpaceOnUse'
                  x='0'
                  y='0'
                  width='24'
                  height='25'
                >
                  <path d='M24 0.527344H0V24.5273H24V0.527344Z' fill='white' />
                </mask>
                <g mask='url(#mask0_2462_202)'>
                  <path
                    d='M17 12.5273C17 15.2887 14.7614 17.5274 12 17.5274C9.23859 17.5274 7 15.2887 7 12.5273C7 9.76591 9.23859 7.52734 12 7.52734C14.7614 7.52734 17 9.76591 17 12.5273Z'
                    fill='#F7F6FF'
                    stroke='#F7F6FF'
                  />
                  <path
                    d='M12 2.52734C11.6227 2.86067 11.0945 3.72734 12 4.52735M12 20.5273C12.3773 20.8606 12.9055 21.7273 12 22.5273M19.5 5.03006C18.9685 4.99717 17.9253 5.25028 18.0042 6.52582M5.49576 18.0273C5.52866 18.5589 5.27555 19.602 4.00001 19.5231M5.00271 5.02735C4.96979 5.55937 5.22315 6.60365 6.5 6.52463M18 18.03C18.5316 17.9988 19.5747 18.2382 19.4958 19.4442M22 12.5273C21.6667 12.1501 20.8 11.6218 20.0001 12.5273M4.00001 12.0274C3.66668 12.4046 2.80001 12.9328 2 12.0274'
                    stroke='#F7F6FF'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                  />
                </g>
              </g>
              <defs>
                <clipPath id='clip0_2462_202'>
                  <rect
                    width='24'
                    height='24'
                    fill='white'
                    transform='translate(0 0.527344)'
                  />
                </clipPath>
              </defs>
            </svg>
            <h3 className='text-xl font-medium leading-6 text-[#F7F6FF]'>
              {plan.name}
            </h3>
          </div>
          <p className='text-base font-light leading-6 text-white/50'>
            {plan.summary}
          </p>
        </div>

        {/* Price */}
        <div className='flex items-center gap-[5px]'>
          <span className='text-[45px] font-medium leading-6 text-[#F7F6FF]'>
            ${price}
          </span>
          <span className='text-[21px] font-normal leading-6 text-white/50'>
            {period}
          </span>
        </div>

        {/* Subscribe Button */}
        <button className='flex h-[54px] w-full items-center justify-center rounded-[30px] border-2 border-[#CA7207] bg-[#FF8C00] px-5 transition-transform hover:scale-105'>
          <span className='text-lg font-medium leading-6 text-[#F7F6FF]'>
            Subscribe
          </span>
        </button>

        {/* Features List */}
        <div className='flex flex-col gap-[15px]'>
          {plan.features.map((feature, index) => (
            <div key={index} className='flex items-center gap-[10px]'>
              <div className='relative h-6 w-6 flex-shrink-0'>
                <svg
                  width='24'
                  height='25'
                  viewBox='0 0 24 25'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  className='absolute left-0 top-0'
                >
                  <circle cx='12' cy='12.5273' r='12' fill='#2D2D2D' />
                </svg>
                <svg
                  width='20'
                  height='21'
                  viewBox='0 0 20 21'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  className='absolute left-0.5 top-0.5'
                >
                  <path
                    d='M4.16699 12.1941L7.08366 15.1108L15.8337 5.94409'
                    stroke='#F7F6FF'
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

      {/* Divider */}
      <div className='h-px w-full bg-white/10' />

      {/* Add Managed Hosting Section */}
      <div className='flex items-center gap-[10px] p-5'>
        <input
          type='checkbox'
          checked={addHosting}
          onChange={(e) => setAddHosting(e.target.checked)}
          className='h-6 w-6 flex-shrink-0 rounded-md border-2 border-[#2D2D2D] bg-transparent'
        />
        <div className='flex flex-col gap-[7px]'>
          <div className='flex items-center gap-[5px]'>
            <span className='text-base font-medium leading-6 text-[#F7F6FF]'>
              Add Managed Hosting
            </span>
            <svg
              width='17'
              height='18'
              viewBox='0 0 17 18'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M7.79199 12.5691H9.20866V8.31909H7.79199V12.5691ZM8.50033 6.90242C8.70102 6.90242 8.86937 6.83442 9.00537 6.69842C9.14137 6.56242 9.20913 6.39431 9.20866 6.19409C9.20819 5.99387 9.14019 5.82576 9.00466 5.68976C8.86913 5.55376 8.70102 5.48576 8.50033 5.48576C8.29963 5.48576 8.13152 5.55376 7.99599 5.68976C7.86046 5.82576 7.79246 5.99387 7.79199 6.19409C7.79152 6.39431 7.85952 6.56266 7.99599 6.69913C8.13246 6.83561 8.30058 6.90337 8.50033 6.90242ZM8.50033 16.1108C7.52046 16.1108 6.59963 15.9247 5.73783 15.5526C4.87602 15.1805 4.12637 14.6759 3.48887 14.0389C2.85137 13.4019 2.3468 12.6522 1.97516 11.7899C1.60352 10.9276 1.41747 10.0068 1.41699 9.02742C1.41652 8.04804 1.60258 7.1272 1.97516 6.26493C2.34774 5.40265 2.85231 4.65299 3.48887 4.01597C4.12542 3.37894 4.87508 2.87437 5.73783 2.50226C6.60058 2.13015 7.52141 1.94409 8.50033 1.94409C9.47924 1.94409 10.4001 2.13015 11.2628 2.50226C12.1256 2.87437 12.8752 3.37894 13.5118 4.01597C14.1483 4.65299 14.6531 5.40265 15.0262 6.26493C15.3993 7.1272 15.5851 8.04804 15.5837 9.02742C15.5822 10.0068 15.3962 10.9276 15.0255 11.7899C14.6548 12.6522 14.1502 13.4019 13.5118 14.0389C12.8733 14.6759 12.1237 15.1807 11.2628 15.5533C10.402 15.9259 9.48113 16.1117 8.50033 16.1108Z'
                fill='#8A8A8A'
              />
            </svg>
          </div>
          <span className='text-sm font-light leading-6 text-white/50'>
            Modern 3–5 page website, fast.
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className='h-px w-full bg-white/10' />

      {/* Customize Plan */}
      <div className='flex items-center justify-center gap-[10px] p-5'>
        <svg
          width='20'
          height='21'
          viewBox='0 0 20 21'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M4.16634 13.8608L3.33301 17.1941L6.66634 16.3608L16.3213 6.70575C16.6338 6.3932 16.8093 5.96936 16.8093 5.52742C16.8093 5.08548 16.6338 4.66163 16.3213 4.34908L16.178 4.20575C15.8655 3.8933 15.4416 3.71777 14.9997 3.71777C14.5577 3.71777 14.1339 3.8933 13.8213 4.20575L4.16634 13.8608Z'
            stroke='#FF8C00'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M4.16634 13.8607L3.33301 17.194L6.66634 16.3607L14.9997 8.02734L12.4997 5.52734L4.16634 13.8607Z'
            fill='#FF8C00'
          />
          <path
            d='M12.4997 5.52734L14.9997 8.02734M10.833 17.194H17.4997'
            stroke='#FF8C00'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
        <span className='text-lg leading-6 text-[#FF8C00]'>Customize plan</span>
      </div>
    </div>
  )
}
