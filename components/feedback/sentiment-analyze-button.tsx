"use client"

import { Button } from "@/components/ui/button"
import { analyzeSentiment } from "@/app/action/analyze-sentiment"
import { useState } from "react"
import { Loader2, Wand2 } from "lucide-react"
import { useQueryClient } from "@tanstack/react-query"

interface AnalyzeButtonProps {
    feedbackId: string
    projectId: string
    onAnalyzed?: () => void
}

export function AnalyzeButton({ feedbackId, projectId, onAnalyzed }: AnalyzeButtonProps) {
    const [loading, setLoading] = useState(false)
    const queryClient = useQueryClient()

    const handleAnalyze = async () => {
        setLoading(true)
        try {
            await analyzeSentiment(feedbackId)
            // Invalidate queries to refresh the list
            queryClient.invalidateQueries({ queryKey: ["feedbacks", projectId] })
            onAnalyzed?.()
        } catch (error) {
            console.error("Failed to analyze", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Button
            variant="outline"
            size="sm"
            onClick={handleAnalyze}
            disabled={loading}
            className="h-7 px-2 text-xs"
        >
            {loading ? (
                <Loader2 className="mr-1 h-3 w-3 animate-spin" />
            ) : (
                <Wand2 className="mr-1 h-3 w-3" />
            )}
            Analyze
        </Button>
    )
}
