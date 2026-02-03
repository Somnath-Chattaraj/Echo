"use server"

import { auth } from "@/lib/auth"
import prisma from "@/lib/db";
import { headers } from "next/headers";

async function getSession() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    return session;
}

export async function getAllfeedback() {
    const session = await getSession();
    if (!session?.user) {
        throw new Error("Unauthorized");
    }

    const project = await prisma.project.findMany({
        where: {
            user: {
                id: session.user.id,
            },
        },
        select: {
            id: true,
            name: true,
            createdAt: true,
            feedbacks: true,

        }
    });

    return project;
}

export async function getProjectFeedback(projectId: string) {
    const session = await getSession();
    if (!session?.user) {
        throw new Error("Unauthorized");
    }

    const project = await prisma.project.findUnique({
        where: {
            id: projectId,
            user: {
                id: session.user.id,
            },
        },
        select: {
            projectKey: true,
        }
    });

    return project?.projectKey;
}