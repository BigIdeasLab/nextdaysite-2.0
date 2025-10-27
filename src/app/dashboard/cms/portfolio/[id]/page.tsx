'use client'

import { PortfolioItemForm } from '@/components/forms/portfolio-item-form'
import { usePortfolioItem } from '@/hooks/use-cms-content'
import { useRouter } from 'next/navigation'

export default function EditPortfolioPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const router = useRouter()
  const { id } = require('next').use(params)
  const { data: item, isLoading } = usePortfolioItem(id)

  const handleSubmit = (data: any) => {
    router.push('/dashboard/cms/portfolio')
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
        <p className='text-red-600 dark:text-red-400'>Item not found</p>
      </div>
    )
  }

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold text-foreground'>Edit Portfolio Item</h1>
        <p className='text-gray-600 dark:text-gray-400 mt-1'>
          Update "{item.title}"
        </p>
      </div>

      <PortfolioItemForm item={item} onSubmit={handleSubmit} />
    </div>
  )
}
