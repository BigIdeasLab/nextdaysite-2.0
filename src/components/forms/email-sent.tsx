'use client'

import { Mail } from 'lucide-react'

export function EmailSent() {
  return (
    <div className='w-full bg-[#1a1a1a] border border-[#343333] rounded-3xl p-8'>
      <div className='flex flex-col gap-3 mb-6 text-center'>
        <div className='flex justify-center mb-4 text-[#ff8c00]'>
          <Mail className='w-12 h-12' />
        </div>
        <h1 className='text-[#f7f6ff] text-2xl font-bold leading-tight'>
          Check Your Email
        </h1>
        <p className='text-white/70 text-base font-normal leading-5'>
          We&apos;ve sent you a magic link to sign in to your account
        </p>
      </div>

      <div className='flex flex-col gap-8 mt-6'>
        <div className='bg-[#252625] rounded-xl p-6'>
          <p className='text-white/70 text-sm leading-relaxed text-center'>
            Click the link in the email we sent you to complete your sign up.
            The link will expire in 24 hours.
          </p>
        </div>

        <div className='flex flex-col items-center gap-4'>
          <p className='text-[#9ba1a6] text-sm text-center'>
            Didn&apos;t receive the email?{' '}
            <button className='text-[#ff8c00] no-underline' type='button'>
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
