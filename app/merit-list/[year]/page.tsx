import { DataTable } from '@/components/ui/data-table'
import { ColumnDef } from "@tanstack/react-table"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getMeritList, MeritListData } from '@/lib/utils/merit-list'

export const dynamic = "force-static"
export const revalidate = 86400 // 24 hours

export async function generateStaticParams() {
  //available years for static generation
  const years = ["2024", "2025"]
  return years.map((year) => ({ year }))
}

interface MeritListPageProps {
  params: Promise<{
    year: string
  }>
}

const columns: ColumnDef<MeritListData>[] = [
  {
    accessorKey: "serial",
    header: "S.No",
  },
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
    accessorKey: "puc",
    header: "PUC",
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

export default async function MeritListPage({ params }: MeritListPageProps) {
  const { year } = await params

  try {
    const data = await getMeritList(year)

    return (
      <div className="container mx-auto py-10">
        <Card>
          <CardHeader>
            <CardTitle>Merit List {year}</CardTitle>
          </CardHeader>
          <CardContent>
            {data.length === 0 ? (
              <div className="text-center py-10 text-muted-foreground">
                No merit list data available for {year}
              </div>
            ) : (
              <DataTable columns={columns} data={data} />
            )}
          </CardContent>
        </Card>
      </div>
    )
  } catch (error) {
    console.error("Error fetching merit list data:", error)
    return (
      <div className="container mx-auto py-10">
        <Card>
          <CardHeader>
            <CardTitle>Merit List {year}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-10 text-red-500">
              Error loading merit list data
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }
}

export async function generateMetadata({ params }: MeritListPageProps) {
  const { year } = await params
  return {
    title: `RVCE ${year} Branch Change Merit List`,
    description: `Branch change merit list for RVCE ${year}`,
  }
}
