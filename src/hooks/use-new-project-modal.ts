import { useState, useCallback } from 'react'
import type { ProjectDetails } from './use-simulated-onboarding-chat'
import { createProject } from '@/lib/api/data-service'

export function useNewProjectModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [formValues, setFormValues] = useState<Partial<ProjectDetails>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const openModal = useCallback((initialValues?: Partial<ProjectDetails>) => {
    setFormValues(initialValues ?? {})
    setError(null)
    setIsOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setIsOpen(false)
    setFormValues({})
    setError(null)
  }, [])

  const handleFormChange = useCallback((values: Partial<ProjectDetails>) => {
    setFormValues(values)
    setError(null)
  }, [])

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      setIsLoading(true)
      setError(null)

      try {
        await createProject(formValues)
        closeModal()
        window.location.reload()
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to create project'
        setError(errorMessage)
        console.error('Failed to create project:', err)
      } finally {
        setIsLoading(false)
      }
    },
    [formValues, closeModal],
  )

  return {
    isOpen,
    setIsOpen,
    formValues,
    setFormValues: handleFormChange,
    onSubmit: handleSubmit,
    openModal,
    closeModal,
    isLoading,
    error,
  }
}
