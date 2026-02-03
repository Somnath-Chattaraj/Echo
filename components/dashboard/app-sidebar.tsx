"use client"

import * as React from "react"
import { Home, Settings } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar"
import { ProjectSwitcher } from "@/components/dashboard/project-switcher"
import { NavUser } from "@/components/dashboard/nav-user"

// This is sample data.
const data = {
    navMain: [
        {
            title: "Overview",
            url: "/dashboard",
            icon: Home,
            isActive: true,
        },
        {
            title: "Settings",
            url: "/dashboard/settings",
            icon: Settings,
            isActive: false,
        }
    ],
}

export function AppSidebar({ projects, user, ...props }: React.ComponentProps<typeof Sidebar> & { projects: any[], user: any }) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <ProjectSwitcher projects={projects} />
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                    {data.navMain.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild isActive={item.isActive} tooltip={item.title}>
                                <a href={item.url}>
                                    <item.icon />
                                    <span>{item.title}</span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
