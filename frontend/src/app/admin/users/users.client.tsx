/**
 * Users directory (search, create, inline edit)
 * - Uses mock data; swap saveUser() to call your API.
 */
import PageHeader from "@/app/component/ui/PageHeader";
import DataTable from "@/app/component/ui/DataTable";
import Badge from "@/app/component/ui/Badge";
import UsersClient from "./users.client";

export default async function UsersPage() {
    return (
        <div className="flex-1">
            <PageHeader
                title="Users"
                subtitle="Manage people, departments, roles and team memberships."
                crumbs={[{ label: "Admin", href: "/admin" }, { label: "Users" }]}
            />
            <UsersClient />
        </div>
    );
}
