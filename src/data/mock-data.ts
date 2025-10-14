import type { Database } from '@/types/database'

export type PlansRow = Database['public']['Tables']['plans']['Row']
export type UsersRow = Database['public']['Tables']['users']['Row']
export type ProjectsRow = Database['public']['Tables']['projects']['Row']
export type InvoicesRow = Database['public']['Tables']['invoices']['Row']
export type FilesRow = Database['public']['Tables']['files']['Row']
export type ChatMessagesRow =
  Database['public']['Tables']['chat_messages']['Row']
export type ActivitiesRow = Database['public']['Tables']['activities']['Row']

export const mockUsers: UsersRow[] = [
  {
    id: 'user-b0d5f934-47f1-43dc-9a5a-14f6a9640aa1',
    email: 'maya@crescentstudio.com',
    full_name: 'Maya Patel',
    role: 'customer',
    company_name: 'Crescent Studio',
    avatar_url:
      'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=facearea&w=256&h=256&q=80',
    phone: '+1-917-555-2180',
    timezone: 'America/New_York',
    plan_id: 'plan-identity-suite',
    stripe_customer_id: 'cus_NDS12345',
    last_active_at: '2024-11-20T14:42:00Z',
    metadata: {
      onboarding_step: 'project_brief',
    },
    created_at: '2024-01-04T10:00:00Z',
    updated_at: '2024-11-19T17:30:00Z',
  },
  {
    id: 'user-0f1a5b18-9f68-440a-9fa0-9f79a955ec04',
    email: 'alex@nextdaysite.com',
    full_name: 'Alex Johnson',
    role: 'admin',
    company_name: 'NextDaySite Labs',
    avatar_url:
      'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=facearea&w=256&h=256&q=80',
    phone: '+1-415-555-4921',
    timezone: 'America/Los_Angeles',
    plan_id: null,
    stripe_customer_id: null,
    last_active_at: '2024-11-21T02:12:00Z',
    metadata: {
      focus: 'operations',
    },
    created_at: '2023-08-14T12:00:00Z',
    updated_at: '2024-11-18T18:20:00Z',
  },
  {
    id: 'user-4f56d773-a6f9-4c10-9a45-5ea16d2a8c77',
    email: 'taylor@nextdaysite.com',
    full_name: 'Taylor Kim',
    role: 'collaborator',
    company_name: 'NextDaySite Labs',
    avatar_url:
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=facearea&w=256&h=256&q=80',
    phone: '+1-503-555-0184',
    timezone: 'America/Los_Angeles',
    plan_id: null,
    stripe_customer_id: null,
    last_active_at: '2024-11-20T22:04:00Z',
    metadata: {
      specialty: 'brand_design',
    },
    created_at: '2023-11-02T12:00:00Z',
    updated_at: '2024-11-18T18:20:00Z',
  },
]

export const mockProjects: ProjectsRow[] = [
  {
    id: 'proj-velocity',
    title: 'Velocity Athletics',
    slug: 'velocity-athletics',
    status: 'in_progress',
    owner_id: mockUsers[0].id,
    project_manager_id: mockUsers[2].id,
    summary:
      'Building a bold, conversion-focused site for a boutique fitness brand.',
    progress: 58,
    priority: 'high',
    start_date: '2024-11-10',
    due_date: '2024-11-24',
    completed_at: null,
    budget: 7800,
    tags: ['branding', 'web', 'identity'],
    created_at: '2024-11-10T15:00:00Z',
    updated_at: '2024-11-20T16:30:00Z',
  },
  {
    id: 'proj-northpeak',
    title: 'NorthPeak Robotics',
    slug: 'northpeak-robotics',
    status: 'review',
    owner_id: mockUsers[0].id,
    project_manager_id: mockUsers[2].id,
    summary: 'Full-stack rollout of customer portal and investor microsite.',
    progress: 82,
    priority: 'medium',
    start_date: '2024-10-30',
    due_date: '2024-11-28',
    completed_at: null,
    budget: 12600,
    tags: ['portal', 'automation'],
    created_at: '2024-10-30T14:10:00Z',
    updated_at: '2024-11-19T12:05:00Z',
  },
  {
    id: 'proj-lumina',
    title: 'Lumina Health',
    slug: 'lumina-health',
    status: 'ready_to_ship',
    owner_id: mockUsers[0].id,
    project_manager_id: mockUsers[2].id,
    summary: 'Launch-ready identity suite and patient onboarding experience.',
    progress: 96,
    priority: 'high',
    start_date: '2024-10-12',
    due_date: '2024-11-15',
    completed_at: null,
    budget: 15400,
    tags: ['healthcare', 'identity'],
    created_at: '2024-10-12T09:45:00Z',
    updated_at: '2024-11-18T19:42:00Z',
  },
]

