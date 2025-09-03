"use client";
import { useState } from "react";
import { CheckCircle2, AlertTriangle } from "lucide-react";

type Env = "Dev" | "Staging" | "Production";
type Health = "healthy" | "degraded" | "down";

const ENVS: { env: Env; version: string; health: Health }[] = [
    { env: "Dev", version: "1.12.0+abc1", health: "healthy" },
    { env: "Staging", version: "1.11.3+9f1d", health: "degraded" },
    { env: "Production", version: "1.10.9+77b2", health: "healthy" },
];

export default function PipelinePage() {
    const [confirm, setConfirm] = useState<{ env: Env; action: "deploy" | "rollback" } | null>(null);

    function indicator(h: Health) {
        if (h === "healthy") return <CheckCircle2 className="w-4 h-4 text-green-500" />;
        if (h === "degraded") return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
    }

    return (
        <div className="space-y-4">
            <div className="surface p-4">
                <h2 className="text-base font-semibold mb-3">Pipeline</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {ENVS.map((e) => (
                        <div key={e.env} className="bg-white border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                                <div className="text-sm font-semibold">{e.env}</div>
                                <div>{indicator(e.health)}</div>
                            </div>
                            <div className="text-xs text-gray-500 mt-1">Version: {e.version}</div>

                            <div className="mt-3 flex gap-2">
                                <button
                                    onClick={() => setConfirm({ env: e.env, action: "deploy" })}
                                    className="px-3 py-1.5 rounded-lg text-sm bg-primary-600 text-white hover:bg-primary-700"
                                >
                                    Deploy
                                </button>
                                <button
                                    onClick={() => setConfirm({ env: e.env, action: "rollback" })}
                                    className="px-3 py-1.5 rounded-lg text-sm border border-gray-200 hover:bg-gray-50"
                                >
                                    Rollback
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {confirm && (
                <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4" onClick={() => setConfirm(null)}>
                    <div className="w-full max-w-md rounded-2xl p-4 bg-white/95 dark:bg-neutral-900/95 shadow-2xl" onClick={(e) => e.stopPropagation()}>
                        <h3 className="text-sm font-semibold mb-2">Confirm {confirm.action}</h3>
                        <p className="text-sm text-gray-600">Are you sure you want to {confirm.action} to <b>{confirm.env}</b>?</p>
                        <div className="mt-4 flex justify-end gap-2">
                            <button className="px-3 py-1.5 rounded-lg text-sm border border-gray-200" onClick={() => setConfirm(null)}>Cancel</button>
                            <button className="px-3 py-1.5 rounded-lg text-sm bg-primary-600 text-white hover:bg-primary-700" onClick={() => setConfirm(null)}>Confirm</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
