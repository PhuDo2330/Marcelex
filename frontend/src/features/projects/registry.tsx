import { FilePlus2, LayoutList, Star, Clock, Archive, CheckCircle2, Trash2, FolderOpenDot, Copy, Upload, FolderTree, Tags, FolderGit2, Link2, Gauge, BarChart3, Users, CalendarDays, PiggyBank, Activity, FileBarChart2, Settings, Layers3, ShieldCheck, Workflow, ListChecks, SlidersHorizontal, Columns3, LayoutGrid, KanbanSquare, GanttChartSquare, Calendar, Users2, Wallet } from "lucide-react";

export type ProjectFeature = {
    title: string;
    desc: string;
    href: string;
    icon: React.ReactNode;
};

export type SectionKey = "management" | "creation" | "organization" | "analytics" | "administration" | "views";

export const SECTION_TITLES: Record<SectionKey, string> = {
    management: "Project Management",
    creation: "Project Creation",
    organization: "Project Organization",
    analytics: "Project Analytics & Reports",
    administration: "Project Administration",
    views: "Project Views",
};

const i = {
    // helpers: just icons to keep tiles tidy
    list: <LayoutList className="size-5" />,
    star: <Star className="size-5" />,
    clock: <Clock className="size-5" />,
    archive: <Archive className="size-5" />,
    done: <CheckCircle2 className="size-5" />,
    trash: <Trash2 className="size-5" />,
    folder: <FolderOpenDot className="size-5" />,
    plus: <FilePlus2 className="size-5" />,
    copy: <Copy className="size-5" />,
    upload: <Upload className="size-5" />,
    tree: <FolderTree className="size-5" />,
    tags: <Tags className="size-5" />,
    port: <FolderGit2 className="size-5" />,
    links: <Link2 className="size-5" />,
    gauge: <Gauge className="size-5" />,
    chart: <BarChart3 className="size-5" />,
    team: <Users className="size-5" />,
    time: <CalendarDays className="size-5" />,
    budget: <PiggyBank className="size-5" />,
    health: <Activity className="size-5" />,
    report: <FileBarChart2 className="size-5" />,
    settings: <Settings className="size-5" />,
    bulk: <Layers3 className="size-5" />,
    perm: <ShieldCheck className="size-5" />,
    tmpl: <Workflow className="size-5" />,
    status: <ListChecks className="size-5" />,
    fields: <SlidersHorizontal className="size-5" />,
    listView: <Columns3 className="size-5" />,
    grid: <LayoutGrid className="size-5" />,
    kanban: <KanbanSquare className="size-5" />,
    gantt: <GanttChartSquare className="size-5" />,
    calendar: <Calendar className="size-5" />,
    resource: <Users2 className="size-5" />,
    budgetView: <Wallet className="size-5" />,
};

