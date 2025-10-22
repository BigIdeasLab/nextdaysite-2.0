'use client'

import { createContext, useContext } from 'react'
import { NewProjectModal } from '@/components/ui/new-project-modal'
import { useNewProjectModal } from '@/hooks/use-new-project-modal'
import type { ProjectDetails } from '@/hooks/use-simulated-onboarding-chat'

interface NewProjectModalContextType {
  openModal: (initialValues?: Partial<ProjectDetails>) => void
  closeModal: () => void
}

const NewProjectModalContext = createContext<NewProjectModalContextType | undefined>(
  undefined,
)

export function NewProjectModalProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const modal = useNewProjectModal()

  const value: NewProjectModalContextType = {
    openModal: modal.openModal,
    closeModal: modal.closeModal,
  }

  return (
    <NewProjectModalContext.Provider value={value}>
      {children}
      <NewProjectModal
        isOpen={modal.isOpen}
        onOpenChange={modal.setIsOpen}
        formValues={modal.formValues}
        onFormChange={modal.setFormValues}
        onSubmit={modal.onSubmit}
        isLoading={modal.isLoading}
      />
    </NewProjectModalContext.Provider>
  )
}

export function useNewProjectModalContext() {
  const context = useContext(NewProjectModalContext)
  if (!context) {
    throw new Error(
      'useNewProjectModalContext must be used within NewProjectModalProvider',
    )
  }
  return context
}
