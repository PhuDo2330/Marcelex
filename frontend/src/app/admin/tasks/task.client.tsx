"use client";
/**
 * tasks.client.tsx
 * - Multiple views: My, Team, Department, All, Overdue, By Department
 * - Strong hierarchy: Title + Status prominent, Project visible
 * - Priority colors, overdue highlighting, progress bars, subtasks
 * - Quick actions (complete / reassign / priority up/down), bulk selection, filters
 */
import { useMemo, useState } from "react";
import Link from "next/link";
import Badge from "@/app/component/ui/Badge";
import DataTable from "@/app/component/ui/DataTable";
import type { TaskRow } from "./page";
import { Check, UserPlus, ArrowUp, ArrowDown, Plus, Search } from "lucide-react";
import { taskScopesForRole, TaskScope } from "@/features/auth/roles";

type ProjectRef = { id: string; name: string; dept: "DEV" | "IT" | "HR" | "CONSTRUCTION" };

export default function TasksClient({
    me,
    scopes,
    activeScope,
    rows,
    allProjects,
}: {
    me: { id: string; department?: "DEV" | "IT" | "HR" | "CONSTRUCTION" };
    scopes: TaskScope[];
    activeScope: TaskScope;
    rows: TaskRow[];
    allProjects: ProjectRef[];
}) {
    const [scope, setScope] = useState<TaskScope>(activeScope);
    const [q, setQ] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("All");
    const [priorityFilter, setPriorityFilter] = useState<string>("All");
    const [deptFilter, setDeptFilter] = useState<string>("All");
    const [projectFilter, setProjectFilter] = useState<string>("All");
    const [onlyOverdue, setOnlyOverdue] = useState(false);

    // Bulk selection
    const [selected, setSelected] = useState<Record<string, boolean>>({});

    // Tabs (role scopes + extras)
    const extraTabs: Array<{ key: string; label: string }> = [
        { key: "overdue", label: "Overdue" },
        { key: "bydept", label: "By Department" },
    ];

    // Helpers
    function isOverdue(due?: string) {
        if (!due) return false;
        const today = new Date().toISOString().slice(0, 10);
        return due < today;
    }
    function prioBadge(p: TaskRow["priority"]) {
        const map: Record<TaskRow["priority"], string> = {
            P1: "bg-rose-500/15 text-rose-600 border border-rose-500/30",
            P2: "bg-amber-500/15 text-amber-600 border border-amber-500/30",
            P3: "bg-emerald-500/15 text-emerald-600 border border-emerald-500/30",
            P4: "bg-sky-500/15 text-sky-600 border border-sky-500/30",
        };
        return map[p];
    }

    const filtered = useMemo(() => {
        let list = rows;

        // Extra tab views
        if (scope === "org" && onlyOverdue) {
            list = list.filter((r) => isOverdue(r.due));
        }

        // string search
        const qq = q.toLowerCase();
        if (qq) list = list.filter((r) =>
            (r.title + r.id + r.projectName + r.assigneeName + (r.tags?.join(",") ?? "")).toLowerCase().includes(qq)
        );

        // filters
        if (statusFilter !== "All") list = list.filter((r) => r.status === statusFilter);
        if (priorityFilter !== "All") list = list.filter((r) => r.priority === priorityFilter);
        if (deptFilter !== "All") list = list.filter((r) => r.department === deptFilter);
        if (projectFilter !== "All") list = list.filter((r) => r.projectId === projectFilter);

        return list;
    }, [rows, q, statusFilter, priorityFilter, deptFilter, projectFilter, scope, onlyOverdue]);

    const statuses = Array.from(new Set(rows.map((r) => r.status))).sort();
    const projects = allProjects;

    // Quick actions (stubbed)
    function markComplete(ids: string[]) { /* wire to API */ alert(`Mark complete: ${ids.join(", ")}`); }
    function reassign(ids: string[]) { /* wire to API */ alert(`Reassign: ${ids.join(", ")}`); }
    function bumpPrio(ids: string[], dir: "up" | "down") { /* wire */ alert(`Priority ${dir}: ${ids.join(", ")}`); }

    const anySelected = Object.values(selected).some(Boolean);
    const selectedIds = Object.entries(selected).filter(([_, v]) => v).map(([k]) => k);

    return (
        <div className="space-y-4">
            {/* Tabs */}
            <div className="flex flex-wrap items-center gap-2">
                {scopes.map((s) => {
                    const active = s === scope;
                    return (
                        <button key={s}
                            onClick={() => { setScope(s); setOnlyOverdue(false); }}
                            className={`rounded-xl px-3 py-1.5 text-xs transition ${active ? "bg-cyan-500 text-white shadow-md" : "bg-white/55 dark:bg-neutral-900/55 border border-black/5 dark:border-white/10 hover:shadow-md"}`}
                        >
                            {s === "self" ? "My Tasks" : s === "team" ? "Team" : s === "department" ? "Department" : "All"}
                        </button>
                    );
                })}
                <button
                    onClick={() => { setScope("org"); setOnlyOverdue(true); }}
                    className={`rounded-xl px-3 py-1.5 text-xs transition ${onlyOverdue ? "bg-rose-500 text-white shadow-md" : "bg-white/55 dark:bg-neutral-900/55 border border-black/5 dark:border-white/10 hover:shadow-md"}`}
                >
                    Overdue
                </button>
                <button
                    onClick={() => { setScope("org"); setOnlyOverdue(false); setDeptFilter("All"); }}
                    className="rounded-xl px-3 py-1.5 text-xs bg-white/55 dark:bg-neutral-900/55 border border-black/5 dark:border-white/10 hover:shadow-md"
                >
                    By Department
                </button>

                <div className="ml-auto flex items-center gap-2">
                    <div className="relative">
                        <Search className="absolute left-2 top-2.5 size-4 text-neutral-400" />
                        <input
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            placeholder="Search tasks…"
                            className="pl-8 pr-3 py-2 rounded-lg text-sm bg-white/80 dark:bg-neutral-900/70 border border-black/5 dark:border-white/10 outline-none focus:ring-2 focus:ring-cyan-400/40"
                        />
                    </div>
                    <Link href="/admin/tasks/new" className="rounded-lg px-3 py-1.5 text-sm font-medium bg-cyan-500 text-white shadow-md hover:shadow-lg">
                        <Plus className="inline size-4 mr-1" /> New Task
                    </Link>
                </div>
            </div>

            {/* Filter bar & bulk actions */}
            <div className="flex flex-wrap items-center gap-2">
                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-1.5 rounded-xl text-xs bg-white/55 dark:bg-neutral-900/55 border border-black/5 dark:border-white/10">
                    <option>All</option>
                    {statuses.map(s => <option key={s}>{s}</option>)}
                </select>
                <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}
                    className="px-3 py-1.5 rounded-xl text-xs bg-white/55 dark:bg-neutral-900/55 border border-black/5 dark:border-white/10">
                    <option>All</option><option value="P1">P1</option><option value="P2">P2</option><option value="P3">P3</option><option value="P4">P4</option>
                </select>
                <select value={deptFilter} onChange={(e) => setDeptFilter(e.target.value)}
                    className="px-3 py-1.5 rounded-xl text-xs bg-white/55 dark:bg-neutral-900/55 border border-black/5 dark:border-white/10">
                    <option>All</option><option value="DEV">DEV</option><option value="IT">IT</option><option value="HR">HR</option><option value="CONSTRUCTION">CONSTRUCTION</option>
                </select>
                <select value={projectFilter} onChange={(e) => setProjectFilter(e.target.value)}
                    className="px-3 py-1.5 rounded-xl text-xs bg-white/55 dark:bg-neutral-900/55 border border-black/5 dark:border-white/10">
                    <option>All</option>
                    {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>

                {scope === "org" && (
                    <label className="ml-2 inline-flex items-center gap-2 text-xs">
                        <input type="checkbox" checked={onlyOverdue} onChange={(e) => setOnlyOverdue(e.target.checked)} />
                        Show overdue only
                    </label>
                )}

                {/* Bulk actions */}
                <div className="ml-auto flex items-center gap-2">
                    <button disabled={!anySelected}
                        onClick={() => markComplete(selectedIds)}
                        className="px-3 py-1.5 rounded-lg text-sm bg-white/55 dark:bg-neutral-900/55 border border-black/5 dark:border-white/10 disabled:opacity-50">
                        <Check className="inline size-4 mr-1" /> Complete
                    </button>
                    <button disabled={!anySelected}
                        onClick={() => reassign(selectedIds)}
                        className="px-3 py-1.5 rounded-lg text-sm bg-white/55 dark:bg-neutral-900/55 border border-black/5 dark:border-white/10 disabled:opacity-50">
                        <UserPlus className="inline size-4 mr-1" /> Reassign
                    </button>
                    <button disabled={!anySelected}
                        onClick={() => bumpPrio(selectedIds, "up")}
                        className="px-3 py-1.5 rounded-lg text-sm bg-white/55 dark:bg-neutral-900/55 border border-black/5 dark:border-white/10 disabled:opacity-50">
                        <ArrowUp className="inline size-4 mr-1" /> Priority ↑
                    </button>
                    <button disabled={!anySelected}
                        onClick={() => bumpPrio(selectedIds, "down")}
                        className="px-3 py-1.5 rounded-lg text-sm bg-white/55 dark:bg-neutral-900/55 border border-black/5 dark:border-white/10 disabled:opacity-50">
                        <ArrowDown className="inline size-4 mr-1" /> Priority ↓
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-2xl bg-white/55 dark:bg-neutral-900/55 backdrop-blur-xl ring-1 ring-black/5 dark:ring-white/10 shadow-lg">
                <table className="min-w-[980px] w-full text-sm">
                    <thead className="text-left text-neutral-500">
                        <tr className="[&>*]:px-4 [&>*]:py-3">
                            <th>
                                <input
                                    type="checkbox"
                                    aria-label="Select all"
                                    onChange={(e) => {
                                        const next: Record<string, boolean> = {};
                                        filtered.forEach((r) => (next[r.id] = e.target.checked));
                                        setSelected(next);
                                    }}
                                    checked={filtered.length > 0 && filtered.every(r => selected[r.id])}
                                />
                            </th>
                            <th>Title & Status</th>
                            <th>Project</th>
                            <th>Assignee</th>
                            <th>Priority</th>
                            <th>Due</th>
                            <th>Progress</th>
                            <th>Tags</th>
                            <th className="w-24">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-black/5 dark:divide-white/10">
                        {filtered.map((t) => {
                            const overdue = isOverdue(t.due);
                            return (
                                <tr key={t.id} className={`group ${overdue ? "bg-rose-500/5" : "hover:bg-white/40 dark:hover:bg-neutral-800/40"}`}>
                                    <td className="px-4 py-2">
                                        <input
                                            type="checkbox"
                                            checked={!!selected[t.id]}
                                            onChange={(e) => setSelected((prev) => ({ ...prev, [t.id]: e.target.checked }))}
                                        />
                                    </td>
                                    <td className="px-4 py-2">
                                        <div className="flex items-start gap-2">
                                            <div className="min-w-0">
                                                <div className="font-semibold leading-5">
                                                    <Link href={`/admin/tasks/${t.id}`} className="hover:underline">{t.title}</Link>
                                                </div>
                                                <div className="mt-0.5 text-xs">
                                                    <Badge status={t.status as any}>{t.status}</Badge>
                                                    <span className="ml-2 text-neutral-500">#{t.id}</span>
                                                    <span className="ml-2 inline-block rounded-md px-1.5 py-0.5 text-[11px] bg-white/60 dark:bg-neutral-800/60 border border-black/5 dark:border-white/10">
                                                        {t.department}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-2">
                                        <div className="text-sm">{t.projectName}</div>
                                        <div className="text-xs text-neutral-500">{t.projectId}</div>
                                    </td>
                                    <td className="px-4 py-2">{t.assigneeName}</td>
                                    <td className="px-4 py-2">
                                        <span className={`px-2 py-0.5 rounded-md text-xs ${prioBadge(t.priority)}`}>{t.priority}</span>
                                    </td>
                                    <td className={`px-4 py-2 ${overdue ? "text-rose-600 font-semibold" : ""}`}>
                                        {t.due ?? "—"}
                                        {overdue && <span className="ml-2 text-[11px]">Overdue</span>}
                                    </td>
                                    <td className="px-4 py-2">
                                        <div className="w-40 rounded-full bg-neutral-200/60 dark:bg-neutral-800/60 h-2 overflow-hidden">
                                            <div className="h-2 rounded-full bg-cyan-500" style={{ width: `${t.progressPct ?? 0}%` }} />
                                        </div>
                                        {t.subtasks && (
                                            <div className="text-xs text-neutral-500 mt-1">
                                                {t.subtasks.done}/{t.subtasks.total} subtasks
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-4 py-2">
                                        <div className="flex flex-wrap gap-1">
                                            {(t.tags ?? []).map(tag => (
                                                <span key={tag} className="px-2 py-0.5 rounded-md text-[11px] bg-white/60 dark:bg-neutral-800/60 border border-black/5 dark:border-white/10">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-4 py-2">
                                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                                            <button onClick={() => markComplete([t.id])} className="px-2 py-1 rounded-md text-xs bg-white/55 dark:bg-neutral-900/55 border border-black/5 dark:border-white/10">
                                                <Check className="size-4" />
                                            </button>
                                            <button onClick={() => reassign([t.id])} className="px-2 py-1 rounded-md text-xs bg-white/55 dark:bg-neutral-900/55 border border-black/5 dark:border-white/10">
                                                <UserPlus className="size-4" />
                                            </button>
                                            <button onClick={() => bumpPrio([t.id], "up")} className="px-2 py-1 rounded-md text-xs bg-white/55 dark:bg-neutral-900/55 border border-black/5 dark:border-white/10">
                                                <ArrowUp className="size-4" />
                                            </button>
                                            <button onClick={() => bumpPrio([t.id], "down")} className="px-2 py-1 rounded-md text-xs bg-white/55 dark:bg-neutral-900/55 border border-black/5 dark:border-white/10">
                                                <ArrowDown className="size-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                        {filtered.length === 0 && (
                            <tr><td className="px-4 py-6 text-sm text-neutral-500" colSpan={9}>No tasks in this view.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
