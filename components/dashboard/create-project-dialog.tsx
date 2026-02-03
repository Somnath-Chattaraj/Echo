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
                        <div className="relative group min-w-0">
                            <div className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-950 p-3 pr-12 transition-all hover:border-zinc-700">
                                {/* The Code Container */}
                                <div className="flex-1 min-w-0">
                                    <div className="overflow-x-auto scrollbar-hide">
                                        <code className="block text-xs  font-mono text-zinc-100 whitespace-nowrap py-1">
                                            {`<script src="${typeof window !== 'undefined' ? window.location.origin : ''}/embed/${projectKey}"></script>`}
                                        </code>
                                    </div>
                                </div>

                                {/* The Floating Copy Button */}
                                <Button
                                    size="icon"
                                    variant="secondary"
                                    onClick={handleCopy}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 shrink-0 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 shadow-sm"
                                >
                                    {copied ? (
                                        <Check className="h-4 w-4 text-emerald-500" />
                                    ) : (
                                        <Copy className="h-4 w-4" />
                                    )}
                                </Button>
                            </div>

                            {/* Elegant Gradient Fade to indicate more text */}
                            <div className="absolute right-10 top-1 bottom-1 w-8 bg-gradient-to-r from-transparent to-zinc-950 pointer-events-none rounded-r-lg" />
                        </div>

                        <DialogFooter className="sm:justify-end">
                            <Button
                                onClick={reset}
                                className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
                            >
                                Done
                            </Button>
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
