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
import {
  CalendarDays,
  CheckCircle2,
  Clock,
  AlertCircle,
  Pause,
  XCircle,
  Zap,
} from 'lucide-react'
import { format, differenceInDays } from 'date-fns'
import { Database } from '@/types/database'

type ProjectStatus = Database['public']['Enums']['project_status']

const statusConfig = {
  active: {
    label: 'Active',
    color: 'bg-blue-100 text-blue-800',
    icon: Zap,
    lightBg: 'bg-blue-50',
  },
  in_progress: {
    label: 'In Progress',
    color: 'bg-amber-100 text-amber-800',
    icon: Clock,
    lightBg: 'bg-amber-50',
  },
  completed: {
    label: 'Completed',
    color: 'bg-green-100 text-green-800',
    icon: CheckCircle2,
    lightBg: 'bg-green-50',
  },
  review: {
    label: 'In Review',
    color: 'bg-purple-100 text-purple-800',
    icon: AlertCircle,
    lightBg: 'bg-purple-50',
  },
  paused: {
    label: 'Paused',
    color: 'bg-gray-100 text-gray-800',
    icon: Pause,
    lightBg: 'bg-gray-50',
  },
  cancelled: {
    label: 'Cancelled',
    color: 'bg-red-100 text-red-800',
    icon: XCircle,
    lightBg: 'bg-red-50',
  },
  inactive: {
    label: 'Inactive',
    color: 'bg-slate-100 text-slate-800',
    icon: AlertCircle,
    lightBg: 'bg-slate-50',
  },
}

