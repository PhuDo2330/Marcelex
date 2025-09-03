"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import Link from "next/link";
import {
  PlusCircle, ListChecks, User, BarChart3, Search, Clock, Star,
  ChevronDown, X
} from "lucide-react";
import { FEATURES, SECTION_TITLES } from "@/features/projects/registry";

// ---- Simple recent actions persistence
type RecentAction = { label: string; href: string; ts: number };
const RECENT_KEY = "mx_recent_project_actions";

function readRecent(): RecentAction[] {
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    return raw ? (JSON.parse(raw) as RecentAction[]) : [];
  } catch {
    return [];
  }
}

function writeRecent(next: RecentAction[]) {
  try {
    localStorage.setItem(RECENT_KEY, JSON.stringify(next.slice(0, 8)));
  } catch {}
}

// ---- Small UI helpers in-file to keep this step self-contained
function ActionButton({
  href, icon, label, onUse,
}: { href: string; icon: React.ReactNode; label: string; onUse: () => void }) {
  return (
    <Link
      href={href}
      onClick={() => onUse()}
      className="group flex items-center gap-2 rounded-xl border border-black/5 dark:border-white/5
                 bg-white/70 dark:bg-neutral-900/70 backdrop-blur supports-[backdrop-filter]:bg-white/60
                 dark:supports-[backdrop-filter]:bg-neutral-900/60 px-4 py-3 hover:shadow-md hover:-translate-y-0.5 transition-all"
    >
      <span className="rounded-lg p-1.5 border border-white/30 dark:border-white/10
                       bg-gradient-to-br from-cyan-200/40 to-violet-200/40
                       dark:from-cyan-500/15 dark:to-violet-500/15">
        {icon}
      </span>
      <span className="font-medium text-sm">{label}</span>
    </Link>
  );
}

function MetricCard({ title, value, sub }: { title: string; value: string; sub?: string }) {
  return (
    <div className="rounded-2xl border border-black/5 dark:border-white/5
                    bg-white/70 dark:bg-neutral-900/70 backdrop-blur supports-[backdrop-filter]:bg-white/60
                    dark:supports-[backdrop-filter]:bg-neutral-900/60 p-4">
      <div className="text-xs text-neutral-500 dark:text-neutral-400">{title}</div>
      <div className="mt-1 text-xl font-semibold">{value}</div>
      {sub && <div className="mt-0.5 text-xs text-neutral-600 dark:text-neutral-300">{sub}</div>}
    </div>
  );
}

