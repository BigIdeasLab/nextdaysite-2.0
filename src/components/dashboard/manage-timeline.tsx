'use client'

import { useState } from 'react'
import { useTimelinePhases } from '@/hooks/use-timeline-phases'
import {
  addTimelinePhase,
  updateTimelinePhase,
  deleteTimelinePhase,
} from '@/lib/api/data-service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { ProjectTimelinePhasesRow } from '@/types/models'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  Trash2,
  Edit2,
  Plus,
  CalendarDays,
} from 'lucide-react'
import { format } from 'date-fns'
import { CustomCalendar } from './custom-calendar'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Matcher } from 'react-day-picker'

type TimelineStatus = 'pending' | 'in_progress' | 'completed'

const statusColors = {
  pending: {
    icon: AlertCircle,
    color: 'text-gray-500 dark:text-gray-400',
    bg: 'bg-gray-100 dark:bg-gray-800',
    badge: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
  },
  in_progress: {
    icon: Clock,
    color: 'text-amber-500 dark:text-amber-400',
    bg: 'bg-amber-100 dark:bg-amber-900',
    badge: 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-200',
  },
  completed: {
    icon: CheckCircle2,
    color: 'text-green-500 dark:text-green-400',
    bg: 'bg-green-100 dark:bg-green-900',
    badge: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200',
  },
}

