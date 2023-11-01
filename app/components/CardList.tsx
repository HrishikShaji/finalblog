import { fetchPosts } from "../lib/post";
import { ExtendedPost } from "@/types/types";
import { baseUrl } from "../lib/connect";
import { Card } from "./Card";
import { Pagination } from "./Pagination";

interface CardListProps {
  page: number;
  cat?: string;
  title: string;
}

export const CardList: React.FC<CardListProps> = async ({
  page,
  cat,
  title,
}) => {
  const { posts, count } = await fetchPosts(
    `${baseUrl}/api/posts?page=${page}&cat=${cat || ""}`,
  );
  const POST_PER_PAGE = 2;

  const hasPrev = POST_PER_PAGE * (page - 1) > 0;
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count;

  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-3xl font-semibold w-full">{title}</h1>

      <div className="flex  gap-3">
        <div className="w-full flex flex-col gap-3">
          {posts?.map((item: ExtendedPost) => {
            return (
              <div key={item.id} className="h-[300px]">
                <Card item={item} />;
              </div>
            );
          })}
        </div>
      </div>
      <Pagination cat={cat} page={page} hasNext={hasNext} hasPrev={hasPrev} />
    </div>
  );
};
