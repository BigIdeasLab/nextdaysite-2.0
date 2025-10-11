import type { SupabaseClient } from '@supabase/supabase-js'

import {
  getMockProjectById,
  getMockUserById,
  mockActivities,
  mockChatMessages,
  mockFiles,
  mockInvoices,
  mockPlans,
  mockProjects,
  mockUsers,
} from '@/data'
import { createBrowserSupabaseClient } from '@/lib/api/supabase-browser'
import { isSupabaseConfigured } from '@/lib/api/supabase-config'
import type { Database } from '@/types/database'

type Client = SupabaseClient<Database>

function resolveClient(provided?: Client | null) {
  if (provided) {
    return provided
  }

  return createBrowserSupabaseClient()
}

function handleError(context: string, error: unknown) {
  if (process.env.NODE_ENV !== 'production') {
    console.error(`[supabase:${context}]`, error)
  }
}

export async function fetchPlans(client?: Client | null) {
  if (!isSupabaseConfigured()) {
    return mockPlans
  }

  const supabase = resolveClient(client)
  if (!supabase) {
    return mockPlans
  }

  const { data, error } = await supabase
    .from('plans')
    .select('*')
    .order('monthly_price', { ascending: true })
  if (error || !data) {
    handleError('fetchPlans', error)
    return mockPlans
  }

  return data
}

export async function fetchUsers(client?: Client | null) {
  if (!isSupabaseConfigured()) {
    return mockUsers
  }

  const supabase = resolveClient(client)
  if (!supabase) {
    return mockUsers
  }

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .order('created_at', { ascending: true })
  if (error || !data) {
    handleError('fetchUsers', error)
    return mockUsers
  }

  return data
}

export async function fetchProjects(client?: Client | null) {
  if (!isSupabaseConfigured()) {
    return mockProjects
  }

  const supabase = resolveClient(client)
  if (!supabase) {
    return mockProjects
  }

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('updated_at', { ascending: false })
  if (error || !data) {
    handleError('fetchProjects', error)
    return mockProjects
  }

  return data
}

export async function fetchProjectById(
  projectId: string,
  client?: Client | null,
) {
  if (!isSupabaseConfigured()) {
    return getMockProjectById(projectId)
  }

  const supabase = resolveClient(client)
  if (!supabase) {
    return getMockProjectById(projectId)
  }

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', projectId)
    .single()

  if (error || !data) {
    handleError('fetchProjectById', error)
    return getMockProjectById(projectId)
  }

  return data
}

export async function fetchInvoices(client?: Client | null) {
  if (!isSupabaseConfigured()) {
    return mockInvoices
  }

  const supabase = resolveClient(client)
  if (!supabase) {
    return mockInvoices
  }

  const { data, error } = await supabase
    .from('invoices')
    .select('*')
    .order('issued_at', { ascending: false })
  if (error || !data) {
    handleError('fetchInvoices', error)
    return mockInvoices
  }

  return data
}

export async function fetchFiles(client?: Client | null) {
  if (!isSupabaseConfigured()) {
    return mockFiles
  }

  const supabase = resolveClient(client)
  if (!supabase) {
    return mockFiles
  }

  const { data, error } = await supabase
    .from('files')
    .select('*')
    .order('updated_at', { ascending: false })
  if (error || !data) {
    handleError('fetchFiles', error)
    return mockFiles
  }

  return data
}

export async function fetchChatMessages(
  projectId: string,
  client?: Client | null,
) {
  if (!isSupabaseConfigured()) {
    return mockChatMessages.filter(
      (message) => message.project_id === projectId,
    )
  }

  const supabase = resolveClient(client)
  if (!supabase) {
    return mockChatMessages.filter(
      (message) => message.project_id === projectId,
    )
  }

  const { data, error } = await supabase
    .from('chat_messages')
    .select('*')
    .eq('project_id', projectId)
    .order('created_at', { ascending: true })
  if (error || !data) {
    handleError('fetchChatMessages', error)
    return mockChatMessages.filter(
      (message) => message.project_id === projectId,
    )
  }

  return data
}

export async function fetchActivities(
  projectId?: string,
  client?: Client | null,
) {
  if (!isSupabaseConfigured()) {
    return projectId
      ? mockActivities.filter((activity) => activity.project_id === projectId)
      : mockActivities
  }

  const supabase = resolveClient(client)
  if (!supabase) {
    return projectId
      ? mockActivities.filter((activity) => activity.project_id === projectId)
      : mockActivities
  }

  const query = supabase
    .from('activities')
    .select('*')
    .order('created_at', { ascending: false })

  const { data, error } = projectId
    ? await query.eq('project_id', projectId)
    : await query

  if (error || !data) {
    handleError('fetchActivities', error)
    return projectId
      ? mockActivities.filter((activity) => activity.project_id === projectId)
      : mockActivities
  }

  return data
}

export async function fetchUserById(userId: string, client?: Client | null) {
  if (!isSupabaseConfigured()) {
    return getMockUserById(userId)
  }

  const supabase = resolveClient(client)
  if (!supabase) {
    return getMockUserById(userId)
  }

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single()
  if (error || !data) {
    handleError('fetchUserById', error)
    return getMockUserById(userId)
  }

  return data
}
