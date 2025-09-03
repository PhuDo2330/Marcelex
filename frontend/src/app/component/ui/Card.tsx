"use client";

import { forwardRef } from "react";
import type { HTMLAttributes } from "react";

export const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    function Card({ className = "", ...props }, ref) {
        return (
            <div
                ref={ref}
                className={
                    "rounded-2xl border border-slate-200/80 bg-white " +
                    "dark:bg-neutral-900/70 dark:border-neutral-800 " +
                    className
                }
                {...props}
            />
        );
    }
);
