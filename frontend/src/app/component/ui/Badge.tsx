"use client";

import React from "react";

type Priority = "P1" | "P2" | "P3" | "P4";
type Status = "Open" | "In Progress" | "Blocked" | "Waiting" | "Resolved";

export default function Badge({
    children,
    priority,
    status,
    className = "",
}: {
    children?: React.ReactNode;
    priority?: Priority;
    status?: Status;
    className?: string;
}) {
    const palette =
        priority
            ? {
                P1: "bg-rose-500/15 text-rose-400 ring-rose-500/20",
                P2: "bg-amber-500/15 text-amber-400 ring-amber-500/20",
                P3: "bg-cyan-500/15 text-cyan-400 ring-cyan-500/20",
                P4: "bg-gray-500/15 text-gray-300 ring-gray-500/20",
            }[priority]
            : status
                ? {
                    "Open": "bg-gray-500/15 text-gray-300 ring-gray-500/20",
                    "In Progress": "bg-cyan-500/15 text-cyan-400 ring-cyan-500/20",
                    "Blocked": "bg-rose-500/15 text-rose-400 ring-rose-500/20",
                    "Waiting": "bg-amber-500/15 text-amber-400 ring-amber-500/20",
                    "Resolved": "bg-emerald-500/15 text-emerald-400 ring-emerald-500/20",
                }[status]
                : "bg-white/10 text-white ring-white/20";

    return (
        <span
            className={`inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-medium ring-1 ${palette} ${className}`}
        >
            {children}
        </span>
    );
}
