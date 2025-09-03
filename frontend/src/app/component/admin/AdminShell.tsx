"use client";

import { AdminHeader } from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";

export default function AdminShell({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-white">
            <div className="flex min-h-screen">
                <AdminSidebar />
                <div className="flex-1 min-w-0 flex flex-col">
                    <AdminHeader />
                    <main className="p-6 md:p-8">{children}</main>
                </div>
            </div>
        </div>
    );
}
