"use client"
import { type LucideIcon } from "lucide-react"
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function NavItems({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  const pathname = usePathname();
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => {
          const active = pathname === item.url || item.isActive;

          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                className={`flex items-center gap-2 ${active
                  ? "bg-[#A9F877] shadow-2xl hover:bg-[#C1FF72]"
                  : ""
                  }`}
              >
                <Link href={item.url}>
                  {item.icon && <item.icon />}
                  <span className="capitalize">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}