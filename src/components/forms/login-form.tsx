'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/auth-context'
import { Eye, EyeOff } from 'lucide-react'

type SubmissionState = 'idle' | 'submitting' | 'success' | 'error'

export function LoginForm() {
  const { client } = useAuth()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [submissionState, setSubmissionState] =
    useState<SubmissionState>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmissionState('submitting')
    setErrorMessage(null)

    if (!client) {
      setSubmissionState('error')
      setErrorMessage(
        'Supabase is not configured. Please refresh and try again.',
      )
      return
    }

    try {
      const { error } = await client.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        throw error
      }

      setSubmissionState('success')
      router.refresh()
      router.push('/dashboard')
    } catch (error) {
      console.error(error)
      setSubmissionState('error')
      setErrorMessage(
        error instanceof Error ? error.message : 'Invalid email or password.',
      )
    }
  }

  return (
    <div className='w-full bg-[#1a1a1a] border border-[#343333] rounded-3xl p-8'>
      <div className='flex flex-col gap-3 mb-6'>
        <h1 className='text-[#f7f6ff] text-2xl font-bold leading-tight'>
          Welcome Back
        </h1>
        <p className='text-white/70 text-base font-normal leading-5'>
          Sign in to access your customer portal
        </p>
      </div>

      <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
        <div className='flex flex-col gap-6'>
          <div className='flex flex-col gap-5'>
            <label className='text-white text-base font-normal leading-6'>
              Email
            </label>
            <div className='flex flex-col gap-2.5'>
              <input
                type='email'
                className='bg-transparent border-none text-[#9ba1a6] text-sm font-normal leading-6 p-0.5 outline-none w-full focus:text-white placeholder:text-[#9ba1a6]'
                placeholder='youexample.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className='w-full h-px bg-white/50' />
            </div>
          </div>

          <div className='flex flex-col gap-5'>
            <label className='text-white text-base font-normal leading-6'>
              Password
            </label>
            <div className='flex flex-col gap-2.5'>
              <div className='flex items-center justify-between gap-2.5 p-0.5'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className='bg-transparent border-none text-[#9ba1a6] text-sm font-normal leading-6 p-0.5 outline-none w-full focus:text-white placeholder:text-[#9ba1a6]'
                  placeholder='Enter your password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='bg-none border-none text-[#9ba1a6] cursor-pointer p-0 flex items-center justify-center flex-shrink-0 hover:text-white'
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className='w-[18px] h-[18px]' />
                  ) : (
                    <Eye className='w-[18px] h-[18px]' />
                  )}
                </button>
              </div>
              <div className='w-full h-px bg-white/50' />
            </div>
          </div>
        </div>

        {errorMessage && (
          <p className='text-[#ef4444] text-sm font-medium text-center'>
            {errorMessage}
          </p>
        )}

        <div className='flex items-center justify-between gap-4'>
          <label className='flex items-center gap-2.5 cursor-pointer'>
            <input
              type='checkbox'
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className='w-4 h-4 rounded border border-[#ff8c00] bg-transparent cursor-pointer appearance-none checked:bg-[#ff8c00] checked:relative checked:after:content-["✓"] checked:after:absolute checked:after:text-white checked:after:text-xs checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2'
            />
            <span className='text-[#9ba1a6] text-sm font-normal leading-6'>
              Remember me
            </span>
          </label>
          <a
            href='/forgot-password'
            className='text-[#ff8c00] text-right text-sm font-normal leading-6 no-underline hover:underline'
          >
            Forgot Password?
          </a>
        </div>

        <div className='flex flex-col items-center gap-4'>
          <button
            type='submit'
            disabled={
              submissionState === 'submitting' || submissionState === 'success'
            }
            className='w-full h-10 flex justify-center items-center rounded-full border border-[#ff8c00] bg-[#ff8c00] text-[#f7f6ff] text-center text-sm font-medium leading-6 cursor-pointer transition-opacity duration-200 disabled:opacity-60 disabled:cursor-not-allowed'
          >
            {submissionState === 'submitting' ? 'Signing in...' : 'Sign In'}
          </button>
          <p className='text-[#9ba1a6] text-center text-sm font-normal leading-6'>
            Don&apos;t have an account?{' '}
            <a
              href='/signup'
              className='text-[#ff8c00] no-underline hover:underline'
            >
              Sign Up
            </a>
          </p>
        </div>
      </form>
    </div>
  )
}
