"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Code, Sparkles, Filter, Tag } from "lucide-react"

export function LandingFeatures() {
    return (
        <section className="py-24 bg-zinc-950 relative overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4">
                        Powerful features, <br />
                        <span className="text-zinc-500">zero clutter.</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Card 1: Integration (Span 2 cols) */}
                    <Card className="md:col-span-2 bg-zinc-900/50 border-zinc-800 p-8 overflow-hidden hover:bg-zinc-900/80 transition-all group relative">
                        {/* Background Glow for "Lively" feel */}
                        <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary/10 blur-[80px] rounded-full group-hover:bg-primary/20 transition-colors" />

                        <div className="flex flex-col md:flex-row gap-8 items-center h-full">
                            {/* Left Side: Content */}
                            <div className="flex-1 space-y-4">
                                <div className="p-3 bg-zinc-800/50 w-fit rounded-xl text-primary shadow-inner">
                                    <Code className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white tracking-tight">One script. Infinite insights.</h3>
                                    <p className="text-zinc-400 leading-relaxed max-w-sm">
                                        Copy and paste this snippet into your site's header to start receiving echoes from your users.
                                    </p>
                                </div>
                            </div>

                            {/* Right Side: Code Snippet (The "Hero" of the card) */}
                            <div className="w-full md:w-[60%] relative">
                                <div className="relative rounded-xl bg-black/40 border border-white/5 p-4 backdrop-blur-sm shadow-2xl">
                                    {/* Visual Window Controls */}
                                    <div className="flex gap-1.5 mb-3">
                                        <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                                    </div>

                                    <div className="overflow-hidden">
                                        <code className="block overflow-x-auto text-[11px] md:text-xs font-mono whitespace-nowrap scrollbar-hide py-1">
                                            <span className="text-zinc-500">&lt;</span>
                                            <span className="text-blue-400">script</span>
                                            <span className="ml-2 text-purple-400">src</span>
                                            <span className="text-zinc-500">=</span>
                                            <span className="text-green-400">"{process.env.NEXT_PUBLIC_BASE_URL}/embed/7a9a..."</span>
                                            <span className="text-zinc-500">&gt;&lt;/</span>
                                            <span className="text-blue-400">script</span>
                                            <span className="text-zinc-500">&gt;</span>
                                        </code>
                                    </div>

                                    {/* Horizontal Fade to prevent visual overflow */}
                                    <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-black/40 to-transparent pointer-events-none rounded-r-xl" />
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Card 2: AI Analysis */}
                    <Card className="bg-zinc-900/50 border-zinc-800 p-6 hover:bg-zinc-900/80 transition-colors group">
                        <div className="flex flex-col h-full">
                            <div className="p-3 bg-indigo-500/20 w-fit rounded-lg mb-4 text-indigo-400">
                                <Sparkles className="w-5 h-5" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">Analyze Sentiment</h3>
                            <p className="text-zinc-400 mb-6">AI-powered classification for every feedback item.</p>

                            <div className="space-y-3 mt-auto">
                                <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-950/50 border border-zinc-800/50">
                                    <span className="text-sm text-zinc-300">User Experience</span>
                                    <Badge variant="default" className="bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-500/20 shadow-[0_0_10px_-3px_rgba(34,197,94,0.4)]">Positive</Badge>
                                </div>
                                <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-950/50 border border-zinc-800/50">
                                    <span className="text-sm text-zinc-300">Load Time</span>
                                    <Badge variant="default" className="bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 border-yellow-500/20">Neutral</Badge>
                                </div>
                                <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-950/50 border border-zinc-800/50">
                                    <span className="text-sm text-zinc-300">Login Bug</span>
                                    <Badge variant="default" className="bg-red-500/10 text-red-500 hover:bg-red-500/20 border-red-500/20 shadow-[0_0_10px_-3px_rgba(239,68,68,0.4)]">Negative</Badge>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Card 3: Categorization */}
                    <Card className="bg-zinc-900/50 border-zinc-800 p-6 hover:bg-zinc-900/80 transition-colors group">
                        <div className="flex flex-col h-full">
                            <div className="p-3 bg-blue-500/20 w-fit rounded-lg mb-4 text-blue-400">
                                <Filter className="w-5 h-5" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">Smart Sorting</h3>
                            <p className="text-zinc-400 mb-6">Automatically categorize feedback.</p>

                            <div className="mt-auto">
                                <Tabs defaultValue="bugs" className="w-full">
                                    <TabsList className="grid w-full grid-cols-3 bg-zinc-950 border border-zinc-800">
                                        <TabsTrigger value="bugs" className="text-xs data-[state=active]:bg-zinc-800 data-[state=active]:text-white">Bugs</TabsTrigger>
                                        <TabsTrigger value="feature" className="text-xs data-[state=active]:bg-zinc-800 data-[state=active]:text-white">Ideas</TabsTrigger>
                                        <TabsTrigger value="other" className="text-xs data-[state=active]:bg-zinc-800 data-[state=active]:text-white">Other</TabsTrigger>
                                    </TabsList>
                                </Tabs>
                                <div className="mt-4 space-y-2">
                                    <div className="h-2 w-full bg-zinc-800/50 rounded-full" />
                                    <div className="h-2 w-2/3 bg-zinc-800/50 rounded-full" />
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Card 4: Labels (Floating Cloud) - Span 2 cols */}
                    <Card className="md:col-span-2 bg-zinc-900/50 border-zinc-800 p-6 overflow-hidden hover:bg-zinc-900/80 transition-colors group relative">
                        <div className="flex flex-col h-full relative z-10">
                            <div className="p-3 bg-pink-500/20 w-fit rounded-lg mb-4 text-pink-400">
                                <Tag className="w-5 h-5" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">Custom Labels</h3>
                            <p className="text-zinc-400">Organize your way with a lively tag cloud.</p>
                        </div>

                        {/* Floating Tags Animation */}
                        <div className="absolute top-1/2 right-10 -translate-y-1/2 w-1/2 h-full hidden md:flex items-center justify-center">
                            <motion.div
                                className="flex flex-wrap gap-3 justify-center max-w-[300px]"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                            >
                                {["High Priority", "UI/UX", "Sprint 1", "Bug", "Enhancement", "Customer", "Q2 Release"].map((tag, i) => (
                                    <motion.span
                                        key={tag}
                                        animate={{
                                            y: [0, -10, 0],
                                            x: [0, i % 2 === 0 ? 5 : -5, 0]
                                        }}
                                        transition={{
                                            duration: 3 + i,
                                            repeat: Infinity,
                                            delay: i * 0.2,
                                            ease: "easeInOut"
                                        }}
                                        className="px-3 py-1 rounded-full bg-zinc-800/80 border border-zinc-700 text-xs text-zinc-300 whitespace-nowrap backdrop-blur-sm"
                                    >
                                        {tag}
                                    </motion.span>
                                ))}
                            </motion.div>
                        </div>
                    </Card>
                </div>
            </div>
        </section>
    )
}
