import { PostList } from "@/components/posts/PostList";
import { getPostMetadatas } from "@/lib/md";
import { press_start_2p } from "@/lib/fonts";
import Image from "next/image";
import Pokemon from '@/public/widgets/pokeball.png';

export default async function Page() {

    const postMetadatas = await getPostMetadatas();

    return (
        <div className="w-auto flex flex-col px-4">
            <div className="flex items-center justify-start mb-4">
                <Image src={Pokemon} width={40} height={40} alt="Pokemon" />
                <h1 className={`${press_start_2p.className} text-2xl font-bold`}>
                    Dev Posts
                </h1>
            </div>

            <PostList initialPostMetadatas={postMetadatas} />
        </div>
    );
}