export const mockInvoices: InvoicesRow[] = [
  {
    id: 'inv-000231',
    user_id: mockUsers[0].id,
    project_id: mockProjects[0].id,
    status: 'open',
    subtotal: 4200,
    tax: 210,
    total: 4410,
    currency: 'USD',
    issued_at: '2024-11-12',
    due_date: '2024-11-26',
    created_at: '2024-11-12T12:00:00Z',
    stripe_invoice_id: 'in_1Pqv9WJ9',
    download_url: 'https://files.nextdaysite.com/invoices/inv-000231.pdf',
  },
  {
    id: 'inv-000215',
    user_id: mockUsers[0].id,
    project_id: mockProjects[2].id,
    status: 'paid',
    subtotal: 9800,
    tax: 490,
    total: 10290,
    currency: 'USD',
    issued_at: '2024-10-25',
    due_date: '2024-11-08',
    created_at: '2024-10-25T10:00:00Z',
    stripe_invoice_id: 'in_1Ppy6aA7',
    download_url: 'https://files.nextdaysite.com/invoices/inv-000215.pdf',
  },
]

export const mockFiles: FilesRow[] = [
  {
    id: 'file-style-guide',
    name: 'Velocity-style-guide.pdf',
    storage_bucket: 'project-assets',
    bucket_path: 'velocity/style-guide-v2.pdf',
    project_id: mockProjects[0].id,
    owner_id: mockUsers[2].id,
    description:
      'Brand system detailing typography, color palette, and guidelines.',
    mime_type: 'application/pdf',
    preview_url:
      'https://files.nextdaysite.com/previews/velocity-style-guide.png',
    size_bytes: 2356789,
    version: 2,
    created_at: '2024-11-17T18:00:00Z',
    updated_at: '2024-11-19T15:24:00Z',
  },
  {
    id: 'file-homepage-design',
    name: 'Lumina-homepage.fig',
    storage_bucket: 'project-assets',
    bucket_path: 'lumina/homepage-v3.fig',
    project_id: mockProjects[2].id,
    owner_id: mockUsers[2].id,
    description: 'Figma file for Lumina Health homepage experience.',
    mime_type: 'application/octet-stream',
    preview_url: 'https://files.nextdaysite.com/previews/lumina-homepage.png',
    size_bytes: 3678291,
    version: 3,
    created_at: '2024-11-14T09:20:00Z',
    updated_at: '2024-11-18T10:05:00Z',
  },
  {
    id: 'file-invoice',
    name: 'Invoice-inv-000231.pdf',
    storage_bucket: 'billing',
    bucket_path: 'invoices/2024/inv-000231.pdf',
    project_id: mockProjects[0].id,
    owner_id: mockUsers[1].id,
    description: 'Official invoice generated from Stripe checkout.',
    mime_type: 'application/pdf',
    preview_url: null,
    size_bytes: 523410,
    version: 1,
    created_at: '2024-11-12T12:05:00Z',
    updated_at: '2024-11-12T12:05:00Z',
  },
]

export const mockChatMessages: ChatMessagesRow[] = [
  {
    id: 'chat-001',
    project_id: mockProjects[0].id,
    author_id: mockUsers[0].id,
    role: 'customer',
    message:
      'Can we explore a bolder hero headline with a stronger call to action?',
    attachments: null,
    created_at: '2024-11-20T14:10:00Z',
  },
  {
    id: 'chat-002',
    project_id: mockProjects[0].id,
    author_id: mockUsers[2].id,
    role: 'team',
    message: 'Absolutely. Uploading two headline variants now for review.',
    attachments: [
      {
        file_id: 'file-style-guide',
        name: 'Hero copy options.pdf',
      },
    ],
    created_at: '2024-11-20T14:18:00Z',
  },
  {
    id: 'chat-003',
    project_id: mockProjects[2].id,
    author_id: mockUsers[1].id,
    role: 'team',
    message: 'QA pass finished—entering Ready to Ship stage today.',
    attachments: null,
    created_at: '2024-11-18T19:40:00Z',
  },
]

export const mockActivities: ActivitiesRow[] = [
  {
    id: 'act-001',
    project_id: mockProjects[0].id,
    actor_id: mockUsers[2].id,
    event_type: 'status_change',
    metadata: {
      from: 'start',
      to: 'in_progress',
    },
    created_at: '2024-11-11T12:00:00Z',
  },
  {
    id: 'act-002',
    project_id: mockProjects[0].id,
    actor_id: mockUsers[2].id,
    event_type: 'file_uploaded',
    metadata: {
      file_id: 'file-style-guide',
    },
    created_at: '2024-11-17T18:00:00Z',
  },
  {
    id: 'act-003',
    project_id: mockProjects[2].id,
    actor_id: mockUsers[1].id,
    event_type: 'invoice_sent',
    metadata: {
      invoice_id: 'inv-000215',
    },
    created_at: '2024-10-25T10:00:00Z',
  },
]

export function getMockUserById(userId: string) {
  return mockUsers.find((user) => user.id === userId) ?? null
}

export function getMockProjectById(projectId: string) {
  return mockProjects.find((project) => project.id === projectId) ?? null
}
