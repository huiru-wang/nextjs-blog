'use client'
import PixelatedCard from "@/components/posts/PixelatedCard";
import TagPanel from "@/components/posts/TagPanel";
import { useMemo, useState } from "react";
import MotionDivWrapper from "../MotionDivWrapper";

export function PostList({ initialPostMetadatas }) {

    const [postMetadatas, setPostMetadatas] = useState(initialPostMetadatas || []);

    // 每次filter从全量数据中筛选
    const postMetadataFilter = (category: string, tag: string) => {
        const filtedItems = initialPostMetadatas
            .filter(post => post.frontmatter.category === category && (!tag || post.frontmatter.tags?.includes(tag)))
            .sort((a, b) => {
                const dateA = new Date(a.frontmatter.publishedAt || 0).getTime();
                const dateB = new Date(b.frontmatter.publishedAt || 0).getTime();
                return dateB - dateA; // 按照 publishedAt 字段降序排序
            });
        setPostMetadatas(filtedItems);
    };

    // frontmatter为文章元数据，使用初始化的全量数据缓存
    const frontmatters = useMemo(() => initialPostMetadatas.map(post => post.frontmatter), [initialPostMetadatas]);

    return (
        <div>

            <TagPanel frontmatters={frontmatters} onFilter={postMetadataFilter} />

            <MotionDivWrapper
                initial={{ opacity: 0.3 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
                {
                    postMetadatas.map(({ slug, frontmatter }) => (
                        <PixelatedCard key={slug} slug={slug} frontmatter={frontmatter} />
                    ))
                }
            </MotionDivWrapper>
        </div>
    )
}