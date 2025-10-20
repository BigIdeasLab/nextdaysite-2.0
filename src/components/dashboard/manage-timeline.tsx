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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

type TimelineStatus = 'pending' | 'in_progress' | 'completed'

export function ManageTimeline({ projectId }: { projectId: string }) {
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
    addMutation.mutate()
  }

  const handleUpdateSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateMutation.mutate()
  }

  const handleEditClick = (phase: ProjectTimelinePhasesRow) => {
    setSelectedPhase(phase)
    setTitle(phase.title)
    setStartDate(phase.start_date || '')
    setEndDate(phase.end_date || '')
    if (phase.status) {
      setStatus(phase.status)
    }
    setEditModalOpen(true)
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <h2 className='text-xl font-semibold'>Timeline</h2>
        <Dialog open={isAddModalOpen} onOpenChange={setAddModalOpen}>
          <DialogTrigger asChild>
            <Button>Add Phase</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Phase</DialogTitle>
              <DialogDescription>
                Fill in the details for the new timeline phase.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddSubmit} className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='title'>Title</Label>
                <Input
                  id='title'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder='Phase title'
                />
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <Label htmlFor='startDate'>Start Date</Label>
                  <Input
                    id='startDate'
                    type='date'
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='endDate'>End Date</Label>
                  <Input
                    id='endDate'
                    type='date'
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  type='button'
                  variant='outline'
                  onClick={() => setAddModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type='submit' disabled={addMutation.isPending}>
                  {addMutation.isPending ? 'Adding...' : 'Add'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className='text-right'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {timelinePhases.map((phase) => (
              <TableRow key={phase.id}>
                <TableCell className='font-medium'>{phase.title}</TableCell>
                <TableCell>{phase.start_date}</TableCell>
                <TableCell>{phase.end_date}</TableCell>
                <TableCell>{phase.status}</TableCell>
                <TableCell className='text-right space-x-2'>
                  <Dialog
                    open={isEditModalOpen && selectedPhase?.id === phase.id}
                    onOpenChange={setEditModalOpen}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant='outline'
                        size='sm'
                        onClick={() => handleEditClick(phase)}
                      >
                        Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Phase</DialogTitle>
                        <DialogDescription>
                          Update the details for this timeline phase.
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleUpdateSubmit} className='space-y-4'>
                        <div className='space-y-2'>
                          <Label htmlFor='edit-title'>Title</Label>
                          <Input
                            id='edit-title'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder='Phase title'
                          />
                        </div>
                        <div className='grid grid-cols-2 gap-4'>
                          <div className='space-y-2'>
                            <Label htmlFor='edit-startDate'>Start Date</Label>
                            <Input
                              id='edit-startDate'
                              type='date'
                              value={startDate}
                              onChange={(e) => setStartDate(e.target.value)}
                            />
                          </div>
                          <div className='space-y-2'>
                            <Label htmlFor='edit-endDate'>End Date</Label>
                            <Input
                              id='edit-endDate'
                              type='date'
                              value={endDate}
                              onChange={(e) => setEndDate(e.target.value)}
                            />
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
                        <DialogFooter>
                          <Button
                            type='button'
                            variant='outline'
                            onClick={() => setEditModalOpen(false)}
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
                    variant='destructive'
                    size='sm'
                    onClick={() => deleteMutation.mutate(phase.id)}
                    disabled={deleteMutation.isPending}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
