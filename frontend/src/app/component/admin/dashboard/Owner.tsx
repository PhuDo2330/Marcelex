"use client";

import KpiCard from "@/app/component/admin/KpiCard";
import { ItemRow, SectionTitle, Surface } from "./ui";
import { mock } from "./mock";

export default function OwnerDashboard() {
    const d = mock.owner;

    return (
        <div className="space-y-6">
            {/* KPIs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {d.kpis.map((k, i) => (
                    <KpiCard key={i} title={k.title} value={k.value} delta={k.delta} />
                ))}
            </div>

            {/* Tasks + Notifications */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <Surface className="p-5 lg:col-span-2">
                    <SectionTitle>My Tasks</SectionTitle>
                    <div className="mt-3 divide-y divide-black/5 dark:divide-white/10">
                        {d.myTasks.map(t => (
                            <ItemRow key={t.id} title={`${t.id}  ${t.title}`} meta={`${t.dept} · due ${t.due}`} />
                        ))}
                    </div>
                </Surface>

                <Surface className="p-5">
                    <SectionTitle>Notifications</SectionTitle>
                    <ul className="mt-3 space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
                        {d.notes.map((n, i) => <li key={i}>• {n}</li>)}
                    </ul>
                </Surface>
            </div>

            {/* Cross-department projects */}
            <Surface className="p-5">
                <SectionTitle>Cross-department Projects</SectionTitle>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    {d.cross.map((p, i) => (
                        <Surface key={i} className="p-4 hover:-translate-y-0.5">
                            <div className="font-semibold">{p.title}</div>
                            <div className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">{p.meta}</div>
                            <div className="mt-3">
                                <button className="rounded-lg px-3 py-1.5 text-sm font-medium bg-cyan-500 text-white shadow-md hover:shadow-lg">
                                    Open
                                </button>
                            </div>
                        </Surface>
                    ))}
                </div>
            </Surface>
        </div>
    );
}
