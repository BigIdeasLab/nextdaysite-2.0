'use client'

import Image from 'next/image'
import Link from 'next/link'
import { OnboardingChat } from '@/components/chatbot/onboarding-chat'

export function RedesignedHero() {
  return (
    <section className='relative flex min-h-[700px] w-full flex-col items-center gap-9 px-3 py-16 md:min-h-[1200px] md:gap-[80px] md:px-12 lg:px-52'>
      <div className='flex w-full max-w-[684px] flex-col items-center gap-[30px] md:gap-[50px]'>
        <div className='flex w-full flex-col items-center gap-5'>
          <Image
            src='https://api.builder.io/api/v1/image/assets/TEMP/917c003a5d68e225a7b88d8842418e3bf0ce2705?width=1368'
            alt='Own a Stunning Website Without Lifting a Finger'
            width={684}
            height={200}
            className='h-auto w-full'
          />
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

      <div className='h-[500px] w-full max-w-5xl overflow-y-auto rounded-[30px] bg-[#1A1A1A] md:h-[642px] flex flex-col'>
        <OnboardingChat />
      </div>
    </section>
  )
}
