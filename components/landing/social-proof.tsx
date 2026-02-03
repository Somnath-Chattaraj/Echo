"use client"

import { Database, Layout, Server, Zap } from "lucide-react"

export function LandingSocialProof() {
    return (
        <section className="py-24 bg-zinc-950 border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                    <div className="flex flex-col gap-2">
                        <div className="text-4xl font-bold text-white flex items-end gap-2">
                            0.5kb <span className="text-lg text-zinc-500 font-normal mb-1">bundle size</span>
                        </div>
                        <p className="text-zinc-400 max-w-xs">
                            Lighter than a favicon. Designed for performance-obsessed engineers.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                        {/* Mock Logos since we don't have SVGs readily available, using Lucide icons + Text */}
                        <div className="flex items-center gap-2 group">
                            <Layout className="w-6 h-6 text-white" />
                            <span className="text-xl font-bold text-white">Next.js</span>
                        </div>
                        <div className="flex items-center gap-2 group">
                            <Database className="w-6 h-6 text-white" />
                            <span className="text-xl font-bold text-white">Prisma</span>
                        </div>
                        <div className="flex items-center gap-2 group">
                            <Server className="w-6 h-6 text-white" />
                            <span className="text-xl font-bold text-white">PostgreSQL</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
