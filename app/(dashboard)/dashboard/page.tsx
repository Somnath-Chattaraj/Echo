import { getAllfeedback } from "@/app/action/feedback"
import { CreateProjectDialog } from "@/components/dashboard/create-project-dialog"
import { ProjectCard } from "@/components/dashboard/project-card"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

export default async function DashboardPage() {
    const projects = await getAllfeedback()
    const totalProjects = projects.length
    const totalFeedback = projects.reduce((acc, project) => acc + project.feedbacks.length, 0)

    return (
        <div className="flex flex-1 flex-col gap-8 p-8">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-xl border bg-card/50 text-card-foreground shadow-sm backdrop-blur-sm p-6">
                    <div className="flex flex-col space-y-1.5">
                        <span className="text-sm font-medium text-muted-foreground">Total Projects</span>
                        <span className="text-2xl font-bold">{totalProjects}</span>
                    </div>
                </div>
                <div className="rounded-xl border bg-card/50 text-card-foreground shadow-sm backdrop-blur-sm p-6">
                    <div className="flex flex-col space-y-1.5">
                        <span className="text-sm font-medium text-muted-foreground">Total Feedback</span>
                        <span className="text-2xl font-bold">{totalFeedback}</span>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                        Projects
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Manage your projects and view feedback.
                    </p>
                </div>
                <CreateProjectDialog />
            </div>



            {projects.length === 0 ? (
                <div className="flex flex-1 flex-col items-center justify-center gap-6 rounded-3xl border border-dashed border-border/50 bg-muted/20 p-12 text-center animate-in fade-in-50 duration-500">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 ring-8 ring-primary/5">
                        <Plus className="h-10 w-10 text-primary" />
                    </div>
                    <div className="max-w-md space-y-2">
                        <h3 className="text-xl font-bold tracking-tight">No projects created</h3>
                        <p className="text-muted-foreground">
                            You haven't created any projects yet. Start by creating a new project to collect feedback from your users.
                        </p>
                    </div>
                    <CreateProjectDialog />
                </div>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {projects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}

                    {/* Add New Project Card */}
                    <div className="group relative flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-muted-foreground/25 bg-muted/50 p-6 transition-all hover:bg-muted/80 hover:border-primary/50">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-background shadow-sm ring-1 ring-border group-hover:scale-110 transition-transform">
                            <Plus className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                        <div className="text-center">
                            <h3 className="font-semibold text-foreground">Create New Project</h3>
                            <p className="text-sm text-muted-foreground">Add another project to your workspace</p>
                        </div>
                        <div className="absolute inset-0 z-10">
                            <CreateProjectDialog trigger={<span className="absolute inset-0 cursor-pointer" />} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
