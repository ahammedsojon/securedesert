import prisma from "@/prisma/client";
import * as z from "zod";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/authOptions";

// Validation schema
const postSchema = z.object({
  title: z.string().min(1),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    // Only admin can create courses
    if (session?.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const body = await req.json();

    // Validate request body
    const validation = postSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ error: validation.error.errors }, { status: 400 });
    }

    // Check if course title already exists
    const existingCourse = await prisma.course.findFirst({
      where: { title: body.title },
    });
    if (existingCourse) {
      return NextResponse.json({ error: "Course title already exists" }, { status: 400 });
    }

    // Create course
    const course = await prisma.course.create({
      data: {
        userId: session.user.id,
        title: body.title,
      },
      select: { id: true }, // only return id
    });

    return NextResponse.json(course, { status: 201 });
  } catch (error) {
    console.error("[COURSES_POST]:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
