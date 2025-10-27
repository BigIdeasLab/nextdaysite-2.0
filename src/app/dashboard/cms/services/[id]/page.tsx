'use client'

import { ServiceForm } from '@/components/forms/service-form'
import { useService } from '@/hooks/use-cms-content'
import { useRouter } from 'next/navigation'
import { use } from 'react'

export default function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const router = useRouter()
  const { id } = use(params)
  const { data: item, isLoading } = useService(id)

  const handleSubmit = (data: any) => {
    router.push('/dashboard/cms/services')
  }

  if (isLoading) {
    return (
      <div className='flex items-center justify-center py-12'>
        <div className='text-gray-600 dark:text-gray-400'>Loading...</div>
      </div>
    )
  }

  if (!item) {
    return (
      <div className='text-center py-12'>
        <p className='text-red-600 dark:text-red-400'>Service not found</p>
      </div>
    )
  }

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold text-foreground'>Edit Service</h1>
        <p className='text-gray-600 dark:text-gray-400 mt-1'>
          Update "{item.title}"
        </p>
      </div>

      <ServiceForm item={item} onSubmit={handleSubmit} />
    </div>
  )
}
