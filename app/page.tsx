"use client"

import { LandingFeatures } from "@/components/landing/features";
import { LandingHero } from "@/components/landing/hero";
import { LandingNavbar } from "@/components/landing/navbar";
import { LandingSocialProof } from "@/components/landing/social-proof";
import { Github, Twitter } from "lucide-react";
import Link from "next/link";


export default function LandingPage() {
    return (
        <div className="min-h-screen bg-zinc-950 font-sans selection:bg-indigo-500/30 text-white">
            <LandingNavbar />

            <main>
                <LandingHero />
                <LandingFeatures />
                <LandingSocialProof />
            </main>

            <footer className="py-12 border-t border-white/5 bg-zinc-950">
                <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-2 opacity-50">
                        <span className="font-bold">Echo</span>
                        <span className="text-sm">© 2026</span>
                    </div>

                    <div className="flex items-center gap-6">
                        <Link href="#" className="text-zinc-500 hover:text-white transition-colors">
                            <Twitter className="w-5 h-5" />
                        </Link>
                        <Link href="#" className="text-zinc-500 hover:text-white transition-colors">
                            <Github className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}