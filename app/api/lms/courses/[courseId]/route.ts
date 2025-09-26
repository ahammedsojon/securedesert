import { authOptions } from "@/lib/authOptions";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import Mux from "@mux/mux-node";

const { Video } = new Mux(process.env.MUX_TOKEN_ID!, process.env.MUX_TOKEN_SECRET!);

interface Props {
  params: { courseId: string };
}

export async function DELETE(req: Request, { params: { courseId } }: Props) {
  try {
    const session = await getServerSession(authOptions);
    // only admin can post
    if (session?.user.role !== "ADMIN") {
      return Response.json({ error: "Unauthorized" }, { status: 403 });
    }

    const course = await prisma.course.findUnique({
      where: {
        id: courseId,
      },
      include: {
        chapter: {
          include: {
            muxdata: true,
          },
        },
      },
    });

    if (!course) {
      return new NextResponse("Not found", { status: 404 });
    }

    course.chapter.forEach(async (chapter) => {
      if (chapter.muxdata?.assetId) {
        await Video.Assets.del(chapter.muxdata.assetId);
      }
    });
    // for (const chapter of course.Chapters) {
    //   if (chapter.muxData?.assetId) {
    //     await Video.Assets.del(chapter.muxData.assetId);
    //   }
    // }

    const deletedCourse = await prisma.course.delete({
      where: {
        id: courseId,
      },
    });

    return NextResponse.json(deletedCourse);
  } catch (error) {
    console.log("[COURSE_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(req: Request, { params: { courseId } }: Props) {
  try {
    const session = await getServerSession(authOptions);
    // only admin can post
    if (session?.user.role !== "ADMIN") {
      return Response.json({ error: "Unauthorized" }, { status: 403 });
    }
    const values = await req.json();

    // update course
    const course = await prisma.course.update({
      where: { id: courseId },
      data: {
        ...values,
      },
      select: {
        id: true,
      },
    });
    return NextResponse.json(course, { status: 200 });
  } catch (error) {
    console.log("[COURSE_ID]: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