export const FEATURES: Record<SectionKey, ProjectFeature[]> = {
    management: [
        { title: "All Projects", desc: "Browse and filter every project in the workspace.", href: "/admin/projects?view=all", icon: i.list },
        { title: "Active Projects", desc: "Projects currently in progress.", href: "/admin/projects?view=active", icon: i.gauge },
        { title: "My Projects", desc: "Projects you own or are assigned to.", href: "/admin/projects?view=mine", icon: i.team },
        { title: "Favorite Projects", desc: "Quick access to starred items.", href: "/admin/projects?view=favorites", icon: i.star },
        { title: "Recently Accessed", desc: "Jump back into what you opened lately.", href: "/admin/projects?view=recent", icon: i.clock },
        { title: "Archived Projects", desc: "Out of the way, but never lost.", href: "/admin/projects?view=archived", icon: i.archive },
        { title: "Completed Projects", desc: "Done and dusted.", href: "/admin/projects?view=completed", icon: i.done },
        { title: "Deleted Projects", desc: "Recoverable for a limited time.", href: "/admin/projects?view=deleted", icon: i.trash },
    ],
    creation: [
        { title: "Create New Project", desc: "Start from scratch with a guided setup.", href: "/admin/projects/new", icon: i.plus },
        { title: "Project Templates", desc: "Spin up consistent projects at speed.", href: "/admin/projects/templates", icon: i.tmpl },
        { title: "Quick Start Projects", desc: "Minimal setup—get moving fast.", href: "/admin/projects/quick-start", icon: i.gauge },
        { title: "Import Project", desc: "Bring projects in from CSV/JSON.", href: "/admin/projects/import", icon: i.upload },
        { title: "Duplicate Project", desc: "Clone structure, not the mess.", href: "/admin/projects/duplicate", icon: i.copy },
    ],
    organization: [
        { title: "Project Categories", desc: "Group projects by business areas.", href: "/admin/projects/categories", icon: i.tree },
        { title: "Project Tags Management", desc: "Flexible tagging at scale.", href: "/admin/projects/tags", icon: i.tags },
        { title: "Project Portfolios", desc: "Roll-up views across projects.", href: "/admin/projects/portfolios", icon: i.port },
        { title: "Project Dependencies", desc: "Define relationships and blockers.", href: "/admin/projects/dependencies", icon: i.links },
        { title: "Cross-Project Links", desc: "Connect related work items.", href: "/admin/projects/links", icon: i.links },
    ],
    analytics: [
        { title: "Portfolio Dashboard", desc: "High-level KPIs across portfolios.", href: "/admin/projects/analytics/portfolio", icon: i.chart },
        { title: "Project Performance", desc: "Velocity, burn, and delivery metrics.", href: "/admin/projects/analytics/performance", icon: i.gauge },
        { title: "Resource Allocation", desc: "Who’s over/under-allocated.", href: "/admin/projects/analytics/resources", icon: i.team },
        { title: "Timeline Overview", desc: "Milestones and schedule risk.", href: "/admin/projects/analytics/timeline", icon: i.time },
        { title: "Budget Tracking", desc: "Spend vs plan and forecasts.", href: "/admin/projects/analytics/budget", icon: i.budget },
        { title: "Team Workload", desc: "Balance effort, prevent burnout.", href: "/admin/projects/analytics/workload", icon: i.team },
        { title: "Project Health Scores", desc: "Composite risk/health scoring.", href: "/admin/projects/analytics/health", icon: i.health },
        { title: "Custom Reports", desc: "Build bespoke reports.", href: "/admin/projects/analytics/reports", icon: i.report },
    ],
    administration: [
        { title: "Project Settings", desc: "Defaults, naming, SLAs, and more.", href: "/admin/projects/admin/settings", icon: i.settings },
        { title: "Bulk Project Operations", desc: "Edit many at once safely.", href: "/admin/projects/admin/bulk", icon: i.bulk },
        { title: "Project Permissions", desc: "RBAC, roles, and sharing.", href: "/admin/projects/admin/permissions", icon: i.perm },
        { title: "Template Management", desc: "Own your templates lifecycle.", href: "/admin/projects/admin/templates", icon: i.tmpl },
        { title: "Project Workflows", desc: "Statuses and transitions.", href: "/admin/projects/admin/workflows", icon: i.status },
        { title: "Status Configuration", desc: "Customize state models.", href: "/admin/projects/admin/statuses", icon: i.status },
        { title: "Custom Fields Setup", desc: "Capture what matters to you.", href: "/admin/projects/admin/fields", icon: i.fields },
    ],
    views: [
        { title: "List View", desc: "Fast scanning and bulk edits.", href: "/admin/projects?mode=list", icon: i.listView },
        { title: "Grid View", desc: "Visual tiles for quick context.", href: "/admin/projects?mode=grid", icon: i.grid },
        { title: "Kanban View", desc: "Drag & drop across stages.", href: "/admin/projects?mode=kanban", icon: i.kanban },
        { title: "Timeline/Gantt View", desc: "Plan with dependencies.", href: "/admin/projects?mode=gantt", icon: i.gantt },
        { title: "Calendar View", desc: "Month/week/day schedules.", href: "/admin/projects?mode=calendar", icon: i.calendar },
        { title: "Resource View", desc: "Utilization by person/role.", href: "/admin/projects?mode=resources", icon: i.resource },
        { title: "Budget View", desc: "Financial snapshot by project.", href: "/admin/projects?mode=budget", icon: i.budgetView },
    ],
};
