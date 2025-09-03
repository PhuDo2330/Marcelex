'use client';

import { ReactNode } from 'react';

type Role = 'admin' | 'owner' | 'sysadmin' | string;

interface RoleGuardProps {
    allow: Role[];
    children: ReactNode;
}

/**
 * NOTE:
 * Replace `hasAllowedRole` with your real auth/role check (e.g., from context/session).
 */
export default function RoleGuard({ allow, children }: RoleGuardProps) {
    // Example (pseudo):
    // const { user } = useAuth();
    // const hasAllowedRole = !!user && allow.includes(user.role);

    const hasAllowedRole = true; // TEMP so the app renders without crashing
    if (!hasAllowedRole) return null;

    return <>{children}</>;
}
