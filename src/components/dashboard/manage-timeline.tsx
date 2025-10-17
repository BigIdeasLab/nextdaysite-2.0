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

export function ManageTimeline({ projectId }: { projectId: string }) {
  const queryClient = useQueryClient()
  const { data: timelinePhases = [], isLoading } = useTimelinePhases(projectId)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
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
      setIsModalOpen(false)
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
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['timelinePhases', projectId] })
      setIsEditModalOpen(false)
      setTitle('')
      setStartDate('')
      setEndDate('')
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
    setIsEditModalOpen(true)
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex justify-between items-center'>
        <h2 className='text-xl font-semibold tracking-tight sm:text-2xl'>
          Timeline
        </h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className='px-4 py-2 bg-blue-500 text-white rounded-md'
        >
          Add Phase
        </button>
      </div>

      {isModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
          <div className='bg-white p-8 rounded-lg'>
            <h3 className='text-lg font-semibold mb-4'>Add New Phase</h3>
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
                  htmlFor='startDate'
                  className='block text-sm font-medium text-gray-700'
                >
                  Start Date
                </label>
                <input
                  type='date'
                  id='startDate'
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className='mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                />
              </div>
              <div className='mb-4'>
                <label
                  htmlFor='endDate'
                  className='block text-sm font-medium text-gray-700'
                >
                  End Date
                </label>
                <input
                  type='date'
                  id='endDate'
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
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
            <h3 className='text-lg font-semibold mb-4'>Edit Phase</h3>
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
                  htmlFor='startDate'
                  className='block text-sm font-medium text-gray-700'
                >
                  Start Date
                </label>
                <input
                  type='date'
                  id='startDate'
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className='mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                />
              </div>
              <div className='mb-4'>
                <label
                  htmlFor='endDate'
                  className='block text-sm font-medium text-gray-700'
                >
                  End Date
                </label>
                <input
                  type='date'
                  id='endDate'
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
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
                Start Date
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                End Date
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
            {timelinePhases.map((phase) => (
              <tr key={phase.id}>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                  {phase.title}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                  {phase.start_date}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                  {phase.end_date}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                  {phase.status}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                  <button
                    onClick={() => handleEditClick(phase)}
                    className='px-2 py-1 bg-gray-200 text-gray-700 rounded-md'
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteMutation.mutate(phase.id)}
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
