import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await prisma.user.findMany({
    select: {
      id: true,
      fname: true,
      email: true,
      image: true,
      points: true,
      first_bloods: true,
      teams_user_team_idToteams: {
        // include the related team
        select: {
          id: true,
          name: true, // or whatever your team model has
        },
      },
    },
    orderBy: { points: "desc" },
  });

  return NextResponse.json({ data }, { status: 200 });
}
