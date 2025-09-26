import { authOptions } from "@/lib/authOptions";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

interface Props {
  params: { courseId: string; attachmentId: string };
}

export async function DELETE(req: Request, { params: { courseId, attachmentId } }: Props) {
  try {
    const session = await getServerSession(authOptions);
    // only admin can post
    if (session?.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    await prisma.attachment.delete({
      where: { id: attachmentId, courseId },
    });

    return NextResponse.json({});
  } catch (error) {
    console.log("[ATTACHMENTS_ID]: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
