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

// GET a writeup by ID
export async function GET(req: NextRequest, context: z.infer<typeof routeContextSchema>) {
  try {
    const { params } = routeContextSchema.parse(context);
    const writeup = await prisma.writeups.findUnique({ where: { id: params.id } });

    if (!writeup) {
      return NextResponse.json({ error: "Writeup not found" }, { status: 404 });
    }

    return NextResponse.json({ data: writeup }, { status: 200 });
  } catch (error) {
    console.error("[GET_WRITEUP]:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// DELETE a writeup (admin only)
export async function DELETE(req: NextRequest, context: z.infer<typeof routeContextSchema>) {
  try {
    const session = await getServerSession(authOptions);

    if (session?.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { params } = routeContextSchema.parse(context);
    await prisma.writeups.delete({ where: { id: params.id } });

    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 422 });
    }

    console.error("[DELETE_WRITEUP]:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// PATCH a writeup (admin only)
export async function PATCH(req: NextRequest, context: z.infer<typeof routeContextSchema>) {
  try {
    const session = await getServerSession(authOptions);

    if (session?.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { params } = routeContextSchema.parse(context);
    const json = await req.json();
    const body = postPatchSchema.parse(json);

    await prisma.writeups.update({
      where: { id: params.id },
      data: {
        title: body.title,
        content: body.content,
      },
    });

    return NextResponse.json(null, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 422 });
    }

    console.error("[PATCH_WRITEUP]:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
