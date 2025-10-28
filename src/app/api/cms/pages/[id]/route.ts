import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const supabase = await createClient()
  const { id } = await params
  const { data, error } = await supabase
    .from('pages')
    .select('*')
    .eq('id', id)
    .single()
  if (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    })
  }
  return NextResponse.json(data)
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const supabase = await createClient()
  try {
    const body = await request.json()
    const { id } = await params
    const { data, error } = await supabase
      .from('pages')
      .update(body)
      .eq('id', id)
      .select()
    if (error) {
      return new NextResponse(JSON.stringify({ error: error.message }), {
        status: 500,
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
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const supabase = await createClient()
  try {
    const { id } = await params
    const { error } = await supabase.from('pages').delete().eq('id', id)
    if (error) {
      return new NextResponse(JSON.stringify({ error: error.message }), {
        status: 500,
      })
    }
    return NextResponse.json({ success: true })
  } catch {
    return new NextResponse(
      JSON.stringify({ error: 'An unexpected error occurred' }),
      {
        status: 500,
      },
    )
  }
}
