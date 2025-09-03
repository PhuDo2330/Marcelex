"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import {
    LayoutDashboard,
    BriefcaseBusiness,
    FolderKanban,
    ListChecks,
    ClipboardList,
    ChevronDown,
    ArrowRight,
    CalendarCheck2,
    BarChart3,
    GitPullRequest,
    KanbanSquare,
    FilePlus2,
    Search,
} from "lucide-react";

type Role = "owner" | "lead" | "developer";

type MenuItem = {
    label: string;
    href: string;
    icon?: React.ReactNode;
    count?: number;
    hint?: string;
};

type MenuSection = {
    title: string;
    items: MenuItem[];
};

function cx(...xs: Array<string | false | null | undefined>) {
    return xs.filter(Boolean).join(" ");
}

/** Small link */
function ItemLink({ item, active }: { item: MenuItem; active: boolean }) {
    return (
        <Link
            href={item.href}
            className={cx(
                "group flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm transition",
                active
                    ? "bg-white/10 text-white"
                    : "text-gray-200 hover:text-white hover:bg-white/5"
            )}
            title={item.hint}
        >
            <span className="shrink-0">{item.icon}</span>
            <span className="min-w-0 flex-1 truncate">{item.label}</span>
            {typeof item.count === "number" && (
                <span className="ml-2 inline-flex items-center rounded-md bg-white/10 px-1.5 py-0.5 text-[11px] leading-none text-white">
                    {item.count}
                </span>
            )}
            <ArrowRight className="size-4 opacity-0 -translate-x-1 group-hover:opacity-70 group-hover:translate-x-0 transition" />
        </Link>
    );
}

/** Compute sections by role (wired later to real RBAC) */
function sectionsFor({
    role,
    projectId,
    devAssignedCount = 2, // demo: Luke has 2 tasks (DEV-301, DEV-304)
}: {
    role: Role;
    projectId?: string;
    devAssignedCount?: number;
}): MenuSection[] {
    const pid = projectId ?? "PROJ-15";
    if (role === "owner") {
        return [
            {
                title: "Projects",
                items: [
                    {
                        label: "All Projects",
                        href: "/admin/projects",
                        icon: <BriefcaseBusiness className="size-4" />,
                        hint: "Create and manage projects",
                    },
                    {
                        label: "Create Project",
                        href: "/admin/projects/new",
                        icon: <FilePlus2 className="size-4" />,
                        hint: "Start a new initiative",
                    },
                ],
            },
            {
                title: "Tasks",
                items: [
                    {
                        label: "Org Backlog",
                        href: "/admin/tasks/backlog",
                        icon: <ClipboardList className="size-4" />,
                    },
                    {
                        label: "Assigned to Me",
                        href: "/admin/tasks/assigned",
                        icon: <ListChecks className="size-4" />,
                    },
                    {
                        label: "Approvals",
                        href: "/admin/tasks/approvals",
                        icon: <CalendarCheck2 className="size-4" />,
                    },
                    {
                        label: "Reports",
                        href: "/admin/tasks/reports",
                        icon: <BarChart3 className="size-4" />,
                    },
                ],
            },
            {
                title: "Development",
                items: [
                    {
                        label: "Product Backlog",
                        href: "/admin/dev/backlog",
                        icon: <FolderKanban className="size-4" />,
                    },
                    {
                        label: "Active Sprint",
                        href: "/admin/dev/sprint",
                        icon: <KanbanSquare className="size-4" />,
                    },
                    {
                        label: "Code Reviews",
                        href: "/admin/dev/reviews",
                        icon: <GitPullRequest className="size-4" />,
                    },
                ],
            },
        ];
    }

    if (role === "lead") {
        return [
            {
                title: `Project • ${pid}: Chat Feature`,
                items: [
                    {
                        label: "Overview",
                        href: `/admin/projects/${pid}`,
                        icon: <LayoutDashboard className="size-4" />,
                    },
                    {
                        label: "Board",
                        href: `/admin/projects/${pid}/board`,
                        icon: <KanbanSquare className="size-4" />,
                    },
                    {
                        label: "Sprints",
                        href: `/admin/projects/${pid}/sprints`,
                        icon: <CalendarCheck2 className="size-4" />,
                    },
                    {
                        label: "Reports",
                        href: `/admin/projects/${pid}/reports`,
                        icon: <BarChart3 className="size-4" />,
                    },
                    {
                        label: "Create Task",
                        href: "/admin/tasks/new",
                        icon: <FilePlus2 className="size-4" />,
                    },
                ],
            },
            {
                title: "My Work",
                items: [
                    {
                        label: "Assigned to Me",
                        href: "/admin/tasks/assigned",
                        icon: <ListChecks className="size-4" />,
                    },
                    {
                        label: "Created by Me",
                        href: "/admin/tasks/created",
                        icon: <ClipboardList className="size-4" />,
                    },
                ],
            },
            {
                title: "Development",
                items: [
                    {
                        label: "Product Backlog",
                        href: `/admin/dev/backlog?project=${pid}`,
                        icon: <FolderKanban className="size-4" />,
                    },
                    {
                        label: "Active Sprint",
                        href: `/admin/dev/sprint?project=${pid}`,
                        icon: <KanbanSquare className="size-4" />,
                    },
                ],
            },
        ];
    }

    // developer
    return [
        {
            title: "My Work",
            items: [
                {
                    label: "Assigned to Me",
                    href: "/admin/tasks/assigned",
                    icon: <ListChecks className="size-4" />,
                    count: devAssignedCount,
                },
                {
                    label: "In Progress",
                    href: "/admin/tasks/in-progress",
                    icon: <ClipboardList className="size-4" />,
                },
                {
                    label: "Recently Updated",
                    href: "/admin/tasks/recent",
                    icon: <Search className="size-4" />,
                },
            ],
        },
        {
            title: "Development",
            items: [
                {
                    label: "Product Backlog",
                    href: "/admin/dev/backlog",
                    icon: <FolderKanban className="size-4" />,
                },
                {
                    label: "Active Sprint",
                    href: "/admin/dev/sprint",
                    icon: <KanbanSquare className="size-4" />,
                },
                {
                    label: "Code Reviews",
                    href: "/admin/dev/reviews",
                    icon: <GitPullRequest className="size-4" />,
                },
            ],
        },
    ];
}

