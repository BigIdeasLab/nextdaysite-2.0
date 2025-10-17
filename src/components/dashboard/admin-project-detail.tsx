'use client'

import { useProjects } from '@/hooks'
import { notFound } from 'next/navigation'
import { ManageTimeline } from '@/components/dashboard/manage-timeline'
import { ManageDeliverables } from '@/components/dashboard/manage-deliverables'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateProjectStatus, updateProjectDates } from '@/lib/api/data-service'
import { useState, useEffect } from 'react'

export function AdminProjectDetail({ projectId }: { projectId: string }) {
  const queryClient = useQueryClient()
  const { data: projects, isLoading } = useProjects()

  const project = projects?.find((p) => p.id === projectId)

  const [startDate, setStartDate] = useState('')
  const [dueDate, setDueDate] = useState('')

  useEffect(() => {
    if (project) {
      setStartDate(project.start_date || '')
      setDueDate(project.due_date || '')
    }
  }, [project])

  const updateStatusMutation = useMutation({
    mutationFn: (status: string) => updateProjectStatus(projectId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
    },
  })

  const updateDatesMutation = useMutation({
    mutationFn: ({
      startDate,
      dueDate,
    }: {
      startDate: string
      dueDate: string
    }) => updateProjectDates(projectId, startDate, dueDate),
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

  const handleDateChange = () => {
    updateDatesMutation.mutate({ startDate, dueDate })
  }

  return (
    <div className='flex flex-col gap-8'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>{project.title}</h1>
        <div className='flex items-center gap-4'>
          <span className='text-gray-500'>Start Date:</span>
          <input
            type='date'
            value={
              startDate ? new Date(startDate).toISOString().split('T')[0] : ''
            }
            onChange={(e) => setStartDate(e.target.value)}
            onBlur={handleDateChange}
            className='px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
          />
          <span className='text-gray-500'>Due Date:</span>
          <input
            type='date'
            value={dueDate ? new Date(dueDate).toISOString().split('T')[0] : ''}
            onChange={(e) => setDueDate(e.target.value)}
            onBlur={handleDateChange}
            className='px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
          />
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
