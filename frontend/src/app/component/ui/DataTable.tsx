/**
 * DataTable.tsx
 * - Compact, sticky header table for ops/dev. Aria roles + keyboard focus styles.
 */
export default function DataTable({
    head,
    rows,
}: {
    head: React.ReactNode;   // <tr>...</tr>
    rows: React.ReactNode;   // <tr>...</tr> list
}) {
    return (
        <div className="overflow-auto rounded-2xl bg-white/70 dark:bg-neutral-900/60 backdrop-blur
                    ring-1 ring-black/5 dark:ring-white/10 shadow-lg">
            <table className="min-w-full text-sm">
                <thead className="sticky top-0 z-10 bg-white/90 dark:bg-neutral-900/90 text-neutral-600">
                    {head}
                </thead>
                <tbody className="divide-y divide-black/5 dark:divide-white/10 [tr]:focus-visible:outline-2 [tr]:focus-visible:outline-cyan-400/60 [tr]:focus-visible:outline">
                    {rows}
                </tbody>
            </table>
        </div>
    );
}
