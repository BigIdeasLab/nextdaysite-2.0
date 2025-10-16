import { LoginForm } from '@/components/forms/login-form'
import Image from 'next/image'

export default function LoginPage() {
  return (
    <div className='auth-page'>
      <div className='auth-container'>
        <div className='auth-logo'>
          <Image
            src='https://api.builder.io/api/v1/image/assets/TEMP/27cc49b97a9c74f01837ce911b65317dee61528b?width=338'
            alt='NextDaySite Logo'
            width={169}
            height={45}
            priority
          />
        </div>
        <LoginForm />
        <p className='auth-footer'>© 2025 NextDaySite. All rights reserved.</p>
      </div>
    </div>
  )
}
