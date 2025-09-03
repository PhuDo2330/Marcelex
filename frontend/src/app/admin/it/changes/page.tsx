"use client";
/**
 * Changes Page
 * - Header actions + monthly calendar placeholder
 * - Simple workflow legend
 */
import { useState } from "react";
import { CalendarDays, Zap, CheckCircle2 } from "lucide-react";

export default function ChangesPage() {
    const [month] = useState("September 2025"); // static placeholder

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex flex-wrap items-center gap-2">
                <button className="px-3 py-1.5 rounded-lg text-sm font-medium bg-cyan-500 text-white shadow-md hover:shadow-lg">
                    New Change Request
                </button>
                <button className="px-3 py-1.5 rounded-lg text-sm bg-white/55 dark:bg-neutral-900/55 border
                           border-black/5 dark:border-white/10 hover:shadow-md">
                    <Zap className="inline size-4 mr-1" /> Emergency Change
                </button>
                <button className="px-3 py-1.5 rounded-lg text-sm bg-white/55 dark:bg-neutral-900/55 border
                           border-black/5 dark:border-white/10 hover:shadow-md">
                    Approval Queue: 3
                </button>
                <div className="ml-auto text-sm text-neutral-500"><CalendarDays className="inline size-4 mr-1" /> {month}</div>
            </div>

            {/* Calendar placeholder */}
            <section className="rounded-2xl p-8 text-sm text-neutral-500 bg-white/55 dark:bg-neutral-900/55 backdrop-blur-xl
                          ring-1 ring-black/5 dark:ring-white/10 shadow-lg h-72 grid place-items-center">
                [Monthly change calendar with color-coded types + drag-to-reschedule]
            </section>

            {/* Workflow legend */}
            <section className="rounded-2xl p-4 bg-white/55 dark:bg-neutral-900/55 backdrop-blur-xl
                          ring-1 ring-black/5 dark:ring-white/10 shadow-lg">
                <div className="text-sm font-semibold mb-2">Workflow</div>
                <ol className="flex flex-wrap gap-2 text-xs">
                    {["Draft", "Submitted", "Approval", "Scheduled", "In Progress", "Complete/Failed"].map((s, i) => (
                        <li key={s} className="px-3 py-1.5 rounded-lg bg-white/70 dark:bg-neutral-800/60 border border-black/5 dark:border-white/10">
                            {i === 5 ? <CheckCircle2 className="inline size-4 mr-1" /> : null}{s}
                        </li>
                    ))}
                </ol>
            </section>
        </div>
    );
}
