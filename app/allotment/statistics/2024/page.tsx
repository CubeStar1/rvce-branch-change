"use client"

import { useEffect, useState } from 'react'
import { StatsOverview } from '@/components/statistics/StatsOverview'
import { BranchCards } from '@/components/statistics/branch-cards'
import { StatsSkeleton } from '@/components/statistics/stats-skeleton'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Statistics2024() {
  const [data, setData] = useState([])
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

  if (loading) {
    return (
      <div className="container mx-auto py-10">
        <StatsSkeleton />
      </div>
    )
  }

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
              <CardTitle>Allotment Statistics 2024</CardTitle>
            </CardHeader>
            <CardContent>
              <StatsOverview data={data} year="2024" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="branches" className="space-y-4">
              <BranchCards data={data} />
        </TabsContent>
      </Tabs>
    </div>
  )
} 