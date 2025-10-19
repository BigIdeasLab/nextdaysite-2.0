'use client'

import { useQuery } from '@tanstack/react-query'
import { fetchProjects, fetchTimelinePhases } from '@/lib/api/data-service'
import { useAuth } from '@/context/auth-context'
import type { ProjectsRow } from '@/types/models'

export function useProjects(options: { enabled?: boolean } = {}) {
  const { client } = useAuth()

  return useQuery<ProjectsRow[]>({
    queryKey: ['projects'],
    queryFn: async () => {
      const projects = await fetchProjects(client)
      const timelinePhasesByProject = await Promise.all(
        projects.map((p) => fetchTimelinePhases(client, p.id)),
      )

      return projects.map((p, i) => {
        const phases = timelinePhasesByProject[i]
        if (phases.length === 0) {
          return { ...p, progress: 0 }
        }

        const completedPhases = phases.filter(
          (phase) => phase.status === 'completed',
        ).length

        const progress = (completedPhases / phases.length) * 100

        return { ...p, progress }
      })
    },
    enabled: options.enabled ?? true,
  })
}
