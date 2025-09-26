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
      return new Response("Unauthorized", { status: 403 });
    }

    const posts = await prisma.writeups.findMany({
      where: { published: true },
      select: {
        id: true,
        title: true,
        published: true,
        created_date: true,
      },
    });

    return NextResponse.json(posts);
  } catch (error) {
    return new Response(null, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  // only admin can post
  if (session?.user.role !== "ADMIN") {
    return Response.json({ error: "Unauthorized" }, { status: 403 });
  }

  // const { user } = session
  // const subscriptionPlan = await getUserSubscriptionPlan(user.id)

  // If user is on a free plan.
  // Check if user has reached limit of 3 posts.
  // if (!subscriptionPlan?.isPro) {
  //   const count = await prisma.post.count({
  //     where: {
  //       authorId: user.id,
  //     },
  //   })

  //   if (count >= 3) {
  //     throw new RequiresProPlanError()
  //   }
  // }

  const json = await req.json();
  const body = postCreateSchema.safeParse(json);
  // validate body data
  if (!body.success) return NextResponse.json({ error: body.error.errors }, { status: 400 });

  const post = await prisma.writeups.create({
    data: {
      title: json.title,
      content: json.title,
      authorId: session.user.id,
    },
    select: {
      id: true,
    },
  });
  console.log(post);

  return NextResponse.json(post);
}
