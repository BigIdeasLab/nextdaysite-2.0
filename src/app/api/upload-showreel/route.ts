import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const supabase = await createClient()
  try {
    const formData = await request.formData()
    const file = formData.get('showreel') as File

    if (!file) {
      return new NextResponse(JSON.stringify({ error: 'No file uploaded' }), {
        status: 400,
      })
    }

    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}.${fileExt}`
    const filePath = `showreels/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('public') // Assuming a 'public' bucket for showreels
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      })

    if (uploadError) {
      throw uploadError
    }

    const { data: publicUrlData } = supabase.storage
      .from('public')
      .getPublicUrl(filePath)

    return new NextResponse(
      JSON.stringify({
        message: 'Show reel uploaded successfully',
        url: publicUrlData.publicUrl,
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
