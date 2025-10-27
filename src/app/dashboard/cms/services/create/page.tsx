'use client'

import { ServiceForm } from '@/components/forms/service-form'
import { useRouter } from 'next/navigation'

export default function CreateServicePage() {
  const router = useRouter()

  const handleSubmit = (data: any) => {
    router.push('/dashboard/cms/services')
  }

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold text-foreground'>Create Service</h1>
        <p className='text-gray-600 dark:text-gray-400 mt-1'>
          Add a new service to your offerings
        </p>
      </div>

      <ServiceForm onSubmit={handleSubmit} />
    </div>
  )
}
