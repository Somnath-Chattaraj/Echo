import { Navbar } from "@/components/dashboard/navbar"
import { AntiGravityBackground } from "@/components/ui/anti-gravity-background"
import { getAllfeedback } from "@/app/action/feedback"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import prisma from "@/lib/db"
import { BGPattern } from "@/components/ui/bg-pattern"
import { redirect } from "next/navigation"

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const projects = await getAllfeedback()
    const session = await auth.api.getSession({
        headers: await headers(),
    })
    if (!session?.user) {
        redirect('/sign-in');
    }
    const dbUser = session?.user?.id ? await prisma.user.findUnique({
        where: {
            id: session.user.id
        }
    }) : null

    const user = {
        name: session?.user?.name || "User",
        email: session?.user?.email || "user@example.com",
        avatar: dbUser?.image || session?.user?.image || "",
    }

    return (
        <div className="min-h-screen w-full relative dark">
            <AntiGravityBackground />
            <BGPattern variant="grid" mask="fade-edges" />
            <Navbar projects={projects} user={user} />
            <main className="flex-1 space-y-4 p-8 pt-6">
                {children}
            </main>
        </div>
    )
}
