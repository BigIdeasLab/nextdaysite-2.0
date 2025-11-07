'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/auth-context'

type SubmissionState = 'idle' | 'submitting' | 'success' | 'error'

export function OnboardingForm({ project_slug }: { project_slug: string }) {
  const router = useRouter()
  const { session, loading: isAuthLoading, client } = useAuth()
  const [projectTitle, setProjectTitle] = useState('')
  const [mainGoal, setMainGoal] = useState('')
  const [targetAudience, setTargetAudience] = useState('')
  const [keyFeatures, setKeyFeatures] = useState('')
  const [referenceWebsites, setReferenceWebsites] = useState('')
  const [submissionState, setSubmissionState] =
    useState<SubmissionState>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmissionState('submitting')
    setErrorMessage(null)

    if (!session) {
      setSubmissionState('error')
      setErrorMessage(
        'Authentication error. Please make sure you are logged in.',
      )
      return
    }

    try {
      const response = await fetch(`/api/projects/${project_slug}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          project_title: projectTitle,
          main_goal: mainGoal,
          target_audience: targetAudience,
          key_features: keyFeatures,
          reference_websites: referenceWebsites,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to submit project details')
      }

      setSubmissionState('success')
      if (client) {
        await client.auth.signOut()
      }
      router.push('/') // Or a success page
    } catch (error) {
      console.error(error)
      setSubmissionState('error')
      setErrorMessage(
        error instanceof Error ? error.message : 'Could not submit form.',
      )
    }
  }

  if (isAuthLoading) {
    return <p>Verifying your session...</p>
  }

  return (
    <div className='w-full max-w-lg flex flex-col gap-12'>
      <h1 className='text-foreground text-center text-3xl md:text-5xl lg:text-6xl font-medium leading-tight capitalize'>
        Tell us about your project we&apos;ll turn them into a clear action
        plan.
      </h1>

      <form
        onSubmit={handleSubmit}
        className='flex flex-col items-center gap-12'
      >
        <div className='flex flex-col gap-10 w-full'>
          <div className='flex flex-col gap-0 w-full relative'>
            <input
              type='text'
              className='bg-transparent border-none text-text-secondary text-base md:text-lg font-normal leading-6 pb-3 outline-none w-full font-sans focus:text-foreground placeholder:text-text-secondary'
              placeholder='Project Title'
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              required
            />
            <div className='w-full h-px bg-white/50' />
          </div>

          <div className='flex flex-col gap-0 w-full relative'>
            <input
              type='text'
              className='bg-transparent border-none text-text-secondary text-base md:text-lg font-normal leading-6 pb-3 outline-none w-full font-sans focus:text-foreground placeholder:text-text-secondary'
              placeholder="What's your main goal for this project?"
              value={mainGoal}
              onChange={(e) => setMainGoal(e.target.value)}
              required
            />
            <div className='w-full h-px bg-white/50' />
          </div>

          <div className='flex flex-col gap-0 w-full relative'>
            <input
              type='text'
              className='bg-transparent border-none text-text-secondary text-base md:text-lg font-normal leading-6 pb-3 outline-none w-full font-sans focus:text-foreground placeholder:text-text-secondary'
              placeholder="Who's it for? (optional)"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
            />
            <div className='w-full h-px bg-white/50' />
          </div>

          <div className='flex flex-col gap-0 w-full relative'>
            <input
              type='text'
              className='bg-transparent border-none text-text-secondary text-base md:text-lg font-normal leading-6 pb-3 outline-none w-full font-sans focus:text-foreground placeholder:text-text-secondary'
              placeholder='Key features or ideas you want included'
              value={keyFeatures}
              onChange={(e) => setKeyFeatures(e.target.value)}
              required
            />
            <div className='w-full h-px bg-white/50' />
          </div>

          <div className='flex flex-col gap-0 w-full relative'>
            <input
              type='text'
              className='bg-transparent border-none text-text-secondary text-base md:text-lg font-normal leading-6 pb-3 outline-none w-full font-sans focus:text-foreground placeholder:text-text-secondary'
              placeholder='reference websites or inspiration?'
              value={referenceWebsites}
              onChange={(e) => setReferenceWebsites(e.target.value)}
            />
            <div className='w-full h-px bg-white/50' />
          </div>
        </div>

        {errorMessage && (
          <p className='text-error-color text-sm font-medium text-center'>
            {errorMessage}
          </p>
        )}

        <button
          type='submit'
          disabled={
            isAuthLoading ||
            submissionState === 'submitting' ||
            submissionState === 'success'
          }
          className='flex h-14 px-6 justify-center items-center rounded-full border border-orange-primary bg-orange-primary text-light-text text-center text-2xl font-medium leading-6 cursor-pointer transition-opacity duration-200 font-sans hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed'
        >
          {isAuthLoading
            ? 'Verifying...'
            : submissionState === 'submitting'
              ? 'Submitting...'
              : 'Submit'}
        </button>
      </form>
    </div>
  )
}
