"use client";
/**
 * Project Tracking (Dev view)
 * - Lightweight tiles for Buildies / LinkWaveAI / Marcelex
 */
export default function DevProjectsPage() {
    const apps = [
        { name: "Buildies", desc: "Social + jobs for construction", progress: 72 },
        { name: "LinkWaveAI", desc: "Plan analysis & code checks", progress: 54 },
        { name: "Marcelex", desc: "Tasks & IT service desk", progress: 61 },
    ];
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {apps.map(a => (
                <div key={a.name} className="rounded-2xl p-4 bg-white/55 dark:bg-neutral-900/55 backdrop-blur-xl ring-1 ring-black/5 dark:ring-white/10 shadow-lg">
                    <div className="text-sm font-semibold">{a.name}</div>
                    <div className="text-xs text-neutral-500">{a.desc}</div>
                    <div className="mt-3 h-2 rounded bg-neutral-200/60 dark:bg-neutral-800/60 overflow-hidden">
                        <div className="h-full bg-cyan-500" style={{ width: `${a.progress}%` }} />
                    </div>
                    <div className="mt-1 text-xs">{a.progress}%</div>
                </div>
            ))}
        </div>
    );
}
