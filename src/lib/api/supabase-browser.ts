import { createClient, type SupabaseClient } from '@supabase/supabase-js'

import { getSupabaseAnonKey, getSupabaseUrl } from '@/lib/api/supabase-config'
import type { Database } from '@/types/database'

let browserClient: SupabaseClient<Database> | null = null

export function createBrowserSupabaseClient(): SupabaseClient<Database> | null {
  if (browserClient) {
    return browserClient
  }

  // FIXME: Hardcoded for debugging purposes. Remove this and fix env var loading.
  const supabaseUrl = 'https://bhddncxmyxlmrqglmsfn.supabase.co'
  const supabaseAnonKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJoZGRuY3hteXhsbXJxZ2xtc2ZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAxMzM2MDMsImV4cCI6MjA3NTcwOTYwM30.06mDjQ1fFZWYBgK-w1-nb8oq56bTT9zxX9pHvWmZC2Y'

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
