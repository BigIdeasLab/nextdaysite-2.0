import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = await createClient()
  try {
    const { data, error } = await supabase.from('pages').select('*')
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
    const { data, error } = await supabase.from('pages').insert([body]).select()
    if (error) {
      return new NextResponse(JSON.stringify({ error: error.message }), {
        status: 500,
      })
    }
    return NextResponse.json(data[0], { status: 201 })
  } catch {
    return new NextResponse(
      JSON.stringify({ error: 'An unexpected error occurred' }),
      {
        status: 500,
      },
    )
  }
}
