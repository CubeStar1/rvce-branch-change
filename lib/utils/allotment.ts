import { createSupabaseServer } from '@/lib/supabase/server'

export type AllotmentData = {
  serial: number
  id: number
  usn: string
  name: string
  old_branch: string
  new_branch: string
  cgpa: number
  backlog: number
}

export async function getAllotmentList(year: string): Promise<AllotmentData[]> {
  const supabase = createSupabaseServer()

  const { data, error } = await supabase
    .from(`allotment_list_${year}`)
    .select('*')
    .order('cgpa', { ascending: false })

  if (error) {
    console.error('Error fetching allotment data:', error)
    return []
  }

  const dataWithSerial = (data || []).map((item: any, index: number) => ({
    serial: index + 1,
    ...item,
  }))

  return dataWithSerial
}
