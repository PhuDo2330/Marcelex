"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { MarcelexLogo } from "@/app/component/logo/MarcelexLogo";
import {
    LayoutDashboard,
    FolderKanban,
    BriefcaseBusiness,
    ServerCog,
    Megaphone,
    LineChart,
    Users2,
    Settings,
    Shield,
    DollarSign,
    ShoppingBag,
    ChevronLeft,
    ChevronDown,
    Building2,
    CheckSquare, // ✅ Tasks icon
} from "lucide-react";

/** ---------- Types & Mock Data ---------- */
type Org = {
    id: string;
    name: string;
    role?: string; // e.g., "Admin", "Member"
    color?: string; // fallback badge color
};

const MOCK_ORGS: Org[] = [
    { id: "org-1", name: "Marcelex Inc.", role: "Admin", color: "#5EEAD4" },
    { id: "org-2", name: "Buildies LLC", role: "Owner", color: "#60A5FA" },
    { id: "org-3", name: "LinkWaveAI", role: "Admin", color: "#FCA5A5" },
];

/** ---------- Small helpers ---------- */
function classNames(...xs: Array<string | false | null | undefined>) {
    return xs.filter(Boolean).join(" ");
}

/** Simple helper to style active links */
function NavLink({
    href,
    icon,
    label,
    active,
    collapsed,
}: {
    href: string;
    icon: React.ReactNode;
    label: string;
    active: boolean;
    collapsed: boolean;
}) {
    return (
        <Link
            href={href}
            title={collapsed ? label : undefined}
            className={classNames(
                "group flex items-center rounded-xl px-3 py-2 text-[13px] font-medium transition-colors",
                active ? "bg-white/10 text-white" : "text-gray-300 hover:text-white hover:bg-white/5"
            )}
        >
            <span className="mr-3">{icon}</span>
            {!collapsed && <span className="truncate">{label}</span>}
        </Link>
    );
}

/** ---------- Organization Switcher ---------- */
function OrgBadge({ name, color }: { name: string; color?: string }) {
    const parts = name.trim().split(/\s+/);
    const initials =
        (parts[0]?.[0] || "").toUpperCase() +
        (parts.length > 1 ? (parts[1]?.[0] || "").toUpperCase() : "");
    return (
        <div
            className="flex h-7 w-7 items-center justify-center rounded-md text-[11px] font-bold"
            style={{ background: color || "rgba(255,255,255,0.08)" }}
        >
            {initials || "?"}
        </div>
    );
}

