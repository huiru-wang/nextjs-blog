import { getMdxContentBySlug } from "@/lib/md";
import { Frontmatter } from "@/lib/types";
import { compileMDX } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import rehypePrismPlus from 'rehype-prism-plus';
import rehypeToc from 'rehype-toc';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

export async function generateMetadata({ params }) {

    const { slug } = await params;

    const source = await getMdxContentBySlug(slug);

    const { frontmatter } = await compile(source);

    return {
        title: frontmatter?.title,
        keywords: frontmatter?.keywords,
        publishedAt: frontmatter?.publishedAt,
        description: frontmatter?.description,
    };
}

export default async function Page({ params }) {
    const { slug } = await params;

    const source = await getMdxContentBySlug(slug);

    const { content, frontmatter, toc } = await compile(source);

    if (!content) {
        // 路由到/src/posts/[slug]/not-found.tsx
        return notFound();
    }

    return (
        <div className="bg-background text-foreground mx-8">
            <section>
                <h1 className="text-3xl font-bold mt-8">{frontmatter?.title}</h1>
                <article>
                    <header className="mt-4">
                        <time className="block text-sm text-muted">{frontmatter?.publishedAt}</time>
                        <p className="mt-2 text-lg">{frontmatter?.description}</p>
                    </header>
                    <main className="mt-8 prose max-w-3xl prose-invert prose-code:text-foreground prose-blockquote:text-foreground prose-p:text-foreground prose-h1:text-foreground prose-h2:text-foreground prose-h3:text-foreground prose-h4:text-foreground prose-ul:text-foreground prose-ol:text-foreground prose-li:text-foreground prose-strong:text-foreground prose-strong:font-bold prose-a:text-blue-400 prose-a:opacity-80 prose-img:opacity-90 prose-p:tracking-tight prose-li:text-sm">
                        {content}
                    </main>
                </article>
            </section>
            <div className="hidden 2xl:block fixed right-24 top-36 w-64 p-4 border border-gray-200 rounded shadow-[4px_4px_0_0_var(--border)]">
                <nav>
                    <h2 className="text-lg font-bold">Table of Contents</h2>
                    <div dangerouslySetInnerHTML={{ __html: toc }} />
                </nav>
            </div>
        </div>
    );
}

// TODO 解析toc，在服务端组件中compile，在客户端组件中进行Dom解析生成TOC
async function compile(content) {
    let toc = "";
    const result = await compileMDX<Frontmatter>({
        source: content || "",
        options: {
            parseFrontmatter: true,
            mdxOptions: {
                rehypePlugins: [
                    [rehypePrismPlus, { ignoreMissing: true, showLineNumbers: true }],
                    rehypeAutolinkHeadings,
                    [rehypeToc, {
                        headings: ['h1', 'h2', 'h3'],
                        customizeTOC: (tocHtml) => {
                            toc = tocHtml;
                            return tocHtml;
                        }
                    }],
                ],
            }
        },
        components: {
            pre: (props) => <pre className="overflow-hidden" {...props} />,
            code: (props) => <code className="bg-gray-200 rounded px-1" {...props} />
        }
    });
    return { ...result, toc };
}
