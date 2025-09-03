// src/features/auth/RequireAccess.tsx
"use client";

import { ReactNode } from "react";
import { canAccess, type Access, type Section } from "./roles";

/**
 * For now this is permissive if NEXT_PUBLIC_RBAC_DISABLE=1 (recommended while you build UI).
 * Later you can pass an explicit `role` prop or fetch server-side and thread it in.
 */
export default function RequireAccess({
    section,
    level = "limited",
    children,
    fallback,
}: {
    section: Section;
    level?: Access;
    children: ReactNode;
    fallback?: ReactNode;
}) {
    const ok = canAccess(section, level);
    if (!ok) {
        return (
            fallback ?? (
                <div className="p-6 text-sm">
                    You don&apos;t have access to this section.
                </div>
            )
        );
    }
    return <>{children}</>;
}
