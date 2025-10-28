'use client'

import { PageForm } from '@/components/forms/page-form'

export default function NewPagePage() {
  return (
    <div className='container mx-auto py-10'>
      <h1 className='text-2xl font-bold mb-4'>Add New Page</h1>
      <PageForm />
    </div>
  )
}
