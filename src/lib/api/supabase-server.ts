import { createClient, type SupabaseClient } from '@supabase/supabase-js'

import { createClient, type SupabaseClient } from '@supabase/supabase-js'

import {
  getSupabaseAnonKey,
  getSupabaseServiceRoleKey,
  getSupabaseUrl,
} from '@/lib/api/supabase-config'
import type { Database } from '@/types/database'

type ServerClientOptions = {
  accessToken?: string
}

export function createServerSupabaseClient({
  accessToken,
}: ServerClientOptions = {}): SupabaseClient<Database> | null {
  const supabaseUrl = getSupabaseUrl()
  const serviceRoleKey = getSupabaseServiceRoleKey()
  const anonKey = getSupabaseAnonKey()

  const key = serviceRoleKey ?? anonKey

  if (!supabaseUrl || !key) {
    return null
  }

  return createClient<Database>(supabaseUrl, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: Boolean(accessToken),
    },
    global: accessToken
      ? {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      : undefined,
  })
}
