import { formatTimeToNow } from "../lib/utils";
import { ExtendedPost } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { LikeClient } from "./LikeClient";
import { PostImage } from "./PostImage";

interface CardProps {
  item: ExtendedPost;
}

export const Card: React.FC<CardProps> = ({ item }) => {
  return (
    <div className="flex relative h-[300px] w-full bg-gray-500 justify-center items-center overflow-hidden">
      <div className="flex gap-2 absolute z-10  top-2 left-2">
        {item.user.image && (
          <Image
            className="object-cover  w-12 h-12"
            height={1000}
            width={1000}
            alt=""
            src={item.user.image}
          />
        )}
        <div className="flex flex-col gap-0">
          <h1 className="font-semibold">{item.userEmail}</h1>
          <span className="text-xs">
            {formatTimeToNow(new Date(item.createdAt))}
          </span>
        </div>
      </div>
      <h1 className="text-xl font-bold absolute z-10">{item.title}</h1>
      <PostImage content={item.content} size="large" />
      <Link href={`/posts/${item.slug}`} className="absolute bottom-2 right-2">
        See more
      </Link>
      <LikeClient item={item} />
    </div>
  );
};
