"use client"

import { useQuery } from "@tanstack/react-query"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import { Loader2, Calendar, User, MessageCircle } from "lucide-react"
import { AddLabelPopover } from "./add-label-popover"
import { Label } from "@/lib/generated/prisma/client"
import { AnalyzeButton } from "./sentiment-analyze-button"
import { cn } from "@/lib/utils"


interface Feedback {
    id: string
    content: string
    type: "BUG" | "FEATURE" | "OTHER"
    sentiment: "POSITIVE" | "NEUTRAL" | "NEGATIVE" | null
    createdAt: string
    userEmail: string | null
    labels: Label[]
}

interface FeedbackTableProps {
    projectId: string
}

export function FeedbackTable({ projectId }: FeedbackTableProps) {
    const [filter, setFilter] = useState("ALL")
    const [page, setPage] = useState(1)

    const { data, isLoading, isError } = useQuery({
        queryKey: ["feedbacks", projectId, filter, page],
        queryFn: async () => {
            const res = await fetch(
                `/api/feedback?projectId=${projectId}&type=${filter}&page=${page}`
            )
            if (!res.ok) throw new Error("Failed to fetch feedback")
            return res.json() as Promise<{ feedbacks: Feedback[]; hasMore: boolean }>
        },
    })

    if (isError) return (
        <div className="flex h-40 items-center justify-center rounded-xl border border-dashed border-red-200 bg-red-50/10 text-red-500">
            Failed to load feedback. Please try again later.
        </div>
    )

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <Tabs defaultValue="ALL" onValueChange={setFilter} className="w-full">
                    <TabsList className="bg-muted/50 p-1">
                        <TabsTrigger value="ALL" className="rounded-sm data-[state=active]:bg-background data-[state=active]:shadow-sm">All Feedback</TabsTrigger>
                        <TabsTrigger value="BUG" className="gap-2 rounded-sm data-[state=active]:bg-background data-[state=active]:shadow-sm">
                            <span className="h-1.5 w-1.5 rounded-full bg-red-500" /> Bug
                        </TabsTrigger>
                        <TabsTrigger value="FEATURE" className="gap-2 rounded-sm data-[state=active]:bg-background data-[state=active]:shadow-sm">
                            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" /> Feature
                        </TabsTrigger>
                        <TabsTrigger value="OTHER" className="gap-2 rounded-sm data-[state=active]:bg-background data-[state=active]:shadow-sm">
                            <span className="h-1.5 w-1.5 rounded-full bg-gray-500" /> Other
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>

            <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
                <Table>
                    <TableHeader className="bg-muted/40">
                        <TableRow className="hover:bg-transparent border-b border-border/50">
                            <TableHead className="w-[100px] pl-6 font-semibold">Type</TableHead>
                            <TableHead className="font-semibold">Feedback Content</TableHead>
                            <TableHead className="w-[200px] font-semibold">User</TableHead>
                            <TableHead className="w-[150px] font-semibold">Sentiment</TableHead>
                            <TableHead className="w-[200px] font-semibold">Labels</TableHead>
                            <TableHead className="w-[150px] font-semibold text-right pr-6">Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={6} className="h-32 text-center">
                                    <div className="flex flex-col items-center justify-center gap-2">
                                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                                        <span className="text-sm text-muted-foreground">Loading feedback...</span>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : data?.feedbacks.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="h-64 text-center">
                                    <div className="flex flex-col items-center justify-center gap-4 text-muted-foreground">
                                        <div className="rounded-full bg-muted p-4">
                                            <MessageCircle className="h-8 w-8 opacity-50" />
                                        </div>
                                        <p className="font-medium">No feedback found matching your criteria</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            data?.feedbacks.map((item) => (
                                <TableRow key={item.id} className="group hover:bg-muted/30 transition-colors border-b border-border/40 last:border-0">
                                    <TableCell className="pl-6 align-top py-4">
                                        <Badge
                                            variant="outline"
                                            className={cn(
                                                "capitalize shadow-sm",
                                                item.type === "BUG" && "border-red-200 bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400 dark:border-red-900",
                                                item.type === "FEATURE" && "border-blue-200 bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-900",
                                                item.type === "OTHER" && "border-gray-200 bg-gray-50 text-gray-700 dark:bg-gray-800/30 dark:text-gray-400 dark:border-gray-800"
                                            )}
                                        >
                                            {item.type.toLowerCase()}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="align-top py-4">
                                        <p className="line-clamp-2 text-sm leading-relaxed text-foreground max-w-[500px]" title={item.content}>
                                            {item.content}
                                        </p>
                                    </TableCell>
                                    <TableCell className="align-top py-4">
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                                                <User className="h-3 w-3 text-primary" />
                                            </div>
                                            <span className="truncate max-w-[140px]">{item.userEmail || "Anonymous"}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="align-top py-4">
                                        {item.sentiment === "POSITIVE" && (
                                            <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-400 dark:border-green-900">Positive</Badge>
                                        )}
                                        {item.sentiment === "NEUTRAL" && (
                                            <Badge variant="outline" className="border-yellow-200 bg-yellow-50 text-yellow-700 dark:bg-yellow-950/30 dark:text-yellow-400 dark:border-yellow-900">Neutral</Badge>
                                        )}
                                        {item.sentiment === "NEGATIVE" && (
                                            <Badge variant="outline" className="border-red-200 bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400 dark:border-red-900">Negative</Badge>
                                        )}
                                        {!item.sentiment && (
                                            <div className="flex items-center gap-2">
                                                <AnalyzeButton feedbackId={item.id} projectId={projectId} />
                                            </div>
                                        )}
                                    </TableCell>
                                    <TableCell className="align-top py-4">
                                        <div className="flex flex-wrap items-center gap-1.5">
                                            {item.labels && item.labels.map(label => (
                                                <Badge key={label.id} variant="secondary" className="bg-muted/50 hover:bg-muted text-[10px] h-5 px-1.5 font-normal border-transparent">
                                                    {label.name}
                                                </Badge>
                                            ))}
                                            <AddLabelPopover feedbackId={item.id} projectId={projectId} existingLabels={item.labels} />
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right align-top py-4 pr-6">
                                        <div className="flex items-center justifyContent-end gap-1.5 text-xs text-muted-foreground">
                                            <Calendar className="h-3 w-3" />
                                            {new Date(item.createdAt).toLocaleDateString()}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex justify-center pt-4">
                {data?.hasMore && (
                    <Button
                        variant="ghost"
                        onClick={() => setPage((p) => p + 1)}
                        className="text-muted-foreground hover:text-foreground"
                    >
                        Load More Comments
                    </Button>
                )}
            </div>
        </div>
    )
}
