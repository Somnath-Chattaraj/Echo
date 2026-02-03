"use client"

import * as React from "react"
import { ChevronsUpDown, Plus, Box } from "lucide-react"
import { useRouter, useParams } from "next/navigation"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"

export function ProjectSwitcher({
    projects,
}: {
    projects: {
        id: string
        name: string
        createdAt: Date
        feedbacks: any[]
    }[]
}) {
    const { isMobile } = useSidebar()
    const { projectId } = useParams()
    const router = useRouter()

    const activeProject = projects.find(p => p.id === projectId) || projects[0]

    const handleSelectProject = (id: string) => {
        router.push(`/dashboard/project/${id}`)
    }

    if (!activeProject) {
        return null;
    }

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground transition-all duration-200"
                        >
                            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20">
                                <Box className="size-4" />
                            </div>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold tracking-tight">
                                    {activeProject.name}
                                </span>
                                <span className="truncate text-xs text-muted-foreground">
                                    {projects.length} {projects.length === 1 ? 'Project' : 'Projects'}
                                </span>
                            </div>
                            <ChevronsUpDown className="ml-auto opacity-50" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-xl border-border/50 bg-popover/95 backdrop-blur-sm"
                        align="start"
                        side={isMobile ? "bottom" : "right"}
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                            Projects
                        </DropdownMenuLabel>
                        {projects.map((project) => (
                            <DropdownMenuItem
                                key={project.id}
                                onClick={() => handleSelectProject(project.id)}
                                className="gap-2 p-2 cursor-pointer focus:bg-accent/50"
                            >
                                <div className="flex size-6 items-center justify-center rounded-md border border-primary/20 bg-primary/10 text-primary">
                                    <Box className="size-3" />
                                </div>
                                <span className="flex-1 truncate font-medium">{project.name}</span>
                            </DropdownMenuItem>
                        ))}
                        <DropdownMenuSeparator className="bg-border/50" />
                        <DropdownMenuItem className="gap-2 p-2 cursor-pointer text-muted-foreground hover:text-foreground focus:bg-accent/50" onClick={() => router.push('/dashboard')}>
                            <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                                <Plus className="size-4" />
                            </div>
                            <div className="font-medium">View All Projects</div>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
