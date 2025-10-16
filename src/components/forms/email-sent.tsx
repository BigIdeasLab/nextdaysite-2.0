'use client'

import { Mail } from 'lucide-react'

export function EmailSent() {
  return (
    <div className="auth-card">
      <div className="auth-header text-center">
        <div className="email-icon">
          <Mail className="w-12 h-12" />
        </div>
        <h1 className="auth-title">Check Your Email</h1>
        <p className="auth-subtitle">
          We've sent you a magic link to sign in to your account
        </p>
      </div>

      <div className="email-sent-content">
        <div className="email-info">
          <p className="email-instruction">
            Click the link in the email we sent you to complete your sign up.
            The link will expire in 24 hours.
          </p>
        </div>

        <div className="email-actions">
          <p className="email-resend-text">
            Didn't receive the email?{' '}
            <button className="auth-link" type="button">
              Resend
            </button>
          </p>
          <a href="/login" className="back-to-login">
            Back to Login
          </a>
        </div>
      </div>
    </div>
  )
}
