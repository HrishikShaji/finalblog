import { fetchPosts } from "../lib/post";
import { ExtendedPost } from "@/types/types";
import { baseUrl } from "../lib/connect";
import Link from "next/link";
import { Card } from "./Card";
import { BsFillArrowRightCircleFill } from "react-icons/bs";

interface SectionProps {
  section: string;
  title: string;
}

export const Section: React.FC<SectionProps> = async ({ section, title }) => {
  const { posts } = await fetchPosts(
    `${baseUrl}api/posts?page=1&cat=${section}`,
  );
  if (!posts) return <div>Loading...</div>;
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-3xl font-semibold">{title}</h1>
      <div className="flex flex-col sm:flex-row gap-5 items-center justify-between">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
          {posts.map((item: ExtendedPost) => {
            return (
              <div
                key={item.id}
                className="flex gap-1 relative bg-gray-300 h-[150px] justify-center items-center "
              >
                <Card item={item} />
              </div>
            );
          })}
        </div>
        <Link className="" href={`/blog?cat=${section}`}>
          <BsFillArrowRightCircleFill size={30} />
        </Link>
      </div>
    </div>
  );
};
