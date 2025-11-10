import { createSupabaseServer } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const filename = searchParams.get('filename')

  if (!filename) {
    return NextResponse.json({ error: 'Filename is required' }, { status: 400 })
  }

  const supabase = createSupabaseServer()
  
  const { data } = supabase
    .storage
    .from('branch_change')
    .getPublicUrl(`circulars/${filename}.pdf`)

  return NextResponse.redirect(data.publicUrl)
} 