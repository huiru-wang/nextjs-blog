import { getMdxContentBySlug } from "@/lib/md";
import { compileMDX } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import rehypePrismPlus from 'rehype-prism-plus';
import rehypeKatex from 'rehype-katex';
import rehypeToc from 'rehype-toc';
import remarkMath from 'remark-math';
import BlogTableOfContent from "@/components/blogs/BlogTableOfContent";
import BlogContainer from "@/components/blogs/BlogContainer";
import remarkGfm from 'remark-gfm';
import BackTop from "@/components/BackTop";
import { press_start_2p } from "@/lib/fonts";
import Link from "next/link";
import components from "@/components/markdown/MdxComponent";

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
            return notFound();
        }

        return (
            <>
                <Link href={"/blogs"} className={`${press_start_2p.className} hidden sm:block`}>Back</Link>
                <BlogContainer content={content} frontmatter={frontmatter} />
                <BlogTableOfContent toc={toc} />
                <BackTop />
            </>
        );
    } catch (error) {
        console.error(error);
        return notFound();
    }
}

async function compile(content) {
    let toc = "";
    const result = await compileMDX({
        source: content || "",
        options: {
            parseFrontmatter: true,
            mdxOptions: {
                remarkPlugins: [remarkGfm, remarkMath],
                rehypePlugins: [
                    [rehypePrismPlus, { ignoreMissing: true, showLineNumbers: true }],
                    [rehypeToc, {
                        headings: ['h1', 'h2'],
                        customizeTOC: (tocHtml) => {
                            toc = tocHtml;
                            return false;
                        }
                    }],
                    rehypeKatex
                ],
            }
        },
        components: components
    });
    return { ...result, toc }
}

