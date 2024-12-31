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
import PopupImage from "@/components/blogs/PopupImg";
import BackTop from "@/components/BackTop";
import { press_start_2p } from "@/lib/fonts";
import Link from "next/link";
import CollapsibleCode from "@/components/blogs/CollapsibleCode";

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
                <BackTop imgList={["1", "2", "3", "4", "5", "6"]} />
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
        components: {
            // 需要目录跳转的标签，加上id，当前只需要2级
            h1: (props) => <h1 className="my-4" id={`${props.children}`}>{props.children}</h1>,
            h2: (props) => <h2 className="my-4" id={`${props.children}`}>{props.children}</h2>,
            h3: (props) => <h3 className="my-4">{props.children}</h3>,
            h4: (props) => <h4 className="my-4">{props.children}</h4>,
            ol: (props) => <ol className="m-2 my-0">{props.children}</ol>,
            li: (props) => <li className="m-0">{props.children}</li>,
            img: (props) => <PopupImage {...props} />,
            pre: (props) => <CollapsibleCode>{props.children}</CollapsibleCode>,
        }
    });
    return { ...result, toc }
}

