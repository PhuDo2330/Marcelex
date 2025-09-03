"use client";
import VelocityChart from "@/features/dev/components/VelocityChart";

const VELOCITY = [
    { sprint: "S1", velocity: 22 },
    { sprint: "S2", velocity: 25 },
    { sprint: "S3", velocity: 21 },
    { sprint: "S4", velocity: 28 },
    { sprint: "S5", velocity: 30 },
];

export default function DevReportsPage() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <VelocityChart data={VELOCITY} />
            <div className="surface p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Lead Time (mock)</h3>
                <p className="text-sm text-gray-600">Hook your analytics here. Add cycle/lead time charts similarly.</p>
            </div>
        </div>
    );
}
