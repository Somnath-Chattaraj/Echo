import prisma from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
    return new NextResponse(null, {
        status: 204,
        headers: corsHeaders,
    });
}

export async function GET(req: NextRequest) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401, headers: corsHeaders }
        );
    }

    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get("projectId");
    const type = searchParams.get("type");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = 20;

    if (!projectId) {
        return NextResponse.json(
            { error: "Project ID required" },
            { status: 400, headers: corsHeaders }
        );
    }

    const project = await prisma.project.findFirst({
        where: {
            id: projectId,
            userId: session.user.id,
        },
    });

    if (!project) {
        return NextResponse.json(
            { error: "Project not found" },
            { status: 404, headers: corsHeaders }
        );
    }

    const where: any = { projectId };
    if (type && type !== "ALL") where.type = type;

    const feedbacks = await prisma.feedback.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
        include: { labels: true },
    });

    const total = await prisma.feedback.count({ where });
    const hasMore = total > page * limit;

    return NextResponse.json(
        { feedbacks, hasMore },
        { headers: corsHeaders }
    );
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { projectKey, content, pageUrl, type } = body;

        if (!projectKey || !content) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400, headers: corsHeaders }
            );
        }

        const project = await prisma.project.findUnique({
            where: { projectKey },
        });

        if (!project) {
            return NextResponse.json(
                { error: "Project not found" },
                { status: 404, headers: corsHeaders }
            );
        }

        const feedback = await prisma.feedback.create({
            data: {
                content,
                projectId: project.id,
                pageUrl: pageUrl || "",
                type: type || "OTHER",
            },
        });

        return NextResponse.json(
            { success: true },
            { headers: corsHeaders }
        );
    } catch (error) {
        console.error("Error creating feedback:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500, headers: corsHeaders }
        );
    }
}