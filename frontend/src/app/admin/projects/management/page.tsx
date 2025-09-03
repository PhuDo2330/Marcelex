"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
    PlusCircle, Search, Star, StarOff, Circle, CheckCircle2, Archive, Trash2,
    User, Filter, Wand2, CalendarDays, Activity, ArrowUpRight,
    LayoutGrid, List as ListIcon, AlertTriangle, X, FolderKanban
} from "lucide-react";

type Status = "active" | "completed" | "archived" | "deleted";
type Project = {
    id: string;
    name: string;
    owner: string;
    status: Status;
    favorite?: boolean;
    updatedAt: string;
    lastAccessed: string;
    health: number;
    progress: number;
    overdueMilestones: number;
    budgetRiskPct: number;
};

const MOCK: Project[] = [
    { id: "p1", name: "Marcelex Admin Revamp", owner: "me", status: "active", favorite: true, updatedAt: "2025-08-29", lastAccessed: "2025-09-01", health: 8.7, progress: 62, overdueMilestones: 1, budgetRiskPct: 8 },
    { id: "p2", name: "Buildies Launch Prep", owner: "me", status: "active", updatedAt: "2025-08-30", lastAccessed: "2025-08-31", health: 7.9, progress: 48, overdueMilestones: 0, budgetRiskPct: 12 },
    { id: "p3", name: "Website Refresh", owner: "Alex", status: "completed", favorite: true, updatedAt: "2025-07-02", lastAccessed: "2025-08-22", health: 9.3, progress: 100, overdueMilestones: 0, budgetRiskPct: 4 },
    { id: "p4", name: "Mobile App PWA", owner: "Priya", status: "archived", updatedAt: "2025-05-18", lastAccessed: "2025-05-19", health: 7.2, progress: 100, overdueMilestones: 0, budgetRiskPct: 9 },
    { id: "p5", name: "Data Warehouse", owner: "me", status: "active", updatedAt: "2025-08-18", lastAccessed: "2025-08-28", health: 6.8, progress: 35, overdueMilestones: 2, budgetRiskPct: 20 },
    { id: "p6", name: "Design System v2", owner: "Jamie", status: "active", updatedAt: "2025-08-27", lastAccessed: "2025-08-27", health: 8.1, progress: 55, overdueMilestones: 0, budgetRiskPct: 10 },
    { id: "p7", name: "Legacy Cleanup", owner: "Alex", status: "deleted", updatedAt: "2025-06-10", lastAccessed: "2025-06-10", health: 0, progress: 0, overdueMilestones: 0, budgetRiskPct: 0 },
    { id: "p8", name: "Partner Integrations", owner: "me", status: "completed", updatedAt: "2025-08-01", lastAccessed: "2025-08-10", health: 9.0, progress: 100, overdueMilestones: 0, budgetRiskPct: 6 },
];

const TABS = [
    { key: "all", label: "All Projects", icon: <Circle className="size-4" /> },
    { key: "active", label: "Active", icon: <Activity className="size-4" /> },
    { key: "overdue", label: "Overdue", icon: <AlertTriangle className="size-4" /> },
    { key: "mine", label: "My Projects", icon: <User className="size-4" /> },
    { key: "favorites", label: "Favorites", icon: <Star className="size-4" /> },
    { key: "recent", label: "Recently Accessed", icon: <CalendarDays className="size-4" /> },
    { key: "archived", label: "Archived", icon: <Archive className="size-4" /> },
    { key: "completed", label: "Completed", icon: <CheckCircle2 className="size-4" /> },
    { key: "deleted", label: "Deleted", icon: <Trash2 className="size-4" /> },
] as const;

type TabKey = typeof TABS[number]["key"];
type Mode = "grid" | "list" | "kanban";

function pillFor(status: Status) {
    const map: Record<Status, string> = {
        active: "bg-emerald-500/14 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
        completed: "bg-sky-500/14 text-sky-700 dark:text-sky-300 border-sky-500/30",
        archived: "bg-neutral-500/14 text-neutral-700 dark:text-neutral-300 border-neutral-500/30",
        deleted: "bg-rose-500/14 text-rose-700 dark:text-rose-300 border-rose-500/30",
    };
    return `inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] border ${map[status]}`;
}

