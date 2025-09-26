// import { getServerSession } from "next-auth";
import { NextRequest, /* NextRequest, */ NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
// import { authOptions } from "../auth/[...nextauth]/route";

/* interface Props {
  searchParams: { type: string };
} */

export async function GET(/* _: NextRequest, { searchParams: type }: Props */) {
  // const session = await getServerSession(authOptions);

  // check if request comes from admin
  // if(type === "all" && !session?.user.admin)
  //     return NextResponse.json({ error: "you don't have a permistion" }, { status: 400 })

  // get all public challenges
  const challenges = await prisma.challenges.findMany({
    where: { published: true },
    select: {
      id: true,
      category: true,
      title: true,
      thumbnail: true,
      difficulty: true,
      points: true,
    },
  });
  return NextResponse.json({ data: challenges }, { status: 200 });
}

const schema = z.object({
  title: z.string(),
  category: z.string(),
  thumbnail: z.string().optional(),
  difficulty: z.string(),
  points: z.number(),
  published: z.boolean(),
  flag: z.string(),
  writeupsId: z.string().optional(), // use writeupsId, not writeups
});

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (session?.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const body = await req.json();

  const validation = schema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json({ error: validation.error.errors }, { status: 400 });
  }

  const challenge = await prisma.challenges.findUnique({ where: { title: body.title } });
  if (challenge) {
    return NextResponse.json({ error: "Challenge title already exists" }, { status: 400 });
  }

  const newChallenge = await prisma.challenges.create({
    data: {
      title: body.title,
      category: body.category,
      thumbnail: body.thumbnail,
      difficulty: body.difficulty as any,
      points: body.points,
      published: body.published,
      flag: body.flag,
      writeupsId: body.writeupsId ?? null,
    },
  });

  return NextResponse.json({ data: newChallenge }, { status: 201 });
}
