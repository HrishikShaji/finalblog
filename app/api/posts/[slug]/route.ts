import prisma from "@/app/lib/connect";

type Params = {
  params: {
    slug: string;
  };
};

export const GET = async (req: Request, { params }: Params) => {
  const { slug } = params;
  try {
    const post = await prisma.post.update({
      where: { slug },
      data: { views: { increment: 1 } },
      include: { user: true },
    });
    return new Response(JSON.stringify(post));
  } catch (err) {
    return new Response(JSON.stringify({ message: "Something went wrong" }));
  }
};
