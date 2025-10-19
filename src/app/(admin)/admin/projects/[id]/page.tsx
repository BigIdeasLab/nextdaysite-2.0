'use client'

import { AdminProjectDetail } from '@/components/dashboard/admin-project-detail'
import { useParams } from 'next/navigation'

export default function AdminProjectDetailPage() {
  const params = useParams()
  const id = Array.isArray(params.id) ? params.id[0] : params.id

  if (!id) {
    return <div>Loading...</div>
  }

  return (
    <div className='flex flex-col gap-8'>
      <AdminProjectDetail projectId={id} />
    </div>
  )
}
