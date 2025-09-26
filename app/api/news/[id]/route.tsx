import * as z from "zod";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

const routeContextSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

const postPatchSchema = z.object({
  title: z.string().min(3).max(128).optional(),
  content: z.any().optional(),
});

// GET a news post by ID
export async function GET(req: NextRequest, context: z.infer<typeof routeContextSchema>) {
  try {
    const { params } = routeContextSchema.parse(context);
    const writeup = await prisma.news.findUnique({ where: { id: params.id } });

    if (!writeup) {
      return NextResponse.json({ error: "News not found" }, { status: 404 });
    }

    return NextResponse.json({ data: writeup }, { status: 200 });
  } catch (error) {
    console.error("[GET_NEWS]:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// DELETE a news post (admin only)
export async function DELETE(req: NextRequest, context: z.infer<typeof routeContextSchema>) {
  try {
    const session = await getServerSession(authOptions);

    if (session?.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { params } = routeContextSchema.parse(context);

    await prisma.news.delete({ where: { id: params.id } });

    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 422 });
    }

    console.error("[DELETE_NEWS]:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// PATCH a news post (admin only)
export async function PATCH(req: NextRequest, context: z.infer<typeof routeContextSchema>) {
  try {
    const session = await getServerSession(authOptions);

    if (session?.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { params } = routeContextSchema.parse(context);
    const json = await req.json();
    const body = postPatchSchema.parse(json);

    await prisma.news.update({
      where: { id: params.id },
      data: { title: body.title, content: body.content },
    });

    return NextResponse.json(null, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 422 });
    }

    console.error("[PATCH_NEWS]:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
