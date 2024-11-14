import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function StatsSkeleton() {
  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="branches">Branch Details</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-8">
              {/* Stats Cards */}
              <div className="grid gap-4 md:grid-cols-3">
                {[1, 2, 3].map((i) => (
                  <Card key={i}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        <Skeleton className="h-4 w-[120px]" />
                      </CardTitle>
                      <Skeleton className="h-4 w-4" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        <Skeleton className="h-8 w-[60px]" />
                      </div>
                      <div className="text-xs text-muted-foreground">
                        <Skeleton className="h-3 w-[140px] mt-1" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Charts Grid */}
              <div className="grid gap-4 md:grid-cols-2">
                {/* Inflow Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>
                      <Skeleton className="h-6 w-[160px]" />
                    </CardTitle>
                    <Skeleton className="h-4 w-[200px]" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-[350px] w-full" />
                  </CardContent>
                </Card>

                {/* Outflow Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>
                      <Skeleton className="h-6 w-[160px]" />
                    </CardTitle>
                    <Skeleton className="h-4 w-[200px]" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-[350px] w-full" />
                  </CardContent>
                </Card>
              </div>

              {/* Cutoff Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>
                    <Skeleton className="h-6 w-[180px]" />
                  </CardTitle>
                  <Skeleton className="h-4 w-[240px]" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-[400px] w-full" />
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="branches">
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <Card key={i}>
                  <CardHeader>
                    <CardTitle>
                      <Skeleton className="h-6 w-[100px]" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-2">
                    {[1, 2, 3, 4, 5, 6].map((j) => (
                      <div key={j} className="flex justify-between">
                        <Skeleton className="h-4 w-[100px]" />
                        <Skeleton className="h-4 w-[60px]" />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
} 