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

    let query = supabase.from('services').select('*')

    if (published) {
      query = query.eq('published', true)
    }

    const { data, error } = await query.order('order_index', { ascending: true })

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
      title,
      slug,
      description,
      image1_url,
      image1_id,
      image2_url,
      image2_id,
      icon,
      order_index,
      published,
    } = body

    if (!title || !slug) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 },
      )
    }

    const { data, error } = await supabase
      .from('services')
      .insert({
        title,
        slug,
        description: description || null,
        image1_url: image1_url || null,
        image1_id: image1_id || null,
        image2_url: image2_url || null,
        image2_id: image2_id || null,
        icon: icon || null,
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
