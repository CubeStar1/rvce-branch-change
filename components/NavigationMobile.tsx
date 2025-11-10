import React from 'react'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu"

interface NavigationMobileProps {
  components: { title: string; href: string }[];
  meritListItems: { title: string; href: string; description: string }[];
  allotmentItems: { title: string; href: string; description: string }[];
  statisticsItems: { title: string; href: string; description: string }[];
}

export function NavigationMobile({ 
  components, 
  meritListItems, 
  allotmentItems,
  statisticsItems
}: NavigationMobileProps) {
  return (
    <div className="flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Menu className="h-[1.2rem] w-[1.2rem]" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end">
          <DropdownMenuGroup>
            {components.map((item) => (
              <DropdownMenuItem key={item.title}>
                <Link href={item.href} className="w-full">
                  {item.title}
                </Link>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Merit List</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                {meritListItems.map((item) => (
                  <DropdownMenuItem key={item.title}>
                    <Link href={item.href} className="w-full">
                      {item.title}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Allotment</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                {allotmentItems.map((item) => (
                  <DropdownMenuItem key={item.title}>
                    <Link href={item.href} className="w-full">
                      {item.title}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Statistics</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                {statisticsItems.map((item) => (
                  <DropdownMenuItem key={item.title}>
                    <Link href={item.href} className="w-full">
                      {item.title}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}