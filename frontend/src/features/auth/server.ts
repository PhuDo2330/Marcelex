// src/features/auth/server.ts
import { cookies } from "next/headers";
import { normalizeRole, type Role } from "./roles";

/**
 * Server-side user lookup.
 * Uses Next 15 `await cookies()` and falls back to a demo user.
 * Set a cookie `role=ceo` (or any role key) to test different access.
 */
export async function getCurrentUser(): Promise<{
    id: string;
    email: string;
    name: string;
    role: Role;
}> {
    const jar = await cookies(); // ✅ Next 15 requires await
    const roleCookie = jar.get("role")?.value;
    const uid = jar.get("uid")?.value ?? "u_demo";
    const role = normalizeRole(roleCookie);

    return {
        id: uid,
        email: "demo@marcelex.dev",
        name: "Demo User",
        role,
    };
}
