'use client'

import { useQuery } from '@tanstack/react-query'

import { fetchFiles } from '@/lib/api/data-service'
import { useAuth } from '@/context/auth-context'
import type { FilesRow } from '@/data/mock-data'

export function useFiles(options: { enabled?: boolean } = {}) {
  const { client } = useAuth()

  return useQuery<FilesRow[]>({
    queryKey: ['files'],
    queryFn: () => fetchFiles(client),
    enabled: options.enabled ?? true,
  })
}
