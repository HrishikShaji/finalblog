import prisma from "@/app/lib/connect";

export const GET = async () => {
  try {
    const categories = await prisma.category.findMany();
    return new Response(JSON.stringify(categories));
  } catch (err) {
    return new Response(JSON.stringify({ message: "Something went wrong" }));
  }
};
