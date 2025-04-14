"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Sidebar, SidebarContent, SidebarHeader, SidebarFooter, SidebarTrigger } from "@/components/ui/sidebar"
import { DashboardNav } from "@/components/dashboard-nav"
import { UserNav } from "@/components/user-nav"
import { Home } from "lucide-react"
import Link from "next/link"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [userRole, setUserRole] = useState<"buyer" | "owner" | "admin">("buyer")

  // In a real app, we would fetch the user role from an API
  // For now, we'll simulate different roles based on the URL
  useEffect(() => {
    if (pathname.includes("/admin")) {
      setUserRole("admin")
    } else if (pathname.includes("/my-properties")) {
      setUserRole("owner")
    } else {
      setUserRole("buyer")
    }
  }, [pathname])

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="md:hidden mr-2">
            <SidebarTrigger />
          </div>
          <Link href="/" className="flex items-center space-x-2 mr-4">
            <Home className="h-6 w-6" />
            <span className="font-bold text-xl hidden md:inline-block">HomeHive</span>
          </Link>
          <div className="ml-auto flex items-center space-x-4">
            <UserNav userRole={userRole} />
          </div>
        </div>
      </header>
      <div className="flex flex-1">
        <Sidebar>
          <SidebarHeader className="border-b px-6 py-4">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <Home className="h-6 w-6" />
              <span className="font-bold text-xl">HomeHive</span>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <DashboardNav userRole={userRole} />
          </SidebarContent>
          <SidebarFooter className="border-t p-4">
            <div className="text-xs text-muted-foreground">© {new Date().getFullYear()} HomeHive</div>
          </SidebarFooter>
        </Sidebar>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
