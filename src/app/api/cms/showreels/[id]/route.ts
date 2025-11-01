import { createClient } from '@/lib/supabase/server'
import { NextResponse, NextRequest } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const supabase = await createClient()
  try {
    const { id } = await params
    const { data, error } = await supabase
      .from('showreels')
      .select('*')
      .eq('id', id)
      .single()
    if (error) {
      return new NextResponse(JSON.stringify({ error: error.message }), {
        status: 500,
      })
    }
    if (!data) {
      return new NextResponse(JSON.stringify({ error: 'Showreel not found' }), {
        status: 404,
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

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const supabase = await createClient()
  try {
    const { id } = await params
    const body = await request.json()
    const { data, error } = await supabase
      .from('showreels')
      .update(body)
      .eq('id', id)
      .select()
    if (error) {
      return new NextResponse(JSON.stringify({ error: error.message }), {
        status: 500,
      })
    }
    if (!data || data.length === 0) {
      return new NextResponse(JSON.stringify({ error: 'Showreel not found' }), {
        status: 404,
      })
    }
    return NextResponse.json(data[0])
  } catch {
    return new NextResponse(
      JSON.stringify({ error: 'An unexpected error occurred' }),
      {
        status: 500,
      },
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const supabase = await createClient()
  try {
    const { id } = await params
    const { error } = await supabase.from('showreels').delete().eq('id', id)
    if (error) {
      return new NextResponse(JSON.stringify({ error: error.message }), {
        status: 500,
      })
    }
    return new NextResponse(null, { status: 204 })
  } catch {
    return new NextResponse(
      JSON.stringify({ error: 'An unexpected error occurred' }),
      {
        status: 500,
      },
    )
  }
}
