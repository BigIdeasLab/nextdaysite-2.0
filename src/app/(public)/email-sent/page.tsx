import { EmailSent } from '@/components/forms/email-sent'
import Image from 'next/image'

export default function EmailSentPage() {
  return (
    <div className='min-h-screen bg-black flex items-center justify-center py-8 px-4 font-sans'>
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
        <EmailSent />
        <p className='text-[#9ba1a6] text-center text-xs font-normal leading-6'>
          © 2025 NextDaySite. All rights reserved.
        </p>
      </div>
    </div>
  )
}
