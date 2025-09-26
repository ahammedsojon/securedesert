import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import * as z from "zod";
import prisma from "@/prisma/client";
import { authOptions } from "@/lib/authOptions";

const postCreateSchema = z.object({
  title: z.string(),
  content: z.string().optional(),
});

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 403 });
    }

    const posts = await prisma.blogs.findMany({
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
    return new Response(null, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (session?.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const json = await req.json();
  const parsed = postCreateSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.errors }, { status: 400 });
  }

  // Use parsed.data to ensure correct typing
  const post = await prisma.blogs.create({
    data: {
      title: parsed.data.title,
      content: parsed.data.content ?? "", // make sure content is a string
      authorId: session.user.id,
    },
    select: {
      id: true,
    },
  });

  return NextResponse.json(post);
}
