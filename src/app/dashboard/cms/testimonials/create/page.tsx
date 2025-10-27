'use client'

import { TestimonialForm } from '@/components/forms/testimonial-form'
import { useRouter } from 'next/navigation'

export default function CreateTestimonialPage() {
  const router = useRouter()

  const handleSubmit = (data: any) => {
    router.push('/dashboard/cms/testimonials')
  }

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold text-foreground'>
          Create Testimonial
        </h1>
        <p className='text-gray-600 dark:text-gray-400 mt-1'>
          Add a new customer testimonial
        </p>
      </div>

      <TestimonialForm onSubmit={handleSubmit} />
    </div>
  )
}
