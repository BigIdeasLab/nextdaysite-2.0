'use client'

import { CheckCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function EmailConfirmed() {
  const router = useRouter()

  return (
    <div className='w-full bg-[var(--dark-card)] border border-[var(--dark-section)] rounded-3xl p-8'>
      <div className='flex flex-col gap-3 mb-6 text-center'>
        <div className='flex justify-center mb-4 text-[var(--orange-primary)]'>
          <CheckCircle className='w-12 h-12' />
        </div>
        <h1 className='text-[var(--foreground)] text-2xl font-bold leading-tight'>
          Email Confirmed!
        </h1>
        <p className='text-white/70 text-base font-normal leading-5'>
          Your account has been successfully verified
        </p>
      </div>

      <div className='flex flex-col gap-8 mt-6'>
        <div className='bg-[var(--dark-section)] rounded-xl p-6'>
          <p className='text-white/70 text-sm leading-relaxed text-center'>
            You can now access all features of your NextDaySite account.
            Let&apos;s get started!
          </p>
        </div>

        <div className='flex flex-col items-center gap-4'>
          <button
            onClick={() => router.push('/dashboard')}
            className='w-full h-10 flex justify-center items-center rounded-full border border-[var(--orange-primary)] bg-[var(--orange-primary)] text-[var(--foreground)] text-center text-sm font-medium leading-6 cursor-pointer transition-opacity duration-200'
          >
            Go to Dashboard
          </button>
          <p className='text-[#9ba1a6] text-center text-sm font-normal leading-6'>
            Need to sign in again?{' '}
            <a href='/login' className='text-[#ff8c00] no-underline'>
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
