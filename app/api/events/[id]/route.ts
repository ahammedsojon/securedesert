import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { authOptions } from "@/lib/authOptions";

interface Props {
  params: { id: string };
}

// GET event by ID
export async function GET(req: NextRequest, { params: { id } }: Props) {
  try {
    const event = await prisma.event.findFirst({ where: { id } });

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json({ data: event }, { status: 200 });
  } catch (error) {
    console.error("[GET_EVENT]:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// PATCH event (admin only)
export async function PATCH(req: NextRequest, { params: { id } }: Props) {
  try {
    const session = await getServerSession(authOptions);

    if (session?.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const values = await req.json();

    const updatedEvent = await prisma.event.update({
      where: { id },
      data: { ...values },
      select: { id: true },
    });

    return NextResponse.json(updatedEvent, { status: 200 });
  } catch (error) {
    console.error("[PATCH_EVENT]:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
