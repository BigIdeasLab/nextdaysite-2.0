'use client'

import { useState } from 'react'
import { useAuth } from '@/context/auth-context'
import { Eye, EyeOff } from 'lucide-react'

type SubmissionState = 'idle' | 'submitting' | 'success' | 'error'

export function SignupForm() {
  const { client } = useAuth()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [submissionState, setSubmissionState] =
    useState<SubmissionState>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // Password validation states
  const hasMinLength = password.length >= 8
  const hasUpperAndLower = /[a-z]/.test(password) && /[A-Z]/.test(password)
  const hasNumber = /\d/.test(password)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmissionState('submitting')
    setErrorMessage(null)

    if (password !== confirmPassword) {
      setSubmissionState('error')
      setErrorMessage('Passwords do not match')
      return
    }

    if (!hasMinLength || !hasUpperAndLower || !hasNumber) {
      setSubmissionState('error')
      setErrorMessage('Password does not meet requirements')
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
            company_name: companyName || null,
            role: 'customer',
          },
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      })

      if (error) {
        throw error
      }

      setSubmissionState('success')
      window.location.href = '/email-sent'
    } catch (error) {
      console.error(error)
      setSubmissionState('error')
      setErrorMessage(
        error instanceof Error ? error.message : 'Could not create account.',
      )
    }
  }

  return (
    <div className='auth-card'>
      <div className='auth-header'>
        <h1 className='auth-title'>Create Your Account</h1>
        <p className='auth-subtitle'>Get started with NextDaySite in seconds</p>
      </div>

      <form onSubmit={handleSubmit} className='auth-form'>
        <div className='form-fields'>
          <div className='form-field'>
            <label className='field-label field-required'>Full Name</label>
            <div className='field-input-wrapper'>
              <input
                type='text'
                className='field-input'
                placeholder='youexample.com'
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
              <div className='field-underline' />
            </div>
          </div>

          <div className='form-field'>
            <label className='field-label field-required'>Email Address</label>
            <div className='field-input-wrapper'>
              <input
                type='email'
                className='field-input'
                placeholder='youexample.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className='field-underline' />
            </div>
          </div>

          <div className='form-field'>
            <label className='field-label'>
              Company Name <span className='optional-text'>(Optional)</span>
            </label>
            <div className='field-input-wrapper'>
              <input
                type='text'
                className='field-input'
                placeholder='youexample.com'
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
              <div className='field-underline' />
            </div>
          </div>

          <div className='password-row'>
            <div className='form-field'>
              <label className='field-label field-required'>Password</label>
              <div className='field-input-wrapper'>
                <div className='password-field'>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className='field-input'
                    placeholder='Enter your password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='password-toggle'
                    aria-label={
                      showPassword ? 'Hide password' : 'Show password'
                    }
                  >
                    {showPassword ? (
                      <EyeOff className='w-[18px] h-[18px]' />
                    ) : (
                      <Eye className='w-[18px] h-[18px]' />
                    )}
                  </button>
                </div>
                <div className='field-underline' />
              </div>
            </div>

            <div className='form-field'>
              <label className='field-label field-required'>
                Confirm Password
              </label>
              <div className='field-input-wrapper'>
                <div className='password-field'>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    className='field-input'
                    placeholder='Confirm password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <button
                    type='button'
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className='password-toggle'
                    aria-label={
                      showConfirmPassword ? 'Hide password' : 'Show password'
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff className='w-[18px] h-[18px]' />
                    ) : (
                      <Eye className='w-[18px] h-[18px]' />
                    )}
                  </button>
                </div>
                <div className='field-underline' />
              </div>
            </div>
          </div>

          <div className='password-requirements'>
            <p className='requirements-title'>Password must contain:</p>
            <ul className='requirements-list'>
              <li
                className={
                  hasMinLength ? 'requirement-met' : 'requirement-unmet'
                }
              >
                <span className='requirement-dot' />
                At least 8 characters
              </li>
              <li
                className={
                  hasUpperAndLower ? 'requirement-met' : 'requirement-unmet'
                }
              >
                <span className='requirement-dot' />
                One uppercase and one lowercase letter
              </li>
              <li
                className={hasNumber ? 'requirement-met' : 'requirement-unmet'}
              >
                <span className='requirement-dot' />
                At least one number
              </li>
            </ul>
          </div>
        </div>

        {errorMessage && <p className='error-message'>{errorMessage}</p>}

        <div className='form-actions'>
          <button
            type='submit'
            disabled={
              submissionState === 'submitting' || submissionState === 'success'
            }
            className='primary-button'
          >
            {submissionState === 'submitting'
              ? 'Creating account...'
              : 'Create Account'}
          </button>
          <p className='switch-auth'>
            Already have an account?{' '}
            <a href='/login' className='auth-link'>
              Log in
            </a>
          </p>
        </div>
      </form>
    </div>
  )
}
