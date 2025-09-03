export function StatusDot({ status }: { status: "green" | "yellow" | "red" }) {
    const map = { green: "bg-emerald-500", yellow: "bg-amber-400", red: "bg-rose-500" } as const;
    return <span className={`inline-block size-2.5 rounded-full ${map[status]}`} />;
}