// ---- Very light command palette (Cmd/Ctrl + K)
type Command = { label: string; href: string; keywords?: string[] };
function CommandPalette({
  open, onClose, commands, onUse,
}: {
  open: boolean; onClose: () => void;
  commands: Command[]; onUse: (c: Command) => void;
}) {
  const [q, setQ] = useState("");

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const filtered = useMemo(() => {
    const qq = q.trim().toLowerCase();
    if (!qq) return commands.slice(0, 12);
    return commands.filter(c =>
      c.label.toLowerCase().includes(qq) ||
      (c.keywords ?? []).some(k => k.toLowerCase().includes(qq))
    ).slice(0, 20);
  }, [q, commands]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] bg-black/40 grid place-items-start pt-[12vh] px-4">
      <div className="w-full max-w-2xl rounded-2xl border border-black/10 dark:border-white/10
                      bg-white dark:bg-neutral-900 shadow-2xl overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-black/5 dark:border-white/10">
          <Search className="size-4 opacity-70" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Type a command… e.g. “create project”, “portfolio”, “my projects”"
            className="flex-1 bg-transparent outline-none text-sm"
          />
          <button className="p-1.5 rounded-md hover:bg-black/5 dark:hover:bg-white/10" onClick={onClose}>
            <X className="size-4" />
          </button>
        </div>
        <ul className="max-h-[50vh] overflow-y-auto p-2">
          {filtered.length === 0 && (
            <li className="px-3 py-2 text-sm text-neutral-500">No results</li>
          )}
          {filtered.map((c) => (
            <li key={c.href}>
              <Link
                href={c.href}
                onClick={() => onUse(c)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 text-sm"
              >
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-violet-400" />
                <span>{c.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function ProjectsHome() {
  const [palette, setPalette] = useState(false);
  const [recent, setRecent] = useState<RecentAction[]>([]);

  // cmd/ctrl + k to open
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const mac = navigator.platform.toLowerCase().includes("mac");
      if ((mac && e.metaKey && e.key.toLowerCase() === "k") || (!mac && e.ctrlKey && e.key.toLowerCase() === "k")) {
        e.preventDefault();
        setPalette(true);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    setRecent(readRecent());
  }, []);

  const useAction = useCallback((label: string, href: string) => {
    const next: RecentAction[] = [{ label, href, ts: Date.now() }, ...readRecent()
      .filter(r => !(r.label === label && r.href === href))];
    writeRecent(next);
    setRecent(next);
  }, []);

  // ---- Commands list (top tasks + key features). You can expand this anytime.
  const commands: Command[] = useMemo(() => [
    { label: "Create New Project", href: "/admin/projects/creation" , keywords: ["new", "add", "start"] },
    { label: "View All Projects", href: "/admin/projects/management", keywords: ["list", "browse"] },
    { label: "My Projects", href: "/admin/projects/management?view=mine", keywords: ["assigned", "owner"] },
    { label: "Portfolio Dashboard", href: "/admin/projects/analytics", keywords: ["kpi", "metrics"] },
    { label: "Project Templates", href: "/admin/projects/creation", keywords: ["starter", "boilerplate"] },
    { label: "Project Tags Management", href: "/admin/projects/organization", keywords: ["labels"] },
    { label: "Project Permissions", href: "/admin/projects/administration", keywords: ["rbac", "roles"] },
    { label: "Kanban View", href: "/admin/projects/views?mode=kanban", keywords: ["board"] },
    { label: "Timeline / Gantt", href: "/admin/projects/views?mode=gantt", keywords: ["schedule"] },
  ], []);

  const onUseCommand = useCallback((c: Command) => {
    useAction(c.label, c.href);
    setPalette(false);
  }, [useAction]);

  // ---- "More" (progressive disclosure) pulls from registry but renders smaller/secondary
  const moreTiles = useMemo(() => {
    // flatten FEATURES into a lighter list and de-emphasize visually
    const order = ["management","creation","organization","analytics","administration","views"] as const;
    const flat = order.flatMap(k => FEATURES[k].map(f => ({...f, section: SECTION_TITLES[k]})));
    // keep a reasonable number; the command palette will find the rest
    return flat.slice(0, 18);
  }, []);

  return (
    <main className="p-6 md:p-8">
      {/* Header — LEFT aligned */}
      <header className="mb-6">
        <h1 className="text-2xl font-semibold leading-tight">Projects</h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1">
          Quick actions and context. Press <kbd className="px-1 py-0.5 rounded border text-[11px]">⌘/Ctrl</kbd>+<kbd className="px-1 py-0.5 rounded border text-[11px]">K</kbd> to search commands.
        </p>
      </header>

      {/* Search / open palette */}
      <div className="mb-5">
        <button
          onClick={() => setPalette(true)}
          className="w-full flex items-center gap-2 text-left rounded-2xl px-4 py-3
                     border border-black/5 dark:border-white/5 bg-white/70 dark:bg-neutral-900/70
                     backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-neutral-900/60
                     hover:shadow-md transition-all"
        >
          <Search className="size-4 opacity-70" />
          <span className="text-sm text-neutral-600 dark:text-neutral-300">Search projects and actions…</span>
          <span className="ml-auto text-[11px] px-1.5 py-0.5 rounded border">⌘/Ctrl + K</span>
        </button>
      </div>

      {/* Quick Actions */}
      <section className="mb-6">
        <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 mb-2">Quick actions</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
          <ActionButton
            href="/admin/projects/creation"
            label="Create Project"
            icon={<PlusCircle className="size-5" />}
            onUse={() => useAction("Create Project", "/admin/projects/creation")}
          />
          <ActionButton
            href="/admin/projects/management"
            label="View All Projects"
            icon={<ListChecks className="size-5" />}
            onUse={() => useAction("View All Projects", "/admin/projects/management")}
          />
          <ActionButton
            href="/admin/projects/management?view=mine"
            label="My Projects"
            icon={<User className="size-5" />}
            onUse={() => useAction("My Projects", "/admin/projects/management?view=mine")}
          />
          <ActionButton
            href="/admin/projects/analytics"
            label="Portfolio Dashboard"
            icon={<BarChart3 className="size-5" />}
            onUse={() => useAction("Portfolio Dashboard", "/admin/projects/analytics")}
          />
        </div>
      </section>

      {/* At-a-glance metrics (mock for now; wire up later) */}
      <section className="mb-6">
        <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 mb-2">At a glance</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <MetricCard title="Active projects" value="42" sub="+3 this week" />
          <MetricCard title="Overdue milestones" value="5" sub="↓ 2 vs last week" />
          <MetricCard title="Avg. health score" value="8.2 / 10" sub="Stable" />
          <MetricCard title="Budget risk" value="12%" sub="Watchlist: 4 projects" />
        </div>
      </section>

      {/* Recently used actions */}
      <section className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">Recently used</div>
          {recent.length > 0 && (
            <button
              className="text-xs text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-200"
              onClick={() => { writeRecent([]); setRecent([]); }}
            >
              Clear
            </button>
          )}
        </div>
        {recent.length === 0 ? (
          <div className="rounded-xl border border-dashed border-black/10 dark:border-white/10 p-4 text-sm text-neutral-600 dark:text-neutral-300">
            Your recent actions will appear here.
          </div>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2">
            {recent.slice(0, 6).map((r) => (
              <li key={r.ts} className="rounded-lg border border-black/5 dark:border-white/5 bg-white/70 dark:bg-neutral-900/70 px-3 py-2">
                <Link href={r.href} className="flex items-center gap-2 text-sm">
                  <Clock className="size-4 opacity-70" />
                  <span className="truncate">{r.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Progressive disclosure: More */}
      <details className="group">
        <summary className="list-none flex items-center gap-2 cursor-pointer select-none mb-3">
          <ChevronDown className="size-4 transition-transform group-open:rotate-180" />
          <span className="text-sm font-semibold">More project features</span>
        </summary>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
          {moreTiles.map((f) => (
            <Link
              key={f.href}
              href={f.href}
              className="rounded-xl border border-black/5 dark:border-white/5 p-4 bg-white/70 dark:bg-neutral-900/70
                         backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-neutral-900/60
                         hover:shadow-md hover:-translate-y-0.5 transition-all"
              onClick={() => useAction(f.title, f.href)}
              title={f.title}
            >
              <div className="flex items-start gap-3">
                <span className="rounded-lg p-1.5 border border-white/30 dark:border-white/10
                                 bg-gradient-to-br from-cyan-200/40 to-violet-200/40 dark:from-cyan-500/15 dark:to-violet-500/15">
                  {f.icon}
                </span>
                <div className="flex-1">
                  <div className="text-sm font-medium">{f.title}</div>
                  <div className="text-[11px] mt-0.5 text-neutral-600 dark:text-neutral-300">{/* desc optional */}</div>
                </div>
                <Star className="size-4 opacity-0 group-hover:opacity-60 transition-opacity" />
              </div>
            </Link>
          ))}
        </div>
      </details>

      {/* Command palette */}
      <CommandPalette open={palette} onClose={() => setPalette(false)} commands={commands} onUse={onUseCommand} />
    </main>
  );
}
