import { NextResponse } from "next/server";
import prisma from "@/app/lib/connect";

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);

  const page = Number(searchParams.get("page"));
  const cat = searchParams.get("cat") || null;
  const featured = searchParams.get("editor") || null;
  const popular = searchParams.get("popular") || null;
  const POST_PER_PAGE = 3;

  try {
    const query = {
      take: POST_PER_PAGE,
      skip: POST_PER_PAGE * (page - 1),
      where: {
        ...(cat && { catSlug: cat }),
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
    const [posts, count] = await prisma.$transaction([
      prisma.post.findMany(query as any),
      prisma.post.count({ where: query.where }),
    ]);
    return new NextResponse(JSON.stringify({ posts, count }));
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }),
    );
  }
};
