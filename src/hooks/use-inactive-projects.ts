'use client'

import { useQuery } from '@tanstack/react-query'
import { fetchProjects } from '@/lib/api/data-service'
import { useAuth } from '@/context/auth-context'
import type { ProjectsRow } from '@/types/models'

export function useInactiveProjects(options: { enabled?: boolean } = {}) {
  const { client } = useAuth()

  return useQuery<ProjectsRow[]>({
    queryKey: ['inactive-projects'],
    queryFn: async () => {
      const projects = await fetchProjects(client)
      return projects.filter((p) => p.status === 'inactive')
    },
    enabled: options.enabled ?? true,
  })
}
