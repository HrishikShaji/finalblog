import Link from "next/link";
import { baseUrl } from "../lib/connect";
import { PostImage } from "./PostImage";
import { fetchPosts } from "../lib/post";

export const Featured = async () => {
  const data = await fetchPosts(`${baseUrl}api/posts`);
  if (!data.posts[0]) return <div>NO POSTS YET...</div>;
  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-4xl">Discover my Stories and creative ideas</h1>
      <div className="flex gap-4 relative h-[50vh] bg-neutral-600 justify-center items-center">
        <h1 className="absolute z-10 text-4xl font-bold ">
          {data.posts[0]?.title}
        </h1>
        <PostImage content={data.posts[0].content} size="large" />
        <Link
          href={`posts/${data.posts[0]?.slug}`}
          className="absolute right-2 bottom-2"
        >
          Read more
        </Link>
      </div>
    </div>
  );
};
