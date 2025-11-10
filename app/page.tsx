import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ArrowRight, ListChecks, Award, BarChart3 } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      <section className="flex-1 flex flex-col items-center justify-center py-8 text-center px-4">
        <div className="max-w-3xl space-y-6">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            RVCE Branch Change Portal
          </h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            Access branch change results, merit lists, and comprehensive statistics for the years 2024 and 2025.
          </p>
        </div>
      </section>

      <section className="container mx-auto py-8 px-4">
        <div className="grid gap-8 md:grid-cols-3">
          <Card className="relative group hover:shadow-lg transition-all border-t-4 border-t-blue-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ListChecks className="h-5 w-5 text-blue-500" />
                Merit List
              </CardTitle>
              <CardDescription>
                View the complete merit list of eligible students for branch change
              </CardDescription>
            </CardHeader>
            <CardContent className="">
              <div className="flex flex-col gap-2">
                <Link href="/merit-list/2025">
                  <Button className="w-full justify-between group-hover:translate-x-1 transition-transform bg-blue-500 hover:bg-blue-600">
                    2025 Merit List
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/merit-list/2024">
                  <Button variant="outline" className="w-full justify-between group-hover:translate-x-1 transition-transform border-blue-200 hover:bg-blue-50 hover:text-blue-600">
                    2024 Merit List
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="relative group hover:shadow-lg transition-all border-t-4 border-t-green-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-green-500" />
                Allotment List
              </CardTitle>
              <CardDescription>
                Check the final branch change allotment results
              </CardDescription>
            </CardHeader>
            <CardContent className="">
              <div className="flex flex-col gap-2">
                <Link href="/allotment/2024">
                  <Button className="w-full justify-between group-hover:translate-x-1 transition-transform bg-green-500 hover:bg-green-600">
                    2024 Allotment
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="relative group hover:shadow-lg transition-all border-t-4 border-t-purple-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-purple-500" />
                Statistics
              </CardTitle>
              <CardDescription>
                Explore detailed branch-wise statistics and trends
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Link href="/allotment/statistics/2024">
                  <Button className="w-full justify-between group-hover:translate-x-1 transition-transform bg-purple-500 hover:bg-purple-600">
                    View Statistics
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="container mx-auto py-12 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Need Help?</h2>
          <p className="text-muted-foreground mb-6">
            Learn more about the branch change process, eligibility criteria, and important dates.
          </p>
          <Link href="/guide">
            <Button variant="outline" size="lg" className="hover:border-primary">
              View Process Guide
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