function OrgSwitcher({
    collapsed,
    value,
    onChange,
}: {
    collapsed: boolean;
    value: Org;
    onChange: (org: Org) => void;
}) {
    const [open, setOpen] = useState(false);
    const btnRef = useRef<HTMLButtonElement | null>(null);
    const listRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        function onDocClick(e: MouseEvent) {
            if (!open) return;
            const target = e.target as Node;
            if (!btnRef.current?.contains(target) && !listRef.current?.contains(target)) {
                setOpen(false);
            }
        }
        function onEsc(e: KeyboardEvent) {
            if (e.key === "Escape") setOpen(false);
        }
        document.addEventListener("mousedown", onDocClick);
        document.addEventListener("keydown", onEsc);
        return () => {
            document.removeEventListener("mousedown", onDocClick);
            document.removeEventListener("keydown", onEsc);
        };
    }, [open]);

    return (
        <div className={classNames("relative", collapsed && "flex justify-center")}>
            {collapsed ? (
                <button
                    type="button"
                    ref={btnRef}
                    onClick={() => setOpen((o) => !o)}
                    title={`${value.name} • ${value.role ?? ""}`.trim()}
                    className="mt-2 inline-flex items-center justify-center rounded-lg hover:bg-[var(--sidebar-hover)] h-9 w-9"
                    aria-haspopup="listbox"
                    aria-expanded={open}
                >
                    <OrgBadge name={value.name} color={value.color} />
                </button>
            ) : (
                <button
                    type="button"
                    ref={btnRef}
                    onClick={() => setOpen((o) => !o)}
                    aria-haspopup="listbox"
                    aria-expanded={open}
                    className="w-full group mt-2 flex items-center gap-2 rounded-xl px-2.5 py-2 text-left hover:bg-white/5 focus:outline-none"
                >
                    <OrgBadge name={value.name} color={value.color} />
                    <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1">
                            <Building2 className="size-3.5 opacity-80" />
                            <span className="truncate text-[13px] font-semibold text-white">
                                {value.name}
                            </span>
                        </div>
                        {value.role && (
                            <div className="text-[11px] text-gray-400 leading-tight">{value.role}</div>
                        )}
                    </div>
                    <ChevronDown className="size-4 opacity-80 transition-transform group-aria-expanded:rotate-180" />
                </button>
            )}

            {open && (
                <div
                    ref={listRef}
                    role="listbox"
                    tabIndex={-1}
                    className={classNames(
                        "absolute z-50 mt-1 w-[240px] overflow-hidden rounded-xl border border-white/10 bg-[var(--sidebar-bg)] shadow-lg",
                        collapsed ? "left-12" : "left-2"
                    )}
                >
                    <div className="max-h-[260px] overflow-y-auto py-1">
                        {MOCK_ORGS.map((org) => {
                            const active = org.id === value.id;
                            return (
                                <button
                                    key={org.id}
                                    role="option"
                                    aria-selected={active}
                                    onClick={() => {
                                        onChange(org);
                                        setOpen(false);
                                    }}
                                    className={classNames(
                                        "w-full flex items-center gap-2 px-2.5 py-2 text-left text-[13px]",
                                        active ? "bg-white/10 text-white" : "text-gray-200 hover:bg-white/5"
                                    )}
                                >
                                    <OrgBadge name={org.name} color={org.color} />
                                    <div className="min-w-0">
                                        <div className="truncate font-medium">{org.name}</div>
                                        {org.role && (
                                            <div className="text-[11px] text-gray-400 leading-tight">{org.role}</div>
                                        )}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                    <div className="border-t border-white/10 p-2 text-[12px] text-gray-400">
                        <span className="opacity-80">Need another workspace?</span>{" "}
                        <Link href="/admin/organizations/new" className="text-white hover:underline">
                            Create organization
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}

/** ---------- Main Sidebar ---------- */
export default function AdminSidebar() {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("sidebarCollapsed");
        if (saved != null) setCollapsed(saved === "true");
    }, []);

    const toggleCollapsed = useCallback(() => {
        setCollapsed((c) => {
            const next = !c;
            localStorage.setItem("sidebarCollapsed", String(next));
            return next;
        });
    }, []);

    const WIDTH = collapsed ? "w-[72px]" : "w-[264px]";

    const [orgs] = useState<Org[]>(MOCK_ORGS);
    const [activeOrg, setActiveOrg] = useState<Org>(orgs[0]);

    useEffect(() => {
        const saved = localStorage.getItem("activeOrgId");
        if (!saved) return;
        const found = orgs.find((o) => o.id === saved);
        if (found) setActiveOrg(found);
    }, [orgs]);

    const handleOrgChange = (o: Org) => {
        setActiveOrg(o);
        localStorage.setItem("activeOrgId", o.id);
    };

    const logo = useMemo(
        () => (
            <MarcelexLogo
                size={30}
                showWord={!collapsed}
                wordScale={0.86}
                wordColor="var(--sidebar-fg)"
                palette="nebula"
                shineWord
            />
        ),
        [collapsed]
    );

    return (
        <aside
            className={classNames(
                "hidden md:flex md:flex-col shrink-0 min-h-screen",
                WIDTH,
                "bg-[var(--sidebar-bg)] text-[var(--sidebar-fg)] border-r border-black/10 rounded-r-2xl",
                "transition-[width] duration-200 ease-out shadow-md"
            )}
        >
            {/* Header */}
            <div className="h-14 px-2 flex items-center justify-between border-b border-white/5">
                <div className="pl-2">{logo}</div>
                <button
                    onClick={toggleCollapsed}
                    aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                    className="group ml-2 inline-flex items-center justify-center rounded-lg hover:bg-[var(--sidebar-hover)] h-8 w-8"
                    title={collapsed ? "Expand" : "Collapse"}
                >
                    {collapsed ? (
                        <ChevronRight className="size-5 opacity-80" />
                    ) : (
                        <ChevronLeft className="size-5 opacity-80" />
                    )}
                    {/* @ts-ignore local icon shim used below */}
                    {null}
                </button>
            </div>

            {/* Org Switcher */}
            <div className={classNames("px-2 pb-2 pt-1 border-b border-white/5")}>
                <OrgSwitcher collapsed={collapsed} value={activeOrg} onChange={handleOrgChange} />
            </div>

            {/* Primary nav */}
            <nav className="flex-1 overflow-y-auto px-2 py-4">
                {!collapsed && (
                    <div className="px-2 text-[12px] font-semibold text-gray-400 mb-1">Overview</div>
                )}
                <ul className="space-y-1">
                    <li>
                        <NavLink
                            href="/admin"
                            icon={<LayoutDashboard className="size-5 shrink-0" />}
                            label="Dashboard"
                            active={pathname === "/admin"}
                            collapsed={collapsed}
                        />
                    </li>

                    {/* ✅ TASKS tab (back) */}
                    <li>
                        <NavLink
                            href="/admin/tasks"
                            icon={<CheckSquare className="size-5 shrink-0" />}
                            label="Tasks"
                            active={pathname.startsWith("/admin/tasks")}
                            collapsed={collapsed}
                        />
                    </li>

                    <li>
                        <NavLink
                            href="/admin/projects"
                            icon={<BriefcaseBusiness className="size-5 shrink-0" />}
                            label="Projects"
                            active={pathname.startsWith("/admin/projects")}
                            collapsed={collapsed}
                        />
                    </li>
                </ul>

                {!collapsed && (
                    <div className="px-2 mt-5 text-[12px] font-semibold text-gray-400 mb-1">
                        Departments
                    </div>
                )}
                <ul className="space-y-1">
                    <li>
                        <NavLink
                            href="/admin/dev/backlog"
                            icon={<FolderKanban className="size-5 shrink-0" />}
                            label="Development"
                            active={pathname.startsWith("/admin/dev")}
                            collapsed={collapsed}
                        />
                    </li>
                    <li>
                        <NavLink
                            href="/admin/it/overview"
                            icon={<ServerCog className="size-5 shrink-0" />}
                            label="Operations"
                            active={pathname.startsWith("/admin/it")}
                            collapsed={collapsed}
                        />
                    </li>
                    <li>
                        <NavLink
                            href="/admin/marketing"
                            icon={<Megaphone className="size-5 shrink-0" />}
                            label="Marketing"
                            active={pathname.startsWith("/admin/marketing")}
                            collapsed={collapsed}
                        />
                    </li>
                    <li>
                        <NavLink
                            href="/admin/sales"
                            icon={<ShoppingBag className="size-5 shrink-0" />}
                            label="Sales"
                            active={pathname.startsWith("/admin/sales")}
                            collapsed={collapsed}
                        />
                    </li>
                    <li>
                        <NavLink
                            href="/admin/hr"
                            icon={<Users2 className="size-5 shrink-0" />}
                            label="HR"
                            active={pathname.startsWith("/admin/hr")}
                            collapsed={collapsed}
                        />
                    </li>
                    <li>
                        <NavLink
                            href="/admin/finance"
                            icon={<DollarSign className="size-5 shrink-0" />}
                            label="Finance"
                            active={pathname.startsWith("/admin/finance")}
                            collapsed={collapsed}
                        />
                    </li>
                </ul>

                {!collapsed && (
                    <div className="px-2 mt-5 text-[12px] font-semibold text-gray-400 mb-1">Admin</div>
                )}
                <ul className="space-y-1">
                    <li>
                        <NavLink
                            href="/admin/users"
                            icon={<Users2 className="size-5 shrink-0" />}
                            label="Users"
                            active={pathname.startsWith("/admin/users")}
                            collapsed={collapsed}
                        />
                    </li>
                    <li>
                        <NavLink
                            href="/admin/roles"
                            icon={<Shield className="size-5 shrink-0" />}
                            label="Roles & RBAC"
                            active={pathname.startsWith("/admin/roles")}
                            collapsed={collapsed}
                        />
                    </li>
                    <li>
                        <NavLink
                            href="/admin/settings"
                            icon={<Settings className="size-5 shrink-0" />}
                            label="System Settings"
                            active={pathname.startsWith("/admin/settings")}
                            collapsed={collapsed}
                        />
                    </li>
                    <li>
                        <NavLink
                            href="/admin/reports"
                            icon={<LineChart className="size-5 shrink-0" />}
                            label="Admin Reports"
                            active={pathname.startsWith("/admin/reports")}
                            collapsed={collapsed}
                        />
                    </li>
                </ul>
            </nav>

            {/* Footer */}
            <div className="px-3 py-3 text-gray-400 text-xs border-t border-white/5">
                {collapsed ? "© M" : "© 2025 Marcelex"}
            </div>
        </aside>
    );
}

/** Local shim: use ChevronLeft rotated for "ChevronRight" to avoid extra import issues */
function ChevronRight(props: any) {
    return <ChevronLeft {...props} className={props.className} style={{ transform: "rotate(180deg)" }} />;
}
