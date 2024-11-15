import { createSupabaseServer } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const filename = searchParams.get('filename')

  if (!filename) {
    return NextResponse.json({ error: 'Filename is required' }, { status: 400 })
  }

  const supabase = createSupabaseServer()
  
  const { data, error } = await supabase
    .storage
    .from('branch_change')
    .download(`circulars/${filename}.pdf`)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Convert blob to array buffer
  const arrayBuffer = await data.arrayBuffer()

  return new NextResponse(arrayBuffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=${filename}.pdf`,
    },
  })
} 