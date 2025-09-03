"use client";

import { notFound, useParams } from "next/navigation";
import { FEATURES, SECTION_TITLES, type SectionKey } from "@/features/projects/registry";
import { ProjectSectionGrid } from "@/app/component/projects/ProjectSectionGrid";


export default function ProjectSectionPage() {
    const params = useParams<{ section: SectionKey }>();
    const key = params.section;

    if (!key || !(key in SECTION_TITLES)) {
        return notFound();
    }

    const title = SECTION_TITLES[key];
    const items = FEATURES[key];

    return (
        <main className="p-6 md:p-8">
            <header className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold">{title}</h1>
                    <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1">
                        Select a capability to open its dedicated view.
                    </p>
                </div>
            </header>

            <ProjectSectionGrid items={items} />
        </main>
    );
}
