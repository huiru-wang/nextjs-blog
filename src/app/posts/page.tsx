import { PostList } from "@/components/PostList";
import { getPostMetadatas } from "@/lib/md";

export default async function Page() {
    const postMetadatas = await getPostMetadatas();

    return (
        <PostList initialPostMetadatas={postMetadatas} />
    );
}
