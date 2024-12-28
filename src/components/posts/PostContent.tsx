'use client';

import ScrollProgress from "../ui/scroll-progress";

export default function PostContent({ content, frontmatter }) {

    return (
        <section>
            <h1 className="text-3xl font-bold mt-8">{frontmatter?.title}</h1>
            <article>
                <header className="mt-4">
                    <time className="block text-sm text-muted">{frontmatter?.publishedAt}</time>
                    <p className="mt-2 text-lg">{frontmatter?.description}</p>
                </header>
                <main className="mt-8 prose max-w-3xl prose-invert prose-code:text-foreground prose-blockquote:text-foreground prose-p:text-foreground prose-h1:text-foreground prose-h2:text-foreground prose-h3:text-foreground prose-h4:text-foreground prose-ul:text-foreground prose-ol:text-foreground prose-li:text-foreground prose-strong:text-foreground prose-strong:font-bold prose-a:text-blue-400 prose-a:opacity-80 prose-img:opacity-90 prose-p:tracking-tight prose-th:text-foreground">
                    <ScrollProgress className="top-0" />
                    {content}
                </main>
            </article>
        </section>
    )
}