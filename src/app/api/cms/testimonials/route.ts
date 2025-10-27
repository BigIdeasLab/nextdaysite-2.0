import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const published = searchParams.get('published') !== 'false'

    let query = supabase.from('testimonials').select('*')

    if (published) {
      query = query.eq('published', true)
    }

    const { data, error } = await query.order('order_index', {
      ascending: true,
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      name,
      quote,
      avatar_url,
      avatar_id,
      bg_color,
      border_color,
      text_color,
      rotate_class,
      position_class,
      order_index,
      published,
    } = body

    if (!name || !quote) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 },
      )
    }

    const { data, error } = await supabase
      .from('testimonials')
      .insert({
        name,
        quote,
        avatar_url: avatar_url || null,
        avatar_id: avatar_id || null,
        bg_color: bg_color || '#1A1A1A',
        border_color: border_color || '#2B2B2B',
        text_color: text_color || '#9A9EA2',
        rotate_class: rotate_class || '-rotate-[6deg]',
        position_class: position_class || 'left-0 top-[70px]',
        order_index: order_index || 0,
        published: published !== false,
      })
      .select()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json(data[0], { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
