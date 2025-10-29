import type { SupabaseClient } from '@supabase/supabase-js'

import { createBrowserSupabaseClient } from '@/lib/api/supabase-browser'
import type { Database, Json } from '@/types/database'
import type {
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

// export async function fetchOnboardingSteps(
//   client?: Client | null,
// ): Promise<OnboardingStepsRow[]> {
//   const supabase = resolveClient(client)
//   if (!supabase) {
//     return []
//   }

//   const { data, error } = await supabase
//     .from('onboarding_steps')
//     .select('*')
//     .order('id', { ascending: true })

//   if (error) {
//     handleError('fetchOnboardingSteps', error)
//     return []
//   }

//   return data ?? []
// }

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

// export async function fetchChatMessages(
//   projectId: string,
//   client?: Client | null,
// ): Promise<ChatMessagesRow[]> {
//   const supabase = resolveClient(client)
//   if (!supabase) {
//     return []
//   }

//   const { data, error } = await supabase
//     .from('chat_messages')
//     .select('*')
//     .eq('project_id', projectId)
//     .order('created_at', { ascending: true })

//   if (error) {
//     handleError('fetchChatMessages', error)
//     return []
//   }

//   return data ?? []
// }

// export async function fetchActivities(
//   projectId?: string,
//   client?: Client | null,
// ): Promise<ActivitiesRow[]> {
//   const supabase = resolveClient(client)
//   if (!supabase) {
//     return []
//   }

//   const baseQuery = supabase
//     .from('activities')
//     .select('*')
//     .order('created_at', { ascending: false })

//   const { data, error } = projectId
//     ? await baseQuery.eq('project_id', projectId)
//     : await baseQuery

//   if (error) {
//     handleError('fetchActivities', error)
//     return []
//   }

//   return data ?? []
// }

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

export async function createProject(
  project: {
    projectTitle?: string
    projectType?: string
    hosting?: string
    brandStyle?: string
    projectGoals?: string
    targetAudience?: string
    industry?: string
    pageCount?: string
    budget?: number
    confirmation?: boolean
    aiInferredPlan?: string
    aiInferredPaymentType?: string
  },
  client?: Client | null,
): Promise<ProjectsRow | null> {
  const supabase = resolveClient(client)
  if (!supabase) {
    return null
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    console.error('User not found')
    return null
  }

  const slug =
    (project.projectTitle || 'new-project')
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '') +
    '-' +
    Math.random().toString(36).substring(2, 8)

  const { data, error } = await supabase
    .from('projects')
    .insert([
      {
        title: project.projectTitle || 'New Project',
        owner_id: user.id,
        slug: slug,
        status: 'inactive',
        project_type: project.projectType,
        page_count: project.pageCount,
        project_title: project.projectTitle,
        hosting: project.hosting,
        brand_style: project.brandStyle,
        project_goals: project.projectGoals,
        target_audience: project.targetAudience,
        industry: project.industry,
        budget: project.budget,
        ai_inferred_plan: project.aiInferredPlan,
        ai_inferred_payment_type: project.aiInferredPaymentType,
        confirmation: project.confirmation,
      },
    ])
    .select()
    .single()

  if (error) {
    handleError('createProject', error)
    return null
  }
  return data
}

// export async function fetchDeliverables(
//   client: Client | null,
//   projectId: string,
// ): Promise<ProjectDeliverablesRow[]> {
//   const supabase = resolveClient(client)
//   if (!supabase) {
//     return []
//   }

//   const { data, error } = await supabase
//     .from('project_deliverables')
//     .select('*')
//     .eq('project_id', projectId)
//     .order('id', { ascending: true })

//   if (error) {
//     handleError('fetchDeliverables', error)
//     return []
//   }

//   return data ?? []
// }

// export async function fetchTimelinePhases(
//   client: Client | null,
//   projectId: string,
// ): Promise<ProjectTimelinePhasesRow[]> {
//   const supabase = resolveClient(client)
//   if (!supabase) {
//     return []
//   }

//   const { data, error } = await supabase
//     .from('project_timeline_phases')
//     .select('*')
//     .eq('project_id', projectId)
//     .order('id', { ascending: true })

//   if (error) {
//     handleError('fetchTimelinePhases', error)
//     return []
//   }

//   return data ?? []
// }

// export async function addTimelinePhase(
//   phase: Omit<ProjectTimelinePhasesRow, 'id' | 'created_at' | 'updated_at'>,
//   client?: Client | null,
// ): Promise<ProjectTimelinePhasesRow | null> {
//   const supabase = resolveClient(client)
//   if (!supabase) return null

//   const { data, error } = await supabase
//     .from('project_timeline_phases')
//     .insert(phase)
//     .select()
//     .single()

