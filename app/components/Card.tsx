import { ExtendedPost } from "@/types/types";
import Link from "next/link";
import { LikeClient } from "./LikeClient";
import { PostImage } from "./PostImage";
import { User } from "./User";

interface CardProps {
  item: ExtendedPost;
}

export const Card: React.FC<CardProps> = ({ item }) => {
  return (
    <div className="flex relative h-full w-full bg-gray-500 justify-center items-center overflow-hidden">
      {item.user.image && (
        <User
          image={item.user.image}
          email={item.userEmail}
          date={item.createdAt}
        />
      )}
      <h1 className="text-xl font-bold absolute z-10">{item.title}</h1>
      <PostImage content={item.content} size="large" />
      <Link href={`/posts/${item.slug}`} className="absolute bottom-2 right-2">
        See more
      </Link>
      <LikeClient item={item} />
    </div>
  );
};
