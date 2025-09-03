"use client";
/**
 * UserForm
 * - Used for both Create and Edit.
 * - Emits onSubmit with the full user object.
 */
import { useEffect, useState } from "react";
import type { Department, UserRecord } from "../types";

const ROLES: UserRecord["role"][] = [
    "CEO", "MASTER_ADMIN", "IT_OPS", "IT_ADMIN", "DEV", "ADMIN_DEV", "DEV_ADMIN", "HR", "HR_ADMIN",
];

export default function UserForm({
    initial,
    onCancel,
    onSubmit,
}: {
    initial?: Partial<UserRecord>;
    onCancel: () => void;
    onSubmit: (user: UserRecord) => Promise<void> | void;
}) {
    const [id, setId] = useState(initial?.id ?? "");
    const [name, setName] = useState(initial?.name ?? "");
    const [email, setEmail] = useState(initial?.email ?? "");
    const [role, setRole] = useState<UserRecord["role"]>(initial?.role ?? "DEV");
    const [department, setDepartment] = useState<Department>(initial?.department ?? "DEV");
    const [teamsStr, setTeamsStr] = useState((initial?.teams ?? []).join(","));
    const [active, setActive] = useState<boolean>(initial?.active ?? true);
    const [err, setErr] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!initial?.id) {
            // Generate a new id for create
            setId("u-" + Math.floor(100 + Math.random() * 900));
        }
    }, [initial?.id]);

    async function submit(e: React.FormEvent) {
        e.preventDefault();
        setErr(null);
        if (!name.trim()) return setErr("Name is required.");
        if (!email.trim()) return setErr("Email is required.");

        const record: UserRecord = {
            id,
            name: name.trim(),
            email: email.trim(),
            role,
            department,
            teams: teamsStr.split(",").map(s => s.trim()).filter(Boolean),
            active,
        };

        setSaving(true);
        try {
            await onSubmit(record);  // hook to API later
        } catch (e: any) {
            setErr(e?.message ?? "Failed to save user.");
        } finally {
            setSaving(false);
        }
    }

    return (
        <form onSubmit={submit} className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input value={name} onChange={e => setName(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg text-sm bg-white/80 dark:bg-neutral-900/70 border border-black/5 dark:border-white/10 outline-none focus:ring-2 focus:ring-cyan-400/40" />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input value={email} onChange={e => setEmail(e.target.value)} type="email"
                        className="w-full px-3 py-2 rounded-lg text-sm bg-white/80 dark:bg-neutral-900/70 border border-black/5 dark:border-white/10 outline-none focus:ring-2 focus:ring-cyan-400/40" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                    <label className="block text-sm font-medium mb-1">Role</label>
                    <select value={role} onChange={e => setRole(e.target.value as UserRecord["role"])}
                        className="w-full px-3 py-2 rounded-lg text-sm bg-white/80 dark:bg-neutral-900/70 border border-black/5 dark:border-white/10">
                        {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Department</label>
                    <select value={department} onChange={e => setDepartment(e.target.value as Department)}
                        className="w-full px-3 py-2 rounded-lg text-sm bg-white/80 dark:bg-neutral-900/70 border border-black/5 dark:border-white/10">
                        {["IT", "DEV", "HR"].map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Teams (comma separated)</label>
                    <input value={teamsStr} onChange={e => setTeamsStr(e.target.value)}
                        placeholder="t-core,t-ops"
                        className="w-full px-3 py-2 rounded-lg text-sm bg-white/80 dark:bg-neutral-900/70 border border-black/5 dark:border-white/10" />
                </div>
            </div>

            <div className="flex items-center gap-2">
                <input id="active" type="checkbox" checked={active} onChange={e => setActive(e.target.checked)} />
                <label htmlFor="active" className="text-sm">Active</label>
            </div>

            {err && <div className="text-sm text-rose-600">{err}</div>}

            <div className="flex gap-2 pt-1">
                <button type="submit" disabled={saving}
                    className="px-3 py-1.5 rounded-lg text-sm font-medium bg-cyan-500 text-white shadow-md hover:shadow-lg disabled:opacity-60">
                    {saving ? "Saving…" : "Save"}
                </button>
                <button type="button" onClick={onCancel}
                    className="px-3 py-1.5 rounded-lg text-sm bg-white/55 dark:bg-neutral-900/55 border border-black/5 dark:border-white/10">
                    Cancel
                </button>
            </div>
        </form>
    );
}
