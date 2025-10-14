import type { SupabaseClient } from '@supabase/supabase-js'

import { createBrowserSupabaseClient } from '@/lib/api/supabase-browser'
import type { Database } from '@/types/database'
import type {
  ActivitiesRow,
  ChatMessagesRow,
  FilesRow,
  InvoicesRow,
  PlansRow,
  ProjectsRow,
  UsersRow,
} from '@/types/models'

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

export async function fetchPlans(client?: Client | null): Promise<PlansRow[]> {
  const supabase = resolveClient(client)
  if (!supabase) {
    return []
  }

  const { data, error } = await supabase
    .from('plans')
    .select('*')
    .order('monthly_price', { ascending: true })

  if (error) {
    handleError('fetchPlans', error)
    return []
  }

  return data ?? []
}

export async function fetchUsers(client?: Client | null): Promise<UsersRow[]> {
  const supabase = resolveClient(client)
  if (!supabase) {
    return []
  }

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .order('created_at', { ascending: true })

  if (error) {
    handleError('fetchUsers', error)
    return []
  }

  return data ?? []
}

export async function fetchProjects(
  client?: Client | null,
): Promise<ProjectsRow[]> {
  const supabase = resolveClient(client)
  if (!supabase) {
    return []
  }

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('updated_at', { ascending: false })

  if (error) {
    handleError('fetchProjects', error)
    return []
  }

  return data ?? []
}

export async function fetchProjectById(
  projectId: string,
  client?: Client | null,
): Promise<ProjectsRow | null> {
  const supabase = resolveClient(client)
  if (!supabase) {
    return null
  }

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', projectId)
    .single()

  if (error) {
    handleError('fetchProjectById', error)
    return null
  }

  return data ?? null
}

export async function fetchInvoices(
  client?: Client | null,
): Promise<InvoicesRow[]> {
  const supabase = resolveClient(client)
  if (!supabase) {
    return []
  }

  const { data, error } = await supabase
    .from('invoices')
    .select('*')
    .order('issued_at', { ascending: false })

  if (error) {
    handleError('fetchInvoices', error)
    return []
  }

  return data ?? []
}

export async function fetchFiles(client?: Client | null): Promise<FilesRow[]> {
  const supabase = resolveClient(client)
  if (!supabase) {
    return []
  }

  const { data, error } = await supabase
    .from('files')
    .select('*')
    .order('updated_at', { ascending: false })

  if (error) {
    handleError('fetchFiles', error)
    return []
  }

  return data ?? []
}

export async function fetchChatMessages(
  projectId: string,
  client?: Client | null,
): Promise<ChatMessagesRow[]> {
  const supabase = resolveClient(client)
  if (!supabase) {
    return []
  }

  const { data, error } = await supabase
    .from('chat_messages')
    .select('*')
    .eq('project_id', projectId)
    .order('created_at', { ascending: true })

  if (error) {
    handleError('fetchChatMessages', error)
    return []
  }

  return data ?? []
}

export async function fetchActivities(
  projectId?: string,
  client?: Client | null,
): Promise<ActivitiesRow[]> {
  const supabase = resolveClient(client)
  if (!supabase) {
    return []
  }

  const baseQuery = supabase
    .from('activities')
    .select('*')
    .order('created_at', { ascending: false })

  const { data, error } = projectId
    ? await baseQuery.eq('project_id', projectId)
    : await baseQuery

  if (error) {
    handleError('fetchActivities', error)
    return []
  }

  return data ?? []
}

export async function fetchUserById(
  userId: string,
  client?: Client | null,
): Promise<UsersRow | null> {
  const supabase = resolveClient(client)
  if (!supabase) {
    return null
  }

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) {
    handleError('fetchUserById', error)
    return null
  }

  return data ?? null
}

export async function updateUser(
  userId: string,
  payload: { full_name: string },
  client?: Client | null,
): Promise<UsersRow | null> {
  const supabase = resolveClient(client)
  if (!supabase) {
    return null
  }

  const { data, error } = await supabase
    .from('users')
    .update(payload)
    .eq('id', userId)
    .select()
    .single()

  if (error) {
    handleError('updateUser', error)
    return null
  }

  return data
}
