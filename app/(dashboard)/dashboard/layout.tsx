import { AppSidebar } from "@/components/dashboard/app-sidebar"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { getAllfeedback } from "@/app/action/feedback"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const projects = await getAllfeedback()
    const session = await auth.api.getSession({
        headers: await headers(),
    })

    const user = {
        name: session?.user?.name || "User",
        email: session?.user?.email || "user@example.com",
        avatar: session?.user?.image || "",
    }

    return (
        <SidebarProvider className="dark w-full min-h-screen">
            <AppSidebar projects={projects} user={user} />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        {/* Breadcrumbs could go here */}
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
