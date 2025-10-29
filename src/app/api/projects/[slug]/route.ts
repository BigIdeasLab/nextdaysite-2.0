import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

// This function encapsulates the Supabase client creation logic.
function createSupabaseServerClient() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        async get(name: string) {
          const cookieStore = await cookies()
          return cookieStore.get(name)?.value
        },
        async set(name: string, value: string, options: CookieOptions) {
          const cookieStore = await cookies()
          cookieStore.set({ name, value, ...options })
        },
        async remove(name: string, options: CookieOptions) {
          const cookieStore = await cookies()
          cookieStore.set({ name, value: '', ...options })
        },
      },
    },
  )
}

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> },
) {
  const supabase = createSupabaseServerClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    return NextResponse.json({ error: 'Not authorized' }, { status: 401 })
  }

  const { slug } = await context.params
  const {
    project_title,
    main_goal,
    target_audience,
    key_features,
    reference_websites,
  } = await req.json()

  try {
    // First, fetch the project to verify ownership
    const { data: project, error: fetchError } = await supabase
      .from('projects')
      .select('owner_id')
      .eq('slug', slug)
      .maybeSingle()

    if (fetchError) {
      console.error('Error fetching project:', fetchError)
      return NextResponse.json({ error: fetchError.message }, { status: 500 })
    }

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    // Check if the authenticated user is the owner of the project
    if (project.owner_id !== session.user.id) {
      return NextResponse.json({ error: 'Not authorized' }, { status: 403 })
    }

    // If ownership is verified, proceed with the update
    const { data, error } = await supabase
      .from('projects')
      .update({
        project_title,
        main_goal,
        target_audience,
        key_features,
        reference_websites,
      })
      .eq('slug', slug)
      .select()

    if (error) {
      console.error('Error updating project:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data ? data[0] : null, { status: 200 })
  } catch (error) {
    console.error('An unexpected error occurred:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
