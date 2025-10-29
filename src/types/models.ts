import type { Database, Json } from '@/types/database'

export type PlansRow = Database['public']['Tables']['plans']['Row']
export type UsersRow = Database['public']['Tables']['users']['Row']
export type ProjectsRow = Database['public']['Tables']['projects']['Row']
export type InvoicesRow = Database['public']['Tables']['invoices']['Row']
export type FilesRow = Database['public']['Tables']['files']['Row']

export type SubscriptionsRow =
  Database['public']['Tables']['subscriptions']['Row']

export type LogoRow = Database['public']['Tables']['logos']['Row'] & {
  description: string | null
}
export type PortfolioItemRow =
  Database['public']['Tables']['portfolio_items']['Row']
export type ServiceRow = Database['public']['Tables']['services']['Row']
export type TestimonialRow = Database['public']['Tables']['testimonials']['Row']
export type PageRow = Database['public']['Tables']['pages']['Row']
export type SectionRow = Database['public']['Tables']['sections']['Row']
export type CmsSettingRow = {
  id: string
  key: string
  value?: Json | null
}

export type StartCheckoutResult =
  Database['public']['Functions']['start_checkout']['Returns'][number]
