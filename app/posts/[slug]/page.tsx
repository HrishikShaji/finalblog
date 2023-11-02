import { Comments } from "@/app/components/Comments";
import { EditorOutput } from "@/app/components/EditorOutput";
import { User } from "@/app/components/User";
import { baseUrl } from "@/app/lib/connect";
import { fetchPosts } from "@/app/lib/post";
import { ExtendedPost } from "@/types/types";

const Page = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;

  const data: ExtendedPost = await fetchPosts(`${baseUrl}api/posts/${slug}`);
  return (
    <div className="pt-10 p-10 sm:p-0 sm:pt-10  flex flex-col gap-10">
      {data.user.image && (
        <User
          size="medium"
          image={data.user.image}
          email={data.userEmail}
          date={data.createdAt}
        />
      )}

      <div className="flex flex-col gap-5">
        <h1 className="text-3xl font-semibold">{data.title}</h1>
      </div>
      <EditorOutput content={data.content} />
      <Comments postSlug={slug} />
    </div>
  );
};

export default Page;
