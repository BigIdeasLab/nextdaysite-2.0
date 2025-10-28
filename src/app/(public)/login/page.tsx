import { LoginForm } from '@/components/forms/login-form'

export default function LoginPage() {
  return (
    <div className='flex items-center justify-center min-h-screen'>
      <div className='w-full max-w-md'>
        <LoginForm />
      </div>
    </div>
  )
}
