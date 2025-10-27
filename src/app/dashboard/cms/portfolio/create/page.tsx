'use client'

import { PortfolioItemForm } from '@/components/forms/portfolio-item-form'
import { useRouter } from 'next/navigation'

export default function CreatePortfolioPage() {
  const router = useRouter()

  const handleSubmit = (data: any) => {
    router.push('/dashboard/cms/portfolio')
  }

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold text-foreground'>Create Portfolio Item</h1>
        <p className='text-gray-600 dark:text-gray-400 mt-1'>
          Add a new featured work to your portfolio
        </p>
      </div>

      <PortfolioItemForm onSubmit={handleSubmit} />
    </div>
  )
}
