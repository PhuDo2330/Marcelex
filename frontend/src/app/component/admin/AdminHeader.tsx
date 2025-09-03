"use client";

import { Search, SunMedium } from "lucide-react";
import Link from "next/link";

export function AdminHeader() {
    return (
        <header
            className="sticky top-0 z-20 bg-white/70 dark:bg-neutral-950/70 backdrop-blur border-b border-black/5 dark:border-white/10"
            role="banner"
        >
            <div className="mx-auto max-w-screen-2xl px-4 h-14 flex items-center gap-3">
                {/* Search */}
                <div className="flex-1 flex items-center">
                    <div className="relative w-full max-w-3xl">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <Search className="size-4" />
                        </span>
                        <input
                            suppressHydrationWarning
                            autoComplete="off"
                            spellCheck={false}
                            placeholder="Search users, projects, tasks, tickets, settings"
                            className="
                w-full h-10 pl-9 pr-10 rounded-full
                bg-white/90 dark:bg-neutral-950/80
                border border-gray-200 dark:border-white/10
                outline-none focus:ring-2 focus:ring-cyan-400/40 text-sm
              "
                        />
                    </div>
                </div>

                {/* Right controls */}
                <button
                    type="button"
                    className="inline-flex items-center justify-center size-9 rounded-full
                     bg-white/70 dark:bg-neutral-900/70 border border-gray-200 dark:border-white/10"
                    title="Theme"
                >
                    <SunMedium className="size-4" />
                </button>

                <Link
                    href="/admin/profile"
                    className="inline-flex items-center justify-center size-9 rounded-full
                     bg-orange-500 text-white font-semibold"
                    title="Account"
                >
                    A
                </Link>
            </div>
        </header>
    );
}
