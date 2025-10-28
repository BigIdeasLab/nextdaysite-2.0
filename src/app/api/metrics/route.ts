import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/database'

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
)

export async function GET() {
  try {
    // Check if the user is an admin
    const { data: isAdmin, error: isAdminError } =
      await supabase.rpc('is_admin')

    if (isAdminError || !isAdmin) {
      return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
      })
    }

    // Fetch total revenue
    const { data: revenueData, error: revenueError } = await supabase
      .from('invoices')
      .select('total')
      .eq('status', 'paid')

    if (revenueError) {
      throw revenueError
    }

    const totalRevenue = revenueData.reduce((acc, { total }) => acc + total, 0)

    // Fetch new users in the last 30 days
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const {
      data: usersData,
      error: usersError,
      count: newUsersCount,
    } = await supabase
      .from('users')
      .select('*', { count: 'exact' })
      .gte('created_at', thirtyDaysAgo.toISOString())

    if (usersError) {
      throw usersError
    }

    // Fetch active projects
    const {
      data: projectsData,
      error: projectsError,
      count: activeProjectsCount,
    } = await supabase
      .from('projects')
      .select('*', { count: 'exact' })
      .eq('status', 'active')

    if (projectsError) {
      throw projectsError
    }

    return new NextResponse(
      JSON.stringify({
        totalRevenue,
        newUsersCount,
        activeProjectsCount,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
  } catch (error) {
    if (error instanceof Error) {
      return new NextResponse(JSON.stringify({ error: error.message }), {
        status: 500,
      })
    }
    return new NextResponse(
      JSON.stringify({ error: 'An unknown error occurred' }),
      { status: 500 },
    )
  }
}
