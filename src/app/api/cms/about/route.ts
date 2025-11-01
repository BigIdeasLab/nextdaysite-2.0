import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'
import * as z from 'zod'
import { Database } from '@/types/database'

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
)

const processStepSchema = z.object({
  title: z.string().min(1, { message: 'Title is required.' }),
  description: z.string().min(1, { message: 'Description is required.' }),
})

const formSchema = z.object({
  hero_main_headline: z.string().min(1),
  hero_image_1_url: z.string().url().or(z.literal('')).nullable(),
  hero_image_1_alt: z.string().nullable(),
  hero_image_2_url: z.string().url().or(z.literal('')).nullable(),
  hero_image_2_alt: z.string().nullable(),
  intro_headline: z.string().min(1),
  intro_paragraph: z.string().min(1),
  intro_image_url: z.string().url().or(z.literal('')).nullable(),
  intro_image_alt: z.string().nullable(),
  promise_main_headline: z.string().min(1),
  promise_who_we_are_headline: z.string().min(1),
  promise_description: z.string().min(1),
  promise_clients_value: z.string().min(1),
  promise_clients_label: z.string().min(1),
  promise_websites_value: z.string().min(1),
  promise_websites_label: z.string().min(1),
  promise_satisfaction_value: z.string().min(1),
  promise_satisfaction_label: z.string().min(1),
  promise_image_1_url: z.string().url().or(z.literal('')).nullable(),
  promise_image_1_alt: z.string().nullable(),
  promise_image_2_url: z.string().url().or(z.literal('')).nullable(),
  promise_image_2_alt: z.string().nullable(),
  solution_main_headline: z.string().min(1),
  solution_our_solution_headline: z.string().min(1),
  solution_paragraph: z.string().min(1),
  solution_image_1_url: z.string().url().or(z.literal('')).nullable(),
  solution_image_1_alt: z.string().nullable(),
  solution_image_2_url: z.string().url().or(z.literal('')).nullable(),
  solution_image_2_alt: z.string().nullable(),
  process_headline: z.string().min(1),
  process_steps: z.array(processStepSchema).min(1),
})

/* ----------------------------- GET handler ----------------------------- */
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('about_page_content')
      .select('*')
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json(data)
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}

/* ----------------------------- PUT handler ----------------------------- */
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = formSchema.parse(body)

    // Fetch the existing single record (assuming one row)
    const { data: existing, error: fetchError } = await supabase
      .from('about_page_content')
      .select('id')
      .single()

    if (fetchError || !existing) {
      return NextResponse.json(
        { error: 'About page content not found' },
        { status: 404 },
      )
    }

    const { error: updateError } = await supabase
      .from('about_page_content')
      .update(validatedData)
      .eq('id', existing.id)

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 400 })
    }

    return NextResponse.json({
      message: 'About page content updated successfully',
    })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 })
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
