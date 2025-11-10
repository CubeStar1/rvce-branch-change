"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ArrowRightLeft, TrendingUp, School } from "lucide-react"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BranchStats, OverviewStats } from "@/lib/utils/statistics"

interface StatsOverviewProps {
  overviewStats: OverviewStats
  branchStats: BranchStats[]
  year: string
}

const inflowConfig = {
  inflow: {
    label: "Students",
    color: "#2563eb",
  },
} satisfies ChartConfig

const outflowConfig = {
  outflow: {
    label: "Students",
    color: "#dc2626",
  },
} satisfies ChartConfig

const cutoffConfig = {
  cutoff: {
    label: "CGPA",
    color: "#16a34a",
  },
} satisfies ChartConfig

export function StatsOverview({ overviewStats, branchStats, year }: StatsOverviewProps) {
  const statsCards = [
    {
      title: "Total Branch Changes",
      value: overviewStats.totalBranchChanges,
      icon: ArrowRightLeft,
      description: `Students who changed branches in ${year}`
    },
    {
      title: "Branches Involved",
      value: overviewStats.uniqueNewBranches,
      icon: School,
      description: "Departments that received students"
    },
    {
      title: "Average CGPA",
      value: overviewStats.averageCGPA,
      icon: TrendingUp,
      description: "Of successful applicants"
    },
  ]

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-3">
        {statsCards.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Branch-wise Inflow</CardTitle>
            <CardDescription>Number of students who got each branch</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={inflowConfig} className="min-h-[350px] w-full">
              <BarChart data={branchStats}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="branch"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <YAxis tickLine={false} axisLine={false} />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar dataKey="inflow" fill="var(--color-inflow)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="">
          <CardHeader>
            <CardTitle>Branch-wise Outflow</CardTitle>
            <CardDescription>Number of students who left each branch</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={outflowConfig} className="w-full">
              <BarChart data={branchStats}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="branch"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <YAxis
                 tickLine={false} 
                 axisLine={false}                
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar dataKey="outflow" fill="var(--color-outflow)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>CGPA Cutoffs by Branch</CardTitle>
          <CardDescription>Minimum CGPA required for each branch</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={cutoffConfig} className="w-full">
            <BarChart data={branchStats.filter(stat => stat.cutoff !== 0)}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="branch"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <YAxis 
                domain={[5, 10]} 
                tickLine={false} 
                axisLine={false}
                ticks={[5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10]}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="cutoff" fill="var(--color-cutoff)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
} 