export function AdminProjectDetail({ projectId }: { projectId: string }) {
  const queryClient = useQueryClient()
  const { data: projects, isLoading } = useProjects()

  const project = projects?.find((p) => p.id === projectId)

  const [startDate, setStartDate] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [isDatePickerOpen, setDatePickerOpen] = useState(false)
  const [datePickerMode, setDatePickerMode] = useState<'start' | 'due'>('start')

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
      setDatePickerOpen(false)
    },
  })

  if (isLoading) {
    return (
      <div className='flex items-center justify-center py-12'>
        <div className='text-gray-500'>Loading project details...</div>
      </div>
    )
  }

  if (!project) {
    return notFound()
  }

  const statusConfig_ = statusConfig[project.status as ProjectStatus]
  const StatusIcon = statusConfig_.icon

  const handleDateChange = () => {
    updateDatesMutation.mutate({
      startDate: startDate === '' ? null : startDate,
      dueDate: dueDate === '' ? null : dueDate,
    })
  }

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return

    if (datePickerMode === 'start') {
      setStartDate(date.toISOString().split('T')[0])
    } else {
      setDueDate(date.toISOString().split('T')[0])
    }
  }

  const getDateRangeInfo = () => {
    if (!startDate || !dueDate) return null
    const days = differenceInDays(new Date(dueDate), new Date(startDate))
    return days > 0 ? `${days} days` : 'Due date is before start date'
  }

  return (
    <div className='space-y-8'>
      {/* Header Section */}
      <div className='rounded-lg border border-gray-200 bg-white p-6 shadow-sm'>
        <div className='flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center'>
          <div className='flex-1'>
            <h1 className='text-3xl font-bold text-gray-900'>{project.title}</h1>
            <p className='mt-2 text-sm text-gray-500'>
              Project ID: {projectId}
            </p>
          </div>
          <div className='flex items-center gap-3'>
            <div
              className={`flex items-center gap-2 rounded-full px-4 py-2 ${statusConfig_.color}`}
            >
              <StatusIcon className='h-4 w-4' />
              <span className='text-sm font-semibold'>
                {statusConfig_.label}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
        {/* Left Column - Project Details and Timeline */}
        <div className='space-y-8 lg:col-span-2'>
          {/* Project Details Card */}
          <Card className='border-gray-200'>
            <CardHeader className='border-b border-gray-200 bg-gray-50'>
              <CardTitle className='text-lg text-gray-900'>
                Project Details
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-6 pt-6'>
              {/* Status Selector */}
              <div className='space-y-3'>
                <label className='block text-sm font-semibold text-gray-700'>
                  Project Status
                </label>
                <Select
                  value={project.status}
                  onValueChange={(value) =>
                    updateStatusMutation.mutate(value as ProjectStatus)
                  }
                >
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='Select status' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='active'>Active</SelectItem>
                    <SelectItem value='in_progress'>In Progress</SelectItem>
                    <SelectItem value='review'>In Review</SelectItem>
                    <SelectItem value='completed'>Completed</SelectItem>
                    <SelectItem value='paused'>Paused</SelectItem>
                    <SelectItem value='cancelled'>Cancelled</SelectItem>
                    <SelectItem value='inactive'>Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Dates Section */}
              <div className='space-y-3'>
                <h3 className='text-sm font-semibold text-gray-700'>Timeline</h3>
                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                  <div className='rounded-lg border border-gray-200 p-4'>
                    <p className='text-xs font-medium uppercase tracking-wider text-gray-500'>
                      Start Date
                    </p>
                    <Button
                      variant='ghost'
                      onClick={() => {
                        setDatePickerMode('start')
                        setDatePickerOpen(true)
                      }}
                      className='mt-2 flex h-auto flex-col items-start justify-start p-0 text-left'
                    >
                      <div className='flex items-center gap-2'>
                        <CalendarDays className='h-5 w-5 text-blue-500' />
                        <span className='text-lg font-semibold text-gray-900'>
                          {startDate ? (
                            format(new Date(startDate), 'MMM dd, yyyy')
                          ) : (
                            <span className='text-sm text-gray-400'>
                              Not set
                            </span>
                          )}
                        </span>
                      </div>
                    </Button>
                  </div>

                  <div className='rounded-lg border border-gray-200 p-4'>
                    <p className='text-xs font-medium uppercase tracking-wider text-gray-500'>
                      Due Date
                    </p>
                    <Button
                      variant='ghost'
                      onClick={() => {
                        setDatePickerMode('due')
                        setDatePickerOpen(true)
                      }}
                      className='mt-2 flex h-auto flex-col items-start justify-start p-0 text-left'
                    >
                      <div className='flex items-center gap-2'>
                        <CalendarDays className='h-5 w-5 text-green-500' />
                        <span className='text-lg font-semibold text-gray-900'>
                          {dueDate ? (
                            format(new Date(dueDate), 'MMM dd, yyyy')
                          ) : (
                            <span className='text-sm text-gray-400'>
                              Not set
                            </span>
                          )}
                        </span>
                      </div>
                    </Button>
                  </div>
                </div>

                {getDateRangeInfo() && (
                  <div className='rounded-lg bg-blue-50 p-3 text-sm text-blue-700'>
                    📅 Duration: {getDateRangeInfo()}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Timeline Section */}
          <Card className='border-gray-200'>
            <CardHeader className='border-b border-gray-200 bg-gray-50'>
              <CardTitle className='text-lg text-gray-900'>Timeline</CardTitle>
            </CardHeader>
            <CardContent className='pt-6'>
              <ManageTimeline projectId={project.id} />
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Deliverables */}
        <div className='space-y-8'>
          <Card className='border-gray-200'>
            <CardHeader className='border-b border-gray-200 bg-gray-50'>
              <CardTitle className='text-lg text-gray-900'>
                Deliverables
              </CardTitle>
            </CardHeader>
            <CardContent className='pt-6'>
              <ManageDeliverables projectId={project.id} />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Calendar Modal */}
      <Dialog open={isDatePickerOpen} onOpenChange={setDatePickerOpen}>
        <DialogContent className='sm:max-w-md'>
          <DialogHeader>
            <DialogTitle>
              {datePickerMode === 'start' ? 'Select Start Date' : 'Select Due Date'}
            </DialogTitle>
            <DialogDescription>
              {datePickerMode === 'start'
                ? 'Choose when the project should start.'
                : 'Choose when the project is due.'}
            </DialogDescription>
          </DialogHeader>
          <div className='flex justify-center py-4'>
            <Calendar
              mode='single'
              selected={
                datePickerMode === 'start'
                  ? startDate
                    ? new Date(startDate)
                    : undefined
                  : dueDate
                    ? new Date(dueDate)
                    : undefined
              }
              onSelect={handleDateSelect}
              disabled={(date) => date > new Date()}
            />
          </div>
          <DialogFooter className='flex gap-3'>
            <Button
              variant='outline'
              onClick={() => setDatePickerOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                handleDateChange()
              }}
              disabled={updateDatesMutation.isPending}
            >
              {updateDatesMutation.isPending ? 'Saving...' : 'Save Date'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
