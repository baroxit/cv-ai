"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { User } from '@supabase/supabase-js'

import {
  BicepsFlexed,
  BriefcaseBusiness,
  GalleryHorizontalEnd,
  LifeBuoy,
  Plus,
  Send,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {createClient} from "@/utils/supabase/client";
import { getUserMetadata } from "@/api/about/serverActions";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const [user, setUser] = useState<User | null>(null)
  const [userData, setUserData] = useState<{ name: string; email: string }>({ name: '', email: '' })
  const supabase = createClient()

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser()
      if (data) {
        setUser(data.user)
        try {
          const metadata = await getUserMetadata()
          setUserData(metadata)
        } catch (error) {
          console.error('Error fetching user metadata:', error)
        }
      } else {
        console.error(error)
      }
    }

    fetchUser()
  }, [])

  const data = {
    navMain: [
      {
        title: "About me",
        url: "/dashboard/experiences",
        icon: BicepsFlexed,
      },
      {
        title: "CVs",
        url: "/dashboard/cv",
        icon: BriefcaseBusiness,
      },
      {
        title: "Create CV",
        url: "/dashboard/cv/create/company",
        icon: Plus,
      },
    ],
    navSecondary: [
      {
        title: "Support",
        url: "#",
        icon: LifeBuoy,
      },
      {
        title: "Feedback",
        url: "#",
        icon: Send,
      },
    ]
  }

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-10 items-center justify-center rounded-lg bg-background border">
                  <GalleryHorizontalEnd className="size-5" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">CVbyAI</span>
                  <span className="truncate text-xs">v1.0.0</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        {user && <NavUser user={{ email: userData.email, name: userData.name }} />}
      </SidebarFooter>
    </Sidebar>
  )
}
