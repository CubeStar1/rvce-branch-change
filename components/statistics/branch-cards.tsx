import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDownRight, ArrowUpRight, Trophy, Target, BarChart3, Calculator } from "lucide-react"
import { cn } from "@/lib/utils"
import { DetailedBranchStats } from "@/lib/utils/statistics"

interface BranchCardProps {
  branch: string
  inflow: number
  outflow: number
  highestCGPA: number
  lowestCGPA: number
  averageCGPA: number
  medianCGPA: number
}

const branchColors: Record<string, string> = {
  'CSE': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  'ISE': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  'ECE': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  'CD': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  'CY': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  'AIML': 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400',
  'ETE': 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400',
  'IEM': 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  'EIE': 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400',
  'EEE': 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400',
  'ME': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  'CV': 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400',
  'AS': 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400',
  'CH': 'bg-lime-100 text-lime-700 dark:bg-lime-900/30 dark:text-lime-400',
}

function BranchCard({
  branch,
  inflow,
  outflow,
  highestCGPA,
  lowestCGPA,
  averageCGPA,
  medianCGPA,
}: BranchCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="text-center pb-4">
        <div className={cn(
          "py-3 px-4 rounded-lg",
          branchColors[branch]
        )}>
          <CardTitle className="text-xl font-bold">
            {branch}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="rounded-lg border p-4">
          <h4 className="text-sm font-semibold text-muted-foreground mb-3">Branch Movement</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <ArrowDownRight className="h-4 w-4 text-red-500" />
              <div>
                <p className="text-sm font-medium">Outflow</p>
                <p className="text-lg font-bold">{outflow}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ArrowUpRight className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-sm font-medium">Inflow</p>
                <p className="text-lg font-bold">{inflow}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg border p-4">
          <h4 className="text-sm font-semibold text-muted-foreground mb-3">CGPA Analysis</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <div className="rounded-md bg-yellow-100 dark:bg-yellow-900/30 p-2">
                <Trophy className="h-4 w-4 text-yellow-600 dark:text-yellow-500" />
              </div>
              <div>
                <p className="text-sm font-medium">Highest</p>
                <p className="text-lg font-bold">{highestCGPA.toFixed(2)}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="rounded-md bg-red-100 dark:bg-red-900/30 p-2">
                <Target className="h-4 w-4 text-red-600 dark:text-red-500" />
              </div>
              <div>
                <p className="text-sm font-medium">Lowest</p>
                <p className="text-lg font-bold">{lowestCGPA.toFixed(2)}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="rounded-md bg-blue-100 dark:bg-blue-900/30 p-2">
                <BarChart3 className="h-4 w-4 text-blue-600 dark:text-blue-500" />
              </div>
              <div>
                <p className="text-sm font-medium">Average</p>
                <p className="text-lg font-bold">{averageCGPA.toFixed(2)}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="rounded-md bg-purple-100 dark:bg-purple-900/30 p-2">
                <Calculator className="h-4 w-4 text-purple-600 dark:text-purple-500" />
              </div>
              <div>
                <p className="text-sm font-medium">Median</p>
                <p className="text-lg font-bold">{medianCGPA.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface BranchCardsProps {
  detailedBranchStats: DetailedBranchStats[]
}

export function BranchCards({ detailedBranchStats }: BranchCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {detailedBranchStats.map(stats => (
        <BranchCard
          key={stats.branch}
          {...stats}
        />
      ))}
    </div>
  )
} 