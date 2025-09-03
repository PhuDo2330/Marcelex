"use client";
import Link from "next/link";

export default function NavigationItem({
    href = "#",
    icon,
    label,
    isActive = false,
    hasNotification = false,
    notificationCount = 0,
}: {
    href?: string;
    icon?: React.ReactNode;
    label: string;
    isActive?: boolean;
    hasNotification?: boolean;
    notificationCount?: number;
}) {
    return (
        <Link
            href={href}
            className={`
        flex items-center px-3 py-2 rounded-lg text-sm font-medium
        transition-colors duration-200
        ${isActive
                    ? "bg-primary-100 text-primary-700 border-r-2 border-primary-600"
                    : "text-gray-300 hover:bg-white/5 hover:text-white"}
      `}
        >
            <span className="mr-3">{icon}</span>
            <span className="flex-1 truncate">{label}</span>
            {hasNotification && (
                <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold text-white bg-error rounded-full">
                    {notificationCount}
                </span>
            )}
        </Link>
    );
}
