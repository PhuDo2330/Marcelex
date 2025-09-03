"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
    ChevronLeft, ChevronRight, CheckCircle2, Users, CalendarDays, Workflow,
    FilePlus2, ClipboardPenLine, Sparkles, Building2, Megaphone, Cpu, Wrench,
    ShoppingCart, Headphones, Factory, UserSquare2, Wallet, UserPlus, X, AtSign
} from "lucide-react";

/* ---------------------------------- Steps --------------------------------- */

type StepKey =
    | "basics"
    | "department"
    | "template"
    | "assign"     // ← renamed from "team"
    | "schedule"
    | "workflow"
    | "review";

const STEPS: { key: StepKey; label: string; icon: JSX.Element }[] = [
    { key: "basics", label: "Basics", icon: <ClipboardPenLine className="size-4" /> },
    { key: "department", label: "Department", icon: <Building2 className="size-4" /> },
    { key: "template", label: "Template", icon: <FilePlus2 className="size-4" /> },
    { key: "assign", label: "Assign", icon: <UserPlus className="size-4" /> },
    { key: "schedule", label: "Schedule", icon: <CalendarDays className="size-4" /> },
    { key: "workflow", label: "Workflow", icon: <Workflow className="size-4" /> },
    { key: "review", label: "Review", icon: <CheckCircle2 className="size-4" /> },
];

/* ------------------------------- Departments ------------------------------ */

const DEPARTMENTS = [
    { key: "it", label: "IT", icon: <Wrench className="size-4" /> },
    { key: "engineering", label: "Engineering", icon: <Cpu className="size-4" /> },
    { key: "product", label: "Product", icon: <Factory className="size-4" /> },
    { key: "marketing", label: "Marketing", icon: <Megaphone className="size-4" /> },
    { key: "sales", label: "Sales", icon: <ShoppingCart className="size-4" /> },
    { key: "cs", label: "Customer Success", icon: <Headphones className="size-4" /> },
    { key: "ops", label: "Operations", icon: <Building2 className="size-4" /> },
    { key: "hr", label: "HR", icon: <UserSquare2 className="size-4" /> },
    { key: "finance", label: "Finance", icon: <Wallet className="size-4" /> },
] as const;
type DeptKey = typeof DEPARTMENTS[number]["key"];

type TemplateDef = { key: string; label: string; desc: string; dept: DeptKey };

const TEMPLATES: TemplateDef[] = [
    // IT
    { dept: "it", key: "it-incident", label: "Incident Response", desc: "Runbooks, SLAs, postmortems" },
    { dept: "it", key: "it-change", label: "Change Management", desc: "CAB approvals, risk, windows" },
    { dept: "it", key: "it-rollout", label: "Service Rollout", desc: "Phased rollout, comms, training" },
    // Engineering
    { dept: "engineering", key: "eng-sprint", label: "Sprint Project", desc: "Epics, velocity, reviews" },
    { dept: "engineering", key: "eng-refactor", label: "Refactor Initiative", desc: "Tech debt, guardrails" },
    { dept: "engineering", key: "eng-bugbash", label: "Bug Bash", desc: "Timeboxed fixes, triage" },
    // Product
    { dept: "product", key: "prod-discovery", label: "Discovery", desc: "Research, problem framing" },
    { dept: "product", key: "prod-delivery", label: "Feature Delivery", desc: "PRD, milestones" },
    // Marketing
    { dept: "marketing", key: "mkt-campaign", label: "Campaign Launch", desc: "Creative, channels, UTM" },
    { dept: "marketing", key: "mkt-content", label: "Content Calendar", desc: "Pipeline, approvals" },
    { dept: "marketing", key: "mkt-event", label: "Event Plan", desc: "Budget, vendors, timeline" },
    // Sales
    { dept: "sales", key: "sales-account", label: "Account Plan", desc: "Stakeholders, playbook" },
    { dept: "sales", key: "sales-deal", label: "Deal Desk", desc: "Approvals, pricing, risks" },
    // Customer Success
    { dept: "cs", key: "cs-onboarding", label: "Onboarding", desc: "Milestones, health, comms" },
    { dept: "cs", key: "cs-qbr", label: "QBR Prep", desc: "Outcomes, usage, renewals" },
    // Operations
    { dept: "ops", key: "ops-process", label: "Process Improvement", desc: "As-is → To-be, RACI" },
    { dept: "ops", key: "ops-rollout", label: "Operational Rollout", desc: "Pilots, SOPs, training" },
    // HR
    { dept: "hr", key: "hr-hiring", label: "Hiring Funnel", desc: "Stages, scorecards" },
    { dept: "hr", key: "hr-onboarding", label: "Employee Onboarding", desc: "Checklist, docs" },
    // Finance
    { dept: "finance", key: "fin-budget", label: "Budget Cycle", desc: "Forecast, variance" },
    { dept: "finance", key: "fin-close", label: "Month-End Close", desc: "Tasks, owners" },
];

