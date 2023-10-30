import Link from "next/link";
import { baseUrl } from "../lib/connect";

const fetchPosts = async (url: string) => {
  const res = await fetch(url, {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`Failed `);
  }

  return res.json();
};

export const Featured = async () => {
  const data = await fetchPosts(`${baseUrl}api/posts`);
  console.log("in the frontend", data);
  if (!data.posts[0]) return <div>NO POSTS YET...</div>;
  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-4xl">Discover my Stories and creative ideas</h1>
      <div className="flex gap-4 relative h-[50vh] bg-neutral-600 justify-center items-center">
        <h1 className="absolute z-10 text-4xl font-bold ">
          {data.posts[0]?.title}
        </h1>
        <Link href={`posts/${data.posts[0]?.slug}`}>Read more</Link>
      </div>
    </div>
  );
};
