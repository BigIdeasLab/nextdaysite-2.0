import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import type { Json } from '@/types/database'

export async function GET() {
  const supabase = await createClient()
  try {
    const { data, error } = await supabase.from('cms_settings').select('*')
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

export async function PATCH(request: Request) {
  const supabase = await createClient()
  try {
    const body = await request.json()
    const updates = Object.entries(body).map(([key, value]) =>
      supabase
        .from('cms_settings')
        .update({ value: value as Json })
        .eq('key', key),
    )
    const results = await Promise.all(updates)
    const errorResult = results.find((r) => r.error)
    if (errorResult) {
      return new NextResponse(
        JSON.stringify({ error: errorResult.error?.message }),
        {
          status: 500,
        },
      )
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
