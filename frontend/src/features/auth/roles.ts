// src/features/auth/roles.ts

/** ---------- Types ---------- */
export type Access = "none" | "limited" | "standard" | "admin" | "owner";
export type Section =
    | "global"
    | "projects"
    | "development"
    | "operations"
    | "marketing"
    | "sales"
    | "hr"
    | "finance"
    | "admin";

export type Role =
    | "ceo"
    | "master_admin"
    | "dev_lead"
    | "ops_manager"
    | "marketing_manager"
    | "sales_manager"
    | "hr_manager"
    | "finance_manager"
    | "developer"
    | "ops_engineer"
    | "marketing_specialist"
    | "sales_rep"
    | "hr_specialist"
    | "finance_analyst"
    | "contractor"
    | "guest";

/** ---------- Access ranking (for comparisons) ---------- */
const ACCESS_ORDER: Access[] = ["none", "limited", "standard", "admin", "owner"];
const gte = (a: Access, b: Access) =>
    ACCESS_ORDER.indexOf(a) >= ACCESS_ORDER.indexOf(b);

/** ---------- RBAC Matrix (you can tweak later) ---------- */
export const RBAC_MATRIX: Record<Role, Record<Section, Access>> = {
    ceo: {
        global: "owner",
        projects: "owner",
        development: "owner",
        operations: "owner",
        marketing: "owner",
        sales: "owner",
        hr: "owner",
        finance: "owner",
        admin: "owner",
    },
    master_admin: {
        global: "admin",
        projects: "admin",
        development: "admin",
        operations: "admin",
        marketing: "admin",
        sales: "admin",
        hr: "admin",
        finance: "admin",
        admin: "owner",
    },
    dev_lead: {
        global: "limited",
        projects: "admin",
        development: "owner",
        operations: "standard",
        marketing: "limited",
        sales: "limited",
        hr: "limited",
        finance: "limited",
        admin: "none",
    },
    ops_manager: {
        global: "limited",
        projects: "admin",
        development: "standard",
        operations: "owner",
        marketing: "limited",
        sales: "limited",
        hr: "limited",
        finance: "limited",
        admin: "none",
    },
    marketing_manager: {
        global: "limited",
        projects: "admin",
        development: "limited",
        operations: "limited",
        marketing: "owner",
        sales: "standard",
        hr: "limited",
        finance: "limited",
        admin: "none",
    },
    sales_manager: {
        global: "limited",
        projects: "admin",
        development: "limited",
        operations: "limited",
        marketing: "standard",
        sales: "owner",
        hr: "limited",
        finance: "standard",
        admin: "none",
    },
    hr_manager: {
        global: "limited",
        projects: "admin",
        development: "limited",
        operations: "limited",
        marketing: "limited",
        sales: "limited",
        hr: "owner",
        finance: "limited",
        admin: "none",
    },
    finance_manager: {
        global: "limited",
        projects: "admin",
        development: "limited",
        operations: "limited",
        marketing: "limited",
        sales: "standard",
        hr: "limited",
        finance: "owner",
        admin: "none",
    },
    developer: {
        global: "limited",
        projects: "standard",
        development: "admin",
        operations: "limited",
        marketing: "limited",
        sales: "limited",
        hr: "limited",
        finance: "none",
        admin: "none",
    },
    ops_engineer: {
        global: "limited",
        projects: "standard",
        development: "standard",
        operations: "admin",
        marketing: "limited",
        sales: "limited",
        hr: "limited",
        finance: "none",
        admin: "none",
    },
    marketing_specialist: {
        global: "limited",
        projects: "standard",
        development: "limited",
        operations: "limited",
        marketing: "admin",
        sales: "standard",
        hr: "limited",
        finance: "none",
        admin: "none",
    },
    sales_rep: {
        global: "limited",
        projects: "standard",
        development: "limited",
        operations: "limited",
        marketing: "standard",
        sales: "admin",
        hr: "limited",
        finance: "limited",
        admin: "none",
    },
    hr_specialist: {
        global: "limited",
        projects: "standard",
        development: "limited",
        operations: "limited",
        marketing: "limited",
        sales: "limited",
        hr: "admin",
        finance: "none",
        admin: "none",
    },
    finance_analyst: {
        global: "limited",
        projects: "standard",
        development: "limited",
        operations: "limited",
        marketing: "limited",
        sales: "standard",
        hr: "limited",
        finance: "admin",
        admin: "none",
    },
    contractor: {
        global: "limited",
        projects: "standard",
        development: "standard",
        operations: "limited",
        marketing: "limited",
        sales: "limited",
        hr: "none",
        finance: "none",
        admin: "none",
    },
    guest: {
        global: "limited",
        projects: "limited",
        development: "limited",
        operations: "limited",
        marketing: "limited",
        sales: "limited",
        hr: "none",
        finance: "none",
        admin: "none",
    },
};

/** ---------- Role helpers ---------- */
export function normalizeRole(input?: string): Role {
    const key = (input ?? "").toLowerCase().replace(/[^a-z_]/g, "") as Role;
    return (key && (key in RBAC_MATRIX) ? key : "ceo");
}

/**
 * canAccess(section, required, role?)
 * - If NEXT_PUBLIC_RBAC_DISABLE=1, always return true (dev/test mode)
 * - Otherwise compares role's level vs required
 */
export function canAccess(
    section: Section,
    required: Access,
    role?: Role
): boolean {
    if (process.env.NEXT_PUBLIC_RBAC_DISABLE === "1") return true;
    const r = role ?? "ceo";
    const level = RBAC_MATRIX[r]?.[section] ?? "owner";
    return gte(level, required);
}

/** ---------- Tasks scopes for top tabs ---------- */
export type TaskScope = "All" | "My" | "Team" | "Overdue" | "By Dept";

/**
 * taskScopesForRole(role)
 * For now return all scopes for every role (you can restrict later).
 */
export function taskScopesForRole(_role: Role): TaskScope[] {
    return ["All", "My", "Team", "Overdue", "By Dept"];
}
