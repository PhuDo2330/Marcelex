"use client";

import Link from "next/link";
import { type ProjectFeature } from "@/features/projects/registry";

export function ProjectFeatureCard({ feature }: { feature: ProjectFeature }) {
    return (
        <Link
            href={feature.href}
            className="group relative rounded-2xl bg-white/70 dark:bg-neutral-900/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-neutral-900/60 border border-black/5 dark:border-white/5 p-4 hover:shadow-lg transition-all hover:-translate-y-0.5"
        >
            <div className="flex items-start gap-3">
                <div className="rounded-xl p-2 bg-gradient-to-br from-cyan-200/40 to-violet-200/40 dark:from-cyan-500/15 dark:to-violet-500/15 border border-white/30 dark:border-white/10">
                    {feature.icon}
                </div>
                <div className="flex-1">
                    <h4 className="font-semibold text-sm">{feature.title}</h4>
                    <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-1">{feature.desc}</p>
                </div>
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-transparent group-hover:ring-cyan-300/40 dark:group-hover:ring-cyan-400/25" />
        </Link>
    );
}
