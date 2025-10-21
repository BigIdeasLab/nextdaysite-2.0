'use client'

import { useState } from 'react'
import { useDeliverables } from '@/hooks/use-deliverables'
import {
  addDeliverable,
  updateDeliverable,
  deleteDeliverable,
} from '@/lib/api/data-service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { ProjectDeliverablesRow } from '@/types/models'
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
import { Textarea } from '@/components/ui/textarea'
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
} from 'lucide-react'

type DeliverableStatus = 'pending' | 'in_progress' | 'completed'

const statusColors = {
  pending: {
    icon: AlertCircle,
    color: 'text-gray-500',
    bg: 'bg-gray-100',
    badge: 'bg-gray-100 text-gray-700',
  },
  in_progress: {
    icon: Clock,
    color: 'text-amber-500',
    bg: 'bg-amber-100',
    badge: 'bg-amber-100 text-amber-700',
  },
  completed: {
    icon: CheckCircle2,
    color: 'text-green-500',
    bg: 'bg-green-100',
    badge: 'bg-green-100 text-green-700',
  },
}

export function ManageDeliverables({ projectId }: { projectId: string }) {
  const queryClient = useQueryClient()
  const { data: deliverables = [], isLoading } = useDeliverables(projectId)
  const [isAddModalOpen, setAddModalOpen] = useState(false)
  const [isEditModalOpen, setEditModalOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState<DeliverableStatus>('pending')
  const [selectedDeliverable, setSelectedDeliverable] =
    useState<ProjectDeliverablesRow | null>(null)

  const addMutation = useMutation({
    mutationFn: () =>
      addDeliverable({
        project_id: projectId,
        title,
        description,
        status: 'pending',
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['deliverables', projectId] })
      setAddModalOpen(false)
      setTitle('')
      setDescription('')
    },
  })

  const updateMutation = useMutation({
    mutationFn: () =>
      updateDeliverable(selectedDeliverable!.id, {
        title,
        description,
        status: status as DeliverableStatus,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['deliverables', projectId] })
      setEditModalOpen(false)
      setTitle('')
      setDescription('')
      setStatus('pending')
      setSelectedDeliverable(null)
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (deliverableId: string) => deleteDeliverable(deliverableId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['deliverables', projectId] })
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

  const handleEditClick = (deliverable: ProjectDeliverablesRow) => {
    setSelectedDeliverable(deliverable)
    setTitle(deliverable.title)
    setDescription(deliverable.description || '')
    if (deliverable.status) {
      setStatus(deliverable.status as DeliverableStatus)
    }
    setEditModalOpen(true)
  }

  const handleResetForm = () => {
    setTitle('')
    setDescription('')
    setStatus('pending')
    setSelectedDeliverable(null)
  }

  if (isLoading) {
    return (
      <div className='flex items-center justify-center py-8'>
        <div className='text-sm text-gray-500'>Loading deliverables...</div>
      </div>
    )
  }

  const completedCount = deliverables.filter(
    (d) => d.status === 'completed',
  ).length
  const totalCount = deliverables.length

  return (
    <div className='space-y-4'>
      {/* Header with Progress */}
      {totalCount > 0 && (
        <div className='rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 p-4'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-xs font-semibold uppercase tracking-wider text-gray-600'>
                Progress
              </p>
              <p className='mt-1 text-2xl font-bold text-gray-900'>
                {completedCount}/{totalCount}
              </p>
            </div>
            <div className='h-12 w-12 rounded-full bg-white flex items-center justify-center'>
              <div className='text-sm font-semibold text-indigo-600'>
                {Math.round((completedCount / totalCount) * 100)}%
              </div>
            </div>
          </div>
          <div className='mt-3 h-2 w-full overflow-hidden rounded-full bg-gray-200'>
            <div
              className='h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-300'
              style={{
                width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%`,
              }}
            />
          </div>
        </div>
      )}

      {/* Add Deliverable Button */}
      <Dialog open={isAddModalOpen} onOpenChange={setAddModalOpen}>
        <DialogTrigger asChild>
          <Button className='w-full gap-2 bg-blue-600 hover:bg-blue-700'>
            <Plus className='h-4 w-4' />
            Add Deliverable
          </Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-md'>
          <DialogHeader>
            <DialogTitle>Add New Deliverable</DialogTitle>
            <DialogDescription>
              Create a new deliverable for this project.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddSubmit} className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='title'>Deliverable Title</Label>
              <Input
                id='title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='e.g., Website Design'
                autoFocus
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='description'>Description</Label>
              <Textarea
                id='description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder='Add details about this deliverable...'
                className='resize-none'
                rows={4}
              />
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
                {addMutation.isPending ? 'Adding...' : 'Add'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Deliverables List */}
      {deliverables.length === 0 ? (
        <div className='rounded-lg border border-dashed border-gray-400 bg-gray-50/50 p-8 text-center'>
          <p className='text-sm text-gray-600'>
            No deliverables added yet. Create your first deliverable.
          </p>
        </div>
      ) : (
        <div className='space-y-3'>
          {deliverables.map((deliverable) => {
            const statusConfig_ =
              statusColors[deliverable.status as DeliverableStatus]
            const StatusIcon = statusConfig_.icon
            return (
              <div
                key={deliverable.id}
                className='flex items-start gap-3 rounded-lg border border-gray-300 bg-white p-4 transition-all hover:border-gray-400 hover:shadow-md'
              >
                {/* Status Icon */}
                <div
                  className={`${statusConfig_.bg} rounded-full p-2 flex-shrink-0`}
                >
                  <StatusIcon className={`h-4 w-4 ${statusConfig_.color}`} />
                </div>

                {/* Deliverable Details */}
                <div className='flex-1 min-w-0'>
                  <div className='flex items-start justify-between gap-2'>
                    <div className='flex-1'>
                      <h4 className='font-semibold text-gray-900'>
                        {deliverable.title}
                      </h4>
                      {deliverable.description && (
                        <p className='mt-1 text-sm text-gray-600 line-clamp-2'>
                          {deliverable.description}
                        </p>
                      )}
                    </div>
                    <div
                      className={`flex-shrink-0 rounded-full px-2.5 py-1 text-xs font-medium whitespace-nowrap ${statusConfig_.badge}`}
                    >
                      {deliverable.status}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className='flex items-center gap-1 flex-shrink-0'>
                  <Dialog
                    open={
                      isEditModalOpen &&
                      selectedDeliverable?.id === deliverable.id
                    }
                    onOpenChange={setEditModalOpen}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => handleEditClick(deliverable)}
                        className='text-gray-600 hover:text-gray-900'
                      >
                        <Edit2 className='h-4 w-4' />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className='sm:max-w-md'>
                      <DialogHeader>
                        <DialogTitle>Edit Deliverable</DialogTitle>
                        <DialogDescription>
                          Update the details for this deliverable.
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleUpdateSubmit} className='space-y-4'>
                        <div className='space-y-2'>
                          <Label htmlFor='edit-title'>Deliverable Title</Label>
                          <Input
                            id='edit-title'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder='e.g., Website Design'
                          />
                        </div>
                        <div className='space-y-2'>
                          <Label htmlFor='edit-description'>Description</Label>
                          <Textarea
                            id='edit-description'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder='Add details about this deliverable...'
                            className='resize-none'
                            rows={4}
                          />
                        </div>
                        <div className='space-y-2'>
                          <Label htmlFor='edit-status'>Status</Label>
                          <Select
                            value={status}
                            onValueChange={(value) =>
                              setStatus(value as DeliverableStatus)
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
                    onClick={() => deleteMutation.mutate(deliverable.id)}
                    disabled={deleteMutation.isPending}
                    className='text-red-600 hover:bg-red-50 hover:text-red-700'
                  >
                    <Trash2 className='h-4 w-4' />
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
