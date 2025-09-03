/**
 * PageHeader.tsx
 * - Consistent header with breadcrumbs, context (env/region), and actions.
 * - Use across IT and Dev pages for muscle memory.
 */
import Link from "next/link";
import { ChevronRight, Globe2, ServerCog } from "lucide-react";

type Crumb = { label: string; href?: string };

export default function PageHeader({
    title,
    subtitle,
    crumbs = [],
    env,            // "prod" | "stg" | "dev"
    region,         // e.g. "us-west-2"
    actions,        // primary/secondary buttons
}: {
    title: string;
    subtitle?: string;
    crumbs?: Crumb[];
    env?: "prod" | "stg" | "dev";
    region?: string;
    actions?: React.ReactNode;
}) {
    return (
        <header className="mb-4">
            {/* breadcrumbs */}
            {crumbs.length > 0 && (
                <nav className="mb-1 flex items-center text-xs text-neutral-500">
                    {crumbs.map((c, i) => (
                        <span key={i} className="flex items-center">
                            {i > 0 && <ChevronRight className="size-3 mx-1 opacity-60" />}
                            {c.href ? <Link href={c.href} className="hover:underline">{c.label}</Link> : c.label}
                        </span>
                    ))}
                </nav>
            )}

            {/* title row */}
            <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
                {env && <span className="badge" data-env={env} data-variant="soft">{env.toUpperCase()}</span>}
                {region && (
                    <span className="badge" data-variant="soft" title="Region">
                        <Globe2 className="size-3" /> {region}
                    </span>
                )}
                <div className="ml-auto">{actions}</div>
            </div>

            {subtitle && (
                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">{subtitle}</p>
            )}
        </header>
    );
}