//   if (error) {
//     handleError('addTimelinePhase', error)
//     return null
//   }
//   return data
// }

// export async function updateTimelinePhase(
//   phaseId: string,
//   updates: Partial<ProjectTimelinePhasesRow>,
//   client?: Client | null,
// ): Promise<ProjectTimelinePhasesRow | null> {
//   const supabase = resolveClient(client)
//   if (!supabase) return null

//   const { data, error } = await supabase
//     .from('project_timeline_phases')
//     .update(updates)
//     .eq('id', phaseId)
//     .select()
//     .single()

//   if (error) {
//     handleError('updateTimelinePhase', error)
//     return null
//   }

//   if (data && data.project_id && updates.status) {
//     const project = await fetchProjectById(data.project_id, supabase)
//     if (project) {
//       const message = `Timeline phase "${data.title}" in project "${project.title}" updated to "${updates.status}"`
//       await createActivity(
//         data.project_id,
//         'status_change',
//         { message },
//         supabase,
//       )
//     }
//   }

//   return data
// }

// export async function deleteTimelinePhase(
//   phaseId: string,
//   client?: Client | null,
// ): Promise<boolean> {
//   const supabase = resolveClient(client)
//   if (!supabase) return false

//   const { error } = await supabase
//     .from('project_timeline_phases')
//     .delete()
//     .eq('id', phaseId)

//   if (error) {
//     handleError('deleteTimelinePhase', error)
//     return false
//   }
//   return true
// }

// export async function addDeliverable(
//   deliverable: Omit<ProjectDeliverablesRow, 'id' | 'created_at' | 'updated_at'>,
//   client?: Client | null,
// ): Promise<ProjectDeliverablesRow | null> {
//   const supabase = resolveClient(client)
//   if (!supabase) return null

//   const { data, error } = await supabase
//     .from('project_deliverables')
//     .insert(deliverable)
//     .select()
//     .single()

//   if (error) {
//     handleError('addDeliverable', error)
//     return null
//   }
//   return data
// }

// export async function updateDeliverable(
//   deliverableId: string,
//   updates: Partial<ProjectDeliverablesRow>,
//   client?: Client | null,
// ): Promise<ProjectDeliverablesRow | null> {
//   const supabase = resolveClient(client)
//   if (!supabase) return null

//   const { data, error } = await supabase
//     .from('project_deliverables')
//     .update(updates)
//     .eq('id', deliverableId)
//     .select()
//     .single()

//   if (error) {
//     handleError('updateDeliverable', error)
//     return null
//   }
//   return data
// }

// export async function deleteDeliverable(
//   deliverableId: string,
//   client?: Client | null,
// ): Promise<boolean> {
//   const supabase = resolveClient(client)
//   if (!supabase) return false

//   const { error } = await supabase
//     .from('project_deliverables')
//     .delete()
//     .eq('id', deliverableId)

//   if (error) {
//     handleError('deleteDeliverable', error)
//     return false
//   }
//   return true
// }

// export async function createActivity(
//   projectId: string,
//   eventType:
//     | 'status_change'
//     | 'file_uploaded'
//     | 'invoice_sent'
//     | 'note_added'
//     | 'message_posted',
//   metadata: Json,
//   client?: Client | null,
// ) {
//   const supabase = resolveClient(client)
//   if (!supabase) return null

//   const { error } = await supabase
//     .from('activities')
//     .insert({ project_id: projectId, event_type: eventType, metadata })

//   if (error) {
//     handleError('createActivity', error)
//   }
// }

// export async function updateProjectStatus(
//   projectId: string,
//   status: Database['public']['Enums']['project_status'],
//   client?: Client | null,
// ): Promise<ProjectsRow | null> {
//   const supabase = resolveClient(client)
//   if (!supabase) return null

//   const { data, error } = await supabase
//     .from('projects')
//     .update({ status })
//     .eq('id', projectId)
//     .select()
//     .single()

//   if (error) {
//     handleError('updateProjectStatus', error)
//     return null
//   }

//   if (data) {
//     const message = `Project "${data.title}" status updated to "${status}"`
//     await createActivity(projectId, 'status_change', { message }, supabase)
//   }

//   return data
// }

// export async function updateProjectDates(
//   projectId: string,
//   startDate: string | null,
//   dueDate: string | null,
//   client?: Client | null,
// ): Promise<ProjectsRow | null> {
//   const supabase = resolveClient(client)
//   if (!supabase) return null

//   const { data, error } = await supabase
//     .from('projects')
//     .update({ start_date: startDate, due_date: dueDate })
//     .eq('id', projectId)
//     .select()
//     .single()

//   if (error) {
//     handleError('updateProjectDates', error)
//     return null
//   }
//   return data
// }
