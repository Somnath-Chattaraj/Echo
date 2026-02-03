"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { createProject } from "@/app/action/project"
import { Loader2, Plus, Copy, Check } from "lucide-react"

export function CreateProjectDialog({ trigger }: { trigger?: React.ReactNode }) {
    const [open, setOpen] = useState(false)
    const [name, setName] = useState("")
    const [url, setUrl] = useState("")
    const [loading, setLoading] = useState(false)
    const [projectKey, setProjectKey] = useState<string | null>(null)
    const [copied, setCopied] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            const project = await createProject(name, url)
            setProjectKey(project.projectKey)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const handleCopy = () => {
        if (!projectKey) return
        const script = `<script src="${window.location.origin}/embed/${projectKey}"></script>`
        navigator.clipboard.writeText(script)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const reset = () => {
        setOpen(false)
        setProjectKey(null)
        setName("")
        setUrl("")
    }

    return (
        <Dialog open={open} onOpenChange={(val) => !val && reset()}>
            <DialogTrigger asChild>
                {trigger ? (
                    trigger
                ) : (
                    <Button onClick={() => setOpen(true)}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Project
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        {projectKey ? "Project Created!" : "Create Project"}
                    </DialogTitle>
                    <DialogDescription>
                        {projectKey
                            ? "Copy this code and add it to your website."
                            : "Add a new project to start collecting feedback."}
                    </DialogDescription>
                </DialogHeader>

                {projectKey ? (
                    <div className="grid gap-4 py-4">
                        <div className="flex items-center gap-2 rounded-md bg-muted p-4">
                            <code className="flex-1 overflow-auto text-sm text-muted-foreground whitespace-nowrap">
                                {`<script src="${typeof window !== 'undefined' ? window.location.origin : ''}/embed/${projectKey}"></script>`}
                            </code>
                            <Button
                                size="icon"
                                variant="ghost"
                                onClick={handleCopy}
                                className="h-8 w-8 shrink-0"
                            >
                                {copied ? (
                                    <Check className="h-4 w-4 text-green-500" />
                                ) : (
                                    <Copy className="h-4 w-4" />
                                )}
                            </Button>
                        </div>
                        <DialogFooter>
                            <Button onClick={reset}>Done</Button>
                        </DialogFooter>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="My Awesome App"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="url">URL (Optional)</Label>
                                <Input
                                    id="url"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    placeholder="https://example.com"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" disabled={loading}>
                                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Create
                            </Button>
                        </DialogFooter>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    )
}
