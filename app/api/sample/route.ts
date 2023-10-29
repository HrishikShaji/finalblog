import { NextResponse } from "next/server";
import prisma from "@/app/lib/connect";

export const GET = async (req: Request) => {
  try {
    const data = "hello";
    return new NextResponse(JSON.stringify(data));
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }),
    );
  }
};
