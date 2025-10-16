import { createBrowserClient } from '@supabase/ssr'
import type { SupabaseClient } from '@supabase/supabase-js'

import { getSupabaseAnonKey, getSupabaseUrl } from '@/lib/api/supabase-config'
import type { Database } from '@/types/database'

let browserClient: SupabaseClient<Database> | null = null

export function createBrowserSupabaseClient(): SupabaseClient<Database> {
  if (browserClient) {
    return browserClient
  }

  const supabaseUrl = getSupabaseUrl()
  const supabaseAnonKey = getSupabaseAnonKey()

  // This should not happen, but if it does, we'll throw an error
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase URL or Anon Key is not defined.')
  }

  browserClient = createBrowserClient<Database>(supabaseUrl, supabaseAnonKey)

  return browserClient
}
