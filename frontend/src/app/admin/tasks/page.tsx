"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { TaskMenu, RolePreviewSelect } from "@/app/component/tasks/TaskMenu";
import Badge from "@/app/component/ui/Badge";
import {
    ListChecks,
    ChevronRight,
    CalendarDays,
    Play,
    MessageSquare,
    MoreVertical,
    FilePlus2,
    LayoutGrid,
    Users,
} from "lucide-react";
import {
    Breadcrumbs,
    ProjectTimeline,
    MetricCard,
    EmptyState,
    SectionCard,
    TabBar,
} from "@/app/component/tasks/ProjectWidgets";

type Role = "owner" | "lead" | "developer";
type Priority = "P1" | "P2" | "P3" | "P4";
type Status = "Open" | "In Progress" | "Blocked" | "Waiting" | "Resolved";

type Task = {
    key: string;
    title: string;
    assignee?: string;
    priority: Priority;
    status: Status;
    due?: string;
};

const PROJECT_ID = "PROJ-15";
const PROJECT_NAME = "Chat Feature";

// Demo data that matches your scenario
const DEV_TASKS: Task[] = [
    { key: "DEV-301", title: "Auth wiring for chat socket", priority: "P2", status: "In Progress", assignee: "Luke", due: "2025-09-10" },
    { key: "DEV-302", title: "Typing indicator service", priority: "P3", status: "Open", assignee: "Nora", due: "2025-09-14" },
    { key: "DEV-303", title: "Unread counters & badges", priority: "P3", status: "Waiting", assignee: "Sam", due: "2025-09-16" },
    { key: "DEV-304", title: "Message list virtualizer", priority: "P3", status: "Open", assignee: "Luke", due: "2025-09-20" },
];

export default function TasksPage() {
    const [role, setRole] = useState<Role>("owner");

    // Role-scoped dataset
    const tasks = useMemo(() => {
        if (role === "developer") {
            return DEV_TASKS.filter(t => t.assignee === "Luke");
        }
        if (role === "lead") {
            return DEV_TASKS;
        }
        // owner looks at project rollup, but we still show the list
        return DEV_TASKS;
    }, [role]);

    return (
        <main className="px-4 py-4 md:px-6 md:py-6 space-y-4">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="space-y-0.5">
                    <h1 className="text-xl font-semibold">
                        {role === "owner" ? "Project Dashboard" : role === "lead" ? "Project Management" : "My Work Queue"}
                    </h1>
                    <p className="text-sm text-gray-400">
                        Role-specific views to remove confusion. Preview only — wire RBAC later.
                    </p>
                </div>
                <RolePreviewSelect value={role} onChange={setRole} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-4">
                {/* Left: role-aware sub-nav */}
                <TaskMenu role={role} projectId={PROJECT_ID} />

                {/* Right: role-specific content */}
                {role === "owner" && <OwnerProjectDashboard tasks={tasks} />}
                {role === "lead" && <LeadProjectManagement tasks={tasks} />}
                {role === "developer" && <DevMyWork tasks={tasks} />}
            </div>
        </main>
    );
}

/* -------------------- OWNER -------------------- */