export function ManageTimeline({
  projectId,
  projectStartDate,
  projectDueDate,
}: {
  projectId: string
  projectStartDate: string
  projectDueDate: string
}) {
  const queryClient = useQueryClient()
  const { data: timelinePhases = [], isLoading } = useTimelinePhases(projectId)
  const [isAddModalOpen, setAddModalOpen] = useState(false)
  const [isEditModalOpen, setEditModalOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [status, setStatus] = useState<TimelineStatus>('pending')
  const [selectedPhase, setSelectedPhase] =
    useState<ProjectTimelinePhasesRow | null>(null)
  const [datePickerFor, setDatePickerFor] = useState<
    'startDate' | 'endDate' | null
  >(null)

  const areProjectDatesSet = projectStartDate && projectDueDate

  const addMutation = useMutation({
    mutationFn: () =>
      addTimelinePhase({
        project_id: projectId,
        title,
        start_date: startDate,
        end_date: endDate,
        status: 'pending',
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['timelinePhases', projectId] })
      setAddModalOpen(false)
      setTitle('')
      setStartDate('')
      setEndDate('')
    },
  })

  const updateMutation = useMutation({
    mutationFn: () =>
      updateTimelinePhase(selectedPhase!.id, {
        title,
        start_date: startDate,
        end_date: endDate,
        status: status as TimelineStatus,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['timelinePhases', projectId] })
      setEditModalOpen(false)
      setTitle('')
      setStartDate('')
      setEndDate('')
      setStatus('pending')
      setSelectedPhase(null)
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (phaseId: string) => deleteTimelinePhase(phaseId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['timelinePhases', projectId] })
    },
  })

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    addMutation.mutate()
  }

  const handleUpdateSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    updateMutation.mutate()
  }

  const handleEditClick = (phase: ProjectTimelinePhasesRow) => {
    setSelectedPhase(phase)
    setTitle(phase.title)
    setStartDate(phase.start_date || '')
    setEndDate(phase.end_date || '')
    if (phase.status) {
      setStatus(phase.status as TimelineStatus)
    }
    setEditModalOpen(true)
  }

  const handleResetForm = () => {
    setTitle('')
    setStartDate('')
    setEndDate('')
    setStatus('pending')
    setSelectedPhase(null)
  }

  const handleDateSelect = (date: Date | undefined) => {
    if (!date || !datePickerFor) return

    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    const newDate = `${year}-${month}-${day}`

    if (datePickerFor === 'startDate') {
      setStartDate(newDate)
    } else {
      setEndDate(newDate)
    }
    setDatePickerFor(null)
  }

  if (isLoading) {
    return (
      <div className='flex items-center justify-center py-8'>
        <div className='text-sm text-gray-500 dark:text-gray-400'>
          Loading timeline...
        </div>
      </div>
    )
  }

  const getDisabledDays = (): Matcher[] => {
    const matchers: Matcher[] = []
    if (datePickerFor === 'startDate') {
      if (projectStartDate) {
        matchers.push({ before: new Date(projectStartDate) })
      }
      if (projectDueDate) {
        matchers.push({ after: new Date(projectDueDate) })
      }
    } else if (datePickerFor === 'endDate') {
      if (startDate) {
        matchers.push({ before: new Date(startDate) })
      } else if (projectStartDate) {
        matchers.push({ before: new Date(projectStartDate) })
      }
      if (projectDueDate) {
        matchers.push({ after: new Date(projectDueDate) })
      }
    }
    return matchers
  }

  return (
    <div className='space-y-4'>
      {/* Add Phase Button */}
      <Dialog open={isAddModalOpen} onOpenChange={setAddModalOpen}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className='w-full'>
                <Button
                  className='w-full gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600'
                  disabled={!areProjectDatesSet}
                  onClick={() => areProjectDatesSet && setAddModalOpen(true)}
                >
                  <Plus className='h-4 w-4' />
                  Add Phase
                </Button>
              </div>
            </TooltipTrigger>
            {!areProjectDatesSet && (
              <TooltipContent>
                <p>Please set project start and due dates first.</p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
        <DialogContent className='sm:max-w-md'>
          <DialogHeader>
            <DialogTitle>Add New Phase</DialogTitle>
            <DialogDescription>
              Create a new timeline phase for this project.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddSubmit} className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='title'>Phase Title</Label>
              <Input
                id='title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='e.g., Research & Discovery'
                autoFocus
              />
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <Label>Start Date</Label>
                <Button
                  type='button'
                  variant='outline'
                  className='w-full justify-start text-left font-normal'
                  onClick={() => setDatePickerFor('startDate')}
                >
                  <CalendarDays className='mr-2 h-4 w-4' />
                  {startDate ? (
                    format(new Date(startDate), 'MMM dd, yyyy')
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </div>
              <div className='space-y-2'>
                <Label>End Date</Label>
                <Button
                  type='button'
                  variant='outline'
                  className='w-full justify-start text-left font-normal'
                  onClick={() => setDatePickerFor('endDate')}
                >
                  <CalendarDays className='mr-2 h-4 w-4' />
                  {endDate ? (
                    format(new Date(endDate), 'MMM dd, yyyy')
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </div>
            </div>
            <DialogFooter className='flex gap-3'>
              <Button
                type='button'
                variant='outline'
                onClick={() => {
                  setAddModalOpen(false)
                  handleResetForm()
                }}
              >
                Cancel
              </Button>
              <Button type='submit' disabled={addMutation.isPending}>
                {addMutation.isPending ? 'Adding...' : 'Add Phase'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Timeline List */}
      {timelinePhases.length === 0 ? (
        <div className='rounded-lg border border-dashed border-gray-300 bg-gray-50 p-8 text-center dark:border-gray-600 dark:bg-gray-900'>
          <p className='text-sm text-gray-500 dark:text-gray-400'>
            No phases added yet. Create your first timeline phase.
          </p>
        </div>
      ) : (
        <div className='space-y-3'>
          {timelinePhases.map((phase) => {
            const statusConfig_ = statusColors[phase.status as TimelineStatus]
            const StatusIcon = statusConfig_.icon
            return (
              <div
                key={phase.id}
                className='flex items-start gap-4 rounded-lg border border-gray-200 bg-white p-4 transition-all hover:border-gray-300 hover:shadow-sm dark:border-gray-700 dark:bg-slate-950 dark:hover:border-gray-600'
              >
                <div className={`rounded-full p-2 ${statusConfig_.bg}`}>
                  <StatusIcon className={`h-4 w-4 ${statusConfig_.color}`} />
                </div>
                <div className='flex-1 min-w-0'>
                  <div className='flex items-start justify-between gap-2'>
                    <div className='flex-1'>
                      <h4 className='font-semibold text-gray-900 dark:text-gray-50'>
                        {phase.title}
                      </h4>
                      <div className='mt-1 flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400'>
                        {phase.start_date && (
                          <span>
                            Start:{' '}
                            {format(new Date(phase.start_date), 'MMM dd, yyyy')}
                          </span>
                        )}
                        {phase.end_date && (
                          <span>
                            End:{' '}
                            {format(new Date(phase.end_date), 'MMM dd, yyyy')}
                          </span>
                        )}
                      </div>
                    </div>
                    <div
                      className={`rounded-full px-3 py-1 text-xs font-medium ${statusConfig_.badge}`}
                    >
                      {phase.status}
                    </div>
                  </div>
                </div>
                <div className='flex items-center gap-2'>
                  <Dialog
                    open={isEditModalOpen && selectedPhase?.id === phase.id}
                    onOpenChange={setEditModalOpen}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => handleEditClick(phase)}
                        className='text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
                      >
                        <Edit2 className='h-4 w-4' />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className='sm:max-w-md'>
                      <DialogHeader>
                        <DialogTitle>Edit Phase</DialogTitle>
                        <DialogDescription>
                          Update the details for this timeline phase.
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleUpdateSubmit} className='space-y-4'>
                        <div className='space-y-2'>
                          <Label htmlFor='edit-title'>Phase Title</Label>
                          <Input
                            id='edit-title'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder='e.g., Research & Discovery'
                          />
                        </div>
                        <div className='grid grid-cols-2 gap-4'>
                          <div className='space-y-2'>
                            <Label>Start Date</Label>
                            <Button
                              type='button'
                              variant='outline'
                              className='w-full justify-start text-left font-normal'
                              onClick={() => setDatePickerFor('startDate')}
                            >
                              <CalendarDays className='mr-2 h-4 w-4' />
                              {startDate ? (
                                format(new Date(startDate), 'MMM dd, yyyy')
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </div>
                          <div className='space-y-2'>
                            <Label>End Date</Label>
                            <Button
                              type='button'
                              variant='outline'
                              className='w-full justify-start text-left font-normal'
                              onClick={() => setDatePickerFor('endDate')}
                            >
                              <CalendarDays className='mr-2 h-4 w-4' />
                              {endDate ? (
                                format(new Date(endDate), 'MMM dd, yyyy')
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </div>
                        </div>
                        <div className='space-y-2'>
                          <Label htmlFor='edit-status'>Status</Label>
                          <Select
                            value={status}
                            onValueChange={(value) =>
                              setStatus(value as TimelineStatus)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder='Select status' />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value='pending'>Pending</SelectItem>
                              <SelectItem value='in_progress'>
                                In Progress
                              </SelectItem>
                              <SelectItem value='completed'>
                                Completed
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <DialogFooter className='flex gap-3'>
                          <Button
                            type='button'
                            variant='outline'
                            onClick={() => {
                              setEditModalOpen(false)
                              handleResetForm()
                            }}
                          >
                            Cancel
                          </Button>
                          <Button
                            type='submit'
                            disabled={updateMutation.isPending}
                          >
                            {updateMutation.isPending
                              ? 'Updating...'
                              : 'Update'}
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => deleteMutation.mutate(phase.id)}
                    disabled={deleteMutation.isPending}
                    className='text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-900 dark:hover:text-red-300'
                  >
                    <Trash2 className='h-4 w-4' />
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Calendar Modal */}
      <Dialog
        open={datePickerFor !== null}
        onOpenChange={(isOpen) => !isOpen && setDatePickerFor(null)}
      >
        <DialogContent className='sm:max-w-md'>
          <DialogHeader>
            <DialogTitle>
              {datePickerFor === 'startDate'
                ? 'Select Start Date'
                : 'Select End Date'}
            </DialogTitle>
          </DialogHeader>
          <div className='flex justify-center py-4'>
            <CustomCalendar
              mode='single'
              selected={
                datePickerFor === 'startDate'
                  ? startDate
                    ? new Date(startDate)
                    : undefined
                  : endDate
                    ? new Date(endDate)
                    : undefined
              }
              onSelect={handleDateSelect}
              disabled={getDisabledDays()}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
