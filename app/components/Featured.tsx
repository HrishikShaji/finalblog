import { baseUrl } from "../lib/connect";
import { fetchPosts } from "../lib/post";
import { Card } from "./Card";

export const Featured = async () => {
  const data = await fetchPosts(`${baseUrl}api/posts`);
  if (!data.posts[0]) return <div>NO POSTS YET...</div>;
  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-4xl">Discover my Stories and creative ideas</h1>
      <div className="h-[50vh]">
        <Card item={data.posts[0]} />
      </div>
    </div>
  );
};
