import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { Database } from '@/types/database'

export async function GET() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // const { data: isAdmin } = await supabase.rpc('is_admin')

  // if (!isAdmin) {
  //   return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  // }

  const { data: invoices, error } = await supabase.from('invoices').select('*')

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(invoices)
}
