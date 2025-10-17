'use client'

import { useQuery } from '@tanstack/react-query'
import { fetchDeliverables } from '@/lib/api/data-service'
import { useAuth } from '@/context/auth-context'
import type { ProjectDeliverablesRow } from '@/types/models'

export function useDeliverables(
  projectId: string,
  options: { enabled?: boolean } = {},
) {
  const { client } = useAuth()

  return useQuery<ProjectDeliverablesRow[]>({
    queryKey: ['deliverables', projectId],
    queryFn: () => fetchDeliverables(client, projectId),
    enabled: options.enabled ?? true,
  })
}
