"use server"

import { auth } from "@/lib/auth"
import prisma from "@/lib/db"
import { headers } from "next/headers"
import { revalidatePath } from "next/cache"
// @ts-ignore
import { SentimentAnalyzer } from 'node-nlp';

const analyzer = new SentimentAnalyzer({ language: 'en' });

export async function analyzeSentiment(feedbackId: string) {
    const session = await auth.api.getSession({
        headers: await headers(),
    })

    if (!session?.user) {
        throw new Error("Unauthorized")
    }

    const feedback = await prisma.feedback.findUnique({
        where: { id: feedbackId },
        select: { content: true }
    })

    if (!feedback) throw new Error("Feedback not found")

    const result = await analyzer.getSentiment(feedback.content);
    let sentiment: "POSITIVE" | "NEGATIVE" | "NEUTRAL" = "NEUTRAL";

    if (result.score > 0.3) sentiment = "POSITIVE";
    else if (result.score < -0.3) sentiment = "NEGATIVE";

    await prisma.feedback.update({
        where: { id: feedbackId },
        data: { sentiment }
    })

    return sentiment
}
