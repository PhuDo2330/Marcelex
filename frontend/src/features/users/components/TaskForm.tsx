/**
 * app/admin/tasks/page.tsx
 * Server wrapper: computes allowed scope tabs and passes data to the client list.
 */
import PageHeader from "@/app/component/ui/PageHeader";
import { getCurrentUser } from "@/features/auth/server";
import { taskScopesForRole, TaskScope } from "@/features/auth/roles";
import TasksClient from "./tasks.client";

export type TaskRow = {
    id: string;
    title: string;
    projectId: string;
    projectName: string;
    department: "DEV" | "IT" | "HR" | "CONSTRUCTION";
    assigneeId: string;
    assigneeName: string;
    priority: "P1" | "P2" | "P3" | "P4";
    status: string;
    due?: string;            // ISO date
    progressPct?: number;    // 0..100
    subtasks?: { done: number; total: number };
    tags?: string[];         // labels
};

const MOCK: TaskRow[] = [
    {
        id: "TSK-1201", title: "Auth service: rotate signing keys", projectId: "PRJ-DEV-002", projectName: "LinkWaveAI Core", department: "DEV",
        assigneeId: "u-003", assigneeName: "Sam", priority: "P1", status: "In Progress", due: "2025-09-05", progressPct: 60, subtasks: { done: 3, total: 5 }, tags: ["security", "backend"]
    },
    {
        id: "TSK-1202", title: "Laptop provisioning runbook update", projectId: "PRJ-IT-001", projectName: "Endpoint Refresh 2025", department: "IT",
        assigneeId: "u-002", assigneeName: "Nora", priority: "P2", status: "Assigned", due: "2025-09-08", progressPct: 20, subtasks: { done: 1, total: 4 }, tags: ["runbook", "helpdesk"]
    },
    {
        id: "TSK-1203", title: "Benefits microsite copy", projectId: "PRJ-HR-001", projectName: "Benefits 2026 Plan", department: "HR",
        assigneeId: "u-004", assigneeName: "Kris", priority: "P3", status: "Under Review", due: "2025-09-20", progressPct: 40, subtasks: { done: 2, total: 6 }, tags: ["content"]
    },
    {
        id: "TSK-1204", title: "Electrical conduit layout R2", projectId: "PRJ-CON-001", projectName: "HQ Buildout — Phase A", department: "CONSTRUCTION",
        assigneeId: "u-001", assigneeName: "You", priority: "P2", status: "In Progress", due: "2025-09-04", progressPct: 35, subtasks: { done: 2, total: 7 }, tags: ["electrical"]
    },
];

function filterByScope(rows: TaskRow[], scope: TaskScope, user: { id: string; teamIds?: string[]; department?: string }) {
    switch (scope) {
        case "self": return rows.filter(r => r.assigneeId === user.id);
        case "team": return rows;               // NOTE: wire real team logic when you add team on tasks
        case "department": return rows.filter(r => r.department === (user.department as any));
        case "org": return rows;
    }
}

export default async function TasksPage({ searchParams }: { searchParams?: { scope?: TaskScope } }) {
    const user = await getCurrentUser();
    const scopes = taskScopesForRole(user.role);
    const activeScope: TaskScope = scopes.includes(searchParams?.scope as TaskScope) ? (searchParams?.scope as TaskScope) : scopes[0];

    // Pre-scope on the server; client still has filters
    const scoped = filterByScope(MOCK, activeScope, user);

    return (
        <div className="flex-1">
            <PageHeader
                title="Tasks"
                subtitle="Plan and track work. Tabs show visibility based on your role."
                crumbs={[{ label: "Admin", href: "/admin" }, { label: "Tasks" }]}
            />
            <TasksClient
                me={{ id: user.id, department: (user.department as any) }}
                scopes={scopes}
                activeScope={activeScope}
                rows={scoped}
                allProjects={[...new Map(MOCK.map(m => [m.projectId, { id: m.projectId, name: m.projectName, dept: m.department }])).values()]}
            />
        </div>
    );
}
