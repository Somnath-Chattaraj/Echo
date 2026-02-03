"use client"

import Link from "next/link"
import { LayoutGrid } from "lucide-react"
import { Button } from "@/components/ui/button"

export function LandingNavbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-zinc-950/80 backdrop-blur-xl">
            <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-white/5 text-white group-hover:bg-white/10 transition-colors">
                        <LayoutGrid className="size-4" />
                    </div>
                    <span className="font-bold text-lg tracking-tight text-white">Echo</span>
                </Link>

            </div>
        </nav>
    )
}
