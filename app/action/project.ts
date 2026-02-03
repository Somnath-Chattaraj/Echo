"use server"

import { auth } from "@/lib/auth"
import prisma from "@/lib/db"
import { headers } from "next/headers"
import { revalidatePath } from "next/cache"

export async function createProject(name: string, url?: string) {
    const session = await auth.api.getSession({
        headers: await headers(),
    })

    if (!session?.user) {
        throw new Error("Unauthorized")
    }

    const project = await prisma.project.create({
        data: {
            name,
            userId: session.user.id,
        },
    })

    revalidatePath("/dashboard")
    return project
}
