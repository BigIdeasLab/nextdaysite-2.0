'use client'

import { useParams } from 'next/navigation'
import { useTestimonial } from '@/hooks/use-cms-content'
import { TestimonialForm } from '@/components/forms/testimonial-form'

export default function EditTestimonialPage() {
  const params = useParams()
  const id = (Array.isArray(params.id) ? params.id[0] : params.id) ?? null

  if (!id) {
    return <div>Testimonial not found.</div>
  }

  const { data: item, isLoading, error } = useTestimonial(id)

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!item) return <div>Item not found.</div>

  return (
    <div className='container mx-auto py-10'>
      <TestimonialForm item={item} />
    </div>
  )
}
