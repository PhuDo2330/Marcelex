"use client";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    // TODO: wire to your real auth store; for now, always allow
    return <>{children}</>;
}
