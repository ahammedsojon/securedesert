import { authOptions } from "@/lib/authOptions";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcrypt";

const schema = z.object({
  name: z.string(),
  password: z.string(),
  userId: z.string(),
});
export async function POST(req: NextRequest) {
  const body = await req.json();
  // check if logged in
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Please Login first" }, { status: 400 });

  // validate body data
  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json({ error: validation.error.errors }, { status: 400 });

  // check if team exist
  const team = await prisma.teams.findUnique({ where: { name: body.name } });
  if (!team) return NextResponse.json({ error: "Team not found" }, { status: 404 });

  const correctPassword = await bcrypt.compare(body.password, team.password);
  if (!correctPassword)
    return NextResponse.json({ error: "password not correct" }, { status: 400 });

  // update user's team
  /* const user = await prisma.user.update({
    where: { id: body.userId },
    data: {
      team: team.id,
    },
  }); */
  return NextResponse.json({}, { status: 201 });
}
