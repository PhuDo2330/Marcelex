"use client";
import { MoreHorizontal } from "lucide-react";

export type Story = {
    id: string;
    title: string;
    points: number;
    priority: "Critical" | "High" | "Medium" | "Low";
    assignee?: string;
    labels: string[];
    epic: string;
};

export default function StoryCard({ story }: { story: Story }) {
    const prio = {
        Critical: "border-l-error",
        High: "border-l-warning",
        Medium: "border-l-info",
        Low: "border-l-gray-300",
    }[story.priority];

    return (
        <div
            className={`bg-white border border-gray-200 rounded-lg p-4 hover:shadow-card-lg transition-all duration-200 cursor-pointer group ${prio} border-l-4`}
        >
            <div className="flex items-start justify-between mb-3">
                <span className="text-xs font-medium text-gray-500">{story.id}</span>
                <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-primary-100 rounded flex items-center justify-center">
                        <span className="text-xs font-bold text-primary-700">{story.points}</span>
                    </div>
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1" title="More">
                        <MoreHorizontal className="w-4 h-4 text-gray-400" />
                    </button>
                </div>
            </div>

            <h3 className="text-sm font-medium text-gray-900 mb-3 line-clamp-2">{story.title}</h3>

            {story.labels?.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                    {story.labels.slice(0, 2).map((label) => (
                        <span key={label} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">{label}</span>
                    ))}
                    {story.labels.length > 2 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            +{story.labels.length - 2}
                        </span>
                    )}
                </div>
            )}

            <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">{story.epic}</span>
                {story.assignee && (
                    <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-white">{story.assignee.charAt(0)}</span>
                    </div>
                )}
            </div>
        </div>
    );
}
