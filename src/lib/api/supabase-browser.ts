import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import type { Database } from "@/types/database";
import { getEnvVar } from "@/lib/utils/env";

let browserClient: SupabaseClient<Database> | null = null;

export function createBrowserSupabaseClient(): SupabaseClient<Database> | null {
  if (browserClient) {
    return browserClient;
  }

  const supabaseUrl = getEnvVar("NEXT_PUBLIC_SUPABASE_URL");
  const supabaseAnonKey = getEnvVar("NEXT_PUBLIC_SUPABASE_ANON_KEY");

  if (!supabaseUrl || !supabaseAnonKey) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "Supabase credentials are not configured. The app will run in read-only demo mode using mock data."
      );
    }
    return null;
  }

  browserClient = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  });

  return browserClient;
}
