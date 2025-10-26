'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type SubmissionState = 'idle' | 'submitting' | 'success' | 'error'

export function OnboardingForm() {
  const router = useRouter()
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

    try {
      console.log({
        projectTitle,
        mainGoal,
        targetAudience,
        keyFeatures,
        referenceWebsites,
      })

      setSubmissionState('success')
      router.push('/dashboard')
    } catch (error) {
      console.error(error)
      setSubmissionState('error')
      setErrorMessage(
        error instanceof Error ? error.message : 'Could not submit form.',
      )
    }
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
            submissionState === 'submitting' || submissionState === 'success'
          }
          className='onboarding-submit-button'
        >
          {submissionState === 'submitting' ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  )
}
