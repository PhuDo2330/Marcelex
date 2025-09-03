"use client";
/**
 * Development & Projects
 * - Tabs: Backlog, Active Sprints, Deployment Pipeline
 * - Minimal interactive shell; wire real data later.
 */
import { useState } from "react";
import { ChevronDown, Play, Upload, KanbanSquare, BarChart3 } from "lucide-react";

function Card({ title, children, actions }: { title?: string; children: React.ReactNode; actions?: React.ReactNode }) {
    return (
        <section className="rounded-2xl p-4 bg-white/55 dark:bg-neutral-900/55 backdrop-blur-xl
                        ring-1 ring-black/5 dark:ring-white/10 shadow-lg hover:shadow-xl transition-shadow">
            {(title || actions) && (
                <div className="mb-3 flex items-center justify-between">
                    {title && <h3 className="text-sm font-semibold tracking-wide">{title}</h3>}
                    {actions}
                </div>
            )}
            {children}
        </section>
    );
}

export default function DevProjectsPage() {
    const [tab, setTab] = useState<"Backlog" | "Active Sprints" | "Deployment Pipeline">("Backlog");

    return (
        <div className="space-y-4">
            {/* Header actions */}
            <div className="flex flex-wrap items-center gap-2">
                <button className="px-3 py-1.5 rounded-lg text-sm font-medium bg-cyan-500 text-white shadow-md hover:shadow-lg">
                    New Project
                </button>
                <button className="px-3 py-1.5 rounded-lg text-sm bg-white/55 dark:bg-neutral-900/55 border
                           border-black/5 dark:border-white/10 hover:shadow-md">
                    <Upload className="inline size-4 mr-2" /> Import Backlog
                </button>
                <button className="px-3 py-1.5 rounded-lg text-sm bg-white/55 dark:bg-neutral-900/55 border
                           border-black/5 dark:border-white/10 hover:shadow-md">
                    <BarChart3 className="inline size-4 mr-2" /> Sprint Planning
                </button>

                {/* View menu (non-functional placeholder) */}
                <div className="ml-auto">
                    <button className="px-3 py-1.5 rounded-lg text-sm bg-white/55 dark:bg-neutral-900/55 border
                             border-black/5 dark:border-white/10 hover:shadow-md">
                        View: Kanban <ChevronDown className="inline size-4 ml-1" />
                    </button>
                </div>
            </div>

            {/* Main tabs */}
            <Card
                actions={
                    <div className="flex gap-2">
                        {(["Backlog", "Active Sprints", "Deployment Pipeline"] as const).map((t) => (
                            <button
                                key={t}
                                onClick={() => setTab(t)}
                                className={[
                                    "px-3 py-1.5 rounded-xl text-xs transition",
                                    tab === t
                                        ? "bg-cyan-500 text-white shadow-md"
                                        : "bg-white/55 dark:bg-neutral-900/55 border border-black/5 dark:border-white/10",
                                ].join(" ")}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                }
            >
                {tab === "Backlog" && (
                    <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr_320px] gap-4">
                        {/* Left: Epics tree (static placeholder) */}
                        <Card title="Epics">
                            <ul className="text-sm space-y-2">
                                <li>🚀 Onboarding Revamp</li>
                                <li>🔒 Auth & RBAC</li>
                                <li>📦 Asset Lifecycle</li>
                                <li>📊 SLA Insights</li>
                            </ul>
                        </Card>

                        {/* Center: Prioritized stories (drag/drop later) */}
                        <Card title="Prioritized Stories" actions={<span className="text-xs text-neutral-500">Drag to rank</span>}>
                            <ol className="space-y-2 text-sm">
                                <li className="rounded-lg px-3 py-2 bg-white/70 dark:bg-neutral-800/60 border border-black/5 dark:border-white/10">ST-102 Add ticket SLA timers</li>
                                <li className="rounded-lg px-3 py-2 bg-white/70 dark:bg-neutral-800/60 border border-black/5 dark:border-white/10">ST-103 Role-based knowledge edit</li>
                                <li className="rounded-lg px-3 py-2 bg-white/70 dark:bg-neutral-800/60 border border-black/5 dark:border-white/10">ST-104 Asset depreciation calc</li>
                            </ol>
                        </Card>

                        {/* Right: Story details/estimation */}
                        <Card title="Story Details">
                            <div className="text-sm space-y-2">
                                <div><span className="font-medium">Key:</span> ST-102</div>
                                <div><span className="font-medium">Estimate:</span> 5 pts</div>
                                <div><span className="font-medium">Owner:</span> TBD</div>
                                <button className="mt-2 px-3 py-1.5 rounded-lg text-sm bg-cyan-500 text-white shadow-md hover:shadow-lg">
                                    Move to Sprint
                                </button>
                            </div>
                        </Card>
                    </div>
                )}

                {tab === "Active Sprints" && (
                    <div className="space-y-4">
                        {/* Sprint selector (placeholder) */}
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-neutral-500">Sprint:</span>
                            <button className="px-3 py-1.5 rounded-lg text-sm bg-white/55 dark:bg-neutral-900/55 border
                                 border-black/5 dark:border-white/10 hover:shadow-md">
                                Sprint 14 <ChevronDown className="inline size-4 ml-1" />
                            </button>
                        </div>

                        {/* Kanban lanes (columns share the floating surface) */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {["To Do", "In Progress", "Done"].map((lane) => (
                                <section key={lane} className="rounded-2xl bg-white/55 dark:bg-neutral-900/55 backdrop-blur-xl
                                               ring-1 ring-black/5 dark:ring-white/10 shadow-lg p-3">
                                    <div className="mb-2 text-sm font-semibold">{lane}</div>
                                    <div className="space-y-2">
                                        <div className="rounded-xl p-3 bg-white/70 dark:bg-neutral-800/60 border border-black/5 dark:border-white/10">
                                            ST-201 SLA breach email
                                        </div>
                                        <div className="rounded-xl p-3 bg-white/70 dark:bg-neutral-800/60 border border-black/5 dark:border-white/10">
                                            ST-202 Audit export CSV
                                        </div>
                                    </div>
                                </section>
                            ))}
                        </div>

                        {/* Burndown widget (placeholder card) */}
                        <Card title="Burndown (Sprint 14)">
                            <div className="h-40 grid place-items-center text-sm text-neutral-500">[Burndown chart goes here]</div>
                        </Card>
                    </div>
                )}

                {tab === "Deployment Pipeline" && (
                    <div className="space-y-4">
                        {/* Horizontal pipeline visualization (placeholder) */}
                        <Card title="Pipeline">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                                {["Build", "QA", "Staging", "Production"].map((stage, i) => (
                                    <div key={stage} className="rounded-xl p-4 bg-white/70 dark:bg-neutral-800/60 border border-black/5 dark:border-white/10">
                                        <div className="text-sm font-semibold mb-1">{stage}</div>
                                        <div className="text-xs text-neutral-500">Status: {i < 3 ? "OK" : "Paused"}</div>
                                        <button className="mt-3 px-3 py-1.5 rounded-lg text-sm bg-cyan-500 text-white shadow-md hover:shadow-lg">
                                            {i < 3 ? "Deploy" : "Resume"}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* Deploy / rollback controls */}
                        <div className="flex gap-2">
                            <button className="px-3 py-1.5 rounded-lg text-sm bg-cyan-500 text-white shadow-md hover:shadow-lg">
                                <Play className="inline size-4 mr-1" /> Deploy Latest
                            </button>
                            <button className="px-3 py-1.5 rounded-lg text-sm bg-white/55 dark:bg-neutral-900/55 border
                                 border-black/5 dark:border-white/10 hover:shadow-md">
                                Rollback…
                            </button>
                        </div>
                    </div>
                )}
            </Card>
        </div>
    );
}
