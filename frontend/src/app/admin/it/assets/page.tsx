"use client";
/**
 * Assets Page
 * - Header actions + filter sidebar
 * - Grid of asset cards; detail panel comes later
 */
import { useState } from "react";
import { Plus, Upload, Download } from "lucide-react";

type Asset = { id: string; name: string; status: "Active" | "Retired" | "Maintenance"; location: string };

const ASSETS: Asset[] = [
    { id: "A-1001", name: "App Node 1", status: "Active", location: "us-west-2a" },
    { id: "A-1002", name: "DB Primary", status: "Maintenance", location: "us-west-2b" },
    { id: "A-1003", name: "Load Balancer", status: "Active", location: "global" },
];

export default function AssetsPage() {
    const [q, setQ] = useState("");

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-4">
            {/* Sidebar filters */}
            <aside className="rounded-2xl p-4 bg-white/55 dark:bg-neutral-900/55 backdrop-blur-xl
                        ring-1 ring-black/5 dark:ring-white/10 shadow-lg space-y-3">
                <div className="text-sm font-semibold">Filters</div>
                <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Search assets…"
                    className="w-full px-3 py-2 rounded-lg text-sm bg-white/80 dark:bg-neutral-900/70 border
                     border-black/5 dark:border-white/10 outline-none focus:ring-2 focus:ring-cyan-400/40"
                />
                <div className="text-xs text-neutral-500">Type · Status · Location · Purchase Date (coming)</div>
            </aside>

            {/* Main area */}
            <div className="space-y-3">
                {/* Header actions */}
                <div className="flex flex-wrap items-center gap-2">
                    <button className="px-3 py-1.5 rounded-lg text-sm font-medium bg-cyan-500 text-white shadow-md hover:shadow-lg">
                        <Plus className="inline size-4 mr-1" /> Add Asset
                    </button>
                    <button className="px-3 py-1.5 rounded-lg text-sm bg-white/55 dark:bg-neutral-900/55 border
                             border-black/5 dark:border-white/10 hover:shadow-md">
                        <Upload className="inline size-4 mr-1" /> Import
                    </button>
                    <button className="px-3 py-1.5 rounded-lg text-sm bg-white/55 dark:bg-neutral-900/55 border
                             border-black/5 dark:border-white/10 hover:shadow-md">
                        <Download className="inline size-4 mr-1" /> Export
                    </button>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {ASSETS.filter(a => (a.name + a.id + a.location).toLowerCase().includes(q.toLowerCase())).map((a) => (
                        <div key={a.id} className="rounded-2xl p-4 bg-white/55 dark:bg-neutral-900/55 backdrop-blur-xl
                                       ring-1 ring-black/5 dark:ring-white/10 shadow-lg">
                            <div className="text-sm font-semibold">{a.name}</div>
                            <div className="mt-1 text-xs text-neutral-500">{a.id}</div>
                            <div className="mt-2 text-xs">
                                <span className="px-2 py-0.5 rounded-md border border-black/5 dark:border-white/10">{a.status}</span>
                                <span className="ml-2 text-neutral-500">Location: {a.location}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
