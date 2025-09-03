import {
    Home,
    Users,
    Shield,
    FolderKanban,
    ClipboardList,
    CalendarDays,
    Tag,
    LineChart,
    Boxes,
    ServerCog,
    GitBranch,
    AlertTriangle,
    Settings2,
    CreditCard,
    BookOpen,
} from "lucide-react";

export const adminNav = [
    {
        label: "Overview",
        items: [
            { href: "/admin", label: "Dashboard", icon: Home as any },
            { href: "/projects", label: "Projects", icon: FolderKanban as any, badge: "42" },
            { href: "/tasks", label: "Tasks", icon: ClipboardList as any, badge: "317" },
            { href: "/sprints", label: "Sprints", icon: GitBranch as any },
            { href: "/calendar", label: "Calendar", icon: CalendarDays as any },
            { href: "/labels", label: "Labels", icon: Tag as any },
            { href: "/reports", label: "Reports", icon: LineChart as any },
        ],
    },
    {
        label: "People",
        items: [
            { href: "/admin/users", label: "Users", icon: Users as any },
            { href: "/admin/roles", label: "Roles & RBAC", icon: Shield as any },
            { href: "/admin/teams", label: "Teams", icon: Boxes as any },
        ],
    },
    {
        label: "IT & Ops",
        items: [
            { href: "/it", label: "IT Overview", icon: ServerCog as any },
            { href: "/it/tickets", label: "Tickets", icon: ClipboardList as any },
            { href: "/it/incidents", label: "Incidents", icon: AlertTriangle as any },
            { href: "/it/changes", label: "Changes", icon: GitBranch as any },
            { href: "/it/assets", label: "Assets", icon: Boxes as any },
            { href: "/it/knowledge", label: "Knowledge", icon: BookOpen as any },
            { href: "/it/sla", label: "SLA", icon: LineChart as any },
            { href: "/it/reports", label: "Reports", icon: LineChart as any },
        ],
    },
    {
        label: "System",
        items: [
            { href: "/admin/settings", label: "Settings", icon: Settings2 as any },
            { href: "/admin/billing", label: "Billing", icon: CreditCard as any },
            { href: "/integrations", label: "Integrations", icon: ServerCog as any },
            { href: "/admin/audit", label: "Audit Log", icon: BookOpen as any },
            { href: "/admin/feature-flags", label: "Feature Flags", icon: GitBranch as any },
        ],
    },
];
