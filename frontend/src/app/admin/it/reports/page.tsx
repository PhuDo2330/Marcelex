"use client";
/**
 * Reports Page
 * - Categories + prebuilt list
 * - Custom report builder placeholder
 */
export default function ReportsPage() {
    return (
        <div className="space-y-4">
            {/* Categories */}
            <section className="rounded-2xl p-4 bg-white/55 dark:bg-neutral-900/55 backdrop-blur-xl
                          ring-1 ring-black/5 dark:ring-white/10 shadow-lg">
                <div className="text-sm font-semibold mb-2">Report Categories</div>
                <div className="flex flex-wrap gap-2">
                    {["Dashboards", "Scheduled Reports", "Custom Reports", "Templates"].map((c) => (
                        <button key={c}
                            className="px-3 py-1.5 rounded-xl text-xs bg-white/55 dark:bg-neutral-900/55 border
                         border-black/5 dark:border-white/10 hover:shadow-md">
                            {c}
                        </button>
                    ))}
                </div>
            </section>

            {/* Pre-built list */}
            <section className="rounded-2xl p-4 bg-white/55 dark:bg-neutral-900/55 backdrop-blur-xl
                          ring-1 ring-black/5 dark:ring-white/10 shadow-lg">
                <div className="text-sm font-semibold mb-2">Pre-built Reports</div>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    {[
                        "IT Performance Dashboard",
                        "Ticket Resolution Metrics",
                        "Asset Utilization Reports",
                        "Cost Analysis Reports",
                        "SLA Compliance Reports",
                    ].map((r) => (
                        <li key={r} className="rounded-xl p-3 bg-white/70 dark:bg-neutral-800/60 border border-black/5 dark:border-white/10">
                            {r}
                        </li>
                    ))}
                </ul>
            </section>

            {/* Custom builder */}
            <section className="rounded-2xl p-4 bg-white/55 dark:bg-neutral-900/55 backdrop-blur-xl
                          ring-1 ring-black/5 dark:ring-white/10 shadow-lg">
                <div className="text-sm font-semibold mb-2">Custom Report Builder</div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="rounded-xl p-3 bg-white/70 dark:bg-neutral-800/60 border border-black/5 dark:border-white/10 text-sm">
                        Metrics (drag & drop)…
                    </div>
                    <div className="rounded-xl p-3 bg-white/70 dark:bg-neutral-800/60 border border-black/5 dark:border-white/10 text-sm">
                        Date Range selectors…
                    </div>
                    <div className="rounded-xl p-3 bg-white/70 dark:bg-neutral-800/60 border border-black/5 dark:border-white/10 text-sm">
                        Filters & export (PDF/Excel/CSV)…
                    </div>
                </div>
            </section>
        </div>
    );
}
