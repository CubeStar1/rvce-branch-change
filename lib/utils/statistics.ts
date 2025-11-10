import { getAllotmentList, AllotmentData } from './allotment'

export interface BranchStats {
  branch: string
  inflow: number
  outflow: number
  cutoff: number
}

export interface DetailedBranchStats {
  branch: string
  inflow: number
  outflow: number
  highestCGPA: number
  lowestCGPA: number
  averageCGPA: number
  medianCGPA: number
}

export interface OverviewStats {
  totalBranchChanges: number
  uniqueNewBranches: number
  averageCGPA: string
}

export interface AllotmentStatistics {
  overviewStats: OverviewStats
  branchStats: BranchStats[]
  detailedBranchStats: DetailedBranchStats[]
  rawData: AllotmentData[]
}

const BRANCHES = [
  'CSE', 'ISE', 'ECE', 'CD', 'CY', 'AIML', 'ETE', 
  'IEM', 'EIE', 'EEE', 'ME', 'CV', 'AS', 'CH'
]

export async function getAllotmentStatistics(year: string): Promise<AllotmentStatistics> {
  const data = await getAllotmentList(year)

  const totalBranchChanges = data.length
  const uniqueNewBranches = [...new Set(data.map(item => item.new_branch))].length
  const averageCGPA = data.length > 0 
    ? (data.reduce((acc, curr) => acc + curr.cgpa, 0) / data.length).toFixed(2)
    : '0.00'

  const branchStats: BranchStats[] = BRANCHES.map(branch => {
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

  const detailedBranchStats: DetailedBranchStats[] = BRANCHES.map(branch => {
    const inflow = data.filter(item => item.new_branch === branch)
    const outflow = data.filter(item => item.old_branch === branch)
    
    const inflowCGPAs = inflow.map(item => item.cgpa)
    const sortedCGPAs = inflowCGPAs.sort((a, b) => a - b)
    const medianCGPA = inflowCGPAs.length > 0 
      ? sortedCGPAs[Math.floor(inflowCGPAs.length / 2)]
      : 0

    return {
      branch,
      inflow: inflow.length,
      outflow: outflow.length,
      highestCGPA: inflow.length > 0 ? Math.max(...inflowCGPAs) : 0,
      lowestCGPA: inflow.length > 0 ? Math.min(...inflowCGPAs) : 0,
      averageCGPA: inflow.length > 0 
        ? inflowCGPAs.reduce((a, b) => a + b, 0) / inflowCGPAs.length
        : 0,
      medianCGPA,
    }
  })

  return {
    overviewStats: {
      totalBranchChanges,
      uniqueNewBranches,
      averageCGPA,
    },
    branchStats,
    detailedBranchStats,
    rawData: data,
  }
}
