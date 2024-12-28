import { PostList } from "@/components/posts/PostList";
import { getPostMetadatas } from "@/lib/md";
import { Press_Start_2P } from "next/font/google";

const press_start_2p = Press_Start_2P({ subsets: ["latin"], weight: '400' });

export default async function Page() {

    const postMetadatas = await getPostMetadatas();

    return (
        <>
            <h1 className={`${press_start_2p.className} text-3xl font-bold my-8`}>
                Dev Posts
            </h1>
            <PostList initialPostMetadatas={postMetadatas} />
        </>
    );
}
