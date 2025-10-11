'use client'

import { useQuery } from '@tanstack/react-query'

import { fetchActivities } from '@/lib/api/data-service'
import { useAuth } from '@/context/auth-context'
import type { ActivitiesRow } from '@/types/models'

export function useActivities(
  projectId?: string,
  options: { enabled?: boolean } = {},
) {
  const { client } = useAuth()

  return useQuery<ActivitiesRow[]>({
    queryKey: ['activities', projectId ?? 'all'],
    queryFn: () => fetchActivities(projectId, client),
    enabled: options.enabled ?? true,
  })
}
