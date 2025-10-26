import { createBrowserClient } from '@supabase/ssr'
import type { SupabaseClient } from '@supabase/supabase-js'

import { getSupabaseAnonKey, getSupabaseUrl } from '@/lib/api/supabase-config'
import type { Database } from '@/types/database'

export function createBrowserSupabaseClient(): SupabaseClient<Database> {
  const supabaseUrl = getSupabaseUrl()
  const supabaseAnonKey = getSupabaseAnonKey()

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase URL or Anon Key is not defined.')
  }

  return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey)
}
