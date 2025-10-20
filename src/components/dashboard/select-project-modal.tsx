'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useInactiveProjects } from '@/hooks/use-inactive-projects'
import * as Dialog from '@radix-ui/react-dialog'

interface SelectProjectModalProps {
  isOpen: boolean
  onClose: () => void
  onSelectProject: (projectId: string) => void
}

export function SelectProjectModal({
  isOpen,
  onClose,
  onSelectProject,
}: SelectProjectModalProps) {
  const { data: projects, isLoading, isError } = useInactiveProjects()
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const router = useRouter()

  const handleContinue = () => {
    if (selectedProject) {
      onSelectProject(selectedProject)
      onClose()
    }
  }

  const handleCreateNewProject = () => {
    router.push('/dashboard')
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className='fixed inset-0 bg-black/50' />
        <Dialog.Content className='fixed left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg'>
          <Dialog.Title className='text-lg font-medium'>
            Select a Project
          </Dialog.Title>
          <Dialog.Description className='mt-2 text-sm text-gray-500'>
            Choose an inactive project to associate with this plan.
          </Dialog.Description>

          {isLoading && <div>Loading projects...</div>}
          {isError && <div>Error loading projects.</div>}

          {projects && projects.length > 0 ? (
            <div className='mt-4 space-y-2'>
              {projects.map((project) => (
                <div
                  key={project.id}
                  className={`cursor-pointer rounded-md border p-3 ${selectedProject === project.id ? 'border-blue-500 bg-blue-50' : ''}`}
                  onClick={() => setSelectedProject(project.id)}
                >
                  {project.title}
                </div>
              ))}
            </div>
          ) : (
            <div className='mt-4 text-center'>
              <p>No inactive projects found.</p>
              <button
                onClick={handleCreateNewProject}
                className='mt-4 rounded-md bg-blue-500 px-4 py-2 text-white'
              >
                Create New Project
              </button>
            </div>
          )}

          <div className='mt-6 flex justify-end space-x-4'>
            <Dialog.Close asChild>
              <button className='rounded-md border border-gray-300 px-4 py-2'>
                Cancel
              </button>
            </Dialog.Close>
            <button
              onClick={handleContinue}
              disabled={!selectedProject}
              className='rounded-md bg-blue-500 px-4 py-2 text-white disabled:opacity-50'
            >
              Continue
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
