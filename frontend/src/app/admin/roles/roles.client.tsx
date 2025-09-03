"use client";
/**
 * roles.client.tsx
 * Editable RBAC matrix with safe fallbacks.
 * Prevents crashes when a role/section entry is missing.
 */
import { useState } from "react";
import type { Role, Section, AccessLevel } from "@/features/auth/roles";

type Matrix = Record<Role, Partial<Record<Section, AccessLevel>>>;

export default function RolesMatrixClient({
    initialMatrix,
    roles,
    sections,
    levels,
}: {
    initialMatrix: Matrix;
    roles: Role[];
    sections: Section[];
    levels: AccessLevel[];
}) {
    // Clone to allow edits
    const [matrix, setMatrix] = useState<Matrix>({ ...initialMatrix });

    function setValue(role: Role, section: Section, value: AccessLevel) {
        setMatrix((prev) => {
            const next = { ...prev };
            const row = { ...(next[role] ?? {}) };
            row[section] = value;
            next[role] = row;
            return next;
        });
    }

    // This is where your DB save would go
    async function save() {
        // await fetch("/api/rbac", { method:"POST", body: JSON.stringify(matrix) })
        alert("Saved (mock). You would POST this matrix to your backend.");
    }

    return (
        <div className="space-y-4">
            <div className="overflow-x-auto rounded-2xl bg-white/55 dark:bg-neutral-900/55 backdrop-blur-xl ring-1 ring-black/5 dark:ring-white/10 shadow-lg">
                <table className="min-w-[880px] w-full text-sm">
                    <thead className="text-left text-neutral-500">
                        <tr className="[&>*]:px-4 [&>*]:py-3">
                            <th>Role</th>
                            {sections.map((s) => (
                                <th key={s}>{s}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-black/5 dark:divide-white/10">
                        {roles.map((role) => (
                            <tr key={role} className="hover:bg-white/40 dark:hover:bg-neutral-800/40">
                                <td className="px-4 py-2 font-semibold">{role.toLowerCase()}</td>
                                {sections.map((section) => {
                                    // SAFETY: default to "limited" if missing
                                    const current = (matrix[role]?.[section] ?? "limited") as AccessLevel;
                                    return (
                                        <td key={section} className="px-4 py-2">
                                            <select
                                                value={current}
                                                onChange={(e) => setValue(role, section, e.target.value as AccessLevel)}
                                                className="px-2 py-1 rounded-md text-sm bg-white/80 dark:bg-neutral-900/70 border border-black/5 dark:border-white/10"
                                            >
                                                {levels.map((lvl) => (
                                                    <option key={lvl} value={lvl}>
                                                        {lvl}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex gap-2">
                <button
                    onClick={save}
                    className="px-3 py-1.5 rounded-lg text-sm font-medium bg-cyan-500 text-white shadow-md hover:shadow-lg"
                >
                    Save matrix
                </button>
                <a
                    href="/api/debug/impersonate?dev_full_access=1"
                    className="px-3 py-1.5 rounded-lg text-sm bg-white/55 dark:bg-neutral-900/55 border border-black/5 dark:border-white/10"
                >
                    Dev bypass ON
                </a>
                <a
                    href="/api/debug/impersonate?dev_full_access=0"
                    className="px-3 py-1.5 rounded-lg text-sm bg-white/55 dark:bg-neutral-900/55 border border-black/5 dark:border-white/10"
                >
                    Dev bypass OFF
                </a>
            </div>
        </div>
    );
}
