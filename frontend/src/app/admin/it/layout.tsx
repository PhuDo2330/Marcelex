/**
 * app/admin/it/layout.tsx
 * Server component wrapping all IT pages with a header + sticky tab bar.
 * - Consistent visual shell for /admin/it/*
 * - PageHeader provides breadcrumbs and env/region context.
 */
import Link from "next/link";
import PageHeader from "@/app/component/ui/PageHeader";

const tabs = [
    { href: "/admin/it/overview", label: "IT Overview" },
    { href: "/admin/it/dev-projects", label: "Development & Projects" },
    { href: "/admin/it/tickets", label: "Tickets" },
    { href: "/admin/it/incidents", label: "Incidents" },
    { href: "/admin/it/changes", label: "Changes" },
    { href: "/admin/it/assets", label: "Assets" },
    { href: "/admin/it/knowledge", label: "Knowledge" },
    { href: "/admin/it/sla", label: "SLA" },
    { href: "/admin/it/reports", label: "Reports" },
];

export default function ITLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex-1 p-6 md:p-8">
            {/* Page header (clear context like ops tools: env/region) */}
            <PageHeader
                title="IT & Ops"
                subtitle="Operations, service health, and delivery."
                crumbs={[{ label: "Admin", href: "/admin" }, { label: "IT & Ops" }]}
                env="prod"
                region="us-west-2"
            />

            {/* Sticky tab bar */}
            <div className="sticky top-0 z-10 -mx-2 mb-6 px-2 py-3
                      bg-gradient-to-b from-white/80 to-transparent
                      dark:from-neutral-950/80 backdrop-blur">
                <nav className="flex flex-wrap gap-2">
                    {tabs.map((t) => (
                        <Link
                            key={t.href}
                            href={t.href}
                            className="rounded-xl px-3 py-1.5 text-sm
                         bg-white/55 dark:bg-neutral-900/55 border
                         border-black/5 dark:border-white/10
                         hover:shadow-md hover:-translate-y-0.5 transition"
                        >
                            {t.label}
                        </Link>
                    ))}
                </nav>
            </div>

            {/* IT page content */}
            <div className="space-y-6">{children}</div>
        </div>
    );
}
