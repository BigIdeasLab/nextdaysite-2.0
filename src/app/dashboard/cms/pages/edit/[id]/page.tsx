'use client'

import { useParams } from 'next/navigation'
import { usePage } from '@/hooks/use-cms-content'
import { PageForm } from '@/components/forms/page-form'

export default function EditPagePage() {
  const { id } = useParams()
  const { data: page, isLoading, error } = usePage(id as string)

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading page.</div>

  return (
    <div className='container mx-auto py-10'>
      <h1 className='text-2xl font-bold mb-4'>Edit Page</h1>
      <PageForm initialData={page} />
    </div>
  )
}
