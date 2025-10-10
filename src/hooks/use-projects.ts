'use client'

import { useQuery } from '@tanstack/react-query'

import { fetchProjects } from '@/lib/api/data-service'
import { useAuth } from '@/context/auth-context'
import type { ProjectsRow } from '@/data/mock-data'

export function useProjects(options: { enabled?: boolean } = {}) {
  const { client } = useAuth()

  return useQuery<ProjectsRow[]>({
    queryKey: ['projects'],
    queryFn: () => fetchProjects(client),
    enabled: options.enabled ?? true,
  })
}
