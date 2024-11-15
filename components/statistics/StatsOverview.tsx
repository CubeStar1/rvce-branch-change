"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ArrowRightLeft, TrendingUp, School } from "lucide-react"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface StatsOverviewProps {
  data: any[]
  year: string
}

interface BranchStats {
  branch: string
  inflow: number
  outflow: number
  cutoff: number
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

export function StatsOverview({ data, year }: StatsOverviewProps) {
  // Calculate statistics
  const totalBranchChanges = data.length
  const uniqueNewBranches = [...new Set(data.map(item => item.new_branch))]
  const averageCGPA = (data.reduce((acc, curr) => acc + curr.cgpa, 0) / data.length).toFixed(2)

  // Calculate branch-wise statistics
  const branchStats: BranchStats[] = [
    'CSE', 'ISE', 'ECE', 'CD', 'CY', 'AIML', 'ETE', 
    'IEM', 'EIE', 'EEE', 'ME', 'CV', 'AS', 'CH'
  ].map(branch => {
    const inflow = data.filter(item => item.new_branch === branch).length
    const outflow = data.filter(item => item.old_branch === branch).length
    const branchEntries = data.filter(item => item.new_branch === branch)
    const branchCutoff = branchEntries.length > 0
      ? Math.min(...branchEntries.map(item => item.cgpa))
      : 0

    return {
      branch,
      inflow,
      outflow,
      cutoff: branchCutoff
    }
  })

  const statsCards = [
    {
      title: "Total Branch Changes",
      value: totalBranchChanges,
      icon: ArrowRightLeft,
      description: `Students who changed branches in ${year}`
    },
    {
      title: "Branches Involved",
      value: uniqueNewBranches.length,
      icon: School,
      description: "Departments that received students"
    },
    {
      title: "Average CGPA",
      value: averageCGPA,
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