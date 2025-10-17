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

export function ManageDeliverables({ projectId }: { projectId: string }) {
  const queryClient = useQueryClient()
  const { data: deliverables = [], isLoading } = useDeliverables(projectId)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
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
      setIsModalOpen(false)
      setTitle('')
      setDescription('')
    },
  })

  const updateMutation = useMutation({
    mutationFn: () =>
      updateDeliverable(selectedDeliverable!.id, { title, description }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['deliverables', projectId] })
      setIsEditModalOpen(false)
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
    setIsEditModalOpen(true)
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex justify-between items-center'>
        <h2 className='text-xl font-semibold tracking-tight sm:text-2xl'>
          Deliverables
        </h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className='px-4 py-2 bg-blue-500 text-white rounded-md'
        >
          Add Deliverable
        </button>
      </div>

      {isModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
          <div className='bg-white p-8 rounded-lg'>
            <h3 className='text-lg font-semibold mb-4'>Add New Deliverable</h3>
            <form onSubmit={handleAddSubmit}>
              <div className='mb-4'>
                <label
                  htmlFor='title'
                  className='block text-sm font-medium text-gray-700'
                >
                  Title
                </label>
                <input
                  type='text'
                  id='title'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className='mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                />
              </div>
              <div className='mb-4'>
                <label
                  htmlFor='description'
                  className='block text-sm font-medium text-gray-700'
                >
                  Description
                </label>
                <textarea
                  id='description'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className='mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                />
              </div>
              <div className='flex justify-end gap-4'>
                <button
                  type='button'
                  onClick={() => setIsModalOpen(false)}
                  className='px-4 py-2 bg-gray-300 text-gray-700 rounded-md'
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  className='px-4 py-2 bg-blue-500 text-white rounded-md'
                  disabled={addMutation.isPending}
                >
                  {addMutation.isPending ? 'Adding...' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isEditModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
          <div className='bg-white p-8 rounded-lg'>
            <h3 className='text-lg font-semibold mb-4'>Edit Deliverable</h3>
            <form onSubmit={handleUpdateSubmit}>
              <div className='mb-4'>
                <label
                  htmlFor='title'
                  className='block text-sm font-medium text-gray-700'
                >
                  Title
                </label>
                <input
                  type='text'
                  id='title'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className='mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                />
              </div>
              <div className='mb-4'>
                <label
                  htmlFor='description'
                  className='block text-sm font-medium text-gray-700'
                >
                  Description
                </label>
                <textarea
                  id='description'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className='mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                />
              </div>
              <div className='flex justify-end gap-4'>
                <button
                  type='button'
                  onClick={() => setIsEditModalOpen(false)}
                  className='px-4 py-2 bg-gray-300 text-gray-700 rounded-md'
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  className='px-4 py-2 bg-blue-500 text-white rounded-md'
                  disabled={updateMutation.isPending}
                >
                  {updateMutation.isPending ? 'Updating...' : 'Update'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className='overflow-x-auto'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            <tr>
              <th
                scope='col'
                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                Title
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                Description
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                Status
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {deliverables.map((deliverable) => (
              <tr key={deliverable.id}>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                  {deliverable.title}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                  {deliverable.description}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                  {deliverable.status}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                  <button
                    onClick={() => handleEditClick(deliverable)}
                    className='px-2 py-1 bg-gray-200 text-gray-700 rounded-md'
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteMutation.mutate(deliverable.id)}
                    className='ml-2 px-2 py-1 bg-red-500 text-white rounded-md'
                    disabled={deleteMutation.isPending}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
