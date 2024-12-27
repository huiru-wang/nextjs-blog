import Link from "next/link";

export default function PixelatedCard({ slug, frontmatter }) {

    const { title, description, publishedAt } = frontmatter;

    return (
        <Link href={`/posts/${slug}`}>
            <div className="pixel-card p-4 cursor-pointer">
                <h2 className="text-xl font-bold truncate">{title}</h2>
                <p className="text-sm truncate">{description}</p>
                <time className="block mt-2 text-xs ">{publishedAt}</time>
            </div>
        </Link>
    )
}