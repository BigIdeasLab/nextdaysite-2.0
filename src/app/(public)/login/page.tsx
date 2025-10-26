import { LoginForm } from '@/components/forms/login-form'
import Image from 'next/image'

export default function LoginPage() {
  return (
    <div className='min-h-screen bg-background transition-colors duration-300 flex items-center justify-center py-8 px-4 font-sans'>
      <div className='w-full max-w-2xl flex flex-col items-center gap-8'>
        <div className='flex justify-center mb-4'>
          <Image
            src='https://api.builder.io/api/v1/image/assets/TEMP/27cc49b97a9c74f01837ce911b65317dee61528b?width=338'
            alt='NextDaySite Logo'
            width={169}
            height={45}
            priority
          />
        </div>
        <LoginForm />
        <p className='text-[var(--text-secondary)] text-center text-xs font-normal leading-6'>
          © 2025 NextDaySite. All rights reserved.
        </p>
      </div>
    </div>
  )
}
