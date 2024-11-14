"use client"

import { useEffect, useState } from 'react'
import { DataTable } from '@/components/ui/data-table'
import { TableSkeleton } from '@/components/ui/table-skeleton'
import { ColumnDef } from "@tanstack/react-table"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type AllotmentList = {
  id: number
  usn: string
  name: string
  old_branch: string
  new_branch: string
  cgpa: number
  backlog: number
}

const columns: ColumnDef<AllotmentList>[] = [
  {
    accessorKey: "usn",
    header: "USN",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "old_branch",
    header: "Previous Branch",
  },
  {
    accessorKey: "new_branch",
    header: "Allotted Branch",
  },
  {
    accessorKey: "cgpa",
    header: "CGPA",
  },
  {
    accessorKey: "backlog",
    header: "Backlogs",
  },
]

export default function AllotmentList2024() {
  const [data, setData] = useState<AllotmentList[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/allotment/2024')
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
          <CardTitle>Allotment List 2024</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <TableSkeleton columnCount={6} rowCount={10} />
          ) : (
            <DataTable columns={columns} data={data} />
          )}
        </CardContent>
      </Card>
    </div>
  )
} 