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
        <Dialog.Overlay className='fixed inset-0 bg-black/50 backdrop-blur-sm' />
        <Dialog.Content className='fixed left-1/2 top-1/2 w-full max-w-[732px] -translate-x-1/2 -translate-y-1/2 rounded-[30px] bg-black p-[25px] shadow-2xl'>
          <div className='flex flex-col gap-6'>
            {/* Header with Title and Close Button */}
            <div className='flex items-start justify-between gap-4'>
              <div className='flex flex-col gap-[22px]'>
                <Dialog.Title className='text-[22px] font-medium capitalize leading-[50px] text-[#F7F6FF]'>
                  Select a Project
                </Dialog.Title>
                <Dialog.Description className='text-[17px] font-light leading-[22px] text-[#9BA1A6]'>
                  Choose an inactive project to associate with this plan.
                </Dialog.Description>
              </div>

              {/* Close Button */}
              <Dialog.Close asChild>
                <button
                  className='flex h-[52px] w-[52px] flex-shrink-0 items-center justify-center transition-opacity hover:opacity-70'
                  aria-label='Close'
                >
                  <svg
                    width='33'
                    height='33'
                    viewBox='0 0 33 33'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M1 1L32 32M32 1L1 32'
                      stroke='#FFF'
                      strokeWidth='2'
                      strokeLinecap='round'
                    />
                  </svg>
                </button>
              </Dialog.Close>
            </div>

            {/* Content Area */}
            <div className='flex min-h-[79px] flex-col gap-4'>
              {isLoading && (
                <div className='flex items-center justify-center rounded-[12px] bg-[#262627] px-[13px] py-[15px] text-[18px] font-medium text-[#9BA1A6]'>
                  Loading projects...
                </div>
              )}

              {isError && (
                <div className='flex items-center justify-center rounded-[12px] bg-[#262627] px-[13px] py-[15px] text-[18px] font-medium text-[#9BA1A6]'>
                  Error loading projects.
                </div>
              )}

              {!isLoading && !isError && projects && projects.length > 0 ? (
                <div className='flex max-h-[300px] flex-col gap-2.5 overflow-y-auto'>
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      className={`flex cursor-pointer items-center rounded-[12px] px-[13px] py-[15px] text-[18px] font-medium transition-all ${
                        selectedProject === project.id
                          ? 'bg-[#FF8C00] text-[#F7F6FF]'
                          : 'bg-[#262627] text-[#9BA1A6] hover:bg-[#2d2d2e]'
                      }`}
                      onClick={() => setSelectedProject(project.id)}
                    >
                      {project.title}
                    </div>
                  ))}
                </div>
              ) : !isLoading && !isError ? (
                <div className='flex flex-col items-center gap-4 py-6'>
                  <p className='text-[17px] font-light leading-[22px] text-[#9BA1A6]'>
                    No inactive projects found.
                  </p>
                  <button
                    onClick={handleCreateNewProject}
                    className='flex items-center justify-center rounded-[30px] border border-[#FF8C00] bg-[#FF8C00] px-[26px] py-[22px] text-[18px] font-semibold leading-[24px] text-[#F7F6FF] transition-opacity hover:opacity-90'
                  >
                    Create New Project
                  </button>
                </div>
              ) : null}
            </div>

            {/* Action Button */}
            {projects && projects.length > 0 && (
              <button
                onClick={handleContinue}
                disabled={!selectedProject}
                className='flex w-full items-center justify-center rounded-[30px] border border-[#FF8C00] bg-[#FF8C00] px-[26px] py-[22px] text-[18px] font-semibold leading-[24px] text-[#F7F6FF] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50'
              >
                Continue with Selected Project
              </button>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
