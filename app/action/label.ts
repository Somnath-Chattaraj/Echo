"use server"

import { auth } from "@/lib/auth"
import prisma from "@/lib/db"
import { headers } from "next/headers"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function addLabel(feedbackId: string, name: string) {
    const session = await auth.api.getSession({
        headers: await headers(),
    })

    if (!session?.user) {
        redirect('/sign-in');
    }

    const label = await prisma.label.create({
        data: {
            name,
            feedbackId,
        },
    })

    return label
}
