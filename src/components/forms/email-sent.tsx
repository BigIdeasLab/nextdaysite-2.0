'use client'

import { Mail } from 'lucide-react'

export function EmailSent() {
  return (
    <div className='w-full bg-[var(--dark-card)] border border-[var(--dark-section)] rounded-3xl p-8'>
      <div className='flex flex-col gap-3 mb-6 text-center'>
        <div className='flex justify-center mb-4 text-[var(--orange-primary)]'>
          <Mail className='w-12 h-12' />
        </div>
        <h1 className='text-[var(--foreground)] text-2xl font-bold leading-tight'>
          Check Your Email
        </h1>
        <p className='text-foreground/70 text-base font-normal leading-5'>
          We&apos;ve sent you a magic link to sign in to your account
        </p>
      </div>

      <div className='flex flex-col gap-8 mt-6'>
        <div className='bg-[var(--dark-section)] rounded-xl p-6'>
          <p className='text-white/70 text-sm leading-relaxed text-center'>
            Click the link in the email we sent you to complete your sign up.
            The link will expire in 24 hours.
          </p>
        </div>

        <div className='flex flex-col items-center gap-4'>
          <p className='text-[var(--text-secondary)] text-sm text-center'>
            Didn&apos;t receive the email?{' '}
            <button className='text-[var(--orange-primary)] no-underline' type='button'>
              Resend
            </button>
          </p>
          <a href='/login' className='text-[#9ba1a6] text-sm no-underline'>
            Back to Login
          </a>
        </div>
      </div>
    </div>
  )
}
