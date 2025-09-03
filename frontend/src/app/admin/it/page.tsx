"use client";
import { useMemo, useState } from "react";
import { Search, Plus, MoreHorizontal } from "lucide-react";

type Ticket = {
    id: string;
    subject: string;
    requester: string;
    priority: "P1" | "P2" | "P3" | "P4";
    status: "New" | "Assigned" | "In Progress" | "Pending User" | "Resolved" | "Closed";
    assignee: string;
    created: string;
    slaTimeLeft: number;
};

const DATA: Ticket[] = [
    { id: "T-1301", subject: "VPN drops intermittently", requester: "Nora", priority: "P2", status: "Assigned", assignee: "Alex", created: "2025-08-31 10:20", slaTimeLeft: 290 },
    { id: "T-1302", subject: "Email sync delay", requester: "Sam", priority: "P3", status: "In Progress", assignee: "Kris", created: "2025-08-31 09:10", slaTimeLeft: 35 },
    { id: "T-1303", subject: "Prod API 500", requester: "Ops Bot", priority: "P1", status: "New", assignee: "—", created: "2025-08-31 08:50", slaTimeLeft: -12 },
];

function slaClass(mins: number) {
    if (mins < 0) return "text-error";
    if (mins < 60) return "text-warning";
    return "text-success";
}
function prioBadgeColor(p: Ticket["priority"]) {
    switch (p) {
        case "P1": return "bg-error text-white";
        case "P2": return "bg-warning text-white";
        case "P3": return "bg-info text-white";
        default: return "bg-gray-200 text-gray-700";
    }
}

function TicketRow({ ticket }: { ticket: Ticket }) {
    return (
        <tr className="group border-b border-gray-100 hover:bg-gray-50 transition-colors">
            <td className="py-3 px-4 w-20"><span className="text-sm font-medium text-gray-900">{ticket.id}</span></td>
            <td className="py-3 px-4">
                <div className="flex flex-col min-w-0">
                    <span className="text-sm font-medium text-gray-900 truncate">{ticket.subject}</span>
                    <span className="text-xs text-gray-500 mt-0.5">Requested by {ticket.requester}</span>
                </div>
            </td>
            <td className="py-3 px-4 w-16">
                <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${prioBadgeColor(ticket.priority)}`}>{ticket.priority}</span>
            </td>
            <td className="py-3 px-4 w-40">
                <div className="flex items-center"><span className="w-2 h-2 rounded-full bg-info mr-2" /><span className="text-sm text-gray-700">{ticket.status}</span></div>
            </td>
            <td className="py-3 px-4 w-40">
                <div className="flex items-center min-w-0">
                    <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mr-2">
                        <span className="text-xs font-medium text-primary-700">{(ticket.assignee ?? "—").charAt(0)}</span>
                    </div>
                    <span className="text-sm text-gray-700 truncate">{ticket.assignee}</span>
                </div>
            </td>
            <td className="py-3 px-4 w-40 text-gray-600 text-sm">{ticket.created}</td>
            <td className="py-3 px-4 w-28 text-right">
                <span className={`text-sm font-medium ${slaClass(ticket.slaTimeLeft)}`}>
                    {ticket.slaTimeLeft < 0 ? `${Math.abs(ticket.slaTimeLeft)}m overdue` : `${ticket.slaTimeLeft}m left`}
                </span>
            </td>
            <td className="py-3 px-4 w-12">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1 hover:bg-gray-200 rounded" title="More"><MoreHorizontal className="w-4 h-4 text-gray-600" /></button>
                </div>
            </td>
        </tr>
    );
}

export default function TicketsPage() {
    const [q, setQ] = useState("");
    const filtered = useMemo(() => {
        const s = q.toLowerCase();
        return DATA.filter((t) => (t.id + t.subject + t.requester + t.assignee + t.status).toLowerCase().includes(s));
    }, [q]);

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
                <a href="/admin/tasks/new" className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-primary-600 text-white shadow-sm hover:shadow">
                    <Plus className="w-4 h-4 mr-1" /> New Ticket
                </a>
                <div className="ml-auto relative">
                    <Search className="absolute left-2 top-2.5 size-4 text-gray-400" />
                    <input
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        placeholder="Search tickets…"
                        className="pl-8 pr-3 py-2 rounded-lg text-sm bg-white/80 border border-gray-200 outline-none focus:ring-2 focus:ring-cyan-400/40"
                    />
                </div>
            </div>

            <div className="overflow-x-auto surface">
                <table className="min-w-[980px] w-full text-sm">
                    <thead className="text-left text-gray-500">
                        <tr className="[&>*]:px-4 [&>*]:py-3">
                            <th>ID</th><th>Subject</th><th>Priority</th><th>Status</th><th>Assignee</th><th>Created</th><th className="text-right">SLA</th><th />
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((t) => <TicketRow key={t.id} ticket={t} />)}
                        {filtered.length === 0 && (
                            <tr><td className="px-4 py-6 text-sm text-gray-500" colSpan={8}>No tickets found.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
