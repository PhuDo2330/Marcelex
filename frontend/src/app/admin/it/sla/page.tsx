"use client";
/**
 * SLA Page
 * - Dashboard gauges + configuration shell
 */
import { useState } from "react";

function Gauge({ label, value }: { label: string; value: number }) {
    const r = 34, c = 2 * Math.PI * r, dash = (value / 100) * c;
    return (
        <div className="flex flex-col items-center">
            <svg width="90" height="90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r={r} stroke="currentColor" className="text-neutral-300/60 dark:text-neutral-700/60" strokeWidth="10" fill="none" />
                <circle cx="50" cy="50" r={r} stroke="currentColor" className="text-cyan-500" strokeWidth="10" fill="none"
                    strokeDasharray={`${dash} ${c - dash}`} strokeLinecap="round" transform="rotate(-90 50 50)" />
                <text x="50" y="54" textAnchor="middle" className="fill-current text-sm font-semibold">{Math.round(value)}%</text>
            </svg>
            <div className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">{label}</div>
        </div>
    );
}

export default function SLAPage() {
    const [service] = useState("Helpdesk"); // placeholder

    return (
        <div className="space-y-4">
            {/* Dashboard */}
            <section className="rounded-2xl p-4 bg-white/55 dark:bg-neutral-900/55 backdrop-blur-xl
                          ring-1 ring-black/5 dark:ring-white/10 shadow-lg">
                <div className="mb-2 text-sm font-semibold">SLA Dashboard — {service}</div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Gauge label="Compliance" value={98.5} />
                    <Gauge label="Availability" value={99.9} />
                    <Gauge label="Response (P1)" value={94.0} />
                    <Gauge label="Resolution (P1)" value={91.2} />
                </div>
            </section>

            {/* Configuration */}
            <section className="rounded-2xl p-4 bg-white/55 dark:bg-neutral-900/55 backdrop-blur-xl
                          ring-1 ring-black/5 dark:ring-white/10 shadow-lg">
                <div className="text-sm font-semibold mb-2">Configuration</div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                    <div className="rounded-xl p-3 bg-white/70 dark:bg-neutral-800/60 border border-black/5 dark:border-white/10">
                        <div className="font-medium mb-1">Service Definitions</div>
                        <div className="text-xs text-neutral-500">Edit targets per priority…</div>
                    </div>
                    <div className="rounded-xl p-3 bg-white/70 dark:bg-neutral-800/60 border border-black/5 dark:border-white/10">
                        <div className="font-medium mb-1">Escalation Rules</div>
                        <div className="text-xs text-neutral-500">Contacts and tiers…</div>
                    </div>
                    <div className="rounded-xl p-3 bg-white/70 dark:bg-neutral-800/60 border border-black/5 dark:border-white/10">
                        <div className="font-medium mb-1">Calendars</div>
                        <div className="text-xs text-neutral-500">Holidays & maintenance windows…</div>
                    </div>
                </div>
            </section>
        </div>
    );
}
