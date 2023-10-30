import { fetchPosts } from "../lib/post";
import { ExtendedPost } from "@/types/types";
import { baseUrl } from "../lib/connect";
import Image from "next/image";
import Link from "next/link";

export const PopularPosts = async () => {
  const { posts } = await fetchPosts(`${baseUrl}api/posts?page=1&popular=true`);
  if (!posts) return <div>Loading...</div>;
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-3xl font-semibold">Popular Posts</h1>
      <div className="flex gap-5 items-center justify-between">
        {posts.map((item: ExtendedPost) => {
          const content = item.content as any;
          const images = content.blocks.filter(
            (block: any) => block.type == "image",
          );
          const image = images.length > 0 ? images[0].data.file.url : null;
          return (
            <div
              key={item.id}
              className="flex gap-4 relative bg-gray-300 h-[150px] justify-center items-center w-[250px]"
            >
              <h1 className="absolute z-10 font-semibold text-2xl">
                {item.title}
              </h1>
              {image && (
                <Image
                  fill
                  alt="image"
                  className="w-full h-full object-cover"
                  src={image}
                />
              )}
              <Link href={`/posts/${item.slug}`}>See more</Link>
            </div>
          );
        })}
        <button className="px-3 py-2 border-2 border-white">
          <Link href="/blog?sec=popular">See more</Link>
        </button>
      </div>
    </div>
  );
};
