"use client";
/**
 * Knowledge Page
 * - Wiki-style layout with left categories + main article pane
 * - Editor placeholder (markdown later)
 */
import { useState } from "react";
import { Plus } from "lucide-react";

const CATS = ["Getting Started", "Runbooks", "How-To", "Known Issues"];

export default function KnowledgePage() {
    const [cat, setCat] = useState(CATS[0]);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-4">
            {/* Sidebar */}
            <aside className="rounded-2xl p-4 bg-white/55 dark:bg-neutral-900/55 backdrop-blur-xl
                        ring-1 ring-black/5 dark:ring-white/10 shadow-lg">
                <div className="mb-2 text-sm font-semibold">Categories</div>
                <ul className="space-y-1">
                    {CATS.map((c) => (
                        <li key={c}>
                            <button onClick={() => setCat(c)}
                                className={`w-full text-left px-3 py-2 rounded-lg text-sm
                  ${cat === c ? "bg-cyan-500 text-white shadow-md" : "bg-white/55 dark:bg-neutral-900/55 border border-black/5 dark:border-white/10"}`}>
                                {c}
                            </button>
                        </li>
                    ))}
                </ul>

                <button className="mt-3 w-full px-3 py-1.5 rounded-lg text-sm bg-white/55 dark:bg-neutral-900/55 border
                           border-black/5 dark:border-white/10 hover:shadow-md">
                    <Plus className="inline size-4 mr-1" /> Add Article
                </button>
            </aside>

            {/* Article/editor */}
            <section className="rounded-2xl p-4 bg-white/55 dark:bg-neutral-900/55 backdrop-blur-xl
                          ring-1 ring-black/5 dark:ring-white/10 shadow-lg space-y-3">
                <input placeholder="Article title…" className="w-full px-3 py-2 rounded-lg text-base bg-white/80 dark:bg-neutral-900/70
                 border border-black/5 dark:border-white/10 outline-none focus:ring-2 focus:ring-cyan-400/40"/>
                <textarea placeholder={`Write ${cat} article… (Markdown later)`}
                    className="min-h-[220px] w-full px-3 py-2 rounded-lg text-sm bg-white/80 dark:bg-neutral-900/70
                             border border-black/5 dark:border-white/10 outline-none focus:ring-2 focus:ring-cyan-400/40"/>
                <div className="flex gap-2">
                    <button className="px-3 py-1.5 rounded-lg text-sm bg-cyan-500 text-white shadow-md hover:shadow-lg">Publish</button>
                    <button className="px-3 py-1.5 rounded-lg text-sm bg-white/55 dark:bg-neutral-900/55 border
                             border-black/5 dark:border-white/10 hover:shadow-md">Save Draft</button>
                </div>
            </section>
        </div>
    );
}
