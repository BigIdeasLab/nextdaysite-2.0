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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export function ManageDeliverables({ projectId }: { projectId: string }) {
  const queryClient = useQueryClient()
  const { data: deliverables = [], isLoading } = useDeliverables(projectId)
  const [isAddModalOpen, setAddModalOpen] = useState(false)
  const [isEditModalOpen, setEditModalOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
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
      updateDeliverable(selectedDeliverable!.id, { title, description }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['deliverables', projectId] })
      setEditModalOpen(false)
      setTitle('')
      setDescription('')
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
    addMutation.mutate()
  }

  const handleUpdateSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateMutation.mutate()
  }

  const handleEditClick = (deliverable: ProjectDeliverablesRow) => {
    setSelectedDeliverable(deliverable)
    setTitle(deliverable.title)
    setDescription(deliverable.description || '')
    setEditModalOpen(true)
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <h2 className='text-xl font-semibold'>Deliverables</h2>
        <Dialog open={isAddModalOpen} onOpenChange={setAddModalOpen}>
          <DialogTrigger asChild>
            <Button>Add Deliverable</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Deliverable</DialogTitle>
              <DialogDescription>
                Fill in the details for the new deliverable.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddSubmit} className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='title'>Title</Label>
                <Input
                  id='title'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder='Deliverable title'
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='description'>Description</Label>
                <Textarea
                  id='description'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder='Deliverable description'
                />
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
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className='text-right'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {deliverables.map((deliverable) => (
              <TableRow key={deliverable.id}>
                <TableCell className='font-medium'>
                  {deliverable.title}
                </TableCell>
                <TableCell>{deliverable.description}</TableCell>
                <TableCell>{deliverable.status}</TableCell>
                <TableCell className='text-right space-x-2'>
                  <Dialog
                    open={
                      isEditModalOpen &&
                      selectedDeliverable?.id === deliverable.id
                    }
                    onOpenChange={setEditModalOpen}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant='outline'
                        size='sm'
                        onClick={() => handleEditClick(deliverable)}
                      >
                        Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Deliverable</DialogTitle>
                        <DialogDescription>
                          Update the details for this deliverable.
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleUpdateSubmit} className='space-y-4'>
                        <div className='space-y-2'>
                          <Label htmlFor='edit-title'>Title</Label>
                          <Input
                            id='edit-title'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder='Deliverable title'
                          />
                        </div>
                        <div className='space-y-2'>
                          <Label htmlFor='edit-description'>Description</Label>
                          <Textarea
                            id='edit-description'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder='Deliverable description'
                          />
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
                    onClick={() => deleteMutation.mutate(deliverable.id)}
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
