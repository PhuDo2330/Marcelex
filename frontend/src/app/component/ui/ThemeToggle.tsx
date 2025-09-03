'use client';

import React, { useEffect, useState } from 'react';

type Props = {
    className?: string;
    title?: string;
};

function getInitialTheme(): 'light' | 'dark' {
    if (typeof window === 'undefined') return 'light';
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') return saved;
    const prefersDark =
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
}

export const ThemeToggle: React.FC<Props> = ({
    className = '',
    title = 'Toggle theme',
}) => {
    const [mounted, setMounted] = useState(false);
    const [theme, setTheme] = useState<'light' | 'dark'>(() => getInitialTheme());

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (typeof document === 'undefined') return;
        const root = document.documentElement;
        if (theme === 'dark') root.classList.add('dark');
        else root.classList.remove('dark');
        try {
            localStorage.setItem('theme', theme);
        } catch { }
    }, [theme]);

    const toggle = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'));

    // Avoid hydration mismatch flash
    if (!mounted) {
        return (
            <button
                type="button"
                aria-hidden="true"
                className={`h-9 w-9 rounded-xl border border-orange-100/60 bg-white/70 dark:bg-neutral-900/70 dark:border-neutral-800 opacity-0 pointer-events-none ${className}`}
            />
        );
    }

    const next = theme === 'dark' ? 'light' : 'dark';

    return (
        <button
            type="button"
            onClick={toggle}
            aria-label={`Switch to ${next} mode`}
            title={title}
            className={`inline-flex h-9 w-9 items-center justify-center rounded-xl border border-orange-100/60 bg-white/70 text-neutral-700 hover:bg-white/90 dark:bg-neutral-900/70 dark:text-neutral-200 dark:border-neutral-800 dark:hover:bg-neutral-900 ${className}`}
        >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>
    );
};

/* ====== Icons (inline SVG, no deps) ====== */
function SunIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" {...props}>
            <path d="M12 4.75a.75.75 0 0 0 .75-.75V2a.75.75 0 0 0-1.5 0v2c0 .414.336.75.75.75ZM12 21.25a.75.75 0 0 0 .75-.75v-2a.75.75 0 1 0-1.5 0v2c0 .414.336.75.75.75ZM4.75 12a.75.75 0 0 0-.75-.75H2a.75.75 0 0 0 0 1.5h2c.414 0 .75-.336.75-.75ZM22 11.25h-2a.75.75 0 1 0 0 1.5h2a.75.75 0 0 0 0-1.5ZM5.99 5.99a.75.75 0 0 0 0-1.06l-1.414-1.414a.75.75 0 1 0-1.06 1.06L4.93 5.99a.75.75 0 0 0 1.06 0Zm14.494 14.494a.75.75 0 0 0 0-1.06l-1.414-1.415a.75.75 0 1 0-1.06 1.06l1.414 1.415a.75.75 0 0 0 1.06 0ZM18.01 5.99l1.414-1.414a.75.75 0 1 0-1.06-1.06L16.95 4.93a.75.75 0 1 0 1.06 1.06ZM5.99 18.01 4.576 19.424a.75.75 0 1 0 1.06 1.06L7.05 19.07a.75.75 0 1 0-1.06-1.06ZM12 7a5 5 0 1 0 .001 10.001A5 5 0 0 0 12 7Z" />
        </svg>
    );
}

function MoonIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" {...props}>
            <path d="M21.752 15.002a.75.75 0 0 0-1.026-.801 7.75 7.75 0 0 1-9.927-9.927.75.75 0 0 0-.8-1.026A10.25 10.25 0 1 0 21.752 15.002Z" />
        </svg>
    );
}
