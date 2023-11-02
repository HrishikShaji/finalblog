import { ExtendedPost } from "@/types/types";
import Link from "next/link";
import { LikeClient } from "./LikeClient";
import { PostImage } from "./PostImage";
import { User } from "./User";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";

interface CardProps {
  item: ExtendedPost;
}

export const Card: React.FC<CardProps> = ({ item }) => {
  return (
    <div className="flex relative h-full w-full bg-gray-500 group justify-center items-center overflow-hidden">
      <div className="w-full h-full hidden group-hover:block bg-black/50 absolute z-20"></div>
      {item.user.image && (
        <div className=" absolute z-10 hidden md:block  top-2 left-2 ">
          <User
            image={item.user.image}
            email={item.userEmail}
            date={item.createdAt}
            size="small"
          />
        </div>
      )}
      <h1 className="text-xl font-bold absolute z-10">{item.title}</h1>
      <PostImage content={item.content} size="large" />
      <Link
        href={`/posts/${item.slug}`}
        className="absolute hidden group-hover:block z-30 "
      >
        <BsFillArrowUpRightCircleFill size={30} className="" />
      </Link>
      <LikeClient item={item} />
    </div>
  );
};
