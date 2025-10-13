'use client'

import { useState } from 'react'
import { useAuth } from '@/context/auth-context'

type SubmissionState = 'idle' | 'submitting' | 'success' | 'error'

export function SignupForm() {
  const { client } = useAuth()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [submissionState, setSubmissionState] =
    useState<SubmissionState>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmissionState('submitting')
    setErrorMessage(null)
    setSuccessMessage(null)

    if (password !== passwordConfirmation) {
      setSubmissionState('error')
      setErrorMessage('Passwords do not match')
      return
    }

    if (!client) {
      setSubmissionState('error')
      setErrorMessage(
        'Supabase is not configured. Please refresh and try again.',
      )
      return
    }

    try {
      const { error } = await client.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: 'customer',
          },
        },
      })

      if (error) {
        throw error
      }

      setSubmissionState('success')
      setSuccessMessage('Please check your email to confirm your account.')
    } catch (error) {
      console.error(error)
      setSubmissionState('error')
      setErrorMessage(
        error instanceof Error ? error.message : 'Could not create account.',
      )
    }
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
      <section className='flex flex-col gap-4 rounded-2xl border border-foreground/10 bg-background p-6 shadow-sm shadow-foreground/5'>
        <div className='grid gap-4'>
          <label className='flex flex-col gap-2 text-sm text-foreground/70'>
            Full Name
            <input
              type='text'
              className='rounded-xl border border-foreground/15 bg-background px-3 py-2 text-sm text-foreground outline-none transition focus:border-foreground'
              placeholder='Jane Doe'
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              required
            />
          </label>
          <label className='flex flex-col gap-2 text-sm text-foreground/70'>
            Email
            <input
              type='email'
              className='rounded-xl border border-foreground/15 bg-background px-3 py-2 text-sm text-foreground outline-none transition focus:border-foreground'
              placeholder='you@company.com'
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>
          <label className='flex flex-col gap-2 text-sm text-foreground/70'>
            Password
            <input
              type='password'
              className='rounded-xl border border-foreground/15 bg-background px-3 py-2 text-sm text-foreground outline-none transition focus:border-foreground'
              placeholder='••••••••'
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>
          <label className='flex flex-col gap-2 text-sm text-foreground/70'>
            Confirm Password
            <input
              type='password'
              className='rounded-xl border border-foreground/15 bg-background px-3 py-2 text-sm text-foreground outline-none transition focus:border-foreground'
              placeholder='••••••••'
              value={passwordConfirmation}
              onChange={(event) => setPasswordConfirmation(event.target.value)}
              required
            />
          </label>
        </div>
        {errorMessage ? (
          <p className='text-sm font-medium text-rose-500'>{errorMessage}</p>
        ) : null}
        {successMessage ? (
          <p className='text-sm font-medium text-emerald-500'>
            {successMessage}
          </p>
        ) : null}
        <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
          <p className='text-xs text-foreground/50'>
            Already have an account?{' '}
            <a href='/login' className='underline'>
              Login
            </a>
          </p>
          <button
            type='submit'
            disabled={
              submissionState === 'submitting' || submissionState === 'success'
            }
            className='inline-flex items-center justify-center rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-60'
          >
            {submissionState === 'submitting'
              ? 'Creating account...'
              : 'Sign up'}
          </button>
        </div>
      </section>
    </form>
  )
}
