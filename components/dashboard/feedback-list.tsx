"use client"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function FeedbackList({ feedbacks }: { feedbacks: any[] }) {
    if (!feedbacks || feedbacks.length === 0) {
        return (
            <div className="flex h-[400px] flex-col items-center justify-center rounded-lg border border-dashed shadow-sm">
                <div className="flex flex-col items-center gap-1 text-center">
                    <h3 className="text-2xl font-bold tracking-tight">No feedback yet</h3>
                    <p className="text-sm text-muted-foreground">
                        Share your project scripts to start collecting feedback.
                    </p>
                </div>
            </div>
        )
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Feedback</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Type</TableHead>
                            <TableHead>Content</TableHead>
                            <TableHead>User</TableHead>
                            <TableHead>Sentiment</TableHead>
                            <TableHead className="text-right">Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {feedbacks.map((feedback) => (
                            <TableRow key={feedback.id}>
                                <TableCell>
                                    <Badge variant={
                                        feedback.type === 'BUG' ? 'destructive' :
                                            feedback.type === 'FEATURE' ? 'default' : 'secondary'
                                    }>
                                        {feedback.type}
                                    </Badge>
                                </TableCell>
                                <TableCell className="font-medium truncate max-w-[300px]" title={feedback.content}>
                                    {feedback.content}
                                </TableCell>
                                <TableCell>{feedback.userEmail || 'Anonymous'}</TableCell>
                                <TableCell>
                                    {feedback.sentiment === 'POSITIVE' && <span className="text-green-500">Positive</span>}
                                    {feedback.sentiment === 'NEGATIVE' && <span className="text-red-500">Negative</span>}
                                    {feedback.sentiment === 'NEUTRAL' && <span className="text-yellow-500">Neutral</span>}
                                    {!feedback.sentiment && <span className="text-muted-foreground">-</span>}
                                </TableCell>
                                <TableCell className="text-right">
                                    {new Date(feedback.createdAt).toLocaleDateString()}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
