import fs from 'fs';
import { compileMDX } from 'next-mdx-remote/rsc';
import path from 'path';
import rehypePrismPlus from 'rehype-prism-plus';
import { Frontmatter } from "./types";

const postParentDir = "content";
const mdxBaseDir = path.join(process.cwd(), postParentDir);

/**
 * 根据slug读取并解析md、mdx
 * @param slug slug
 * @returns {content, frontmatter}
 */
export const getMdxContentBySlug = (slug: string) => {
    const mdxBaseDir = path.resolve(process.cwd(), postParentDir);
    const targetMdx = slug?.split('_').join('/');
    const targetMdxPath = path.join(mdxBaseDir, `${targetMdx}.md`);
    const postMdxContent = fs.readFileSync(targetMdxPath, 'utf8');
    return postMdxContent;
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

/**
 * 读取本地md、mdx文件的frontmatter和slug
 * 
 * @returns {frontmatter, slug}[]
 */
export const getPostMetadatas = async () => {
    const result: { slug: string, frontmatter: Frontmatter }[] = [];
    const readDirRecursively = async (currentDir) => {
        const files = fs.readdirSync(currentDir);
        for (const file of files) {
            const filePath = path.join(currentDir, file);
            const stats = fs.statSync(filePath);
            if (stats.isDirectory()) {
                await readDirRecursively(filePath);
            } else if (stats.isFile() && (path.extname(file) === '.md' || path.extname(file) === '.mdx')) {
                const parentDirName = path.basename(currentDir);
                const fileContent = fs.readFileSync(filePath, 'utf8');
                const { frontmatter } = await parseMdx(fileContent);
                const filename = file.replace(/\.md$|\.mdx$/, "");
                let slug;
                if (parentDirName === postParentDir) {
                    slug = filename;
                } else {
                    slug = `${parentDirName}_${filename}`;
                }
                result.push({
                    slug: slug,
                    frontmatter: frontmatter,
                });
            }
        }
    };
    await readDirRecursively(mdxBaseDir);
    return result;
}