import { EmailSent } from '@/components/forms/email-sent'
import Image from 'next/image'

export default function EmailSentPage() {
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
        <EmailSent />
        <p className='auth-footer'>© 2025 NextDaySite. All rights reserved.</p>
      </div>
    </div>
  )
}
