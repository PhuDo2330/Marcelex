"use client";
import { useState } from "react";
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

type Status = "Backlog" | "In Progress" | "Code Review" | "Testing" | "Done";
type Card = { id: string; title: string; status: Status };

const INITIAL: Card[] = [
    { id: "DEV-201", title: "Feature flags infra", status: "Backlog" },
    { id: "DEV-202", title: "Signup error telemetry", status: "In Progress" },
    { id: "DEV-203", title: "Payment retries", status: "Code Review" },
    { id: "DEV-204", title: "Auth device linking", status: "Testing" },
];

const BURNDOWN = [
    { day: "Mon", remaining: 40 },
    { day: "Tue", remaining: 33 },
    { day: "Wed", remaining: 28 },
    { day: "Thu", remaining: 18 },
    { day: "Fri", remaining: 12 },
    { day: "Sat", remaining: 8 },
    { day: "Sun", remaining: 4 },
];

const COLUMNS: Status[] = ["Backlog", "In Progress", "Code Review", "Testing", "Done"];

export default function SprintPage() {
    const [cards, setCards] = useState<Card[]>(INITIAL);

    function move(id: string, to: Status) {
        setCards((prev) => prev.map((c) => (c.id === id ? { ...c, status: to } : c)));
    }

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">
                {/* Kanban */}
                <div className="xl:col-span-3 grid grid-cols-1 md:grid-cols-5 gap-3">
                    {COLUMNS.map((col) => (
                        <div key={col} className="surface p-3">
                            <div className="text-sm font-semibold mb-2">{col}</div>
                            <div className="space-y-2">
                                {cards.filter((c) => c.status === col).map((c) => (
                                    <div key={c.id} className="bg-white border border-gray-200 rounded-lg p-3 text-sm">
                                        <div className="font-medium">{c.title}</div>
                                        <div className="text-xs text-gray-500">{c.id}</div>
                                        <div className="mt-2 flex gap-2 flex-wrap">
                                            {COLUMNS.filter((s) => s !== col).map((s) => (
                                                <button
                                                    key={s}
                                                    onClick={() => move(c.id, s)}
                                                    className="px-2 py-0.5 rounded border border-gray-200 text-xs hover:bg-gray-50"
                                                    title={`Move to ${s}`}
                                                >
                                                    {s}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                                {cards.filter((c) => c.status === col).length === 0 && (
                                    <div className="text-xs text-gray-500">No items.</div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Burndown */}
                <div className="surface p-4">
                    <h3 className="text-sm font-semibold mb-2">Burndown</h3>
                    <div className="h-[260px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={BURNDOWN}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                                <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#6b7280" }} />
                                <YAxis tick={{ fontSize: 12, fill: "#6b7280" }} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "white",
                                        border: "1px solid #e5e7eb",
                                        borderRadius: "8px",
                                        boxShadow: "0 4px 12px rgba(0,0,0,.08)",
                                    }}
                                />
                                <Line type="monotone" dataKey="remaining" stroke="#1d4ed8" strokeWidth={2} dot={{ r: 3 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}
