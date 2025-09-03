"use client";
/**
 * Incidents Page
 * - View switcher: Timeline / Dashboard / Calendar (placeholders)
 * - Timeline list with severity + status badges
 */
import { useState } from "react";
import { CalendarDays, Activity, LayoutList } from "lucide-react";

const INCIDENTS = [
    { id: "INC-900", severity: "SEV-1", title: "DB timeouts", status: "Resolved", impact: "Checkout", duration: "2h 15m", team: "Data" },
    { id: "INC-901", severity: "SEV-2", title: "CPU spike node-3", status: "Investigating", impact: "API latency", duration: "—", team: "Ops" },
];

export default function IncidentsPage() {
    const [view, setView] = useState<"Timeline" | "Dashboard" | "Calendar">("Timeline");

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex flex-wrap items-center gap-2">
                <button className="px-3 py-1.5 rounded-lg text-sm font-medium bg-cyan-500 text-white shadow-md hover:shadow-lg">
                    New Incident
                </button>
                <button className="px-3 py-1.5 rounded-lg text-sm bg-white/55 dark:bg-neutral-900/55 border
                           border-black/5 dark:border-white/10 hover:shadow-md">
                    Incident Response Plan
                </button>

                <div className="ml-auto flex gap-2">
                    <button onClick={() => setView("Timeline")}
                        className={`px-3 py-1.5 rounded-xl text-xs ${view === "Timeline" ? "bg-cyan-500 text-white shadow-md" : "bg-white/55 dark:bg-neutral-900/55 border border-black/5 dark:border-white/10"}`}>
                        <LayoutList className="inline size-4 mr-1" /> Timeline
                    </button>
                    <button onClick={() => setView("Dashboard")}
                        className={`px-3 py-1.5 rounded-xl text-xs ${view === "Dashboard" ? "bg-cyan-500 text-white shadow-md" : "bg-white/55 dark:bg-neutral-900/55 border border-black/5 dark:border-white/10"}`}>
                        <Activity className="inline size-4 mr-1" /> Dashboard
                    </button>
                    <button onClick={() => setView("Calendar")}
                        className={`px-3 py-1.5 rounded-xl text-xs ${view === "Calendar" ? "bg-cyan-500 text-white shadow-md" : "bg-white/55 dark:bg-neutral-900/55 border border-black/5 dark:border-white/10"}`}>
                        <CalendarDays className="inline size-4 mr-1" /> Calendar
                    </button>
                </div>
            </div>

            {/* Body */}
            {view === "Timeline" && (
                <section className="rounded-2xl p-4 bg-white/55 dark:bg-neutral-900/55 backdrop-blur-xl
                            ring-1 ring-black/5 dark:ring-white/10 shadow-lg">
                    <ul className="divide-y divide-black/5 dark:divide-white/10">
                        {INCIDENTS.map((i) => (
                            <li key={i.id} className="py-3">
                                <div className="flex items-center justify-between">
                                    <div className="font-medium text-sm">
                                        <span className="mr-2 px-2 py-0.5 rounded-md text-white bg-rose-500/90">{i.severity}</span>
                                        {i.title}
                                    </div>
                                    <span className="text-xs px-2 py-0.5 rounded-md border border-black/5 dark:border-white/10">
                                        {i.status}
                                    </span>
                                </div>
                                <div className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">
                                    Impact: {i.impact} · Duration: {i.duration} · Team: {i.team}
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {view === "Dashboard" && (
                <section className="rounded-2xl p-8 text-sm text-neutral-500 bg-white/55 dark:bg-neutral-900/55 backdrop-blur-xl
                            ring-1 ring-black/5 dark:ring-white/10 shadow-lg grid place-items-center h-56">
                    [Severity heat map / active incident tiles]
                </section>
            )}

            {view === "Calendar" && (
                <section className="rounded-2xl p-8 text-sm text-neutral-500 bg-white/55 dark:bg-neutral-900/55 backdrop-blur-xl
                            ring-1 ring-black/5 dark:ring-white/10 shadow-lg grid place-items-center h-56">
                    [Calendar view of incidents]
                </section>
            )}
        </div>
    );
}
