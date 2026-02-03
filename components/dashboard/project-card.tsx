import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Feedback } from "@/lib/generated/prisma/client"
import { ArrowRight, MessageSquareText, Calendar } from "lucide-react"
import NextLink from "next/link"

interface ProjectCardProps {
    project: {
        id: string
        name: string
        createdAt: Date
        feedbacks: Feedback[]
    }
}

export function ProjectCard({ project }: ProjectCardProps) {
    const hasRecentFeedback = project.feedbacks.some(f => {
        const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)
        return new Date(f.createdAt) > twentyFourHoursAgo
    })

    return (
        <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary/50 group bg-card/50 backdrop-blur-sm border-muted/60 relative">
            <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                    <CardTitle className="truncate text-xl font-bold tracking-tight flex items-center gap-2">
                        {project.name}
                        {hasRecentFeedback && (
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                            </span>
                        )}
                    </CardTitle>
                    <div className="rounded-full bg-primary/10 p-2 text-primary">
                        <MessageSquareText className="h-4 w-4" />
                    </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {new Date(project.createdAt).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                    })}
                </div>
            </CardHeader>
            <CardContent className="flex-1 pb-4">
                <div className="flex flex-col gap-1">
                    <span className="text-3xl font-bold text-foreground">{project.feedbacks.length}</span>
                    <span className="text-sm text-muted-foreground font-medium">Total Feedbacks</span>
                </div>
            </CardContent>
            <CardFooter className="pt-0">
                <Button asChild className="w-full relative overflow-hidden group/btn" variant="secondary">
                    <NextLink href={`/dashboard/project/${project.id}`}>
                        <span className="relative z-10 flex items-center gap-2">
                            View Feedback
                            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                        </span>
                    </NextLink>
                </Button>
            </CardFooter>
        </Card>
    )
}
