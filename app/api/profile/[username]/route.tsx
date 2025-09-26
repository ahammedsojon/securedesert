import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: { username: string };
}
export async function GET(_: NextRequest, { params: { username } }: Props) {
  const user = await prisma.user.findUnique({ where: { username } });
  // to get rank. get all users and sort them by points then get the user index
  if (user) return NextResponse.json({ data: user }, { status: 200 });
  return NextResponse.json({ error: "user not found" }, { status: 404 });
}
