"use client";
/**
 * CommandMenu.tsx
 * - Lightweight command palette (no external deps).
 * - Opens with Ctrl/⌘-K. Provide routes + actions array.
 */
import { useEffect, useMemo, useState } from "react";

type Item = { label: string; href?: string; onRun?: () => void; group?: string };

export default function CommandMenu({ items }: { items: Item[] }) {
    const [open, setOpen] = useState(false);
    const [q, setQ] = useState("");

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
                e.preventDefault(); setOpen((o) => !o);
            }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    const results = useMemo(() => {
        const term = q.toLowerCase();
        return items.filter(i => i.label.toLowerCase().includes(term));
    }, [q, items]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[100] bg-black/40 p-4" onClick={() => setOpen(false)}>
            <div className="mx-auto max-w-lg rounded-2xl p-3 bg-white dark:bg-neutral-900 shadow-2xl"
                onClick={(e) => e.stopPropagation()}>
                <input
                    autoFocus
                    placeholder="Type to search…  (Press Esc to close)"
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Escape") setOpen(false); }}
                    className="w-full px-3 py-2 rounded-lg text-sm bg-white/80 dark:bg-neutral-900/70
                     border border-black/5 dark:border-white/10 outline-none focus:ring-2 focus:ring-cyan-400/40"
                />
                <div className="mt-2 max-h-72 overflow-auto">
                    {results.map((r, idx) => (
                        <a
                            key={idx}
                            href={r.href ?? "#"}
                            onClick={(e) => { if (r.onRun) { e.preventDefault(); r.onRun(); } setOpen(false); }}
                            className="block px-3 py-2 rounded-lg text-sm hover:bg-black/[.04] dark:hover:bg-white/[.06]"
                        >
                            <div className="font-medium">{r.label}</div>
                            {r.group && <div className="text-xs text-neutral-500">{r.group}</div>}
                        </a>
                    ))}
                    {results.length === 0 && (
                        <div className="px-3 py-6 text-sm text-neutral-500">No matches</div>
                    )}
                </div>
            </div>
        </div>
    );
}
