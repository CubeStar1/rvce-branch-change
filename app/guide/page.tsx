"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, FileText, Eye, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"


const timelineData = [
  {
    date: "05-09-2024",
    title: "Application Start",
    description: "Commencement of online applications on VTU portal",
    circular: "branch_change_announcement"
  },
  {
    date: "22-09-2024",
    title: "Student Application Deadline",
    description: "Last date for students to apply on VTU portal",
    circular: null
  },
  {
    date: "26-09-2024",
    title: "College Verification Deadline",
    description: "Last date for Colleges to verify and submit to VTU",
    circular: null
  },
  {
    date: "08-10-2024",
    title: "Merit List Generation",
    description: "Generation of merit list by VTU",
    circular: "branch_change_merit_list"
  },
  {
    date: "09-10-2024",
    title: "Branch Change Offline Counselling",
    description: "Students to attend offline counselling",
    circular: "branch_change_counselling"
  },
  {
    date: "12-11-2024",
    title: "Branch Change Fee Payment",
    description: "Colleges to download and recommend allotment. Students to pay Rs 9000 fee",
    circular: "branch_change_fees"
  },
  {
    date: "13-11-2024",
    title: "Final Allotment",
    description: "Final branch change allotment list released",
    circular: "branch_change_allotment_list"
  }
]

const circulars = [
  {
    title: "Branch Change Announcement",
    description: "Official announcement for branch change process",
    filename: "branch_change_announcement"
  },
  {
    title: "Branch Change Application Process",
    description: "Instructions and guidelines for applying for branch change",
    filename: "branch_change_application_process"
  },
  {
    title: "Merit List",
    description: "Official merit list for branch change",
    filename: "branch_change_merit_list"
  },
  {
    title: "Offline Counselling Details",
    description: "Information about offline counselling process",
    filename: "branch_change_counselling"
  },
  {
    title: "Fee Details",
    description: "Information about fees and payment process",
    filename: "branch_change_fees"
  },
  {
    title: "Final Allotment List",
    description: "Final branch change allotment results",
    filename: "branch_change_allotment_list"
  }
]

export default function GuidePage() {
  const handleDownload = async (filename: string) => {
    try {
      const response = await fetch(`/api/circulars/view?filename=${filename}`)
      
      if (!response.ok) {
        throw new Error('Failed to get download URL')
      }

      const { url } = await response.json()
      const link = document.createElement('a')
      link.href = url
      link.download = `${filename}.pdf`
      link.target = '_blank'
      document.body.appendChild(link)
      link.click()
      link.remove()
    } catch (error) {
      console.error('Error downloading file:', error)
    }
  }

  const handleView = async (filename: string) => {
    try {
      const response = await fetch(`/api/circulars/view?filename=${filename}`)
      
      if (!response.ok) {
        throw new Error('Failed to get view URL')
      }

      const { url } = await response.json()
      window.open(url, '_blank')
    } catch (error) {
      console.error('Error viewing file:', error)
    }
  }

  return (
    <div className="container mx-auto py-10 space-y-10 px-4 sm:px-0">
      <section>
        <h2 className="text-3xl font-bold mb-6">Branch Change Process Timeline</h2>
        <div className="relative">
          <div className="absolute left-4 h-full w-0.5 bg-border hidden sm:block" />
          
          <div className="space-y-4">
            {timelineData.map((item, index) => (
              <div key={index} className="pl-0 sm:pl-12 relative">
                <div className="hidden sm:block absolute left-2.5 top-6 w-3 h-3 rounded-full bg-primary border-4 border-background" />
                
                <Card>
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <Badge variant="secondary" className="flex items-center gap-1 w-fit">
                        <Calendar className="h-3 w-3" />
                        {item.date}
                      </Badge>
                    </div>
                    <CardDescription className="text-sm">
                      {item.description}
                    </CardDescription>
                  </CardHeader>
                  {item.circular && (
                    <CardContent>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleView(item.circular)}
                        className="w-full sm:w-auto"
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View Circular
                      </Button>
                    </CardContent>
                  )}
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6">Important Documents</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {circulars.map((circular) => (
            <Card key={circular.filename} className="flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  <h1 className="text-lg font-semibold">{circular.title}</h1>
                </CardTitle>
                <CardDescription>{circular.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col sm:flex-row gap-2 mt-auto">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleView(circular.filename)}
                  className="w-full sm:w-auto"
                >
                  <Eye className="mr-2 h-4 w-4" />
                  View
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleDownload(circular.filename)}
                  className="w-full sm:w-auto"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
} 