function OwnerProjectDashboard({ tasks }: { tasks: Task[] }) {
    const progressPct = 45; // demo

    return (
        <section className="space-y-4">
            {/* Context / Breadcrumbs */}
            <Breadcrumbs
                items={[
                    { label: "Projects", href: "/admin/projects" },
                    { label: `${PROJECT_ID} • ${PROJECT_NAME}` },
                ]}
            />

            {/* Summary header */}
            <SectionCard>
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <div className="text-sm text-gray-500">{PROJECT_ID}</div>
                        <div className="text-lg font-semibold">{PROJECT_NAME}</div>
                        <div className="text-sm text-gray-500">
                            Assigned to: <span className="font-medium text-gray-300">John (Project Lead)</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge status="In Progress">In Progress</Badge>
                        <Link
                            href="/admin/tasks/new"
                            className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm bg-white/80 dark:bg-neutral-800/70 ring-1 ring-black/5 dark:ring-white/10 hover:bg-white"
                        >
                            <FilePlus2 className="size-4" /> Create Task
                        </Link>
                        <Link
                            href="/admin/dev/sprint?project=PROJ-15"
                            className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm bg-cyan-500 text-white hover:brightness-95"
                        >
                            <LayoutGrid className="size-4" /> View Dev Board
                        </Link>
                    </div>
                </div>
            </SectionCard>

            {/* Health & metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <MetricCard label="Overall Progress" value={`${progressPct}%`} hint="Based on task status mix" />
                <MetricCard label="Open / In Progress / Waiting" value="2 / 1 / 1" hint="DEV task breakdown" />
                <MetricCard label="Team Load" value="Luke(2), Nora(1), Sam(1)" hint="Tasks per assignee" />
            </div>

            {/* Timeline */}
            <SectionCard title="Project Timeline">
                <ProjectTimeline
                    steps={[
                        { label: "Created", done: true },
                        { label: "Assigned to Lead", done: true },
                        { label: "Tasks Created", done: true },
                        { label: "In Progress", done: true },
                        { label: "QA", done: false },
                        { label: "Done", done: false },
                    ]}
                />
            </SectionCard>

            {/* Subtasks */}
            <SectionCard title="Sub-tasks Generated">
                {tasks.length ? (
                    <div className="divide-y divide-black/5 dark:divide-white/10 rounded-xl ring-1 ring-black/5 dark:ring-white/10 bg-white/70 dark:bg-neutral-900/60 overflow-hidden">
                        {tasks.map((t) => (
                            <TaskRow key={t.key} task={t} />
                        ))}
                    </div>
                ) : (
                    <EmptyState message="No tasks yet" detail="Create development tasks to kick off execution." />
                )}
            </SectionCard>
        </section>
    );
}

/* -------------------- LEAD -------------------- */

function LeadProjectManagement({ tasks }: { tasks: Task[] }) {
    const [tab, setTab] = useState<"overview" | "board" | "capacity">("overview");

    return (
        <section className="space-y-4">
            <Breadcrumbs
                items={[
                    { label: "My Projects", href: "/admin/projects" },
                    { label: `${PROJECT_ID} • ${PROJECT_NAME}` },
                ]}
            />

            <SectionCard>
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <div className="text-sm text-gray-500">{PROJECT_ID}</div>
                        <div className="text-lg font-semibold">{PROJECT_NAME} — Management</div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link
                            href="/admin/tasks/new"
                            className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm bg-white/80 dark:bg-neutral-800/70 ring-1 ring-black/5 dark:ring-white/10 hover:bg-white"
                        >
                            <FilePlus2 className="size-4" /> Create DEV Task
                        </Link>
                        <Link
                            href={`/admin/projects/${PROJECT_ID}/board`}
                            className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm bg-cyan-500 text-white hover:brightness-95"
                        >
                            <LayoutGrid className="size-4" /> Board
                        </Link>
                    </div>
                </div>
            </SectionCard>

            <TabBar
                value={tab}
                onChange={setTab}
                items={[
                    { key: "overview", label: "Overview" },
                    { key: "board", label: "Task Board" },
                    { key: "capacity", label: "Team Capacity" },
                ]}
            />

            {tab === "overview" && (
                <SectionCard title="Backlog">
                    {tasks.length ? (
                        <div className="divide-y divide-black/5 dark:divide-white/10 rounded-xl ring-1 ring-black/5 dark:ring-white/10 bg-white/70 dark:bg-neutral-900/60 overflow-hidden">
                            {tasks.map((t) => (
                                <TaskRow key={t.key} task={t} />
                            ))}
                        </div>
                    ) : (
                        <EmptyState message="No backlog items" detail="Create tasks to populate the backlog." />
                    )}
                </SectionCard>
            )}

            {tab === "board" && <KanbanPreview tasks={tasks} />}

            {tab === "capacity" && (
                <SectionCard title="Team Capacity (demo)">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <MetricCard label="Luke" value="2 active" hint="DEV-301, DEV-304" />
                        <MetricCard label="Nora" value="1 active" hint="DEV-302" />
                        <MetricCard label="Sam" value="1 waiting" hint="DEV-303" />
                    </div>
                </SectionCard>
            )}
        </section>
    );
}

/* -------------------- DEVELOPER -------------------- */

