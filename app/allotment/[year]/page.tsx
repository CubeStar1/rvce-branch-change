import { DataTable } from '@/components/ui/data-table'
import { ColumnDef } from "@tanstack/react-table"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getAllotmentList, AllotmentData } from '@/lib/utils/allotment'

export const dynamic = "force-static"
export const revalidate = 86400 // 24 hours

export async function generateStaticParams() {
  //available years for static generation
  const years = ["2024"]
  return years.map((year) => ({ year }))
}

interface AllotmentPageProps {
  params: Promise<{
    year: string
  }>
}

const columns: ColumnDef<AllotmentData>[] = [
  {
    accessorKey: "serial",
    header: "S.No",
  },
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

export default async function AllotmentListPage({ params }: AllotmentPageProps) {
  const { year } = await params

  try {
    const data = await getAllotmentList(year)

    return (
      <div className="container mx-auto py-10">
        <Card>
          <CardHeader>
            <CardTitle>Allotment List {year}</CardTitle>
          </CardHeader>
          <CardContent>
            {data.length === 0 ? (
              <div className="text-center py-10 text-muted-foreground">
                No allotment data available for {year}
              </div>
            ) : (
              <DataTable columns={columns} data={data} />
            )}
          </CardContent>
        </Card>
      </div>
    )
  } catch (error) {
    console.error("Error fetching allotment data:", error)
    return (
      <div className="container mx-auto py-10">
        <Card>
          <CardHeader>
            <CardTitle>Allotment List {year}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-10 text-red-500">
              Error loading allotment data
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }
}

export async function generateMetadata({ params }: AllotmentPageProps) {
  const { year } = await params
  return {
    title: `RVCE ${year} Branch Change Allotment`,
    description: `Branch change allotment list for RVCE ${year}`,
  }
}
