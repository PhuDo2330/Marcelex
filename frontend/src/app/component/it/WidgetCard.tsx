"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState, useCallback } from "react";
import { MarcelexLogo } from "@/app/component/logo/MarcelexLogo";
import {
    LayoutDashboard,
    FolderKanban,
    CheckSquare,
    Calendar,
    Tag,
    BarChart3,
    Users2,
    ShieldCheck,
    UserCog,
    Building2,
    Ticket,
    AlertTriangle,
    GitCompare,
    Boxes,
    BookOpen,
    Timer,
    Settings,
    CreditCard,
    Plug2,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

type Item = { label: string; href: string; icon?: React.ReactNode; count?: number };
type Group = { title: string; items: Item[] };

const NAV: Group[] = [
    {
        title: "Overview",
        items: [
            { label: "Dashboard", href: "/admin", icon: <LayoutDashboard className="size-5 shrink-0" /> },
            { label: "Projects", href: "/admin/projects", count: 42, icon: <FolderKanban className="size-5 shrink-0" /> },
            { label: "Tasks", href: "/admin/tasks", count: 317, icon: <CheckSquare className="size-5 shrink-0" /> },
            { label: "Sprints", href: "/admin/sprints", icon: <ShieldCheck className="size-5 shrink-0" /> },
            { label: "Calendar", href: "/admin/calendar", icon: <Calendar className="size-5 shrink-0" /> },
            { label: "Labels", href: "/admin/labels", icon: <Tag className="size-5 shrink-0" /> },
            { label: "Reports", href: "/admin/reports", icon: <BarChart3 className="size-5 shrink-0" /> },
        ],
    },
    {
        title: "People",
        items: [
            { label: "Users", href: "/admin/users", icon: <Users2 className="size-5 shrink-0" /> },
            { label: "Roles & RBAC", href: "/admin/roles", icon: <UserCog className="size-5 shrink-0" /> },
            { label: "Teams", href: "/admin/teams", icon: <Building2 className="size-5 shrink-0" /> },
        ],
    },
    {
        title: "IT & Ops",
        items: [
            { label: "IT Overview", href: "/admin/it", icon: <LayoutDashboard className="size-5 shrink-0" /> },
            { label: "Tickets", href: "/admin/tickets", icon: <Ticket className="size-5 shrink-0" /> },
            { label: "Incidents", href: "/admin/incidents", icon: <AlertTriangle className="size-5 shrink-0" /> },
            { label: "Changes", href: "/admin/changes", icon: <GitCompare className="size-5 shrink-0" /> },
            { label: "Assets", href: "/admin/assets", icon: <Boxes className="size-5 shrink-0" /> },
            { label: "Knowledge", href: "/admin/knowledge", icon: <BookOpen className="size-5 shrink-0" /> },
            { label: "SLA", href: "/admin/sla", icon: <Timer className="size-5 shrink-0" /> },
            { label: "Reports", href: "/admin/ops-reports", icon: <BarChart3 className="size-5 shrink-0" /> },
        ],
    },
    {
        title: "System",
        items: [
            { label: "Settings", href: "/admin/settings", icon: <Settings className="size-5 shrink-0" /> },
            { label: "Billing", href: "/admin/billing", icon: <CreditCard className="size-5 shrink-0" /> },
            { label: "Integrations", href: "/admin/integrations", icon: <Plug2 className="size-5 shrink-0" /> },
        ],
    },
];

function CountBadge({ value }: { value: number }) {
    return (
        <span className="ml-2 inline-flex min-w-[1.5rem] items-center justify-center rounded-md bg-orange-500/20 text-orange-600 text-[11px] font-medium px-1.5 py-0.5">
            {value}
        </span>
    );
}

export function Sidebar() {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("sidebarCollapsed");
        if (saved != null) setCollapsed(saved === "true");
    }, []);

    const toggle = useCallback(() => {
        setCollapsed((c) => {
            const next = !c;
            localStorage.setItem("sidebarCollapsed", String(next));
            return next;
        });
    }, []);

    const isActive = useCallback(
        (href: string) => (href === "/admin" ? pathname === "/admin" : pathname.startsWith(href)),
        [pathname]
    );

    const WIDTH = collapsed ? "w-[72px]" : "w-[264px]";
    const logo = useMemo(
        () => (
            <MarcelexLogo
                size={30}              // bigger icon
                showWord={!collapsed}
                wordScale={0.86}       // slightly smaller word
                wordColor="var(--sidebar-fg)"
                palette="nebula"
                shineWord              // metallic sweep
            />
        ),
        [collapsed]
    );

    return (
        <aside
            className={[
                "hidden md:flex md:flex-col shrink-0 min-h-screen",
                WIDTH,
                "bg-[var(--sidebar-bg)] text-[var(--sidebar-fg)] border-r border-black/10 rounded-r-2xl",
                "transition-[width] duration-200 ease-out shadow-md",
            ].join(" ")}
        >
            {/* Header */}
            <div className="h-14 px-2 flex items-center justify-between border-b border-white/5">
                <div className="pl-2">{logo}</div>
                <button
                    onClick={toggle}
                    aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                    className="group ml-2 inline-flex items-center justify-center rounded-lg hover:bg-[var(--sidebar-hover)] h-8 w-8"
                    title={collapsed ? "Expand" : "Collapse"}
                >
                    {collapsed ? (
                        <ChevronRight className="size-5 opacity-80 group-hover:opacity-100" />
                    ) : (
                        <ChevronLeft className="size-5 opacity-80 group-hover:opacity-100" />
                    )}
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto px-2 py-4">
                {NAV.map((group) => (
                    <div key={group.title} className="mb-5">
                        {!collapsed && (
                            <div className="px-2 text-[12px] font-semibold text-gray-400 mb-1">{group.title}</div>
                        )}
                        <ul className="space-y-1">
                            {group.items.map((item) => {
                                const active = isActive(item.href);
                                return (
                                    <li key={item.href}>
                                        <Link
                                            href={item.href}
                                            className={[
                                                "group flex items-center rounded-xl px-3 py-2 text-[13px] font-medium transition-colors",
                                                active
                                                    ? "bg-gradient-nebula/10 text-gradient-nebula shadow-[0_0_0_1px_rgba(32,211,240,0.25)]"
                                                    : "text-gray-200 hover:text-gradient-nebula hover:bg-white/5 dark:text-gray-300 dark:hover:text-gradient-nebula dark:hover:bg-neutral-800/40",
                                                "hover:shadow-sm",
                                            ].join(" ")}

                                            title={collapsed ? item.label : undefined}
                                        >
                                            <span className="mr-3">{item.icon ?? <Tag className="size-5 shrink-0" />}</span>
                                            {!collapsed && (
                                                <span className="flex-1 truncate">
                                                    {item.label}
                                                    {typeof item.count === "number" && <CountBadge value={item.count} />}
                                                </span>
                                            )}
                                            {/* collapsed count dot */}
                                            {collapsed && typeof item.count === "number" && (
                                                <span
                                                    className="ml-auto mr-1 h-1.5 w-1.5 rounded-full bg-orange-400/90"
                                                    aria-label={`${item.count} items`}
                                                    title={`${item.count}`}
                                                />
                                            )}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ))}
            </nav>

            {/* Footer */}
            <div className="px-3 py-3 text-gray-400 text-xs border-t border-white/5">
                {collapsed ? "© M" : "© 2025 Marcelex"}
            </div>
        </aside>
    );
}

export default Sidebar;
