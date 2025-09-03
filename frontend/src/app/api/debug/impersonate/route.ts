/**
 * app/api/debug/impersonate/route.ts
 * Dev-only helper to set auth cookies quickly from the browser.
 * Remove in production.
 */
import { NextResponse } from "next/server";
import { ALL_ROLES, type Role, type Department } from "@/features/auth/roles";

export async function GET(req: Request) {
    const url = new URL(req.url);
    const roleParam = url.searchParams.get("role") as Role | null;
    const deptParam = url.searchParams.get("dept") as Department | null;
    const uid = url.searchParams.get("uid");
    const teams = url.searchParams.get("teams");
    const full = url.searchParams.get("dev_full_access"); // "1" or "0"

    const res = NextResponse.json({
        ok: true,
        set: {
            role: roleParam,
            dept: deptParam,
            uid,
            teams,
            dev_full_access: full,
        },
    });

    const opts = { path: "/", httpOnly: false } as const;

    if (roleParam) {
        const safeRole = (ALL_ROLES as readonly string[]).includes(roleParam) ? roleParam : "GUEST";
        res.cookies.set("role", safeRole, opts);
    }
    if (deptParam) res.cookies.set("dept", deptParam, opts);
    if (uid) res.cookies.set("uid", uid, opts);
    if (teams) res.cookies.set("teams", teams, opts);
    if (full === "1" || full === "0") res.cookies.set("dev_full_access", full, opts);

    return res;
}
