import { getServerSession } from "next-auth/next";
import * as z from "zod";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/authOptions";

const postCreateSchema = z.object({
  title: z.string(),
  content: z.string().optional(),
});

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const posts = await prisma.news.findMany({
      where: { published: true },
      select: {
        id: true,
        title: true,
        published: true,
        createdAt: true,
      },
    });

    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  // only admin can post
  if (session?.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const json = await req.json();
  const parsed = postCreateSchema.safeParse(json);

  // validate body data
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.errors }, { status: 400 });
  }

  const post = await prisma.news.create({
    data: {
      title: parsed.data.title,
      content: parsed.data.content || "",
      authorId: session.user.id,
    },
    select: { id: true },
  });

  console.log("Created post:", post);

  return NextResponse.json(post, { status: 201 });
}
