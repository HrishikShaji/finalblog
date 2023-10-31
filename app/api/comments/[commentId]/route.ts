import prisma from "@/app/lib/connect";

export const GET = async (
  req: Request,
  params: { params: { commentId: string } },
) => {
  const { searchParams } = new URL(req.url);
  const postSlug = searchParams?.get("postSlug");

  if (!postSlug) {
    return new Response(JSON.stringify({ message: "Post id missing" }));
  }
  if (!params.params.commentId) {
    return new Response(JSON.stringify({ message: "Comment id missing" }));
  }
  try {
    const comments = await prisma.comment.findMany({
      where: {
        postSlug: postSlug,
        parentId: params.params.commentId,
      },
      include: {
        user: true,
      },
    });

    return new Response(JSON.stringify(comments));
  } catch (err) {
    return new Response(JSON.stringify({ message: "Something went wrong" }));
  }
};