/* --------------------------------- People --------------------------------- */

// Mock directory (replace with API later)
type Person = { id: string; name: string; email: string };
const USERS: Person[] = [
    { id: "u1", name: "Alex Chen", email: "alex@company.com" },
    { id: "u2", name: "Priya Singh", email: "priya@company.com" },
    { id: "u3", name: "Jamie Lee", email: "jamie@company.com" },
    { id: "u4", name: "Sam Rivera", email: "sam@company.com" },
    { id: "u5", name: "Taylor Brooks", email: "taylor@company.com" },
    { id: "u6", name: "Jordan Kim", email: "jordan@company.com" },
    { id: "u7", name: "Morgan Wu", email: "morgan@company.com" },
    { id: "u8", name: "Avery Patel", email: "avery@company.com" },
    { id: "u9", name: "Chris Diaz", email: "chris@company.com" },
    { id: "u10", name: "Robin Park", email: "robin@company.com" },
];

/* ------------------------------ Form State/Types --------------------------- */

type Access = "owner" | "assignees" | "org";

type FormState = {
    name: string;
    description: string;
    access: Access;          // ← replaces "visibility"
    department: DeptKey | "";
    template: string;        // template key
    ownerId: string;         // DRI (single, required)
    assigneeIds: string[];   // additional assignees (optional)
    assignAll: boolean;      // quick “everyone” option
    startDate: string;
    dueDate: string;
    workflow: "simple" | "standard" | "custom";
};

const initial: FormState = {
    name: "",
    description: "",
    access: "assignees",
    department: "",
    template: "",
    ownerId: "",
    assigneeIds: [],
    assignAll: false,
    startDate: "",
    dueDate: "",
    workflow: "standard",
};

/* -------------------------- Tiny helpers / UI bits ------------------------- */

function Surface({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={
                "rounded-2xl bg-white/55 dark:bg-neutral-900/55 backdrop-blur-xl shadow-lg ring-1 ring-black/5 dark:ring-white/10 " +
                className
            }
            {...props}
        />
    );
}

function Chip({ children, onRemove }: { children: React.ReactNode; onRemove?: () => void }) {
    return (
        <span className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs ring-1 ring-black/10 dark:ring-white/10 bg-white/70 dark:bg-neutral-900/70">
            {children}
            {onRemove && (
                <button
                    type="button"
                    onClick={onRemove}
                    className="ml-1 rounded hover:bg-black/5 dark:hover:bg-white/10 p-0.5"
                    aria-label="Remove"
                >
                    <X className="size-3.5" />
                </button>
            )}
        </span>
    );
}

function PersonRow({ p, onClick }: { p: Person; onClick: () => void }) {
    const initials = p.name.split(" ").map(n => n[0] ?? "").slice(0, 2).join("").toUpperCase();
    return (
        <button
            type="button"
            onClick={onClick}
            className="w-full text-left px-2 py-1.5 rounded-md hover:bg-black/5 dark:hover:bg-white/10 flex items-center gap-2"
        >
            <span className="inline-flex items-center justify-center size-6 rounded-md ring-1 ring-black/10 dark:ring-white/10 bg-white/70 dark:bg-neutral-900/70 text-[11px]">
                {initials}
            </span>
            <div className="min-w-0">
                <div className="text-sm truncate">{p.name}</div>
                <div className="text-[11px] opacity-70 truncate">{p.email}</div>
            </div>
        </button>
    );
}

