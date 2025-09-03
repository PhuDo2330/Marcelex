"use client";

import { getCurrentRole } from "@/app/component/dashboard/mock";
import OwnerDashboard from "@/app/component/dashboard/OwnerDashboard";
import LeadDashboard from "@/app/component/dashboard/LeadDashboard";
import RegularDashboard from "@/app/component/dashboard/RegularDashboard";

export default function DashboardPage() {
    const role = getCurrentRole(); // swap with real role later

    return (
        <main className="px-6 md:px-8 py-6 space-y-6">
            <header className="flex items-end justify-between">
                <div>
                    <h1 className="text-2xl md:text-3xl font-semibold">Dashboard</h1>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        {role === "owner" && "Overview across departments."}
                        {role === "lead" && "Focused view for Development & IT."}
                        {role === "regular" && "Your open tasks and tickets."}
                    </p>
                </div>
                <div className="text-xs text-neutral-600 dark:text-neutral-400">Preview: {role}</div>
            </header>

            {role === "owner" && <OwnerDashboard />}
            {role === "lead" && <LeadDashboard />}
            {role === "regular" && <RegularDashboard />}
        </main>
    );
}
