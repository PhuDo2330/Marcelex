"use client";

import { ItemRow, SectionTitle, Surface } from "./ui";
import { mock } from "./mock";

export default function RegularDashboard() {
    const d = mock.regular;

    return (
        <div className="space-y-6">
            <Surface className="p-5">
                <SectionTitle>My Work</SectionTitle>
                <div className="mt-3 divide-y divide-black/5 dark:divide-white/10">
                    {d.tasks.map((t, i) => (
                        <ItemRow
                            key={i}
                            title={t.title}
                            meta={t.meta}
                            overdue={(t as any).overdue}
                            right={
                                <button className="rounded-lg px-3 py-1.5 text-sm font-medium bg-cyan-500 text-white shadow-md hover:shadow-lg">
                                    Open
                                </button>
                            }
                        />
                    ))}
                </div>
            </Surface>

            <Surface className="p-5">
                <SectionTitle>Quick Actions</SectionTitle>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    <button className="rounded-lg px-3 py-2 font-medium bg-cyan-500 text-white shadow-md hover:shadow-lg">New Task</button>
                    <button className="rounded-lg px-3 py-2 font-medium bg-white/55 dark:bg-neutral-900/55 border border-black/5 dark:border-white/10">My Open Tickets</button>
                </div>
            </Surface>
        </div>
    );
}
