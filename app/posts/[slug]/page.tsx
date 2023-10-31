import { EditorOutput } from "@/app/components/EditorOutput";
import { baseUrl } from "@/app/lib/connect";
import { fetchPosts } from "@/app/lib/post";
import { formatTimeToNow } from "@/app/lib/utils";
import { ExtendedPost } from "@/types/types";
import Image from "next/image";

const Page = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;

  const data: ExtendedPost = await fetchPosts(`${baseUrl}api/posts/${slug}`);
  return (
    <div className="pt-40 p-10 flex flex-col gap-10">
      <div className="flex gap-2 items-center">
        {data.user.image && (
          <Image
            height={1000}
            width={1000}
            className="h-12 w-12 object-cover"
            alt="image"
            src={data.user.image}
          />
        )}
        <div className="flex flex-col ">
          <span className="text-xl font-semibold">{data?.user.email}</span>
          <span className="text-sm text-gray-400">
            {formatTimeToNow(new Date(data.createdAt))}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <h1 className="text-3xl font-semibold">{data.title}</h1>
      </div>
      <EditorOutput content={data.content} />
    </div>
  );
};

export default Page;
