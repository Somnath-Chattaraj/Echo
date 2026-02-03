"use client"

import { FeedbackTable } from "@/components/feedback/feedback-table"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useParams } from "next/navigation"
import { Link, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import NextLink from "next/link"

const queryClient = new QueryClient()

export default function ProjectFeedbackPage() {
    const params = useParams()
    const projectId = params.projectId as string

    return (
        <QueryClientProvider client={queryClient}>
            <div className="flex flex-1 flex-col gap-8 p-8">
                <div className="flex items-center justify-between border-b border-border/40 pb-6">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                            Feedback Inbox
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            View and manage user feedback for this project.
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" asChild>
                            <NextLink href={`/embed/${projectId}`} target="_blank">
                                <Link className="mr-2 h-4 w-4" />
                                Embed Script
                            </NextLink>
                        </Button>
                    </div>
                </div>
                <FeedbackTable projectId={projectId} />
            </div>
        </QueryClientProvider>
    )
}
