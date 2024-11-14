import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface TableSkeletonProps {
  columnCount: number
  rowCount?: number
}

export function TableSkeleton({ columnCount, rowCount = 5 }: TableSkeletonProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {Array(columnCount)
              .fill(null)
              .map((_, index) => (
                <TableHead key={index}>
                  <Skeleton className="h-6 w-[100px]" />
                </TableHead>
              ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array(rowCount)
            .fill(null)
            .map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                {Array(columnCount)
                  .fill(null)
                  .map((_, colIndex) => (
                    <TableCell key={colIndex}>
                      <Skeleton className="h-6 w-[100px]" />
                    </TableCell>
                  ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  )
} 