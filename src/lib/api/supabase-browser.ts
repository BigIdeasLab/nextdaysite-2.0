import { createClient, type SupabaseClient } from '@supabase/supabase-js'

import { createClient, type SupabaseClient } from '@supabase/supabase-js'

import { getSupabaseAnonKey, getSupabaseUrl } from '@/lib/api/supabase-config'
import type { Database } from '@/types/database'

let browserClient: SupabaseClient<Database> | null = null

export function createBrowserSupabaseClient(): SupabaseClient<Database> | null {
  if (browserClient) {
    return browserClient
  }

  const supabaseUrl = getSupabaseUrl()
  const supabaseAnonKey = getSupabaseAnonKey()

  if (!supabaseUrl || !supabaseAnonKey) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(
        'Supabase credentials are not configured. The app will run in read-only demo mode using mock data.',
      )
    }
    return null
  }

  browserClient = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  })

  return browserClient
}
