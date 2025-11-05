import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = await createClient()
  try {
    const { data, error } = await supabase.from('showreels').select('*')
    if (error) {
      return new NextResponse(JSON.stringify({ error: error.message }), {
        status: 500,
      })
    }
    return NextResponse.json(data)
  } catch {
    return new NextResponse(
      JSON.stringify({ error: 'An unexpected error occurred' }),
      {
        status: 500,
      },
    )
  }
}

export async function POST(request: Request) {
  const supabase = await createClient()
  try {
    const body = await request.json()

    // Check if a showreel already exists
    const { data: existingShowreels, error: fetchError } = await supabase
      .from('showreels')
      .select('id')

    if (fetchError) {
      return new NextResponse(JSON.stringify({ error: fetchError.message }), {
        status: 500,
      })
    }

    let data, error

    if (existingShowreels && existingShowreels.length > 0) {
      // If a showreel exists, update it
      const existingShowreelId = existingShowreels[0].id
      ;({ data, error } = await supabase
        .from('showreels')
        .update(body)
        .eq('id', existingShowreelId)
        .select())
    } else {
      // If no showreel exists, insert a new one
      ;({ data, error } = await supabase
        .from('showreels')
        .insert([body])
        .select())
    }

    if (error) {
      return new NextResponse(JSON.stringify({ error: error.message }), {
        status: 500,
      })
    }

    if (!data || data.length === 0) {
      return new NextResponse(
        JSON.stringify({
          error: 'Showreel operation failed: No data returned.',
        }),
        {
          status: 500,
        },
      )
    }

    return NextResponse.json(data[0], { status: 200 })
  } catch {
    return new NextResponse(
      JSON.stringify({ error: 'An unexpected error occurred' }),
      {
        status: 500,
      },
    )
  }
}
