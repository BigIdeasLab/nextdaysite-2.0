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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CalendarDays } from 'lucide-react'
import { format } from 'date-fns'

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
    <div className='space-y-8'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold'>{project.title}</h1>
      </div>

      <div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
        <div className='lg:col-span-2'>
          <Card>
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                <div>
                  <label
                    htmlFor='start-date'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Start Date
                  </label>
                  <Button
                    variant={'outline'}
                    onClick={() => setDatePickerOpen(true)}
                    className='mt-1 w-full justify-start text-left font-normal'
                  >
                    <CalendarDays className='mr-2 h-4 w-4' />
                    {startDate ? (
                      format(new Date(startDate), 'PPP')
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </div>
                <div>
                  <label
                    htmlFor='due-date'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Due Date
                  </label>
                  <Button
                    variant={'outline'}
                    onClick={() => setDatePickerOpen(true)}
                    className='mt-1 w-full justify-start text-left font-normal'
                  >
                    <CalendarDays className='mr-2 h-4 w-4' />
                    {dueDate ? (
                      format(new Date(dueDate), 'PPP')
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </div>
              </div>
              <div>
                <label
                  htmlFor='status'
                  className='block text-sm font-medium text-gray-700'
                >
                  Status
                </label>
                <Select
                  value={project.status}
                  onValueChange={(value) =>
                    updateStatusMutation.mutate(value as ProjectStatus)
                  }
                >
                  <SelectTrigger className='mt-1 w-full'>
                    <SelectValue placeholder='Select status' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='start'>Start</SelectItem>
                    <SelectItem value='in_progress'>In Progress</SelectItem>
                    <SelectItem value='review'>Review</SelectItem>
                    <SelectItem value='ready_to_ship'>Ready to Ship</SelectItem>
                    <SelectItem value='shipped'>Shipped</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className='space-y-8'>
          <Card>
            <CardHeader>
              <CardTitle>Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <ManageTimeline projectId={project.id} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Deliverables</CardTitle>
            </CardHeader>
            <CardContent>
              <ManageDeliverables projectId={project.id} />
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={isDatePickerOpen} onOpenChange={setDatePickerOpen}>
        <DialogContent className='sm:max-w-md'>
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
              numberOfMonths={1}
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
    </div>
  )
}
