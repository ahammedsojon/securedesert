import prisma from "@/prisma/client";
import * as z from "zod";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";

interface Props {
  params: { courseId: string };
}

const Schema = z.object({
  url: z.string().min(1),
});

export async function POST(req: Request, { params: { courseId } }: Props) {
  try {
    const session = await getServerSession(authOptions);
    // only admin can post
    if (session?.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const body = await req.json();
    const validation = Schema.safeParse(body);
    if (!validation.success) return new NextResponse("invalid attachment", { status: 400 });

    const attachment = await prisma.attachment.create({
      data: {
        url: body.url,
        name: body.url.split("/").pop(),
        courseId,
      },
    });

    return NextResponse.json(attachment);
  } catch (error) {
    console.log("[COURSE_ID_ATTACHMENTS]: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
