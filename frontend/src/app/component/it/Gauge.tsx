export function Gauge({ value, label }: { value: number; label: string }) {
    const r = 28, c = 2 * Math.PI * r, o = c - (c * Math.min(100, Math.max(0, value))) / 100;
    return (
        <div className="flex items-center gap-3">
            <svg width="72" height="72" viewBox="0 0 72 72" className="shrink-0">
                <circle cx="36" cy="36" r={r} className="fill-none stroke-neutral-300/50 dark:stroke-neutral-700/50" strokeWidth="8" />
                <circle cx="36" cy="36" r={r} className="fill-none stroke-cyan-500" strokeWidth="8" strokeDasharray={c} strokeDashoffset={o} strokeLinecap="round" />
            </svg>
            <div>
                <div className="text-xl font-semibold">{value}%</div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">{label}</div>
            </div>
        </div>
    );
}
