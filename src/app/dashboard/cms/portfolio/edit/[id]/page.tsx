'use client'

import { useParams } from 'next/navigation'
import { usePortfolioItem } from '@/hooks/use-cms-content'
import { PortfolioItemForm } from '@/components/forms/portfolio-item-form'

export default function EditPortfolioItemPage() {
  const params = useParams()
  const id = (Array.isArray(params.id) ? params.id[0] : params.id) ?? null

  const { data: item, isLoading, error } = usePortfolioItem(id)

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!item) return <div>Item not found.</div>

  return (
    <div className='container mx-auto py-10'>
      <PortfolioItemForm item={item} />
    </div>
  )
}
