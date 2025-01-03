import fs from 'fs';
import { compileMDX } from 'next-mdx-remote/rsc';
import path from 'path';
import rehypePrismPlus from 'rehype-prism-plus';
import { Frontmatter } from "./types";

const blogParentDir = process.env.BLOG_DIR || "blogs";

const separator = path.sep;

const mdxBaseDir = path.join(process.cwd(), blogParentDir);

/**
 * 根据slug读取并解析md、mdx
 * 1. Slug切分为文件路径：如文件位置为：content/fold1/fold2/hello.mdx，则slug为：blogs/fold1_fold2_hello.mdx
 * 解析时将"_"替换为"/"，找到对应的文件
 * 2. Slug中的文件名需解码，可能还有URLEncode后的中文
 * 
 * @param slug slug
 * @returns {content, frontmatter}
 */
export const getMdxContentBySlug = (slug: string) => {
    const pathSegment = slug?.split('_');
    const fileName = decodeURIComponent(pathSegment[pathSegment.length - 1]);
    pathSegment[pathSegment.length - 1] = fileName;
    const targetMdx = pathSegment.join('/');
    const targetMdxPath = path.join(mdxBaseDir, `${targetMdx}`);
    if (!fs.existsSync(targetMdxPath)) {
        throw new Error(`File not found: ${targetMdxPath}`);
    }
    const postMdxContent = fs.readFileSync(targetMdxPath, 'utf8');
    return postMdxContent;
}

/**
 * 读取本地md、mdx文件的frontmatter并组装slug
 * 支持多级目录
 * slug拼接方式：按照文件夹的层级结构，如 blogs/fold1_fold2_hello.mdx
 * 
 * @returns {frontmatter, slug}[]
 */
export const getBlogMetadatas = async (baseDir: string = mdxBaseDir) => {
    const result: { slug: string, frontmatter: Frontmatter }[] = [];
    const readDirRecursively = async (currentDir) => {
        const files = await fs.promises.readdir(currentDir);
        for (const file of files) {
            const filePath = path.join(currentDir, file);
            const stats = await fs.promises.stat(filePath);
            if (stats.isDirectory()) {
                await readDirRecursively(filePath);
            } else if (stats.isFile() && (path.extname(file) === '.md' || path.extname(file) === '.mdx')) {
                try {
                    const fileContent = await fs.promises.readFile(filePath, 'utf8');
                    const { frontmatter } = await parseMdx(fileContent);
                    if (!frontmatter || !frontmatter.title || !frontmatter.category) {
                        continue
                    }
                    const relativePath = path.relative(baseDir, filePath);
                    const slug = relativePath.replaceAll(separator, '_');
                    result.push({
                        slug: slug,
                        frontmatter: frontmatter,
                    });
                } catch (error) {
                    console.error(`Error parsing file: ${filePath}`, error);
                }
            }
        }
    };
    await readDirRecursively(baseDir);
    // 降序
    result.sort((a, b) => {
        const dateA = new Date(a.frontmatter.publishedAt || 0).getTime();
        const dateB = new Date(b.frontmatter.publishedAt || 0).getTime();
        return dateB - dateA;
    });
    return result;
}

/**
 * 解析markdown内容
 * @param content 文件内容
 * @returns {content, frontmatter}
 */
export const parseMdx = async (content: string): Promise<{ content: unknown, frontmatter: Frontmatter }> => {

    return compileMDX<Frontmatter>({
        source: content || "",
        options: {
            parseFrontmatter: true,
            mdxOptions: {
                rehypePlugins: [[rehypePrismPlus, { ignoreMissing: true, showLineNumbers: true, classNamePrefix: 'mdx-' }]],
            }
        },
    });
}