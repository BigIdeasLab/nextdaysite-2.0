'use client'

import { useQuery } from '@tanstack/react-query'
import { fetchTimelinePhases } from '@/lib/api/data-service'
import { useAuth } from '@/context/auth-context'
import type { ProjectTimelinePhasesRow } from '@/types/models'

export function useTimelinePhases(
  projectId: string,
  options: { enabled?: boolean } = {},
) {
  const { client } = useAuth()

  return useQuery<ProjectTimelinePhasesRow[]>({
    queryKey: ['timelinePhases', projectId],
    queryFn: () => fetchTimelinePhases(client, projectId),
    enabled: options.enabled ?? true,
  })
}
