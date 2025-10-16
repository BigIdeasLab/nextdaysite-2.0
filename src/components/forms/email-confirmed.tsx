'use client'

import { CheckCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function EmailConfirmed() {
  const router = useRouter()

  return (
    <div className="auth-card">
      <div className="auth-header text-center">
        <div className="success-icon">
          <CheckCircle className="w-12 h-12" />
        </div>
        <h1 className="auth-title">Email Confirmed!</h1>
        <p className="auth-subtitle">
          Your account has been successfully verified
        </p>
      </div>

      <div className="email-confirmed-content">
        <div className="confirmation-info">
          <p className="confirmation-text">
            You can now access all features of your NextDaySite account.
            Let's get started!
          </p>
        </div>

        <div className="form-actions">
          <button
            onClick={() => router.push('/dashboard')}
            className="primary-button"
          >
            Go to Dashboard
          </button>
          <p className="switch-auth">
            Need to sign in again?{' '}
            <a href="/login" className="auth-link">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
