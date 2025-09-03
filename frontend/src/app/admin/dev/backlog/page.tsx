"use client";
import { useMemo, useState } from "react";
import StoryCard, { type Story } from "@/features/dev/components/StoryCard";
import { ChevronDown, ChevronUp, Info } from "lucide-react";

const EPICS = ["Onboarding Revamp", "Auth & RBAC", "Billing & Invoices", "Notifications"];

const INITIAL: Story[] = [
    { id: "DEV-101", title: "Profile wizard – step 3 UX", points: 3, priority: "High", labels: ["ux", "settings"], epic: "Onboarding Revamp", assignee: "Kai" },
    { id: "DEV-102", title: "RBAC matrix persistence (API + UI)", points: 8, priority: "Critical", labels: ["security", "admin"], epic: "Auth & RBAC", assignee: "Ari" },
    { id: "DEV-103", title: "Billing proration edge-cases", points: 5, priority: "Medium", labels: ["billing"], epic: "Billing & Invoices" },
    { id: "DEV-104", title: "Email digest service", points: 5, priority: "Low", labels: ["notifications"], epic: "Notifications" },
];

export default function BacklogPage() {
    const [epicFilter, setEpic] = useState<string>("All");
    const [items, setItems] = useState<Story[]>(INITIAL);
    const [selected, setSelected] = useState<Story | null>(null);

    const filtered = useMemo(() => (epicFilter === "All" ? items : items.filter(s => s.epic === epicFilter)), [epicFilter, items]);

    function move(idx: number, dir: -1 | 1) {
        const target = idx + dir;
        if (target < 0 || target >= filtered.length) return;
        const globalIdx = items.findIndex(s => s.id === filtered[idx].id);
        const globalTarget = items.findIndex(s => s.id === filtered[target].id);
        const next = items.slice();
        const [moved] = next.splice(globalIdx, 1);
        next.splice(globalTarget, 0, moved);
        setItems(next);
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Epics */}
            <aside className="lg:col-span-2 surface p-3">
                <div className="mb-2 text-sm font-semibold">Epics</div>
                <ul className="space-y-1">
                    {["All", ...EPICS].map(e => (
                        <li key={e}>
                            <button
                                onClick={() => setEpic(e)}
                                className={`w-full text-left px-3 py-1.5 rounded-lg text-sm ${epicFilter === e ? "bg-primary-100 text-primary-700" : "hover:bg-gray-100 text-gray-700"}`}
                            >
                                {e}
                            </button>
                        </li>
                    ))}
                </ul>
            </aside>

            {/* Backlog */}
            <section className="lg:col-span-7 space-y-2">
                <div className="flex items-center justify-between">
                    <h2 className="text-base font-semibold">Prioritized Backlog</h2>
                    <div className="text-xs text-gray-500">Rank with ▲/▼</div>
                </div>
                <div className="space-y-2">
                    {filtered.map((s, i) => (
                        <div key={s.id} className="flex gap-2">
                            <div className="flex flex-col">
                                <button onClick={() => move(i, -1)} className="size-7 rounded-md border border-gray-200 hover:bg-gray-50" title="Move up">
                                    <ChevronUp className="w-4 h-4 mx-auto" />
                                </button>
                                <button onClick={() => move(i, +1)} className="size-7 rounded-md border border-gray-200 hover:bg-gray-50 mt-1" title="Move down">
                                    <ChevronDown className="w-4 h-4 mx-auto" />
                                </button>
                            </div>
                            <div className="flex-1" onClick={() => setSelected(s)}>
                                <StoryCard story={s} />
                            </div>
                        </div>
                    ))}
                    {filtered.length === 0 && <div className="surface p-4 text-sm text-gray-600">No stories in this epic yet.</div>}
                </div>
            </section>

            {/* Details */}
            <aside className="lg:col-span-3">
                <div className="surface p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Info className="w-4 h-4 text-gray-500" />
                        <h3 className="text-sm font-semibold">Details</h3>
                    </div>
                    {!selected ? (
                        <p className="text-sm text-gray-600">Select a story to view details.</p>
                    ) : (
                        <div className="space-y-2 text-sm">
                            <div className="font-semibold">{selected.title}</div>
                            <div>ID: {selected.id}</div>
                            <div>Epic: {selected.epic}</div>
                            <div>Priority: {selected.priority}</div>
                            <div>Points: {selected.points}</div>
                            <div>Labels: {selected.labels.join(", ") || "—"}</div>
                            <div>Assignee: {selected.assignee || "Unassigned"}</div>
                        </div>
                    )}
                </div>
            </aside>
        </div>
    );
}
