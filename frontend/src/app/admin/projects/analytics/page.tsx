"use client";

import { useSearchParams } from "next/navigation";
import { BarChart3, Gauge, Users, Wallet, CalendarDays, AlertTriangle } from "lucide-react";
import Link from "next/link";

const TABS = [
    { key: "overview", label: "Overview", icon: <BarChart3 className="size-4" /> },
    { key: "portfolio", label: "Portfolio", icon: <Gauge className="size-4" /> },
    { key: "workload", label: "Workload", icon: <Users className="size-4" /> },
    { key: "timeline", label: "Timeline", icon: <CalendarDays className="size-4" /> },
    { key: "budget", label: "Budget", icon: <Wallet className="size-4" /> },
] as const;

type TabKey = typeof TABS[number]["key"];

export default function ProjectAnalyticsPage() {
    const sp = useSearchParams();
    const tab = (sp.get("tab") ?? "overview") as TabKey;

    return (
        <main className="relative p-6 md:p-8">
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute -top-24 right-0 w-[60vw] h-[60vw] max-w-[880px] rounded-full blur-3xl opacity-20 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(34,211,238,0.24),transparent_65%)]" />
            </div>

            <header className="mb-5 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold leading-tight">Analytics</h1>
                    <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1">KPIs, trends, and portfolio-level insights.</p>
                </div>
                <Link href="/admin/projects/management?view=overdue" className="text-sm inline-flex items-center gap-2 rounded-lg px-3 py-1.5 bg-rose-500 text-white shadow-md hover:shadow-lg">
                    <AlertTriangle className="size-4" />
                    View Overdue
                </Link>
            </header>

            {/* Tabs */}
            <nav className="mb-5 overflow-auto">
                <ul className="flex gap-2 min-w-max">
                    {TABS.map(t => {
                        const active = tab === t.key;
                        const href = `/admin/projects/analytics?tab=${t.key}`;
                        return (
                            <li key={t.key}>
                                <a
                                    href={href}
                                    className={[
                                        "inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm border transition-all",
                                        active
                                            ? "bg-cyan-500 text-white border-transparent shadow-md"
                                            : "bg-white/55 dark:bg-neutral-900/55 border-black/5 dark:border-white/10 hover:shadow-sm",
                                    ].join(" ")}
                                >
                                    {t.icon}
                                    {t.label}
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Metric tiles */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                    { title: "Active projects", value: "42" },
                    { title: "Overdue projects", value: "3", accent: "rose" },
                    { title: "On-time delivery", value: "86%" },
                    { title: "Avg. health", value: "8.2 / 10" },
                ].map((m) => (
                    <div
                        key={m.title}
                        className={[
                            "rounded-2xl bg-white/60 dark:bg-neutral-900/60 backdrop-blur-xl p-4 ring-1 shadow-lg hover:shadow-2xl transition-shadow",
                            m.accent === "rose" ? "ring-rose-300/40" : "ring-black/5 dark:ring-white/10"
                        ].join(" ")}
                    >
                        <div className="text-xs text-neutral-500">{m.title}</div>
                        <div className="mt-1 text-xl font-semibold">{m.value}</div>
                    </div>
                ))}
            </section>

            {/* Panels */}
            <section className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="rounded-2xl bg-white/60 dark:bg-neutral-900/60 backdrop-blur-xl p-4 h-[320px] ring-1 ring-black/5 dark:ring-white/10 shadow-lg hover:shadow-2xl transition-shadow">
                    <div className="text-sm font-medium mb-2">Performance trends</div>
                    <div className="text-xs text-neutral-500">Burnup, lead time, success rate — connect charts later.</div>
                </div>
                <div className="rounded-2xl bg-white/60 dark:bg-neutral-900/60 backdrop-blur-xl p-4 h-[320px] ring-1 ring-black/5 dark:ring-white/10 shadow-lg hover:shadow-2xl transition-shadow">
                    <div className="text-sm font-medium mb-2">Portfolio breakdown</div>
                    <div className="text-xs text-neutral-500">By category, owner, health — connect charts later.</div>
                </div>
            </section>
        </main>
    );
}
