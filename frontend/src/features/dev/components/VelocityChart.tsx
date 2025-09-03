"use client";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

export default function VelocityChart({ data }: { data: Array<{ sprint: string; velocity: number }> }) {
    return (
        <div className="surface p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Velocity</h3>
            <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                        <XAxis dataKey="sprint" tick={{ fontSize: 12, fill: "#6b7280" }} tickLine={{ stroke: "#e5e7eb" }} />
                        <YAxis tick={{ fontSize: 12, fill: "#6b7280" }} tickLine={{ stroke: "#e5e7eb" }} />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "white",
                                border: "1px solid #e5e7eb",
                                borderRadius: "8px",
                                boxShadow: "0 4px 12px rgba(0,0,0,.08)",
                            }}
                        />
                        <Line type="monotone" dataKey="velocity" stroke="#3b82f6" strokeWidth={2}
                            dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
