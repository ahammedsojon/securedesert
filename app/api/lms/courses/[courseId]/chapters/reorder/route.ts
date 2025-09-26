import { authOptions } from "@/lib/authOptions";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    // only admin can post
    if (session?.user.role !== "ADMIN") {
      return Response.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { list } = await req.json();

    // list.forEach(async(item) => {
    //   await prisma.chapter.update({
    //     where: { id: item.id },
    //     data: { position: item.position },
    //   });
    // })

    // eslint-disable-next-line no-restricted-syntax
    for (const item of list) {
      // eslint-disable-next-line no-await-in-loop
      await prisma.chapter.update({
        where: { id: item.id },
        data: { position: item.position },
      });
    }

    return new NextResponse("Success", { status: 200 });
  } catch (error) {
    console.log("[REORDER]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
