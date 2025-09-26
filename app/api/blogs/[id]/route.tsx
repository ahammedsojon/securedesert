import * as z from "zod";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { extractIdFromRequest } from "@/lib/extractIdSegment";

const routeContextSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

const postPatchSchema = z.object({
  title: z.string().min(3).max(128).optional(),
  content: z.any().optional(), // TODO: Type properly if needed
});

export async function GET(req: NextRequest) {
  try {
    const id = extractIdFromRequest(req); // use your utility

    const session = await getServerSession(authOptions);

    // Fetch blog from DB
    const blog = await prisma.blogs.findUnique({
      where: { id: id as string }, // convert to string if needed
    });

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (session?.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const id = extractIdFromRequest(req);

    await prisma.blogs.delete({
      where: { id: id as string },
    });

    return NextResponse.json({ message: "Deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, context: z.infer<typeof routeContextSchema>) {
  try {
    const session = await getServerSession(authOptions);

    if (session?.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { params } = routeContextSchema.parse(context);

    const json = await req.json();
    const body = postPatchSchema.parse(json);

    const updatedBlog = await prisma.blogs.update({
      where: { id: params.id },
      data: {
        title: body.title,
        content: body.content,
      },
    });

    return NextResponse.json(updatedBlog, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ errors: error.issues }, { status: 422 });
    }

    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
