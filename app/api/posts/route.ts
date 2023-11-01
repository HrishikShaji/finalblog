import { getAuthSession } from "@/app/lib/auth";
import prisma from "@/app/lib/connect";

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);

  const page = Number(searchParams.get("page"));
  const cat = searchParams.get("cat") || null;
  const featured = cat === "editor" ? true : null;
  const popular = cat === "popular" ? true : null;
  const POST_PER_PAGE = 3;
  const validPage = Math.max(1, isNaN(page) ? 1 : Math.floor(page));

  try {
    const query = {
      take: POST_PER_PAGE,
      skip: POST_PER_PAGE * (validPage - 1),
      where: {
        ...(cat && cat !== "editor" && cat !== "popular" && { catSlug: cat }),
        ...(featured && { featured: true }),
      },
      orderBy: {
        ...(popular ? { views: "desc" } : { createdAt: "desc" }),
      },
      include: {
        user: true,
        votes: true,
      },
    };
    console.log(query);
    const [posts, count] = await prisma.$transaction([
      prisma.post.findMany(query as any),
      prisma.post.count({ where: query.where }),
    ]);

    return new Response(JSON.stringify({ posts, count }));
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ message: "Something went wrong" }));
  }
};

export const POST = async (req: Request) => {
  const session = await getAuthSession();

  if (!session) {
    return new Response(JSON.stringify({ message: "Not authenticated" }));
  }

  try {
    const body = await req.json();

    const post = await prisma.post.create({
      data: { ...body, userEmail: session?.user?.email },
    });
    return new Response(JSON.stringify(post));
  } catch (err) {
    return new Response(JSON.stringify({ message: "Something went wrong" }));
  }
};
