"use client";

import { ProjectFeature } from "@/features/projects/registry";
import { ProjectFeatureCard } from "./ProjectFeatureCard";

export function ProjectSectionGrid({ items }: { items: ProjectFeature[] }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {items.map((f) => (
                <ProjectFeatureCard key={f.title} feature={f} />
            ))}
        </div>
    );
}