function ProgressBar({ value }: { value: number }) {
    const w = Math.max(0, Math.min(100, value));
    return (
        <div className="h-2 rounded-full bg-black/5 dark:bg-white/10 overflow-hidden">
            <div className="h-full rounded-full bg-cyan-500" style={{ width: `${w}%` }} />
        </div>
    );
}

function LetterAvatar({ name }: { name: string }) {
    const letter = (name?.trim()?.[0] ?? "?").toUpperCase();
    const hue = Array.from(name).reduce((acc, ch) => acc + ch.charCodeAt(0), 0) % 360;
    const bg = `hsl(${hue} 70% 90% / 1)`;
    const fg = `hsl(${hue} 55% 28% / 1)`;
    return (
        <div
            className="flex items-center justify-center h-7 w-7 rounded-xl border text-[12px] font-semibold shrink-0"
            style={{ background: bg, color: fg, borderColor: `hsl(${hue} 70% 80% / .8)` }}
            aria-hidden
            title={name}
        >
            {letter}
        </div>
    );
}

type Suggestion = { id: string; title: string; reason: string; actionLabel: string; href: string };
function buildSuggestions(projects: Project[]): Suggestion[] {
    const out: Suggestion[] = [];
    for (const p of projects) {
        if (p.overdueMilestones > 0) {
            out.push({ id: `${p.id}-overdue`, title: `Resolve overdue in “${p.name}”`, reason: `${p.overdueMilestones} overdue`, actionLabel: "Review milestones", href: `/admin/projects/${p.id}` });
        }
        const daysSinceUpdate = Math.floor((Date.now() - +new Date(p.updatedAt)) / 86400000);
        if (daysSinceUpdate >= 10 && p.status === "active") {
            out.push({ id: `${p.id}-stale`, title: `Post update for “${p.name}”`, reason: `${daysSinceUpdate} days stale`, actionLabel: "Add update", href: `/admin/projects/${p.id}` });
        }
        if (p.budgetRiskPct >= 15 && p.status === "active") {
            out.push({ id: `${p.id}-budget`, title: `Review budget for “${p.name}”`, reason: `Budget risk ${p.budgetRiskPct}%`, actionLabel: "Open budget", href: `/admin/projects/${p.id}` });
        }
        if (p.progress < 25 && p.status === "active") {
            out.push({ id: `${p.id}-low-progress`, title: `Kickstart “${p.name}”`, reason: `Only ${p.progress}% complete`, actionLabel: "Plan next steps", href: `/admin/projects/${p.id}` });
        }
    }
    const order = (s: Suggestion) => (s.id.includes("overdue") ? 0 : s.id.includes("budget") ? 1 : s.id.includes("stale") ? 2 : 3);
    return out.sort((a, b) => order(a) - order(b)).slice(0, 10);
}

