"use client";

import { useState } from "react";
import KpiCard from "@/app/component/admin/KpiCard";
import { ItemRow, Pill, SectionTitle, Surface } from "./ui";
import { mock } from "./mock";

export default function LeadDashboard() {
    const d = mock.lead;
    const [tab, setTab] = useState<"dev" | "it">("dev");

    return (
        <div className="space-y-6">
            {/* KPIs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {d.kpis.map((k, i) => (
                    <KpiCard key={i} title={k.title} value={k.value} delta={k.delta} />
                ))}
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-2">
                <Pill active={tab === "dev"} onClick={() => setTab("dev")}>Development</Pill>
                <Pill active={tab === "it"} onClick={() => setTab("it")}>IT Ops</Pill>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <Surface className="p-5 lg:col-span-2">
                    <SectionTitle>{tab === "dev" ? "Dev Tasks" : "IT Tasks"}</SectionTitle>
                    <div className="mt-3 divide-y divide-black/5 dark:divide-white/10">
                        {d.tasks.map((t, i) => (
                            <ItemRow
                                key={i}
                                title={t.title}
                                meta={t.meta}
                                overdue={!!t.overdue}
                                right={
                                    <button className="rounded-lg px-2.5 py-1 text-sm font-medium
                                     bg-white/55 dark:bg-neutral-900/55 border border-black/5 dark:border-white/10">
                                        View
                                    </button>
                                }
                            />
                        ))}
                    </div>
                </Surface>

                <Surface className="p-5">
                    <SectionTitle>Quick Actions</SectionTitle>
                    <div className="mt-3 grid gap-2">
                        <button className="rounded-lg px-3 py-2 font-medium bg-cyan-500 text-white shadow-md hover:shadow-lg">New Task</button>
                        <button className="rounded-lg px-3 py-2 font-medium bg-white/55 dark:bg-neutral-900/55 border border-black/5 dark:border-white/10">Open Tickets</button>
                        <button className="rounded-lg px-3 py-2 font-medium bg-white/55 dark:bg-neutral-900/55 border border-black/5 dark:border-white/10">Current Sprint</button>
                    </div>
                </Surface>
            </div>
        </div>
    );
}
