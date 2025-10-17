'use client'

import { useProjects } from '@/hooks'
import { notFound } from 'next/navigation'
import { ManageTimeline } from '@/components/dashboard/manage-timeline'
import { ManageDeliverables } from '@/components/dashboard/manage-deliverables'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateProjectStatus } from '@/lib/api/data-service'

export function AdminProjectDetail({ projectId }: { projectId: string }) {
  const queryClient = useQueryClient()
  const { data: projects, isLoading } = useProjects()

  const project = projects?.find((p) => p.id === projectId)

  const updateStatusMutation = useMutation({
    mutationFn: (status: string) => updateProjectStatus(projectId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
    },
  })

  if (isLoading) {
    return <div>Loading project details...</div>
  }

  if (!project) {
    return notFound()
  }

  return (
    <div className='flex flex-col gap-8'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>{project.title}</h1>
        <div className='flex items-center gap-4'>
          <span className='text-gray-500'>Status:</span>
          <select
            value={project.status}
            onChange={(e) => updateStatusMutation.mutate(e.target.value)}
            className='px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
          >
            <option value='start'>Start</option>
            <option value='in_progress'>In Progress</option>
            <option value='review'>Review</option>
            <option value='ready_to_ship'>Ready to Ship</option>
            <option value='shipped'>Shipped</option>
          </select>
        </div>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        <div className='border rounded-lg p-4'>
          <ManageTimeline projectId={project.id} />
        </div>
        <div className='border rounded-lg p-4'>
          <ManageDeliverables projectId={project.id} />
        </div>
      </div>
    </div>
  )
}
