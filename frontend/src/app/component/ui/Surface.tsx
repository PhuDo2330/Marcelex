"use client";

import React, { useRef, useState, useCallback } from "react";

type Props = React.HTMLAttributes<HTMLDivElement> & {
    as?: keyof JSX.IntrinsicElements;
    inset?: boolean;       // lighter “tray” style
    interactive?: boolean; // hover: lift + glow + accent ring
};

export default function Surface({
    as: Tag = "section",
    className = "",
    inset,
    interactive,
    onMouseMove,
    ...rest
}: Props) {
    const ref = useRef<HTMLDivElement>(null);
    const [pos, setPos] = useState<{ x: number; y: number }>({ x: -9999, y: -9999 });

    const handleMouseMove = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            if (!ref.current) return;
            const r = ref.current.getBoundingClientRect();
            setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
            onMouseMove?.(e);
        },
        [onMouseMove]
    );

    const base =
        "relative rounded-2xl bg-white/95 dark:bg-neutral-950/60 " +
        "ring-1 ring-slate-200/70 dark:ring-white/10 " +
        "shadow-[0_8px_24px_rgba(2,6,23,0.06)] " +
        "backdrop-blur supports-[backdrop-filter]:backdrop-blur";

    const insetCls =
        "relative rounded-xl bg-white/80 dark:bg-neutral-950/40 " +
        "ring-1 ring-slate-200/60 dark:ring-white/10 " +
        "shadow-[0_6px_18px_rgba(2,6,23,0.05)]";

    const interactiveCls =
        "surface-spotlight transition-transform duration-200 " +
        "hover:-translate-y-[2px] " +
        "hover:shadow-[0_18px_40px_rgba(2,6,23,0.16)] " +
        "hover:ring-slate-300/90 dark:hover:ring-white/20";

    return (
        <Tag
            ref={ref}
            className={[
                inset ? insetCls : base,
                interactive ? interactiveCls : "",
                className,
            ].join(" ")}
            onMouseMove={interactive ? handleMouseMove : onMouseMove}
            style={
                interactive
                    ? ({ "--mx": `${pos.x}px`, "--my": `${pos.y}px` } as React.CSSProperties)
                    : undefined
            }
            {...rest}
        />
    );
}
