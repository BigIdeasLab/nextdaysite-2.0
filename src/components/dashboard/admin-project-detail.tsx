'use client'

import { useProjects } from '@/hooks'
import { notFound } from 'next/navigation'
import { ManageTimeline } from '@/components/dashboard/manage-timeline'
import { ManageDeliverables } from '@/components/dashboard/manage-deliverables'

export function AdminProjectDetail({ projectId }: { projectId: string }) {
  const { data: projects, isLoading } = useProjects()

  if (isLoading) {
    return <div>Loading project details...</div>
  }

  const project = projects?.find((p) => p.id === projectId)

  if (!project) {
    return notFound()
  }

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
      <div className='border rounded-lg p-4'>
        <ManageTimeline projectId={project.id} />
      </div>
      <div className='border rounded-lg p-4'>
        <ManageDeliverables projectId={project.id} />
      </div>
    </div>
  )
}
