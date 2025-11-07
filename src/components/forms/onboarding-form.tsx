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
      router.push('/')
    } catch (error) {
      console.error(error)
      setSubmissionState('error')
      setErrorMessage(
        error instanceof Error ? error.message : 'Could not submit form.',
      )
    }
  }

  if (isAuthLoading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <svg
          className='animate-spin h-8 w-8 text-gray-600'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
        >
          <circle
            className='opacity-25'
            cx='12'
            cy='12'
            r='10'
            stroke='currentColor'
            strokeWidth='4'
          ></circle>
          <path
            className='opacity-75'
            fill='currentColor'
            d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
          ></path>
        </svg>
      </div>
    )
  }

  return (
    <div className='w-full max-w-[482px] flex flex-col items-center justify-center gap-[72px]'>
      <h1 className='text-foreground text-center text-[40px] md:text-[60px] font-medium leading-[1.08] capitalize max-w-[752px]'>
        Tell us about your project we&apos;ll turn them into a clear action
        plan.
      </h1>

      <form
        onSubmit={handleSubmit}
        className='flex flex-col items-center justify-center gap-[50px] w-full'
      >
        <div className='flex flex-col gap-10 w-full'>
          <div className='flex flex-col justify-center items-start gap-0 w-full relative h-[65px]'>
            <input
              type='text'
              className='bg-transparent border-none text-[#9BA1A6] text-lg font-normal leading-6 outline-none w-full font-sans focus:text-foreground placeholder:text-[#9BA1A6]'
              placeholder='Project Title '
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              required
            />
            <div className='absolute bottom-0 left-0 w-full h-[1px] bg-[#9BA1A6]' />
          </div>

          <div className='flex flex-col justify-center items-start gap-0 w-full relative h-[65px]'>
            <input
              type='text'
              className='bg-transparent border-none text-[#9BA1A6] text-lg font-normal leading-6 outline-none w-full font-sans focus:text-foreground placeholder:text-[#9BA1A6]'
              placeholder="What's your main goal for this project? "
              value={mainGoal}
              onChange={(e) => setMainGoal(e.target.value)}
              required
            />
            <div className='absolute bottom-0 left-0 w-full h-[1px] bg-[#9BA1A6]' />
          </div>

          <div className='flex flex-col justify-center items-start gap-0 w-full relative h-[65px]'>
            <input
              type='text'
              className='bg-transparent border-none text-[#9BA1A6] text-lg font-normal leading-6 outline-none w-full font-sans focus:text-foreground placeholder:text-[#9BA1A6]'
              placeholder="Who's it for? (optional)"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
            />
            <div className='absolute bottom-0 left-0 w-full h-[1px] bg-[#9BA1A6]' />
          </div>

          <div className='flex flex-col justify-center items-start gap-0 w-full relative h-[65px]'>
            <input
              type='text'
              className='bg-transparent border-none text-[#9BA1A6] text-lg font-normal leading-6 outline-none w-full font-sans focus:text-foreground placeholder:text-[#9BA1A6]'
              placeholder='Key features or ideas you want included'
              value={keyFeatures}
              onChange={(e) => setKeyFeatures(e.target.value)}
              required
            />
            <div className='absolute bottom-0 left-0 w-full h-[1px] bg-[#9BA1A6]' />
          </div>

          <div className='flex flex-col justify-center items-start gap-0 w-full relative h-[65px]'>
            <input
              type='text'
              className='bg-transparent border-none text-[#9BA1A6] text-lg font-normal leading-6 outline-none w-full font-sans focus:text-foreground placeholder:text-[#9BA1A6]'
              placeholder='reference websites or inspiration?'
              value={referenceWebsites}
              onChange={(e) => setReferenceWebsites(e.target.value)}
            />
            <div className='absolute bottom-0 left-0 w-full h-[1px] bg-[#9BA1A6]' />
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
          className='flex h-[54px] px-[26px] justify-center items-center rounded-[30px] border border-[#FF8C00] bg-[#FF8C00] text-[#F7F6FF] text-center text-[23px] font-medium leading-6 cursor-pointer transition-opacity duration-200 font-sans hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed'
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
