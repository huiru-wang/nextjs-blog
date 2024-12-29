'use client';

import ScrollProgress from "../ui/scroll-progress";

export default function PostContainer({ content, frontmatter }) {
    return (
        <section className="flex flex-col items-center">
            <h1 className="text-3xl font-bold text-center">{frontmatter?.title}</h1>
            <article className="max-w-sm sm:max-w-2xl lg:max-w-3xl xl:max-w-4xl flex flex-col items-center justify-start m-4 gap-8">
                <div className="border-dashed border-2 border-gray-400 p-2">
                    {frontmatter?.description}
                </div>
                <main className="prose max-w-xs sm:max-w-2xl lg:max-w-3xl xl:max-w-4xl prose-invert prose-code:text-foreground prose-blockquote:text-foreground prose-p:text-foreground prose-h1:text-foreground prose-h2:text-foreground prose-h3:text-foreground prose-h4:text-foreground prose-ul:text-foreground prose-ol:text-foreground prose-li:text-foreground prose-strong:text-foreground prose-strong:font-bold prose-a:text-blue-400 prose-a:opacity-80 prose-img:opacity-90 prose-p:tracking-tight prose-th:text-foreground prose-img:mx-auto prose-img:block">
                    <ScrollProgress className="top-0" />
                    {content}
                </main>
            </article>
        </section>
    )
}