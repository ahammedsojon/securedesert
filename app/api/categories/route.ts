import prisma from "@/prisma/client";
import { z } from "zod";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

const Schema = z.object({
  newCategory: z.string().min(1),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    // only admin can post
    if (session?.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const body = await req.json();
    const validation = Schema.safeParse(body);
    if (!validation.success) return new NextResponse("invalid attachment", { status: 400 });

    const category = await prisma.category.create({
      data: {
        name: body.newCategory,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORIES]: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
