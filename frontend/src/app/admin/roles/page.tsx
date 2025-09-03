/**
 * app/admin/roles/page.tsx
 * Server wrapper for the Roles & RBAC matrix editor.
 * Seeds the client with a safe default matrix.
 */
import PageHeader from "@/app/component/ui/PageHeader";
import RolesMatrixClient from "./roles.client";
import { DEFAULT_ROLE_MATRIX, ALL_ROLES, SECTIONS, ACCESS_LEVELS } from "@/features/auth/roles";

export default async function RolesRBACPage() {
    // In the future, load a saved matrix from DB; for now seed defaults.
    const initialMatrix = JSON.parse(JSON.stringify(DEFAULT_ROLE_MATRIX));

    return (
        <div className="flex-1">
            <PageHeader
                title="Roles & RBAC"
                subtitle="Define which roles can access which sections and at what level."
                crumbs={[{ label: "Admin", href: "/admin" }, { label: "Roles & RBAC" }]}
            />
            <RolesMatrixClient
                initialMatrix={initialMatrix}
                roles={ALL_ROLES}
                sections={SECTIONS}
                levels={ACCESS_LEVELS}
            />
        </div>
    );
}
