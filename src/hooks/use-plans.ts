'use client'

import { useQuery } from '@tanstack/react-query'

import { fetchPlans } from '@/lib/api/data-service'
import { useAuth } from '@/context/auth-context'
import type { PlansRow } from '@/types/models'

export function usePlans(options: { enabled?: boolean } = {}) {
  const { client } = useAuth()

  return useQuery<PlansRow[]>({
    queryKey: ['plans'],
    queryFn: () => fetchPlans(client),
    enabled: options.enabled ?? true,
    staleTime: 1000 * 60 * 30,
  })
}
