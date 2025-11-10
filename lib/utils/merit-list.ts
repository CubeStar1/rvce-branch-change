import { createSupabaseServer } from '@/lib/supabase/server'

export type MeritListData = {
  serial: number
  id: number
  usn: string
  cgpa: number
  backlog: number
  puc: number
  current_branch: string
  preference_1: string
  preference_2: string
  preference_3: string
  preference_4: string
}

export async function getMeritList(year: string): Promise<MeritListData[]> {
  const supabase = createSupabaseServer()

  const { data, error } = await supabase
    .from(`merit_list_${year}`)
    .select('*')
    .order('cgpa', { ascending: false })

  if (error) {
    console.error('Error fetching merit list data:', error)
    return []
  }

  const dataWithSerial = (data || []).map((item: any, index: number) => ({
    serial: index + 1,
    ...item,
  }))

  return dataWithSerial
}
