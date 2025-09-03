"use client";

import { ReactNode } from "react";

export function Surface({ className = "", children }: { className?: string; children: ReactNode }) {
    return (
        <div
            className={[
                "bg-white/55 dark:bg-neutral-900/55 backdrop-blur-xl",
                "ring-1 ring-black/5 dark:ring-white/10",
                "shadow-lg hover:shadow-xl transition-shadow rounded-2xl",
                className,
            ].join(" ")}
        >
            {children}
        </div>
    );
}

export function SectionTitle({ children }: { children: ReactNode }) {
    return <h2 className="text-lg md:text-xl font-semibold">{children}</h2>;
}

export function Pill({
    active, onClick, children,
}: { active?: boolean; onClick?: () => void; children: ReactNode }) {
    return (
        <button
            onClick={onClick}
            className={[
                "px-3.5 py-1.5 rounded-xl text-sm font-medium transition",
                active
                    ? "bg-cyan-500 text-white shadow-md"
                    : "bg-white/55 dark:bg-neutral-900/55 border border-black/5 dark:border-white/10 hover:shadow",
            ].join(" ")}
        >
            {children}
        </button>
    );
}

export function ItemRow({
    title, meta, right, overdue = false,
}: { title: string; meta?: string; right?: ReactNode; overdue?: boolean }) {
    return (
        <div className="flex items-center justify-between py-2.5">
            <div className="min-w-0">
                <div className="truncate font-medium">{title}</div>
                {meta && <div className="text-sm text-neutral-600 dark:text-neutral-400">{meta}</div>}
            </div>
            <div className="ml-4 shrink-0 flex items-center gap-2">
                {overdue && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs
                           bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/30">
                        ⚠︎ Overdue
                    </span>
                )}
                {right}
            </div>
        </div>
    );
}
