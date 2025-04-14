"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, Search, Heart, Calendar, PlusCircle, ListChecks, Users, Settings, BarChart3 } from "lucide-react"

interface NavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  roles: Array<"buyer" | "owner" | "admin">
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
    roles: ["buyer", "owner", "admin"],
  },
  {
    title: "Browse Properties",
    href: "/properties",
    icon: Search,
    roles: ["buyer", "owner", "admin"],
  },
  {
    title: "Saved Properties",
    href: "/dashboard/saved",
    icon: Heart,
    roles: ["buyer"],
  },
  {
    title: "My Visits",
    href: "/dashboard/visits",
    icon: Calendar,
    roles: ["buyer"],
  },
  {
    title: "My Properties",
    href: "/dashboard/my-properties",
    icon: ListChecks,
    roles: ["owner"],
  },
  {
    title: "Add Property",
    href: "/dashboard/my-properties/new",
    icon: PlusCircle,
    roles: ["owner"],
  },
  {
    title: "Investment Analysis",
    href: "/dashboard/investment",
    icon: BarChart3,
    roles: ["buyer", "owner"],
  },
  {
    title: "Manage Users",
    href: "/admin/users",
    icon: Users,
    roles: ["admin"],
  },
  {
    title: "Manage Properties",
    href: "/admin/properties",
    icon: ListChecks,
    roles: ["admin"],
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
    roles: ["buyer", "owner", "admin"],
  },
]

interface DashboardNavProps {
  userRole: "buyer" | "owner" | "admin"
}

export function DashboardNav({ userRole }: DashboardNavProps) {
  const pathname = usePathname()

  const filteredNavItems = navItems.filter((item) => item.roles.includes(userRole))

  return (
    <nav className="space-y-1 px-2">
      {filteredNavItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
            pathname === item.href || pathname.startsWith(`${item.href}/`)
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground",
          )}
        >
          <item.icon className="mr-2 h-4 w-4" />
          {item.title}
        </Link>
      ))}
    </nav>
  )
}
