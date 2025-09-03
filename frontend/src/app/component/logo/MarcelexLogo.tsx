// src/app/component/logo/MarcelexLogo.tsx
"use client";

import React from "react";

type Palette = "nebula" | "aurora" | "ice" | "cyber";

export function MarcelexLogo({
    size = 30,
    showWord = true,
    word = "Marcelex",
    wordScale = 0.86,
    wordColor = "currentColor",
    palette: p = "nebula",   // ← new palette prop; default “nebula”
    shineWord = true,
}: {
    size?: number;
    showWord?: boolean;
    word?: string;
    wordScale?: number;
    wordColor?: string;
    palette?: Palette;
    shineWord?: boolean;
}) {
    const pid =
        p === "nebula" ? "gNebula" :
            p === "aurora" ? "gAurora" :
                p === "ice" ? "gIce" : "gCyber";

    return (
        <div className="flex items-center gap-2 select-none">
            {/* Mark: rounded hex ring + rounded M inside */}
            <svg
                width={size}
                height={size}
                viewBox="0 0 256 256"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Marcelex Mark"
                className="drop-shadow-sm"
            >
                <defs>
                    {/* Nebula: teal → cyan → magenta */}
                    <linearGradient id="gNebula" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#16C3A8" />
                        <stop offset="50%" stopColor="#20D3F0" />
                        <stop offset="100%" stopColor="#C084FC" />
                    </linearGradient>

                    {/* Aurora: aqua → indigo → sky */}
                    <linearGradient id="gAurora" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#33E1FF" />
                        <stop offset="50%" stopColor="#7C8AFF" />
                        <stop offset="100%" stopColor="#A5F3FC" />
                    </linearGradient>

                    {/* Ice: blue → ice → white */}
                    <linearGradient id="gIce" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#60A5FA" />
                        <stop offset="55%" stopColor="#E0F2FE" />
                        <stop offset="100%" stopColor="#FFFFFF" />
                    </linearGradient>

                    {/* Cyber: lime → emerald → cyan */}
                    <linearGradient id="gCyber" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#A3E635" />
                        <stop offset="50%" stopColor="#10B981" />
                        <stop offset="100%" stopColor="#22D3EE" />
                    </linearGradient>

                    <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="3.2" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Rounded hex outline */}
                <path
                    d="M128 18c13.5 0 26.8 3.3 38.7 9.7l43.1 23.4C221.7 58.3 229 70.8 229 84v88c0 13.2-7.3 25.7-19.2 32.9l-43.1 23.4c-11.9 6.4-25.2 9.7-38.7 9.7s-26.8-3.3-38.7-9.7l-43.1-23.4C34.3 197.7 27 185.2 27 172V84c0-13.2 7.3-25.7 19.2-32.9l43.1-23.4C101.2 21.3 114.5 18 128 18Z"
                    fill="none"
                    stroke={`url(#${pid})`}
                    strokeWidth="12"
                    strokeLinejoin="round"
                    filter="url(#softGlow)"
                />

                {/* Stylized M */}
                <path
                    d="M70 172 L70 90 A10 10 0 0 1 90 90 L128 138 L166 90 A10 10 0 0 1 186 90 L186 172"
                    fill="none"
                    stroke={`url(#${pid})`}
                    strokeWidth="18"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>

            {/* Wordmark */}
            {showWord && (
                <span
                    className={shineWord ? "mxx-shiny-text" : "font-semibold tracking-tight"}
                    style={{
                        fontSize: Math.max(12, Math.round(size * wordScale)),
                        color: shineWord ? undefined : wordColor,
                        lineHeight: 1,
                    }}
                    aria-label={word}
                >
                    {word}
                </span>
            )}
        </div>
    );
}
