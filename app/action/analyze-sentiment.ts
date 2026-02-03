"use server"

import { auth } from "@/lib/auth"
import prisma from "@/lib/db"
import { headers } from "next/headers"
import { revalidatePath } from "next/cache"
import { GoogleGenerativeAI } from "@google/generative-ai";
import { redirect } from "next/navigation"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export async function analyzeSentiment(feedbackId: string) {
    const session = await auth.api.getSession({
        headers: await headers(),
    })

    if (!session?.user) {
        redirect('/sign-in');
    }

    const feedback = await prisma.feedback.findUnique({
        where: { id: feedbackId },
        select: { content: true }
    })

    if (!feedback) throw new Error("Feedback not found")

    try {
        const prompt = `Analyze the sentiment of the following text and categorize it as exactly one of: POSITIVE, NEUTRAL, or NEGATIVE.
        
        Text: "${feedback.content}"
        
        Sentiment:`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text().trim().toUpperCase();

        let sentiment: "POSITIVE" | "NEGATIVE" | "NEUTRAL" = "NEUTRAL";
        if (text.includes("POSITIVE")) sentiment = "POSITIVE";
        else if (text.includes("NEGATIVE")) sentiment = "NEGATIVE";

        await prisma.feedback.update({
            where: { id: feedbackId },
            data: { sentiment }
        })

        return sentiment
    } catch (error) {
        console.error("Gemini analysis failed:", error)
        return "NEUTRAL"
    }
}
