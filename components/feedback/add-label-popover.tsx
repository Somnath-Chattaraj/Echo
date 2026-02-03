"use client"

import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Tag, Plus, X } from "lucide-react"
import { addLabel } from "@/app/action/label"
import { useQueryClient } from "@tanstack/react-query"
import { Label } from "@/lib/generated/prisma/client"

interface AddLabelPopoverProps {
    feedbackId: string
    projectId: string
    existingLabels?: Label[]
}

export function AddLabelPopover({ feedbackId, projectId, existingLabels = [] }: AddLabelPopoverProps) {
    const [open, setOpen] = useState(false)
    const [labelName, setLabelName] = useState("")
    const [loading, setLoading] = useState(false)
    const queryClient = useQueryClient()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!labelName.trim()) return

        setLoading(true)
        try {
            await addLabel(feedbackId, labelName)
            queryClient.invalidateQueries({ queryKey: ["feedbacks", projectId] })
            setLabelName("")
            setOpen(false)
        } catch (error) {
            console.error("Failed to add label", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-muted">
                    <Tag className="h-4 w-4 text-muted-foreground" />
                    <span className="sr-only">Add Label</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-3" align="end">
                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                    <p className="text-sm font-medium">Add Label</p>
                    <div className="flex gap-2">
                        <Input
                            placeholder="Label name (e.g. urgent)"
                            value={labelName}
                            onChange={(e) => setLabelName(e.target.value)}
                            className="h-8"
                        />
                        <Button type="submit" size="sm" className="h-8" disabled={loading}>
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                    {existingLabels.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                            {existingLabels.map(label => (
                                <span key={label.id} className="text-xs bg-muted px-1.5 py-0.5 rounded text-muted-foreground">
                                    {label.name}
                                </span>
                            ))}
                        </div>
                    )}
                </form>
            </PopoverContent>
        </Popover>
    )
}
