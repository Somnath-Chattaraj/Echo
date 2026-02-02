import prisma from "@/lib/db";
import { FeedbackType, Sentiment } from "@/lib/generated/prisma/enums";


async function main() {
    // 1. Clean existing data (Optional, but good for fresh starts)
    await prisma.label.deleteMany();
    await prisma.feedback.deleteMany();
    await prisma.project.deleteMany();
    await prisma.user.deleteMany();

    console.log("Creating random seed data...");

    // 2. Create a Demo User
    const demoUser = await prisma.user.create({
        data: {
            email: "dev@example.com",
            name: "Demo Developer",
            // If using Credentials, you'd add a hashed password here
        },
    });

    // 3. Create Projects
    const projectA = await prisma.project.create({
        data: {
            name: "SaaS Dashboard",
            userId: demoUser.id,
        },
    });

    const projectB = await prisma.project.create({
        data: {
            name: "Mobile App",
            userId: demoUser.id,
        },
    });

    // 4. Create Random Feedback
    const feedbackItems = [
        {
            content: "The login page takes too long to load on Safari.",
            type: FeedbackType.BUG,
            sentiment: Sentiment.NEGATIVE,
            userEmail: "user1@gmail.com",
            projectId: projectA.id,
        },
        {
            content: "I really love the new dark mode theme! Looks amazing.",
            type: FeedbackType.FEATURE,
            sentiment: Sentiment.POSITIVE,
            userEmail: "design_fan@outlook.com",
            projectId: projectA.id,
        },
        {
            content: "Could you add a CSV export option for the analytics?",
            type: FeedbackType.FEATURE,
            sentiment: Sentiment.NEUTRAL,
            projectId: projectA.id,
        },
        {
            content: "App crashes when I try to upload a 5MB image.",
            type: FeedbackType.BUG,
            sentiment: Sentiment.NEGATIVE,
            projectId: projectB.id,
        },
    ];

    for (const item of feedbackItems) {
        const feedback = await prisma.feedback.create({
            data: item,
        });

        // 5. Add a Label to the Bug
        if (item.type === FeedbackType.BUG) {
            await prisma.label.create({
                data: {
                    name: "High Priority",
                    color: "#ef4444", // Red
                    feedbackId: feedback.id,
                },
            });
        }
    }

    console.log("Seed successful! Created:");
    console.log(`- 1 User\n- 2 Projects\n- ${feedbackItems.length} Feedback entries`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });