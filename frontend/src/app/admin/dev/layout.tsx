/**
 * app/admin/dev/layout.tsx
 * Shared shell for all Development pages (separate from IT).
 * - Gated by RequireAccess (DEV, level: limited).
 */
import Link from "next/link";
import RequireAccess from "@/features/auth/RequireAccess";

const tabs = [
    { href: "/admin/dev/backlog", label: "Product Backlog" },
    { href: "/admin/dev/sprints", label: "Sprints" },
    { href: "/admin/dev/pipeline", label: "Code Pipeline" },
    { href: "/admin/dev/projects", label: "Projects" },
    { href: "/admin/dev/reports", label: "Dev Reports" },
];

export default function DevLayout({ children }: { children: React.ReactNode }) {
    return (
        <RequireAccess section="DEV" level="limited">
            <div className="flex-1 p-6 md:p-8">
                <header className="mb-4">
                    <h1 className="text-2xl font-semibold tracking-tight">Development</h1>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        Product delivery, sprints, and CI/CD.
                    </p>
                </header>

                <div
                    className="sticky top-0 z-10 -mx-2 mb-6 px-2 py-3
                     bg-gradient-to-b from-white/80 to-transparent
                     dark:from-neutral-950/80 backdrop-blur"
                >
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

                <div className="space-y-6">{children}</div>
            </div>
        </RequireAccess>
    );
}
