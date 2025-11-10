import { StatsOverview } from '@/components/statistics/stats-overview'
import { BranchCards } from '@/components/statistics/branch-cards'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getAllotmentStatistics } from '@/lib/utils/statistics'

export const dynamic = "force-static"
export const revalidate = 86400 // 24 hours

export async function generateStaticParams() {
  const years = ["2024"]
  return years.map((year) => ({ year }))
}

interface StatisticsPageProps {
  params: Promise<{
    year: string
  }>
}

export default async function StatisticsPage({ params }: StatisticsPageProps) {
  const { year } = await params

  try {
    const statistics = await getAllotmentStatistics(year)

    return (
      <div className="container mx-auto py-10">
        <Tabs defaultValue="overview" className="space-y-4 p-2">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="branches">Branch Details</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Allotment Statistics {year}</CardTitle>
              </CardHeader>
              <CardContent>
                <StatsOverview 
                  overviewStats={statistics.overviewStats}
                  branchStats={statistics.branchStats}
                  year={year}
                />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="branches" className="space-y-4">
            <BranchCards detailedBranchStats={statistics.detailedBranchStats} />
          </TabsContent>
        </Tabs>
      </div>
    )
  } catch (error) {
    console.error("Error fetching statistics:", error)
    return (
      <div className="container mx-auto py-10">
        <Card>
          <CardHeader>
            <CardTitle>Allotment Statistics {year}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-10 text-red-500">
              Error loading statistics data
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }
}

export async function generateMetadata({ params }: StatisticsPageProps) {
  const { year } = await params
  return {
    title: `RVCE ${year} Branch Change Statistics`,
    description: `Detailed statistics and analytics for RVCE ${year} branch change allotment`,
  }
}
