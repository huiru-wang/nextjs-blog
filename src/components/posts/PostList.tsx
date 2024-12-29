'use client'
import PixelatedCard from "@/components/posts/PixelatedCard";
import TagPanel from "@/components/posts/TagPanel";
import { useMemo, useState } from "react";
import BlurFade from "../ui/blur-fade";
export function PostList({ initialPostMetadatas }) {

    const [postMetadatas, setPostMetadatas] = useState(initialPostMetadatas || []);

    // 每次filter从全量数据中筛选
    const postMetadataFilter = (category: string, tag: string) => {
        if (!category) {
            setPostMetadatas(initialPostMetadatas);
            return;
        }
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
        <div className="flex flex-col w-full">

            <TagPanel frontmatters={frontmatters} onFilter={postMetadataFilter} />

            {/* w-full保持grid容器充满当前父容器宽度，子元素w-full可以保持1:1比例，充满grid容器 */}
            <div className="self-center w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
                {
                    postMetadatas.map(({ slug, frontmatter }, index) => (
                        <BlurFade
                            delay={(index + 1) * 0.1}
                            inView key={slug}
                            className="w-full">
                            <PixelatedCard slug={slug} frontmatter={frontmatter} />
                        </BlurFade>
                    ))
                }
            </div>

        </div>
    )
}