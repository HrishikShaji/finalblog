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
  const data = await fetchPosts(`${baseUrl}api/posts?page=1`);

  if (!data.posts) {
    return <div>nothing</div>;
  }
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      iuhuhuhu sample
      <h1>{data.posts[0].title}</h1>
    </div>
  );
};