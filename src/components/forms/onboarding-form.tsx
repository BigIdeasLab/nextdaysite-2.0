'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/auth-context'

type SubmissionState = 'idle' | 'submitting' | 'success' | 'error'

export function OnboardingForm({ project_slug }: { project_slug: string }) {
  const router = useRouter()
  const { session, loading: isAuthLoading } = useAuth()
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
    <div className='onboarding-form-container'>
      <h1 className='onboarding-form-title'>
        Tell us about your project we&apos;ll turn them into a clear action
        plan.
      </h1>

      <form onSubmit={handleSubmit} className='onboarding-form'>
        <div className='onboarding-form-fields'>
          <div className='onboarding-form-field'>
            <input
              type='text'
              className='onboarding-input'
              placeholder='Project Title'
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              required
            />
            <div className='onboarding-input-underline' />
          </div>

          <div className='onboarding-form-field'>
            <input
              type='text'
              className='onboarding-input'
              placeholder="What's your main goal for this project?"
              value={mainGoal}
              onChange={(e) => setMainGoal(e.target.value)}
              required
            />
            <div className='onboarding-input-underline' />
          </div>

          <div className='onboarding-form-field'>
            <input
              type='text'
              className='onboarding-input'
              placeholder="Who's it for? (optional)"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
            />
            <div className='onboarding-input-underline' />
          </div>

          <div className='onboarding-form-field'>
            <input
              type='text'
              className='onboarding-input'
              placeholder='Key features or ideas you want included'
              value={keyFeatures}
              onChange={(e) => setKeyFeatures(e.target.value)}
              required
            />
            <div className='onboarding-input-underline' />
          </div>

          <div className='onboarding-form-field'>
            <input
              type='text'
              className='onboarding-input'
              placeholder='reference websites or inspiration?'
              value={referenceWebsites}
              onChange={(e) => setReferenceWebsites(e.target.value)}
            />
            <div className='onboarding-input-underline' />
          </div>
        </div>

        {errorMessage && (
          <p className='onboarding-error-message'>{errorMessage}</p>
        )}

        <button
          type='submit'
          disabled={
            isAuthLoading ||
            submissionState === 'submitting' ||
            submissionState === 'success'
          }
          className='onboarding-submit-button'
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