export function TaskMenu({
    role,
    projectId,
    className,
}: {
    role: Role;
    projectId?: string;
    className?: string;
}) {
    const pathname = usePathname();
    const search = useSearchParams();
    const sections = useMemo(
        () => sectionsFor({ role, projectId }),
        [role, projectId]
    );

    // active detection includes pathname + query (basic)
    const isActive = (href: string) => {
        const [pathOnly] = href.split("?");
        if (pathname !== pathOnly) return false;
        const q = href.split("?")[1];
        if (!q) return true;
        return search?.toString() === q;
    };

    return (
        <aside
            className={cx(
                "rounded-2xl bg-white/6 dark:bg-neutral-900/60 ring-1 ring-white/10 p-3 backdrop-blur",
                "w-full max-w-[260px]",
                className
            )}
        >
            {sections.map((sec) => (
                <div key={sec.title} className="mb-4">
                    <div className="mb-1.5 flex items-center justify-between px-1">
                        <div className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                            {sec.title}
                        </div>
                        <ChevronDown className="size-4 opacity-50" />
                    </div>
                    <div className="space-y-1">
                        {sec.items.map((it) => (
                            <ItemLink key={it.href} item={it} active={isActive(it.href)} />
                        ))}
                    </div>
                </div>
            ))}
        </aside>
    );
}

/** Optional: local preview block for quick toggling (used in page.tsx) */
export function RolePreviewSelect({
    value,
    onChange,
}: {
    value: Role;
    onChange: (r: Role) => void;
}) {
    return (
        <div className="inline-flex items-center gap-2 rounded-xl bg-white/8 ring-1 ring-white/10 px-2 py-1.5">
            <span className="text-xs text-gray-300">Role Preview:</span>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value as Role)}
                className="bg-transparent text-sm outline-none"
            >
                <option value="owner">Owner / CEO</option>
                <option value="lead">Project Lead (John)</option>
                <option value="developer">Developer (Luke)</option>
            </select>
        </div>
    );
}
