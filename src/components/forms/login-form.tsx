'use client'

import { useState } from 'react'
import { useAuth } from '@/context/auth-context'
import { Eye, EyeOff } from 'lucide-react'

type SubmissionState = 'idle' | 'submitting' | 'success' | 'error'

export function LoginForm() {
  const { client } = useAuth()
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
      window.location.href = '/dashboard'
    } catch (error) {
      console.error(error)
      setSubmissionState('error')
      setErrorMessage(
        error instanceof Error ? error.message : 'Invalid email or password.',
      )
    }
  }

  return (
    <div className="auth-card">
      <div className="auth-header">
        <h1 className="auth-title">Welcome Back</h1>
        <p className="auth-subtitle">Sign in to access your customer portal</p>
      </div>

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-fields">
          <div className="form-field">
            <label className="field-label">Email</label>
            <div className="field-input-wrapper">
              <input
                type="email"
                className="field-input"
                placeholder="youexample.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className="field-underline" />
            </div>
          </div>

          <div className="form-field">
            <label className="field-label">Password</label>
            <div className="field-input-wrapper">
              <div className="password-field">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="field-input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="w-[18px] h-[18px]" />
                  ) : (
                    <Eye className="w-[18px] h-[18px]" />
                  )}
                </button>
              </div>
              <div className="field-underline" />
            </div>
          </div>
        </div>

        {errorMessage && (
          <p className="error-message">{errorMessage}</p>
        )}

        <div className="form-options">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="checkbox-input"
            />
            <span className="checkbox-text">Remember me</span>
          </label>
          <a href="/forgot-password" className="forgot-link">
            Forgot Password?
          </a>
        </div>

        <div className="form-actions">
          <button
            type="submit"
            disabled={
              submissionState === 'submitting' || submissionState === 'success'
            }
            className="primary-button"
          >
            {submissionState === 'submitting' ? 'Signing in...' : 'Sign In'}
          </button>
          <p className="switch-auth">
            Don't have an account?{' '}
            <a href="/signup" className="auth-link">
              Sign Up
            </a>
          </p>
        </div>
      </form>
    </div>
  )
}
