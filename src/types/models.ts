import type { Database } from '@/types/database'

export type PlansRow = Database['public']['Tables']['plans']['Row']
export type UsersRow = Database['public']['Tables']['users']['Row']
export type ProjectsRow = Database['public']['Tables']['projects']['Row']
export type InvoicesRow = Database['public']['Tables']['invoices']['Row']
export type FilesRow = Database['public']['Tables']['files']['Row']
export type ChatMessagesRow =
  Database['public']['Tables']['chat_messages']['Row']
export type ActivitiesRow = Database['public']['Tables']['activities']['Row']
export type SubscriptionsRow =
  Database['public']['Tables']['subscriptions']['Row']
export type OnboardingStepsRow =
  Database['public']['Tables']['onboarding_steps']['Row']

export type StartCheckoutResult =
  Database['public']['Functions']['start_checkout']['Returns'][number]
