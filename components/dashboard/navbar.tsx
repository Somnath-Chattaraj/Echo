"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { LayoutGrid, Inbox, ChevronDown, LogOut, Box, Plus, Settings } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { authClient } from "@/lib/auth-client"
// import { signOut } from "@/lib/auth-client"

interface Project {
    id: string
    name: string
    createdAt: Date
    feedbacks: any[]
}

interface User {
    name: string
    email: string
    avatar: string
}

interface NavbarProps {
    projects: Project[]
    user: User
}

export function Navbar({ projects, user }: NavbarProps) {
    const pathname = usePathname()
    const router = useRouter()
    // Find active project based on URL or default to first
    // Assuming URL pattern /dashboard/project/[id]
    const projectId = pathname.split('/dashboard/project/')[1]?.split('/')[0]
    const activeProject = projectId ? projects.find(p => p.id === projectId) : null

    const handleSignOut = async () => {
        console.log("Signing out...")
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/sign-in"); // redirect to login page
                },
            },
        });
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-16 items-center px-6 gap-4">
                {/* Left: Logo & Project Switcher */}
                <div className="flex items-center gap-4 min-w-[240px] dark:text-white">
                    <Link href="/dashboard" className="flex items-center gap-2 font-bold text-lg tracking-tight hover:opacity-80 transition-opacity">
                        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                            <LayoutGrid className="size-4" />
                        </div>
                        Echo
                    </Link>

                    <div className="h-6 w-px bg-border/50 mx-2" />

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-9 px-2 gap-2 font-normal hover:bg-muted/50 text-muted-foreground">
                                {activeProject ? (
                                    <>
                                        <div className="flex aspect-square size-5 items-center justify-center rounded-md bg-primary/10 text-primary">
                                            <Box className="size-3" />
                                        </div>
                                        <span className="truncate max-w-[120px]">{activeProject.name}</span>
                                    </>
                                ) : (
                                    <span className="text-muted-foreground">Select Project</span>
                                )}
                                <ChevronDown className="size-3 text-muted-foreground opacity-50" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-[200px]">
                            <DropdownMenuLabel className="text-xs text-muted-foreground font-medium">
                                Projects
                            </DropdownMenuLabel>
                            {projects.map((project) => (
                                <DropdownMenuItem
                                    key={project.id}
                                    onClick={() => router.push(`/dashboard/project/${project.id}`)}
                                    className="gap-2"
                                >
                                    <div className="flex size-6 items-center justify-center rounded-md border border-primary/20 bg-primary/10 text-primary">
                                        <Box className="size-3" />
                                    </div>
                                    <span className="truncate">{project.name}</span>
                                </DropdownMenuItem>
                            ))}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => router.push('/dashboard')} className="gap-2">
                                <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                                    <Plus className="size-3" />
                                </div>
                                <span>All Projects</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                {/* Center: Navigation */}
                <nav className="flex items-center justify-center flex-1 gap-2">
                    <Button
                        variant={pathname === "/dashboard" ? "secondary" : "ghost"}
                        size="sm"
                        asChild
                        className={pathname === "/dashboard" ? "bg-secondary text-secondary-foreground" : "text-muted-foreground"}
                    >
                        <Link href="/dashboard" className="gap-2">
                            <LayoutGrid className="size-4" />
                            Overview
                        </Link>
                    </Button>
                    {activeProject && (
                        <Button
                            variant={pathname.includes("/dashboard/project/") ? "secondary" : "ghost"}
                            size="sm"
                            asChild
                            className={pathname.includes("/dashboard/project/") ? "bg-secondary text-secondary-foreground" : "text-muted-foreground"}
                        >
                            <Link href={`/dashboard/project/${activeProject.id}`} className="gap-2">
                                <Inbox className="size-4" />
                                Feedback Inbox
                            </Link>
                        </Button>
                    )}
                </nav>

                {/* Right: User Profile */}
                <div className="flex items-center justify-end min-w-[240px] gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-9 w-9 rounded-full relative overflow-hidden ring-1 ring-border/50 hover:ring-border transition-all">
                                <Avatar className="h-9 w-9">
                                    <AvatarImage src={user.avatar} alt={user.name} />
                                    <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[200px]">
                            <div className="flex items-center justify-start gap-2 p-2">
                                <div className="flex flex-col space-y-1 leading-none">
                                    <p className="font-medium">{user.name}</p>
                                    <p className="text-xs leading-none text-muted-foreground">
                                        {user.email}
                                    </p>
                                </div>
                            </div>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-500 focus:bg-red-500/10" onClick={handleSignOut}>
                                <LogOut className="mr-2 h-4 w-4" />
                                Log out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    )
}