/** Small, single-line people picker with autocomplete suggestions. */
function PeopleInput({
    placeholder,
    onSelect,
    excludeIds = [],
    autoFocus,
}: {
    placeholder: string;
    onSelect: (person: Person) => void;
    excludeIds?: string[];
    autoFocus?: boolean;
}) {
    const [q, setQ] = useState("");
    const [open, setOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const options = useMemo(() => {
        const s = q.trim().toLowerCase();
        return USERS
            .filter(u => !excludeIds.includes(u.id))
            .filter(u => !s || u.name.toLowerCase().includes(s) || u.email.toLowerCase().includes(s))
            .slice(0, 6);
    }, [q, excludeIds]);

    useEffect(() => {
        if (autoFocus) inputRef.current?.focus();
    }, [autoFocus]);

    return (
        <div className="relative w-full max-w-sm">
            <div className="flex items-center gap-2 rounded-lg border border-black/10 dark:border-white/10 bg-white/70 dark:bg-neutral-900/70 px-2 py-1.5">
                <AtSign className="size-4 opacity-70" />
                <input
                    ref={inputRef}
                    value={q}
                    onChange={(e) => { setQ(e.target.value); setOpen(true); }}
                    onFocus={() => setOpen(true)}
                    onBlur={() => setTimeout(() => setOpen(false), 120)} // allow click
                    placeholder={placeholder}
                    className="bg-transparent outline-none text-sm w-full"
                />
            </div>

            {open && options.length > 0 && (
                <div className="absolute z-10 mt-1 w-full rounded-xl bg-white/95 dark:bg-neutral-900/95 ring-1 ring-black/10 dark:ring-white/10 shadow-2xl p-1">
                    {options.map(p => (
                        <PersonRow
                            key={p.id}
                            p={p}
                            onClick={() => {
                                onSelect(p);
                                setQ("");
                                setOpen(false);
                                inputRef.current?.focus();
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

/* --------------------------------- Page ----------------------------------- */

export default function ProjectCreationPage() {
    const [step, setStep] = useState<StepKey>("basics");
    const [data, setData] = useState<FormState>(initial);
    const [submitting, setSubmitting] = useState(false);
    const idx = STEPS.findIndex(s => s.key === step);

    const set = <K extends keyof FormState>(k: K, v: FormState[K]) =>
        setData((d) => ({ ...d, [k]: v }));

    const next = () => setStep(STEPS[Math.min(idx + 1, STEPS.length - 1)].key);
    const prev = () => setStep(STEPS[Math.max(idx - 1, 0)].key);

    const visibleTemplates = useMemo(
        () => (data.department ? TEMPLATES.filter(t => t.dept === data.department) : []),
        [data.department]
    );

    const ownerPerson = useMemo(() => USERS.find(u => u.id === data.ownerId) || null, [data.ownerId]);
    const assigneePeople = useMemo(() => data.assigneeIds.map(id => USERS.find(u => u.id === id)!).filter(Boolean), [data.assigneeIds]);

    const create = async () => {
        setSubmitting(true);
        // TODO: replace with server action
        await new Promise((r) => setTimeout(r, 500));
        alert(`Project created:\n${JSON.stringify(data, null, 2)}`);
        setSubmitting(false);
    };

    /* ------------------------------ RENDER ---------------------------------- */

    return (
        <main className="relative p-6 md:p-8">
            {/* soft glow */}
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute -top-24 right-0 w-[60vw] h-[60vw] max-w-[880px] rounded-full blur-3xl opacity-20 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(34,211,238,0.24),transparent_65%)]" />
            </div>

            <header className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold leading-tight">Create Project</h1>
                    <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1">
                        Assign a responsible owner and (optionally) additional assignees. The owner leads and can delegate tasks downward.
                    </p>
                </div>
                <Link href="/admin/projects/management" className="text-sm hover:underline">Back to Projects</Link>
            </header>

            {/* Stepper */}
            <nav className="mb-6">
                <ul className="flex flex-wrap gap-2">
                    {STEPS.map((s, i) => {
                        const active = s.key === step;
                        const done = i < idx;
                        return (
                            <li key={s.key}>
                                <button
                                    onClick={() => setStep(s.key)}
                                    className={[
                                        "inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm border transition-all",
                                        active
                                            ? "bg-cyan-500 text-white border-transparent shadow-md"
                                            : "bg-white/55 dark:bg-neutral-900/55 border-black/5 dark:border-white/10 hover:shadow-sm"
                                    ].join(" ")}
                                >
                                    {done ? <CheckCircle2 className="size-4" /> : s.icon}
                                    {s.label}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Panel */}
            <Surface className="p-5">
                {step === "basics" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <label className="block">
                            <span className="text-sm font-medium">Project name</span>
                            <input
                                value={data.name}
                                onChange={(e) => set("name", e.target.value)}
                                className="mt-1 w-full rounded-lg border border-black/10 dark:border-white/10 bg-white/70 dark:bg-neutral-900/70 px-3 py-2 outline-none"
                                placeholder="e.g., Website Refresh"
                            />
                        </label>

                        <label className="block">
                            <span className="text-sm font-medium">Access</span>
                            <select
                                value={data.access}
                                onChange={(e) => set("access", e.target.value as Access)}
                                className="mt-1 w-full rounded-lg border border-black/10 dark:border-white/10 bg-white/70 dark:bg-neutral-900/70 px-3 py-2 outline-none"
                            >
                                <option value="owner">Owner only (admins included)</option>
                                <option value="assignees">Assignees (owner + all assignees)</option>
                                <option value="org">Organization (anyone in org can view)</option>
                            </select>
                        </label>

                        <label className="block md:col-span-2">
                            <span className="text-sm font-medium">Description</span>
                            <textarea
                                value={data.description}
                                onChange={(e) => set("description", e.target.value)}
                                rows={4}
                                className="mt-1 w-full rounded-lg border border-black/10 dark:border-white/10 bg-white/70 dark:bg-neutral-900/70 px-3 py-2 outline-none"
                                placeholder="What's the goal or scope?"
                            />
                        </label>
                    </div>
                )}

                {step === "department" && (
                    <>
                        <div className="text-sm font-medium mb-3">Which department owns this project?</div>
                        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
                            {DEPARTMENTS.map((d) => {
                                const active = data.department === d.key;
                                return (
                                    <button
                                        key={d.key}
                                        onClick={() => { set("department", d.key); set("template", ""); }}
                                        className={[
                                            "rounded-xl px-3 py-3 text-left ring-1 ring-black/10 dark:ring-white/10 bg-white/70 dark:bg-neutral-900/70 hover:shadow-md transition-all",
                                            active ? "outline outline-2 outline-cyan-400/40" : ""
                                        ].join(" ")}
                                    >
                                        <div className="flex items-center gap-2">
                                            {d.icon}
                                            <div className="font-medium">{d.label}</div>
                                        </div>
                                        <div className="text-[12px] text-neutral-500 mt-1">Prefilled templates & fields</div>
                                    </button>
                                );
                            })}
                        </div>
                        {!data.department && (
                            <div className="mt-3 text-xs text-neutral-600 dark:text-neutral-300">Tip: choose a department to unlock tailored templates next.</div>
                        )}
                    </>
                )}

                {step === "template" && (
                    <>
                        <div className="flex items-center justify-between mb-2">
                            <div className="text-sm font-medium">
                                {data.department ? `Templates for ${DEPARTMENTS.find(d => d.key === data.department)?.label}` : "Select a department first"}
                            </div>
                            {data.department && (
                                <button onClick={() => set("template", "")} className="text-xs opacity-70 hover:opacity-100">
                                    Clear selection
                                </button>
                            )}
                        </div>

                        {data.department ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
                                {/* Blank first */}
                                <button
                                    onClick={() => set("template", "blank")}
                                    className={[
                                        "rounded-xl px-3 py-3 text-left ring-1 ring-black/10 dark:ring-white/10 bg-white/70 dark:bg-neutral-900/70 hover:shadow-md transition-all",
                                        data.template === "blank" ? "outline outline-2 outline-cyan-400/40" : ""
                                    ].join(" ")}
                                >
                                    <div className="font-medium">Blank</div>
                                    <div className="text-[12px] text-neutral-500 mt-1">Start from scratch</div>
                                </button>

                                {visibleTemplates.map((t) => {
                                    const active = data.template === t.key;
                                    return (
                                        <button
                                            key={t.key}
                                            onClick={() => set("template", t.key)}
                                            className={[
                                                "rounded-xl px-3 py-3 text-left ring-1 ring-black/10 dark:ring-white/10 bg-white/70 dark:bg-neutral-900/70 hover:shadow-md transition-all",
                                                active ? "outline outline-2 outline-cyan-400/40" : ""
                                            ].join(" ")}
                                        >
                                            <div className="font-medium">{t.label}</div>
                                            <div className="text-[12px] text-neutral-500 mt-1">{t.desc}</div>
                                        </button>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="text-xs text-neutral-600 dark:text-neutral-300">Choose a department to see matching templates.</div>
                        )}
                    </>
                )}

                {step === "assign" && (
                    <div className="grid grid-cols-1 gap-5">
                        {/* Owner (DRI) */}
                        <div>
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium">Owner (DRI)</label>
                                {!data.ownerId && <span className="text-xs text-rose-600">Required</span>}
                            </div>

                            {/* Owner chip or small input */}
                            {ownerPerson ? (
                                <div className="mt-2 flex items-center gap-2">
                                    <Chip onRemove={() => set("ownerId", "")}>
                                        <span className="font-medium">{ownerPerson.name}</span>
                                        <span className="opacity-70">· {ownerPerson.email}</span>
                                    </Chip>
                                    <button
                                        type="button"
                                        onClick={() => set("ownerId", "")}
                                        className="text-xs opacity-70 hover:opacity-100"
                                    >
                                        Change
                                    </button>
                                </div>
                            ) : (
                                <div className="mt-2">
                                    <PeopleInput
                                        placeholder="Type a few letters…"
                                        onSelect={(p) => set("ownerId", p.id)}
                                        excludeIds={data.assigneeIds}
                                        autoFocus
                                    />
                                </div>
                            )}

                            <p className="mt-2 text-xs text-neutral-600 dark:text-neutral-300">
                                The Owner is responsible for outcomes and can create/assign tasks to others (chain of command).
                            </p>
                        </div>

                        {/* Additional assignees */}
                        <div>
                            <label className="text-sm font-medium">Also assign to (optional)</label>

                            {/* Chips */}
                            <div className="mt-2 flex flex-wrap items-center gap-2">
                                {assigneePeople.map(p => (
                                    <Chip key={p.id} onRemove={() => set("assigneeIds", data.assigneeIds.filter(id => id !== p.id))}>
                                        <span className="font-medium">{p.name}</span>
                                        <span className="opacity-70">· {p.email}</span>
                                    </Chip>
                                ))}

                                {/* Input that “replicates” after each add (chip pattern) */}
                                {!data.assignAll && (
                                    <PeopleInput
                                        placeholder="Add assignee…"
                                        onSelect={(p) => {
                                            if (p.id === data.ownerId) return; // skip owner
                                            if (!data.assigneeIds.includes(p.id)) {
                                                set("assigneeIds", [...data.assigneeIds, p.id]);
                                            }
                                        }}
                                        excludeIds={[data.ownerId, ...data.assigneeIds].filter(Boolean)}
                                    />
                                )}
                            </div>

                            {/* Assign to everyone */}
                            <div className="mt-3">
                                <label className="inline-flex items-center gap-2 text-sm">
                                    <input
                                        type="checkbox"
                                        checked={data.assignAll}
                                        onChange={(e) => {
                                            const checked = e.target.checked;
                                            set("assignAll", checked);
                                            if (checked) set("assigneeIds", []);
                                        }}
                                    />
                                    Assign to everyone in the organization
                                </label>
                                <div className="text-xs text-neutral-600 dark:text-neutral-300 mt-1">
                                    When enabled, all users get access and notifications; the Owner remains responsible.
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {step === "schedule" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <label className="block">
                            <span className="text-sm font-medium">Start date</span>
                            <input
                                type="date"
                                value={data.startDate}
                                onChange={(e) => set("startDate", e.target.value)}
                                className="mt-1 w-full rounded-lg border border-black/10 dark:border-white/10 bg-white/70 dark:bg-neutral-900/70 px-3 py-2 outline-none"
                            />
                        </label>
                        <label className="block">
                            <span className="text-sm font-medium">Due date</span>
                            <input
                                type="date"
                                value={data.dueDate}
                                onChange={(e) => set("dueDate", e.target.value)}
                                className="mt-1 w-full rounded-lg border border-black/10 dark:border-white/10 bg-white/70 dark:bg-neutral-900/70 px-3 py-2 outline-none"
                            />
                        </label>
                        <div className="text-xs text-neutral-600 dark:text-neutral-300 md:col-span-2">
                            We’ll seed a timeline from your template and dates.
                        </div>
                    </div>
                )}

                {step === "workflow" && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {[
                            { key: "simple", label: "Simple", desc: "Backlog → In Progress → Done" },
                            { key: "standard", label: "Standard", desc: "To Do → In Progress → Review → Done" },
                            { key: "custom", label: "Custom", desc: "Define now or later" },
                        ].map(w => {
                            const active = data.workflow === w.key;
                            return (
                                <button
                                    key={w.key}
                                    onClick={() => set("workflow", w.key as FormState["workflow"])}
                                    className={[
                                        "rounded-xl px-3 py-3 text-left ring-1 ring-black/10 dark:ring-white/10 bg-white/70 dark:bg-neutral-900/70 hover:shadow-md transition-all",
                                        active ? "outline outline-2 outline-cyan-400/40" : ""
                                    ].join(" ")}
                                >
                                    <div className="font-medium">{w.label}</div>
                                    <div className="text-[12px] text-neutral-500 mt-1">{w.desc}</div>
                                </button>
                            );
                        })}
                    </div>
                )}

                {step === "review" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            { k: "Name", v: data.name || "—" },
                            { k: "Access", v: data.access },
                            { k: "Department", v: data.department || "—" },
                            { k: "Template", v: data.template || "—" },
                            { k: "Owner", v: ownerPerson ? `${ownerPerson.name} · ${ownerPerson.email}` : "—" },
                            { k: "Assignees", v: data.assignAll ? "Everyone" : (assigneePeople.length ? `${assigneePeople.length} person(s)` : "—") },
                            { k: "Workflow", v: data.workflow },
                            { k: "Start", v: data.startDate || "—" },
                            { k: "Due", v: data.dueDate || "—" },
                            { k: "Description", v: data.description || "—" },
                        ].map(row => (
                            <div key={row.k} className="rounded-xl ring-1 ring-black/5 dark:ring-white/10 p-3 bg-white/60 dark:bg-neutral-900/60">
                                <div className="text-[12px] text-neutral-500">{row.k}</div>
                                <div className="text-sm mt-1 break-words">{String(row.v)}</div>
                            </div>
                        ))}
                        {!data.ownerId && (
                            <div className="md:col-span-2 text-xs text-rose-600">Owner is required before creating the project.</div>
                        )}
                    </div>
                )}
            </Surface>

            {/* Footer actions */}
            <footer className="mt-4 flex items-center justify-between">
                <button
                    onClick={prev}
                    disabled={idx === 0 || submitting}
                    className="inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm border border-black/10 dark:border-white/10 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-xl disabled:opacity-50"
                >
                    <ChevronLeft className="size-4" /> Back
                </button>

                {step !== "review" ? (
                    <button
                        onClick={next}
                        disabled={
                            submitting ||
                            (step === "department" && !data.department) ||
                            (step === "template" && !data.template)
                        }
                        className="inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm bg-cyan-500 text-white shadow-md disabled:opacity-50"
                        title={
                            step === "department" && !data.department
                                ? "Pick a department"
                                : step === "template" && !data.template
                                    ? "Pick a template"
                                    : "Next"
                        }
                    >
                        Next <ChevronRight className="size-4" />
                    </button>
                ) : (
                    <button
                        onClick={create}
                        disabled={submitting || !data.name || !data.ownerId}
                        className="inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm bg-cyan-600 text-white shadow-md disabled:opacity-50"
                        title={!data.name ? "Project name required" : !data.ownerId ? "Owner required" : "Create project"}
                    >
                        <Sparkles className="size-4" /> Create Project
                    </button>
                )}
            </footer>
        </main>
    );
}
