import { getMdxContentBySlug } from "@/lib/md";
import { compileMDX } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import rehypePrismPlus from 'rehype-prism-plus';
import rehypeToc from 'rehype-toc';
import PostTableOfContent from "@/components/posts/PostTableOfContent";
import PostContent from "@/components/posts/PostContent";
import remarkGfm from 'remark-gfm';
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
    try {
        const { slug } = await params;

        const source = await getMdxContentBySlug(slug);

        const { content, frontmatter, toc } = await compile(source);

        if (!content) {
            // 路由到/src/posts/[slug]/not-found.tsx
            return notFound();
        }

        return (
            <div>
                <PostContent content={content} frontmatter={frontmatter} />
                <PostTableOfContent toc={toc} />
            </div>
        );
    } catch (error) {
        console.error(error);
        return notFound();
    }
}

// TODO 解析toc，在服务端组件中compile，在客户端组件中进行Dom解析生成TOC
async function compile(content) {
    let toc = "";
    const result = await compileMDX({
        source: content || "",
        options: {
            parseFrontmatter: true,
            mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [
                    [rehypePrismPlus, { ignoreMissing: true, showLineNumbers: true }],
                    [rehypeToc, {
                        headings: ['h1', 'h2'],
                        customizeTOC: (tocHtml) => {
                            toc = tocHtml;
                            return false;
                        }
                    }],
                ],
            }
        },
        components: {
            // 需要目录跳转的标签，加上id，当前只需要2级
            h1: (props) => <h1 id={`${props.children}`}>{props.children}</h1>,
            h2: (props) => <h2 id={`${props.children}`}>{props.children}</h2>,
            pre: (props) => <pre className="overflow-hidden" {...props} />,
            code: (props) => <code className="background foreground rounded px-1" {...props} />
        }
    });
    return { ...result, toc }
}