function DevMyWork({ tasks }: { tasks: Task[] }) {
    return (
        <section className="space-y-4">
            <Breadcrumbs
                items={[
                    { label: "My Work" },
                    { label: `Part of ${PROJECT_ID} • ${PROJECT_NAME}` },
                ]}
            />

            <SectionCard title="Active Tasks">
                {tasks.length ? (
                    <div className="divide-y divide-black/5 dark:divide-white/10 rounded-xl ring-1 ring-black/5 dark:ring-white/10 bg-white/70 dark:bg-neutral-900/60 overflow-hidden">
                        {tasks.map((t) => (
                            <TaskRow key={t.key} task={t} showProject readonlyProject />
                        ))}
                    </div>
                ) : (
                    <EmptyState message="No tasks assigned" detail="Ping your lead or pick from the team backlog." />
                )}
            </SectionCard>
        </section>
    );
}

/* -------------------- Shared pieces -------------------- */

function TaskRow({
    task,
    showProject,
    readonlyProject,
}: {
    task: Task;
    showProject?: boolean;
    readonlyProject?: boolean;
}) {
    return (
        <div className="group flex items-center gap-3 px-3 py-2.5 hover:bg-white/60 dark:hover:bg-neutral-900/70 transition">
            <div className="flex items-center gap-2 min-w-0 flex-1">
                <span className="text-xs font-semibold text-gray-500">{task.key}</span>
                <ChevronRight className="size-4 opacity-40 -mx-1" />
                <span className="truncate text-sm">{task.title}</span>
            </div>

            <div className="hidden md:flex items-center gap-3">
                {showProject && (
                    <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                        <Users className="size-4 opacity-70" />
                        {readonlyProject ? `${PROJECT_ID} • ${PROJECT_NAME}` : (
                            <Link href={`/admin/projects/${PROJECT_ID}`} className="hover:underline">
                                {PROJECT_ID} • {PROJECT_NAME}
                            </Link>
                        )}
                    </span>
                )}
                {task.due && (
                    <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                        <CalendarDays className="size-4 opacity-70" />
                        {task.due}
                    </span>
                )}
                <Badge priority={task.priority}>{task.priority}</Badge>
                <Badge status={task.status}>{task.status}</Badge>
            </div>

            {/* Quick actions */}
            <div className="ml-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                <button className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs bg-emerald-500 text-white hover:brightness-95">
                    <Play className="size-3.5" /> Start
                </button>
                <button className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs bg-white/80 dark:bg-neutral-800/70 ring-1 ring-black/5 dark:ring-white/10 hover:bg-white">
                    <MessageSquare className="size-3.5" /> Comment
                </button>
                <button className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs bg-white/80 dark:bg-neutral-800/70 ring-1 ring-black/5 dark:ring-white/10">
                    <MoreVertical className="size-3.5" />
                </button>
            </div>
        </div>
    );
}

function KanbanPreview({ tasks }: { tasks: Task[] }) {
    const cols: { title: string; key: Status | "WaitingGroup"; items: Task[] }[] = [
        { title: "Open", key: "Open", items: tasks.filter(t => t.status === "Open") },
        { title: "In Progress", key: "In Progress", items: tasks.filter(t => t.status === "In Progress") },
        { title: "Waiting / Blocked", key: "WaitingGroup", items: tasks.filter(t => t.status === "Waiting" || t.status === "Blocked") },
        { title: "Resolved", key: "Resolved", items: tasks.filter(t => t.status === "Resolved") },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
            {cols.map((c) => (
                <SectionCard key={c.title} title={c.title}>
                    <div className="space-y-2 min-h-[120px]">
                        {c.items.length ? (
                            c.items.map((t) => (
                                <div
                                    key={t.key}
                                    className="rounded-lg bg-white/80 dark:bg-neutral-900/70 ring-1 ring-black/5 dark:ring-white/10 p-2"
                                >
                                    <div className="text-xs font-semibold text-gray-500">{t.key}</div>
                                    <div className="text-sm truncate">{t.title}</div>
                                    <div className="mt-1 flex items-center gap-2">
                                        <Badge priority={t.priority}>{t.priority}</Badge>
                                        <Badge status={t.status}>{t.status}</Badge>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-xs text-gray-500">No cards</div>
                        )}
                    </div>
                </SectionCard>
            ))}
        </div>
    );
}
