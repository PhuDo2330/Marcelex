"use client";

import Link from "next/link";
import { CheckCircle2, Circle, AlertTriangle } from "lucide-react";

/** Simple wrapper with consistent glassy background */
export function SectionCard({
    title,
    children,
}: {
    title?: string;
    children: React.ReactNode;
}) {
    return (
        <div className="rounded-2xl bg-white/70 dark:bg-neutral-900/60 ring-1 ring-black/5 dark:ring-white/10 backdrop-blur p-3 md:p-4">
            {title && <div className="mb-2 text-sm font-semibold">{title}</div>}
            {children}
        </div>
    );
}

/** Top breadcrumbs to show context & reduce confusion */
export function Breadcrumbs({
    items,
}: {
    items: { label: string; href?: string }[];
}) {
    return (
        <div className="text-sm text-gray-400">
            {items.map((it, i) => (
                <span key={i}>
                    {it.href ? (
                        <Link className="hover:underline" href={it.href}>
                            {it.label}
                        </Link>
                    ) : (
                        <span className="text-gray-300">{it.label}</span>
                    )}
                    {i < items.length - 1 && <span className="mx-2">/</span>}
                </span>
            ))}
        </div>
    );
}

/** Horizontal pipeline to visualize lifecycle */
export function ProjectTimeline({
    steps,
}: {
    steps: { label: string; done: boolean }[];
}) {
    return (
        <div className="flex flex-wrap items-center gap-3">
            {steps.map((s, i) => (
                <div key={i} className="flex items-center gap-2">
                    {s.done ? (
                        <CheckCircle2 className="size-4 text-emerald-400" />
                    ) : (
                        <Circle className="size-4 text-gray-500" />
                    )}
                    <span className={s.done ? "text-sm text-emerald-300" : "text-sm text-gray-300"}>
                        {s.label}
                    </span>
                    {i < steps.length - 1 && (
                        <span className="mx-2 h-px w-6 bg-white/15 align-middle" />
                    )}
                </div>
            ))}
        </div>
    );
}

/** Tiny KPI card */
export function MetricCard({
    label,
    value,
    hint,
}: {
    label: string;
    value: string;
    hint?: string;
}) {
    return (
        <div className="rounded-xl bg-white/70 dark:bg-neutral-900/60 ring-1 ring-black/5 dark:ring-white/10 p-3">
            <div className="text-xs text-gray-400">{label}</div>
            <div className="text-lg font-semibold">{value}</div>
            {hint && <div className="text-xs text-gray-500 mt-0.5">{hint}</div>}
        </div>
    );
}

/** Empty state helper */
export function EmptyState({
    message,
    detail,
}: {
    message: string;
    detail?: string;
}) {
    return (
        <div className="rounded-xl border border-dashed border-black/10 dark:border-white/10 p-8 text-center">
            <AlertTriangle className="mx-auto mb-2 size-6 text-amber-400" />
            <div className="text-sm font-medium">{message}</div>
            {detail && <div className="text-xs text-gray-500 mt-1">{detail}</div>}
        </div>
    );
}

/** Simple tab bar for Lead view */
export function TabBar<T extends string>({
    value,
    onChange,
    items,
}: {
    value: T;
    onChange: (v: T) => void;
    items: { key: T; label: string }[];
}) {
    return (
        <div className="inline-flex items-center rounded-xl bg-white/70 dark:bg-neutral-900/60 ring-1 ring-black/5 dark:ring-white/10 p-1">
            {items.map((it) => {
                const active = value === it.key;
                return (
                    <button
                        key={it.key}
                        onClick={() => onChange(it.key)}
                        className={[
                            "px-3 py-1.5 rounded-lg text-sm transition",
                            active
                                ? "bg-white text-neutral-900 dark:bg-neutral-800 dark:text-white shadow"
                                : "text-gray-600 dark:text-gray-300 hover:bg-white/60 dark:hover:bg-neutral-800/70",
                        ].join(" ")}
                    >
                        {it.label}
                    </button>
                );
            })}
        </div>
    );
}