export default function ProjectManagementPage() {
    const sp = useSearchParams();
    const current = (sp.get("view") ?? "all") as TabKey;
    const mode = (sp.get("mode") ?? "grid") as Mode;
    const [q, setQ] = useState("");
    const [openSuggestions, setOpenSuggestions] = useState(false);
    const [dismissed, setDismissed] = useState<Record<string, true>>({});

    const filtered = useMemo(() => {
        const text = q.trim().toLowerCase();
        let list = MOCK.slice();

        switch (current) {
            case "active": list = list.filter(p => p.status === "active"); break;
            case "overdue": list = list.filter(p => p.overdueMilestones > 0); break;
            case "mine": list = list.filter(p => p.owner === "me"); break;
            case "favorites": list = list.filter(p => !!p.favorite); break;
            case "recent": list = list.sort((a, b) => +new Date(b.lastAccessed) - +new Date(a.lastAccessed)).slice(0, 10); break;
            case "archived": list = list.filter(p => p.status === "archived"); break;
            case "completed": list = list.filter(p => p.status === "completed"); break;
            case "deleted": list = list.filter(p => p.status === "deleted"); break;
            default: break;
        }

        if (text) {
            list = list.filter(p => p.name.toLowerCase().includes(text) || p.owner.toLowerCase().includes(text));
        }

        list.sort((a, b) => {
            const oa = a.overdueMilestones > 0 ? 1 : 0;
            const ob = b.overdueMilestones > 0 ? 1 : 0;
            if (oa !== ob) return ob - oa;
            return +new Date(b.updatedAt) - +new Date(a.updatedAt);
        });

        return list;
    }, [current, q]);

    const suggestions = useMemo(() => buildSuggestions(filtered).filter(s => !dismissed[s.id]), [filtered, dismissed]);

    const tabLink = (key: TabKey) => `/admin/projects/management?view=${key}&mode=${mode}`;
    const modeLink = (m: Mode) => `/admin/projects/management?view=${current}&mode=${m}`;

    return (
        <main className="relative p-6 md:p-8">
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute -top-24 right-0 w-[60vw] h-[60vw] max-w-[880px] rounded-full blur-3xl opacity-20 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(34,211,238,0.24),transparent_65%)]" />
            </div>

            {/* Title & actions */}
            <header className="mb-5 flex flex-wrap items-center gap-3 justify-between">
                <div>
                    <h1 className="text-2xl font-semibold leading-tight">Project Management</h1>
                    <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1">Browse, filter, and manage projects. Choose a view below.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Link
                        href="/admin/projects/creation"
                        className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium border border-black/5 dark:border-white/5 bg-white/60 dark:bg-neutral-900/60 backdrop-blur-xl hover:shadow-md transition-all"
                    >
                        <PlusCircle className="size-4" />
                        New Project
                    </Link>
                    <button
                        onClick={() => setOpenSuggestions(true)}
                        className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium border border-black/5 dark:border-white/5 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-xl hover:shadow-sm"
                        title="Open suggestions"
                    >
                        <Wand2 className="size-4" />
                        Suggestions
                    </button>
                </div>
            </header>

            {/* Tabs + View toggle */}
            <div className="mb-4 flex flex-wrap gap-3 justify-between">
                <nav className="overflow-auto">
                    <ul className="flex gap-2 min-w-max">
                        {TABS.map(t => {
                            const active = current === t.key;
                            return (
                                <li key={t.key}>
                                    <Link
                                        href={tabLink(t.key)}
                                        className={[
                                            "inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm border transition-all",
                                            active
                                                ? "bg-cyan-500 text-white border-transparent shadow-md"
                                                : "bg-white/55 dark:bg-neutral-900/55 border-black/5 dark:border-white/10 hover:shadow-sm"
                                        ].join(" ")}
                                    >
                                        {t.icon}
                                        {t.label}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                <nav className="overflow-auto">
                    <ul className="flex gap-2 min-w-max">
                        {[
                            { key: "list", label: "List", icon: <ListIcon className="size-4" /> },
                            { key: "grid", label: "Grid", icon: <LayoutGrid className="size-4" /> },
                            { key: "kanban", label: "Kanban", icon: <FolderKanban className="size-4" /> },
                        ].map(v => {
                            const active = mode === (v.key as Mode);
                            return (
                                <li key={v.key}>
                                    <Link
                                        href={modeLink(v.key as Mode)}
                                        className={[
                                            "inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm border transition-all",
                                            active
                                                ? "bg-cyan-500 text-white border-transparent shadow-md"
                                                : "bg-white/55 dark:bg-neutral-900/55 border-black/5 dark:border-white/10 hover:shadow-sm"
                                        ].join(" ")}
                                    >
                                        {v.icon}
                                        {v.label}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>

            {/* Tools */}
            <div className="mb-4 flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-2 grow sm:grow-0 rounded-xl border border-black/5 dark:border-white/10 px-3 py-2 bg-white/55 dark:bg-neutral-900/55 backdrop-blur-xl">
                    <Search className="size-4 opacity-70" />
                    <input
                        placeholder="Search projects…"
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        className="bg-transparent outline-none text-sm w-full"
                    />
                </div>
                <button className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm border border-black/5 dark:border-white/10 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-xl hover:shadow-sm">
                    <Filter className="size-4" />
                    Filters
                </button>
            </div>

            {/* Content */}
            {(() => {
                if (filtered.length === 0) {
                    return (
                        <div className="rounded-2xl ring-1 ring-black/5 dark:ring-white/10 p-8 text-center bg-white/50 dark:bg-neutral-900/50 backdrop-blur-xl">
                            <div className="text-sm text-neutral-600 dark:text-neutral-300">No projects found for this view.</div>
                        </div>
                    );
                }

                if (mode === "list") {
                    return (
                        <div className="rounded-2xl bg-white/50 dark:bg-neutral-900/50 backdrop-blur-xl ring-1 ring-black/5 dark:ring-white/10 overflow-hidden shadow-lg">
                            <table className="w-full text-sm">
                                <thead className="bg-white/60 dark:bg-neutral-900/60">
                                    <tr className="text-left">
                                        <th className="px-4 py-2">Project</th>
                                        <th className="px-4 py-2">Owner</th>
                                        <th className="px-4 py-2">Status</th>
                                        <th className="px-4 py-2">Health</th>
                                        <th className="px-4 py-2">Progress</th>
                                        <th className="px-4 py-2">Budget</th>
                                        <th className="px-4 py-2">Updated</th>
                                        <th className="px-4 py-2"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-black/5 dark:divide-white/10">
                                    {filtered.map((p) => (
                                        <tr key={p.id} className="align-middle hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                                            <td className="px-4 py-2">
                                                <div className="flex items-center gap-2">
                                                    <LetterAvatar name={p.name} />
                                                    <span className="font-medium">{p.name}</span>
                                                    {p.overdueMilestones > 0 && (
                                                        <span className="ml-1 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] border bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/30">
                                                            <AlertTriangle className="size-3.5" />
                                                            {p.overdueMilestones}
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-4 py-2">{p.owner === "me" ? "You" : p.owner}</td>
                                            <td className="px-4 py-2"><span className={pillFor(p.status)}>{p.status}</span></td>
                                            <td className="px-4 py-2">{p.health.toFixed(1)}/10</td>
                                            <td className="px-4 py-2"><div className="w-28"><ProgressBar value={p.progress} /></div></td>
                                            <td className="px-4 py-2">{p.budgetRiskPct}%</td>
                                            <td className="px-4 py-2">{p.updatedAt}</td>
                                            <td className="px-4 py-2 text-right">
                                                <Link href={`/admin/projects/${p.id}`} className="inline-flex items-center gap-1 font-medium hover:underline">
                                                    Open <ArrowUpRight className="size-4" />
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    );
                }

                if (mode === "kanban") {
                    const columns: Record<Status, Project[]> = {
                        active: filtered.filter(p => p.status === "active"),
                        completed: filtered.filter(p => p.status === "completed"),
                        archived: filtered.filter(p => p.status === "archived"),
                        deleted: filtered.filter(p => p.status === "deleted"),
                    };
                    const order: Status[] = ["active", "completed", "archived", "deleted"];
                    return (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
                            {order.map((s) => (
                                <div
                                    key={s}
                                    className="rounded-2xl bg-white/55 dark:bg-neutral-900/55 backdrop-blur-xl ring-1 ring-black/5 dark:ring-white/10 shadow-xl"
                                >
                                    <div className="px-4 py-3 border-b border-black/5 dark:border-white/10 flex items-center justify-between sticky top-0 bg-white/60 dark:bg-neutral-900/60 backdrop-blur-xl rounded-t-2xl z-10">
                                        <div className="text-sm font-semibold capitalize">{s}</div>
                                        <div className="text-xs opacity-70">{columns[s].length}</div>
                                    </div>
                                    <ul className="p-3 space-y-3">
                                        {columns[s].length === 0 ? (
                                            <li className="text-xs text-neutral-500">No projects.</li>
                                        ) : (
                                            columns[s].map((p) => (
                                                <li
                                                    key={p.id}
                                                    className="rounded-xl ring-1 ring-black/5 dark:ring-white/10 p-3 bg-white/70 dark:bg-neutral-900/70 shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all"
                                                >
                                                    <div className="flex items-start justify-between gap-2">
                                                        <div className="min-w-0">
                                                            <div className="flex items-center gap-2">
                                                                <LetterAvatar name={p.name} />
                                                                <div className="font-medium truncate">{p.name}</div>
                                                                {p.favorite ? <Star className="size-4 text-amber-500" /> : <StarOff className="size-4 opacity-30" />}
                                                            </div>
                                                            <div className="mt-1 text-[12px] text-neutral-600 dark:text-neutral-300">
                                                                {p.owner === "me" ? "You" : p.owner} • {p.updatedAt}
                                                            </div>
                                                        </div>
                                                        {p.overdueMilestones > 0 && (
                                                            <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] border bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/30">
                                                                <AlertTriangle className="size-3.5" />
                                                                {p.overdueMilestones}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="mt-2">
                                                        <div className="flex items-center justify-between text-[12px] mb-1">
                                                            <span className="text-neutral-500">Progress</span>
                                                            <span className="font-medium">{p.progress}%</span>
                                                        </div>
                                                        <ProgressBar value={p.progress} />
                                                    </div>
                                                    <div className="mt-2 text-[12px]">
                                                        <span className="mr-2">Health {p.health.toFixed(1)}/10</span>
                                                        <span>Budget {p.budgetRiskPct}%</span>
                                                    </div>
                                                </li>
                                            ))
                                        )}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    );
                }

                // GRID
                return (
                    <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                        {filtered.map(p => (
                            <li
                                key={p.id}
                                className="group rounded-2xl bg-white/55 dark:bg-neutral-900/55 backdrop-blur-xl shadow-lg ring-1 ring-black/5 dark:ring-white/10 hover:shadow-xl hover:-translate-y-0.5 transition-all"
                            >
                                <div className="p-4">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="min-w-0">
                                            <div className="flex items-center gap-2">
                                                <LetterAvatar name={p.name} />
                                                <h3 className="font-semibold truncate">{p.name}</h3>
                                                {p.favorite ? <Star className="size-4 text-amber-500" title="Favorite" /> : <StarOff className="size-4 opacity-30" title="Not favorite" />}
                                            </div>
                                            <div className="mt-1 flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-300">
                                                <User className="size-3.5 opacity-70" />
                                                <span className="truncate">{p.owner === "me" ? "You" : p.owner}</span>
                                                <span>•</span>
                                                <span>Updated {p.updatedAt}</span>
                                            </div>
                                        </div>

                                        {p.overdueMilestones > 0 ? (
                                            <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] border bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/30">
                                                <AlertTriangle className="size-3.5" />
                                                {p.overdueMilestones}
                                            </span>
                                        ) : (
                                            <span className={pillFor(p.status)}>{p.status}</span>
                                        )}
                                    </div>

                                    <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
                                        <div className="rounded-lg ring-1 ring-black/5 dark:ring-white/10 px-2 py-1">
                                            <div className="text-neutral-500">Health</div>
                                            <div className="font-medium">{p.health.toFixed(1)}/10</div>
                                        </div>
                                        <div className="rounded-lg ring-1 ring-black/5 dark:ring-white/10 px-2 py-1">
                                            <div className="text-neutral-500">Budget risk</div>
                                            <div className="font-medium">{p.budgetRiskPct}%</div>
                                        </div>
                                        <div className="rounded-lg ring-1 ring-black/5 dark:ring-white/10 px-2 py-1">
                                            <div className="text-neutral-500">Overdue</div>
                                            <div className="font-medium">{p.overdueMilestones || 0}</div>
                                        </div>
                                    </div>

                                    <div className="mt-3">
                                        <div className="mb-1 flex items-center justify-between text-xs">
                                            <span className="text-neutral-500">Progress</span>
                                            <span className="font-medium">{p.progress}%</span>
                                        </div>
                                        <ProgressBar value={p.progress} />
                                    </div>

                                    <div className="mt-3 flex items-center justify-between">
                                        <div className="text-xs text-neutral-600 dark:text-neutral-300">
                                            {p.overdueMilestones > 0 ? `${p.overdueMilestones} overdue` : "On track"}
                                        </div>
                                        <Link href={`/admin/projects/${p.id}`} className="inline-flex items-center gap-1 text-sm font-medium hover:underline">
                                            Open <ArrowUpRight className="size-4" />
                                        </Link>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                );
            })()}

          
        </main>
    );
}
