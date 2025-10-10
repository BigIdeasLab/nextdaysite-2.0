import { getEnvVar } from "@/lib/utils/env";

export function getSupabaseUrl() {
  return getEnvVar("NEXT_PUBLIC_SUPABASE_URL");
}

export function getSupabaseAnonKey() {
  return getEnvVar("NEXT_PUBLIC_SUPABASE_ANON_KEY");
}

export function getSupabaseServiceRoleKey() {
  return getEnvVar("SUPABASE_SERVICE_ROLE_KEY");
}

export function isSupabaseConfigured() {
  return Boolean(getSupabaseUrl() && getSupabaseAnonKey());
}
