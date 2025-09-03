"use client";
/**
 * TaskForm.tsx
 * - Controlled form with basic validation.
 * - Emits a fake "save" for now; wire to your API later.
 */
import { useState } from "react";
import Badge from "@/app/component/ui/Badge";

type Dept = "IT" | "DEV" | "HR";
type Priority = "P1" | "P2" | "P3" | "P4";
type Status = "Open" | "In Progress" | "Blocked" | "Waiting" | "Resolved";

export default function TaskForm({
    currentUserId,
    allowedDepartments,
    allowedTeams,
}: {
    currentUserId: string;
    allowedDepartments: Dept[];
    allowedTeams: string[];
}) {
    const [title, setTitle] = useState("");
    const [department, setDepartment] = useState<Dept>(allowedDepartments[0]);
    const [teamId, setTeamId] = useState<string>(allowedTeams[0] ?? "");
    const [assigneeId, setAssigneeId] = useState<string>(currentUserId);
    const [assigneeName, setAssigneeName] = useState<string>("You"); // replace with real people lookup
    const [priority, setPriority] = useState<Priority>("P3");
    const [status, setStatus] = useState<Status>("Open");
    const [due, setDue] = useState<string>("");
    const [desc, setDesc] = useState<string>("");

    const [saving, setSaving] = useState(false);
    const [savedId, setSavedId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);

        if (!title.trim()) {
            setError("Title is required.");
            return;
        }

        setSaving(true);
        try {
            // TODO: POST to /api/tasks with RBAC guard server-side.
            // For now, simulate…
            await new Promise((r) => setTimeout(r, 500));
            setSavedId("TSK-" + Math.floor(1000 + Math.random() * 9000));
        } catch (err: any) {
            setError(err?.message ?? "Failed to create task.");
        } finally {
            setSaving(false);
        }
    }

    return (
        <form onSubmit={onSubmit} className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-4">
            {/* Left: fields */}
            <section className="rounded-2xl p-4 bg-white/70 dark:bg-neutral-900/60 backdrop-blur ring-1 ring-black/5 dark:ring-white/10 shadow-lg">
                <div className="space-y-3">
                    <div>
                        <label className="block text-sm font-medium mb-1">Title</label>
                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Short summary"
                            className="w-full px-3 py-2 rounded-lg text-sm bg-white/80 dark:bg-neutral-900/70 border border-black/5 dark:border-white/10 outline-none focus:ring-2 focus:ring-cyan-400/40"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                            rows={5}
                            placeholder="What outcome is expected? Steps to reproduce? Links?"
                            className="w-full px-3 py-2 rounded-lg text-sm bg-white/80 dark:bg-neutral-900/70 border border-black/5 dark:border-white/10 outline-none focus:ring-2 focus:ring-cyan-400/40"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                            <label className="block text-sm font-medium mb-1">Priority</label>
                            <select
                                value={priority}
                                onChange={(e) => setPriority(e.target.value as Priority)}
                                className="w-full px-3 py-2 rounded-lg text-sm bg-white/80 dark:bg-neutral-900/70 border border-black/5 dark:border-white/10"
                            >
                                {["P1", "P2", "P3", "P4"].map(p => <option key={p} value={p}>{p}</option>)}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Status</label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value as Status)}
                                className="w-full px-3 py-2 rounded-lg text-sm bg-white/80 dark:bg-neutral-900/70 border border-black/5 dark:border-white/10"
                            >
                                {["Open", "In Progress", "Blocked", "Waiting", "Resolved"].map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Due date</label>
                            <input
                                type="date"
                                value={due}
                                onChange={(e) => setDue(e.target.value)}
                                className="w-full px-3 py-2 rounded-lg text-sm bg-white/80 dark:bg-neutral-900/70 border border-black/5 dark:border-white/10"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                            <label className="block text-sm font-medium mb-1">Department</label>
                            <select
                                value={department}
                                onChange={(e) => setDepartment(e.target.value as Dept)}
                                className="w-full px-3 py-2 rounded-lg text-sm bg-white/80 dark:bg-neutral-900/70 border border-black/5 dark:border-white/10"
                            >
                                {allowedDepartments.map((d) => <option key={d} value={d}>{d}</option>)}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Team</label>
                            <select
                                value={teamId}
                                onChange={(e) => setTeamId(e.target.value)}
                                className="w-full px-3 py-2 rounded-lg text-sm bg-white/80 dark:bg-neutral-900/70 border border-black/5 dark:border-white/10"
                            >
                                {allowedTeams.length === 0 ? (
                                    <option value="">(no team)</option>
                                ) : (
                                    allowedTeams.map((t) => <option key={t} value={t}>{t}</option>)
                                )}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Assignee</label>
                            <select
                                value={assigneeId}
                                onChange={(e) => { setAssigneeId(e.target.value); setAssigneeName(e.target.selectedOptions[0]?.textContent || ""); }}
                                className="w-full px-3 py-2 rounded-lg text-sm bg-white/80 dark:bg-neutral-900/70 border border-black/5 dark:border-white/10"
                            >
                                {/* Replace with people lookup for the selected department/team */}
                                <option value={currentUserId}>You</option>
                                <option value="u-002">Nora</option>
                                <option value="u-003">Sam</option>
                                <option value="u-004">Kris</option>
                            </select>
                        </div>
                    </div>

                    {error && <div className="text-sm text-rose-600">{error}</div>}

                    <div className="flex gap-2">
                        <button
                            type="submit"
                            disabled={saving}
                            className="px-3 py-1.5 rounded-lg text-sm font-medium bg-cyan-500 text-white shadow-md hover:shadow-lg disabled:opacity-60"
                        >
                            {saving ? "Saving…" : "Create Task"}
                        </button>
                        <a href="/admin/tasks" className="px-3 py-1.5 rounded-lg text-sm bg-white/55 dark:bg-neutral-900/55 border border-black/5 dark:border-white/10">
                            Cancel
                        </a>
                    </div>

                    {savedId && (
                        <div className="mt-2 text-sm">
                            Created <span className="font-semibold">{savedId}</span>.{" "}
                            <a className="text-cyan-600 hover:underline" href="/admin/tasks">Back to list</a>
                        </div>
                    )}
                </div>
            </section>

            {/* Right: live preview */}
            <aside className="rounded-2xl p-4 bg-white/70 dark:bg-neutral-900/60 backdrop-blur ring-1 ring-black/5 dark:ring-white/10 shadow-lg">
                <div className="text-sm font-semibold mb-2">Preview</div>
                <div className="space-y-2 text-sm">
                    <div><span className="font-medium">Title:</span> {title || "—"}</div>
                    <div><span className="font-medium">Assignee:</span> {assigneeName || "—"}</div>
                    <div className="flex items-center gap-2">
                        <span className="font-medium">Priority:</span> <Badge priority={priority}>{priority}</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="font-medium">Status:</span> <Badge status={status}>{status}</Badge>
                    </div>
                    <div><span className="font-medium">Department:</span> {department}</div>
                    <div><span className="font-medium">Team:</span> {teamId || "—"}</div>
                    <div><span className="font-medium">Due:</span> {due || "—"}</div>
                    <div className="pt-2 border-t border-black/5 dark:border-white/10">
                        <div className="text-xs text-neutral-500">Description</div>
                        <div className="text-sm whitespace-pre-wrap">{desc || "—"}</div>
                    </div>
                </div>
            </aside>
        </form>
    );
}
