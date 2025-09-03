"use client";

import React, { useId, useMemo } from "react";

type Props = {
    title: string;
    value: string | number;
    hint?: string;
    icon?: React.ReactNode;
    spark?: number[];
    delta?: number; // +/- %
    className?: string;
};

function pathFor(values: number[], w = 120, h = 40, pad = 4) {
    if (!values?.length) return "";
    const xs = values.map((_, i) => pad + (i * (w - pad * 2)) / (values.length - 1));
    const min = Math.min(...values);
    const max = Math.max(...values);
    const span = max - min || 1;
    const ys = values.map(v => h - pad - ((v - min) / span) * (h - pad * 2));
    return xs.map((x, i) => `${i ? "L" : "M"} ${x} ${ys[i]}`).join(" ");
}

export function KpiCard({ title, value, hint, icon, spark, delta, className }: Props) {
    const gid = useId();
    const path = useMemo(() => pathFor(spark || []), [spark]);

    const deltaStr =
        typeof delta === "number"
            ? `${delta > 0 ? "▲" : delta < 0 ? "▼" : "–"} ${Math.abs(delta)}%`
            : undefined;

    // card
    const root =
        "rounded-2xl bg-white/95 dark:bg-neutral-950/60 " +
        "ring-1 ring-slate-200/70 dark:ring-white/10 " +
        "shadow-[0_8px_24px_rgba(2,6,23,0.06)] hover:shadow-[0_16px_36px_rgba(2,6,23,0.10)] " +
        "transition-shadow backdrop-blur supports-[backdrop-filter]:backdrop-blur";

    return (
        <div className={`${root} ${className || ""}`}>
            <div className="px-5 py-4">
                <div className="flex items-start gap-3">
                    {icon && (
                        <div className="mt-1 grid place-items-center w-9 h-9 rounded-xl
                            ring-1 ring-slate-200/70 dark:ring-white/10
                            bg-white/80 dark:bg-neutral-900/60">
                            <div className="text-slate-600 dark:text-slate-300">{icon}</div>
                        </div>
                    )}

                    <div className="flex-1 min-w-0">
                        <div className="text-[12px] font-medium tracking-tight text-slate-500 dark:text-slate-400">
                            {title}
                        </div>
                        <div className="mt-1 flex items-baseline gap-2">
                            <div className="text-[28px] leading-none font-semibold text-slate-900 dark:text-slate-100">
                                {value}
                            </div>
                            {deltaStr && (
                                <div className="text-[12px] font-medium text-slate-500 dark:text-slate-400">{deltaStr}</div>
                            )}
                        </div>
                        {hint && <div className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">{hint}</div>}
                    </div>

                    {spark?.length ? (
                        <svg width="120" height="40" className="hidden sm:block">
                            <defs>
                                <linearGradient id={`spark-${gid}`} x1="0" y1="0" x2="1" y2="1">
                                    <stop offset="0%" stopColor="var(--accent-1)" />
                                    <stop offset="50%" stopColor="var(--accent-2)" />
                                    <stop offset="100%" stopColor="var(--accent-3)" />
                                </linearGradient>
                            </defs>
                            <path d={path} fill="none" stroke={`url(#spark-${gid})`} strokeWidth="2" />
                        </svg>
                    ) : null}
                </div>
            </div>
        </div>
    );
}

export default KpiCard;
