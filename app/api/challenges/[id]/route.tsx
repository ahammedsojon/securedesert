import { getServerSession } from "next-auth";
import * as z from "zod";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { authOptions } from "@/lib/authOptions";

interface Props {
  params: { id: string };
}

// GET challenge by ID (only published)
export async function GET(req: NextRequest, { params: { id } }: Props) {
  try {
    const challenge = await prisma.challenges.findFirst({
      where: { id, published: true },
      select: {
        id: true,
        category: true,
        title: true,
        thumbnail: true,
        difficulty: true,
        points: true,
      },
    });

    if (!challenge) {
      return NextResponse.json({ error: "Challenge not found" }, { status: 404 });
    }

    return NextResponse.json({ data: challenge }, { status: 200 });
  } catch (error) {
    console.error("[GET_CHALLENGE]:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// PATCH challenge (admin only)
export async function PATCH(req: NextRequest, { params: { id } }: Props) {
  try {
    const session = await getServerSession(authOptions);

    if (session?.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const values = await req.json();

    const updatedChallenge = await prisma.challenges.update({
      where: { id },
      data: { ...values },
      select: { id: true },
    });

    return NextResponse.json(updatedChallenge, { status: 200 });
  } catch (error) {
    console.error("[PATCH_CHALLENGE]:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// POST challenge flag (user only)
const flagSchema = z.object({
  flag: z.string().min(1),
});

export async function POST(req: NextRequest, { params: { id } }: Props) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const body = await req.json();
    const validation = flagSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ error: "Flag not provided" }, { status: 400 });
    }

    const challenge = await prisma.challenges.findFirst({
      where: { id, published: true },
    });

    if (!challenge) {
      return NextResponse.json({ error: "Challenge not found" }, { status: 404 });
    }

    const alreadySolved = await prisma.challenge_solved.findFirst({
      where: { userId: session.user.id, challengeId: challenge.id },
    });

    if (alreadySolved) {
      return NextResponse.json({ error: "Challenge already solved" }, { status: 400 });
    }

    if (challenge.flag !== body.flag) {
      return NextResponse.json({ error: "Incorrect flag" }, { status: 400 });
    }

    // First blood
    if (!challenge.first_blood) {
      await prisma.challenges.update({
        where: { id },
        data: { first_blood: session.user.id },
      });
      await prisma.user.update({
        where: { id: session.user.id },
        data: {
          points: { increment: challenge.points },
          first_bloods: { increment: 1 }, // ✅ matches your schema
        },
      });

      await prisma.challenge_solved.create({
        data: { challengeId: challenge.id, userId: session.user.id },
      });
      return NextResponse.json({ success: "First Blood" }, { status: 200 });
    }

    // Not first blood but correct flag
    await prisma.user.update({
      where: { id: session.user.id },
      data: { points: { increment: challenge.points } },
    });
    await prisma.challenge_solved.create({
      data: { challengeId: challenge.id, userId: session.user.id },
    });

    return NextResponse.json({ success: "Correct flag" }, { status: 200 });
  } catch (error) {
    console.error("[POST_CHALLENGE_FLAG]:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
