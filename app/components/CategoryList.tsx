import { fetchPosts } from "../lib/post";
import { baseUrl } from "../lib/connect";
import { Category } from "@prisma/client";
import Link from "next/link";

export const CategoryList = async () => {
  const data = await fetchPosts(`${baseUrl}api/categories`);
  if (!data) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex flex-col gap-5 py-10">
      <h1 className="text-3xl font-semibold">Popular categories</h1>
      <div className="w-full flex">
        <div className="grid grid-cols-3 gap-4 w-full">
          {data?.map((item: Category) => (
            <Link
              key={item.id}
              className="border-2 border-white p-2"
              href={`/blog?cat=${item.slug}`}
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
