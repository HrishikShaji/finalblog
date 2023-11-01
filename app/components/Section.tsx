import { fetchPosts } from "../lib/post";
import { ExtendedPost } from "@/types/types";
import { baseUrl } from "../lib/connect";
import Link from "next/link";
import { PostImage } from "./PostImage";

interface SectionProps {
  section: string;
  title: string;
}

export const Section: React.FC<SectionProps> = async ({ section, title }) => {
  const { posts } = await fetchPosts(
    `${baseUrl}api/posts?page=1&${section}=true`,
  );
  if (!posts) return <div>Loading...</div>;
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-3xl font-semibold">{title}</h1>
      <div className="flex gap-5 items-center justify-between">
        {posts.map((item: ExtendedPost) => {
          return (
            <div
              key={item.id}
              className="flex gap-4 relative bg-gray-300 h-[150px] justify-center items-center w-[250px]"
            >
              <h1 className="absolute z-10 font-semibold text-2xl">
                {item.title}
              </h1>
              <PostImage content={item.content} size="large" />
              <Link
                href={`/posts/${item.slug}`}
                className="absolute right-2 bottom-2"
              >
                See more
              </Link>
            </div>
          );
        })}
        <button className="px-3 py-2 border-2 border-white">
          <Link href={`/blog?sec=${section}`}>See more</Link>
        </button>
      </div>
    </div>
  );
};
