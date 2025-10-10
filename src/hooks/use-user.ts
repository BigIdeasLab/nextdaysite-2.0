'use client'

import { useQuery } from '@tanstack/react-query'

import { useAuth } from '@/context/auth-context'
import { fetchUserById } from '@/lib/api/data-service'
import type { UsersRow } from '@/data/mock-data'

export function useUser(targetUserId?: string) {
  const { user, client } = useAuth()
  const resolvedUserId = targetUserId ?? user?.id ?? null

  return useQuery<UsersRow | null>({
    queryKey: ['user', resolvedUserId],
    queryFn: () =>
      resolvedUserId
        ? fetchUserById(resolvedUserId, client)
        : Promise.resolve(null),
    enabled: Boolean(resolvedUserId),
  })
}
