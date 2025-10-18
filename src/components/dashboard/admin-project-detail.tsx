'use client'

import { useProjects } from '@/hooks'
import { notFound } from 'next/navigation'
import { ManageTimeline } from '@/components/dashboard/manage-timeline'
import { ManageDeliverables } from '@/components/dashboard/manage-deliverables'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateProjectStatus, updateProjectDates } from '@/lib/api/data-service'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Calendar } from '@/components/ui/calendar'

type ProjectStatus =
  | 'start'
  | 'in_progress'
  | 'review'
  | 'ready_to_ship'
  | 'shipped'

export function AdminProjectDetail({ projectId }: { projectId: string }) {
  const queryClient = useQueryClient()
  const { data: projects, isLoading } = useProjects()

  const project = projects?.find((p) => p.id === projectId)

  const [startDate, setStartDate] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [isDatePickerOpen, setDatePickerOpen] = useState(false)

  useEffect(() => {
    if (project) {
      setStartDate(project.start_date || '')
      setDueDate(project.due_date || '')
    }
  }, [project])

  const updateStatusMutation = useMutation({
    mutationFn: (status: ProjectStatus) =>
      updateProjectStatus(projectId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
    },
  })

  const updateDatesMutation = useMutation({
    mutationFn: ({
      startDate,
      dueDate,
    }: {
      startDate: string | null
      dueDate: string | null
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
    updateDatesMutation.mutate({
      startDate: startDate === '' ? null : startDate,
      dueDate: dueDate === '' ? null : dueDate,
    })
  }

  return (
    <div className='flex flex-col gap-8'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>{project.title}</h1>
        <div className='flex items-center gap-4'>
          <span className='text-gray-500'>Start Date:</span>
          <Button
            variant={'outline'}
            onClick={() => setDatePickerOpen(true)}
            className='w-[280px] justify-start text-left font-normal'
          >
            {startDate ? (
              new Date(startDate).toLocaleDateString()
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
          <span className='text-gray-500'>Due Date:</span>
          <Button
            variant={'outline'}
            onClick={() => setDatePickerOpen(true)}
            className='w-[280px] justify-start text-left font-normal'
          >
            {dueDate ? (
              new Date(dueDate).toLocaleDateString()
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
          <Dialog open={isDatePickerOpen} onOpenChange={setDatePickerOpen}>
            <DialogContent className='sm:max-w-[425px]'>
              <DialogHeader>
                <DialogTitle>Select Dates</DialogTitle>
                <DialogDescription>
                  Select a start and due date for the project.
                </DialogDescription>
              </DialogHeader>
              <div className='grid gap-4 py-4'>
                <Calendar
                  mode='range'
                  selected={{
                    from: startDate ? new Date(startDate) : undefined,
                    to: dueDate ? new Date(dueDate) : undefined,
                  }}
                  onSelect={(range) => {
                    if (range?.from) {
                      setStartDate(range.from.toISOString().split('T')[0])
                    }
                    if (range?.to) {
                      setDueDate(range.to.toISOString().split('T')[0])
                    }
                  }}
                  numberOfMonths={2}
                />
              </div>
              <DialogFooter>
                <Button
                  onClick={() => {
                    handleDateChange()
                    setDatePickerOpen(false)
                  }}
                >
                  Save changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <span className='text-gray-500'>Status:</span>
          <select
            value={project.status}
            onChange={(e) =>
              updateStatusMutation.mutate(e.target.value as ProjectStatus)
            }
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
