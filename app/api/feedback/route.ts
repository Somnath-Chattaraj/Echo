import prisma from "@/lib/db";
import { FeedbackType } from "@/lib/generated/prisma/enums";
import { NextRequest, NextResponse } from "next/server";
interface FeedbackBody {
    content: string;
    type: FeedbackType;
    userEmail?: string;
    projectId: string;
}


async function analyzeSentiment(text: string) {
    console.log("Sentiment Analysis");
}

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-API-Key",
};

export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: NextRequest, res: NextResponse) {
    const body: FeedbackBody = await req.json();
    const { content, type, userEmail, projectId } = body;

    if (!content || !type || !projectId) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Sentiment Analysis
    const sentimentEnum = await analyzeSentiment(content);

    try {
        const feedback = await prisma.feedback.create({
            data: {
                content,
                type,
                userEmail,
                projectId,
                // Save the calculated sentiment
            },
        });
        return NextResponse.json({ feedback });
    } catch (error) {
        console.error("Error creating feedback:", error);
        return NextResponse.json({ error: "Failed to create feedback" }, { status: 500 });
    }
}

export async function GET(req: NextRequest, res: NextResponse) {
    const body: { userId: string } = await req.json();
    const { userId } = body;
    if (!userId) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    const projects = await prisma.project.findMany({
        where: {
            userId: userId,
        },
    });
    return NextResponse.json({ projects });
}