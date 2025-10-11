'use client'

import { useQuery } from '@tanstack/react-query'

import { fetchChatMessages } from '@/lib/api/data-service'
import { useAuth } from '@/context/auth-context'
import type { ChatMessagesRow } from '@/types/models'

export function useChatMessages(
  projectId: string | null,
  options: { enabled?: boolean } = {},
) {
  const { client } = useAuth()

  return useQuery<ChatMessagesRow[]>({
    queryKey: ['chat-messages', projectId ?? 'none'],
    queryFn: () =>
      projectId ? fetchChatMessages(projectId, client) : Promise.resolve([]),
    enabled: Boolean(projectId) && (options.enabled ?? true),
    staleTime: 1000 * 15,
  })
}
