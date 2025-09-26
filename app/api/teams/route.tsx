import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import bcrypt from "bcrypt";
import { authOptions } from "@/lib/authOptions";
import schema from "./schema";

export async function GET() {
  const data = await prisma.teams.findMany({
    select: {
      id: true,
      leader: true,
      name: true,
      points: true,
      created_date: true,
    },
  });
  return NextResponse.json({ data }, { status: 200 });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  // check if logged in
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Please Login first" }, { status: 400 });

  // validate body data
  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json({ error: validation.error.errors }, { status: 400 });

  // check if team name exist
  const teamExist = await prisma.teams.findUnique({
    where: { name: body.name },
  });
  if (teamExist) return NextResponse.json({ error: "Team name already Exist" }, { status: 400 });

  // create new team
  const hashedPass = await bcrypt.hash(body.password, 10);
  const newTeam = await prisma.teams.create({
    data: {
      name: body.name,
      leader: body.leader,
      password: hashedPass,
      user_teams_leaderTouser: {
        connect: { id: body.leader }, // <-- connect the leader user
      },
    },
  });

  // update leader's team
  /* const leaderTeam = await prisma.user.update({
    where: { id: body.leader },
    data: {
      team: newTeam.id,
    },
  }); */
  return NextResponse.json({ data: newTeam }, { status: 201 });
}
