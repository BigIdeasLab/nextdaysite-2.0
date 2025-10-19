import { useQuery } from '@tanstack/react-query'
import { createBrowserSupabaseClient } from '@/lib/api/supabase-browser'
import type { SubscriptionsRow, PlansRow } from '@/types/models'

export type SubscriptionWithPlan = SubscriptionsRow & {
  plan: PlansRow | null
}

export function useSubscriptions() {
  return useQuery({
    queryKey: ['subscriptions'],
    queryFn: async () => {
      const supabase = createBrowserSupabaseClient()

      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        throw new Error('User not authenticated')
      }

      const { data, error } = await supabase
        .from('subscriptions')
        .select('*, plan:plans(*)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      return (data || []) as SubscriptionWithPlan[]
    },
  })
}
