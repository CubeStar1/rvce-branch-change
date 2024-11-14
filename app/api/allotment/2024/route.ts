import { createSupabaseServer } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = createSupabaseServer()

  const { data, error } = await supabase
    .from('allotment_list_2024')
    .select('*')
    .order('cgpa', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
} 