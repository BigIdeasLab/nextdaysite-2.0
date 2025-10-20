'use client'

import { useQuery } from '@tanstack/react-query'
import { createBrowserSupabaseClient } from '@/lib/api/supabase-browser'
import type { PlansRow } from '@/types/models'

export function usePlans(options: { enabled?: boolean } = {}) {
  const supabase = createBrowserSupabaseClient()
  return useQuery<PlansRow[]>({
    queryKey: ['plans'],
    queryFn: async () => {
      const { data, error } = await supabase.from('plans').select('*')
      if (error) {
        throw new Error(error.message)
      }
      return data || []
    },
    enabled: options.enabled ?? true,
    staleTime: 1000 * 60 * 30,
  })
}
