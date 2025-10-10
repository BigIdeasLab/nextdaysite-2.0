'use client'

import { useQuery } from '@tanstack/react-query'

import { fetchUsers } from '@/lib/api/data-service'
import { useAuth } from '@/context/auth-context'
import type { UsersRow } from '@/data/mock-data'

export function useUsers(options: { enabled?: boolean } = {}) {
  const { client } = useAuth()

  return useQuery<UsersRow[]>({
    queryKey: ['users'],
    queryFn: () => fetchUsers(client),
    enabled: options.enabled ?? true,
    staleTime: 1000 * 60 * 5,
  })
}
