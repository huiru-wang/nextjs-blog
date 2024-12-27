import { Frontmatter } from "@/lib/types";

interface TagPanelProps {
    frontmatters: Frontmatter[];
    onFilter: (category: string, tag: string) => void;
}

export default function TagPanel({ frontmatters, onFilter }: TagPanelProps) {

    const groupedByCategory = frontmatters.reduce((acc, frontmatter) => {
        const { category, tags } = frontmatter;
        if (category) {
            if (!acc[category]) {
                acc[category] = new Set<string>();
            }
            if (tags) {
                tags.forEach(tag => acc[category].add(tag));
            }
        }
        return acc;
    }, {} as Record<string, Set<string>>);

    return (
        <div className="mb-8">
            {Object.entries(groupedByCategory).map(([category, tags]) => (
                <div className="flex gap-4 m-2" key={category}>
                    <div
                        className="border w-32 h-6 text-center cursor-pointer flex-shrink-0"
                        onClick={() => onFilter(category, "")}
                    >
                        {category}
                    </div>

                    <div className="flex flex-wrap gap-4 underline">
                        {
                            [...tags].map((tag) => (
                                <div
                                    key={tag}
                                    className="cursor-pointer"
                                    onClick={() => onFilter(category, tag)}
                                >
                                    #{tag}
                                </div>
                            ))
                        }
                    </div>
                </div>
            ))}
        </div>
    );

}