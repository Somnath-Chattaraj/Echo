"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

export function LandingHero() {
    return (
        <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 left-0 w-full h-[500px] bg-gradient-to-t from-zinc-950 to-transparent" />
            </div>

            <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Content */}
                <div className="flex flex-col gap-8 max-w-2xl">
                    <div className="flex flex-col gap-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900/50 px-3 py-1 text-sm text-zinc-400 backdrop-blur-xl">
                                <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse" />
                                v1.0 is now live
                            </div>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.1]"
                        >
                            Listen to every <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-500">
                                Echo
                            </span> of your users.
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-lg text-zinc-400 max-w-lg leading-relaxed"
                        >
                            The lightweight feedback widget that turns user noise into actionable signals. Integrate in 30 seconds.
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-wrap items-center gap-4"
                    >
                        <Link href="/dashboard">
                            <Button size="lg" className="h-12 px-8 rounded-full bg-white text-zinc-950 hover:bg-zinc-200 border-none font-semibold text-base relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:animate-shimmer" />
                                Get Started
                            </Button>
                        </Link>
                    </motion.div>
                </div>

                {/* Right: Floating Widget Preview */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    className="relative hidden lg:block"
                >
                    <motion.div
                        animate={{ y: [0, -20, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="relative z-10"
                    >
                        {/* Mockup Container */}
                        <div className="rounded-xl border border-zinc-800 bg-zinc-950/80 backdrop-blur-md shadow-2xl p-6 max-w-md mx-auto relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                            {/* Header */}
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center">
                                        <div className="w-4 h-4 rounded-full bg-indigo-500" />
                                    </div>
                                    <div>
                                        <div className="h-2 w-24 bg-zinc-800 rounded-full mb-2" />
                                        <div className="h-2 w-16 bg-zinc-800 rounded-full" />
                                    </div>
                                </div>
                                <div className="p-2 rounded-lg bg-zinc-900/50">
                                    <div className="w-4 h-4 bg-zinc-700/50 rounded-full" />
                                </div>
                            </div>

                            {/* Content Lines */}
                            <div className="space-y-3 mb-8">
                                <div className="h-2 w-full bg-zinc-800/50 rounded-full" />
                                <div className="h-2 w-3/4 bg-zinc-800/50 rounded-full" />
                                <div className="h-2 w-5/6 bg-zinc-800/50 rounded-full" />
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-3">
                                <div className="h-9 w-full rounded-lg bg-indigo-600/20 border border-indigo-500/20 flex items-center justify-center">
                                    <div className="h-2 w-16 bg-indigo-500/50 rounded-full" />
                                </div>
                                <div className="h-9 w-1/3 rounded-lg bg-zinc-800 flex items-center justify-center">
                                    <div className="h-2 w-6 bg-zinc-600 rounded-full" />
                                </div>
                            </div>
                        </div>

                        {/* Floating Decoration Cards */}
                        <motion.div
                            animate={{ y: [0, 15, 0], rotate: [0, 2, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="absolute -right-8 -top-8 p-4 rounded-xl border border-zinc-800 bg-zinc-900/90 shadow-xl backdrop-blur-md"
                        >
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500" />
                                <span className="text-xs font-mono text-zinc-400">Status: Online</span>
                            </div>
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, -10, 0], rotate: [0, -2, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                            className="absolute -left-12 bottom-12 p-3 rounded-lg border border-zinc-800 bg-zinc-900/90 shadow-xl backdrop-blur-md"
                        >
                            <div className="flex items-center gap-2">
                                <span className="text-xl">✨</span>
                                <div className="flex flex-col">
                                    <span className="text-xs font-bold text-white">New Feedback</span>
                                    <span className="text-[10px] text-zinc-500">Just now</span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>

        </section>
    )
}
