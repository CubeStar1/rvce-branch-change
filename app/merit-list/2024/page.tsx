"use client"

import { useEffect, useState } from 'react'
import { DataTable } from '@/components/ui/data-table'
import { TableSkeleton } from '@/components/ui/table-skeleton'
import { ColumnDef } from "@tanstack/react-table"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type MeritList = {
  id: number
  usn: string
  cgpa: number
  backlog: number
  current_branch: string
  preference_1: string
  preference_2: string
  preference_3: string
  preference_4: string
}

const columns: ColumnDef<MeritList>[] = [
  {
    accessorKey: "usn",
    header: "USN",
  },
  {
    accessorKey: "cgpa",
    header: "CGPA",
  },
  {
    accessorKey: "backlog",
    header: "Backlogs",
  },
  {
    accessorKey: "current_branch",
    header: "Current Branch",
  },
  {
    accessorKey: "preference_1",
    header: "1st Preference",
  },
  {
    accessorKey: "preference_2",
    header: "2nd Preference",
  },
  {
    accessorKey: "preference_3",
    header: "3rd Preference",
  },
  {
    accessorKey: "preference_4",
    header: "4th Preference",
  },
]

export default function MeritList2024() {
  const [data, setData] = useState<MeritList[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/merit-list/2024')
        const result = await response.json()
        setData(result)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Merit List 2024</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <TableSkeleton columnCount={8} rowCount={10} />
          ) : (
            <DataTable columns={columns} data={data} />
          )}
        </CardContent>
      </Card>
    </div>
  )
} 