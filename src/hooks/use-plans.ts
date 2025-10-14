'use client'

import { useQuery } from '@tanstack/react-query'

import { mockPlans } from '@/data'
import type { PlansRow } from '@/types/models'

export function usePlans(options: { enabled?: boolean } = {}) {
  return useQuery<PlansRow[]>({
    queryKey: ['plans'],
    queryFn: () => Promise.resolve(mockPlans),
    enabled: options.enabled ?? true,
    staleTime: 1000 * 60 * 30,
  })
}
