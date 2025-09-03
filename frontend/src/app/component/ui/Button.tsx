"use client";
import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary";
    size?: "sm" | "md" | "lg";
    loading?: boolean;
};

export default function Button({
    variant = "primary",
    size = "md",
    loading = false,
    className = "",
    children,
    ...props
}: Props) {
    const base = `
    inline-flex items-center justify-center rounded-lg font-medium
    transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
  `;
    const variants = {
        primary: "bg-primary-600 text-white hover:bg-primary-700 focus:ring-[var(--primary-500)] shadow-sm hover:shadow",
        secondary: "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-[var(--primary-500)]",
    };
    const sizes = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-sm",
        lg: "px-6 py-3 text-base",
    };

    return (
        <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} disabled={loading} {...props}>
            {loading && (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
            )}
            {children}
        </button>
    );
}
