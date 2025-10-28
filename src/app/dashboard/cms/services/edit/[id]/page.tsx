'use client'

import { useParams } from 'next/navigation'
import { useService } from '@/hooks/use-cms-content'
import { ServiceForm } from '@/components/forms/service-form'

export default function EditServicePage() {
  const params = useParams()
  const id = (Array.isArray(params.id) ? params.id[0] : params.id) ?? null

  const { data: service, isLoading, error } = useService(id)

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!service) return <div>Service not found.</div>

  return (
    <div className='container mx-auto py-10'>
      <ServiceForm item={service} />
    </div>
  )
}
