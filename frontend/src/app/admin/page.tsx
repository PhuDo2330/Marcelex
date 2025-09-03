"use client";

import React from "react";
import { getCurrentRole } from "@/app/component/admin/dashboard/mock";
import LeadDashboard from "@/app/component/admin/dashboard/Lead";
import RegularDashboard from "@/app/component/admin/dashboard/Regular";

export default function AdminDashboardPage() {
    // --- role + label ---
    const role = getCurrentRole(); // "owner" | "lead" | "regular"
    const roleLabel = role === "owner" ? "Owner" : role === "lead" ? "Lead" : "Regular";

    // --- your existing Owner data (unchanged) ---
    const tasks = [
        { id: "PROJ-12", title: "Website redesign handoff", dept: "projects", due: "Sep 20" },
        { id: "DEV-214", title: "Fix OAuth callback edge case", dept: "development", due: "Sep 18" },
        { id: "OPS-77", title: "Create DB failover runbook", dept: "operations", due: "Sep 25" },
    ];

    const projects = [
        { name: "Website Redesign", id: "PROJ-12", depts: ["development", "marketing"], progress: 42 },
        { name: "Salesforce Integration", id: "PROJ-19", depts: ["sales", "development", "operations"], progress: 61 },
        { name: "Onboarding Revamp", id: "PROJ-22", depts: ["hr", "development"], progress: 78 },
    ];

    // --- single return controlling all views ---
    return (
        <div className="space-y-6">
            {/* Header */}
            <header className="flex items-end justify-between">
                <div>
                    <h1 className="text-2xl md:text-3xl font-semibold">{roleLabel} Dashboard</h1>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        {role === "owner" && "Overview across departments."}
                        {role === "lead" && "Focused view for Development & IT."}
                        {role === "regular" && "Your open tasks and tickets."}
                    </p>
                </div>
                <div className="text-xs text-neutral-600 dark:text-neutral-400">Preview: {role}</div>
            </header>

            {/* Role-scoped content */}
            {role === "owner" ? (
                // --- OWNER: keep your existing dashboard content exactly as-is ---
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
                    {/* My Tasks */}
                    <section className="xl:col-span-2 surface p-4">
                        <h3 className="text-sm font-semibold mb-2">My Tasks</h3>
                        <ul className="divide-y divide-gray-200">
                            {tasks.map((t) => (
                                <li key={t.id} className="py-2 flex items-center justify-between">
                                    <div className="text-sm">
                                        <span className="font-medium mr-2">{t.id}</span>
                                        {t.title}
                                    </div>
                                    <span className="text-xs text-gray-600">
                                        {t.dept} · due {t.due}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* Notifications */}
                    <section className="surface p-4">
                        <h3 className="text-sm font-semibold mb-2">Notifications</h3>
                        <ul className="space-y-2 text-sm">
                            <li>INC-903 resolved · DB timeouts</li>
                            <li>Marketing campaign “Q4 Launch” ready for review</li>
                            <li>Payroll export completed</li>
                        </ul>
                    </section>

                    {/* Cross-department Projects */}
                    <section className="xl:col-span-2 surface p-4">
                        <h3 className="text-sm font-semibold mb-2">Cross-department Projects</h3>
                        <div className="grid md:grid-cols-3 gap-3">
                            {projects.map((p) => (
                                <div key={p.id} className="bg-white border border-gray-200 rounded-lg p-3">
                                    <div className="text-sm font-semibold">{p.name}</div>
                                    <div className="text-xs text-gray-600">
                                        {p.id} · {p.depts.join(", ")}
                                    </div>
                                    <div className="mt-2 h-2 bg-gray-100 rounded">
                                        {/* NOTE: using your existing primary color token */}
                                        <div
                                            className="h-2 bg-primary-600 rounded"
                                            style={{ width: `${p.progress}%` }}
                                        />
                                    </div>
                                    <div className="mt-2 text-right">
                                        <a
                                            href={`/admin/projects/${p.id}`}
                                            className="text-sm text-primary-700 hover:underline"
                                        >
                                            Open
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Quick actions */}
                    <section className="surface p-4">
                        <h3 className="text-sm font-semibold mb-2">Quick Actions</h3>
                        <div className="grid grid-cols-2 gap-2">
                            <a
                                href="/admin/projects/new"
                                className="px-3 py-2 rounded-lg text-sm border border-gray-200 hover:bg-gray-50"
                            >
                                New Project
                            </a>
                            <a
                                href="/admin/tasks/new"
                                className="px-3 py-2 rounded-lg text-sm border border-gray-200 hover:bg-gray-50"
                            >
                                New Task
                            </a>
                            <a
                                href="/admin/it/tickets"
                                className="px-3 py-2 rounded-lg text-sm border border-gray-200 hover:bg-gray-50"
                            >
                                Open Tickets
                            </a>
                            <a
                                href="/admin/dev/sprints"
                                className="px-3 py-2 rounded-lg text-sm border border-gray-200 hover:bg-gray-50"
                            >
                                Current Sprint
                            </a>
                        </div>
                    </section>
                </div>
            ) : role === "lead" ? (
                // --- LEAD view ---
                <LeadDashboard />
            ) : (
                // --- REGULAR view ---
                <RegularDashboard />
            )}
        </div>
    );
}
