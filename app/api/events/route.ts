// import { getServerSession } from "next-auth";
import { NextRequest, /* NextRequest, */ NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
// import { authOptions } from "../auth/[...nextauth]/route";

/* interface Props {
  searchParams: { type: string };
} */

export async function GET(/* _: NextRequest, { searchParams: type }: Props */) {
  // const session = await getServerSession(authOptions);

  // check if request comes from admin
  // if(type === "all" && !session?.user.admin)
  //     return NextResponse.json({ error: "you don't have a permistion" }, { status: 400 })

  // get all events
  const events = await prisma.event.findMany();
  return NextResponse.json({ data: events }, { status: 200 });
}

const schema = z.object({
  title: z.string(),
  thumbnail: z.string().optional(),
  description: z.string().optional(),
  status: z.string(),
  date: z.string(),
});
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  // only admin can post
  if (session?.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const body = await req.json();

  // validate body
  const validation = schema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json({ error: validation.error.errors }, { status: 400 });
  }

  // check if event title exists
  const event = await prisma.event.findFirst({ where: { title: body.title } });
  if (event) {
    return NextResponse.json({ error: "Event title already exists" }, { status: 400 });
  }

  // create new event
  const newEvent = await prisma.event.create({
    data: {
      userId: session.user.id,
      title: body.title,
      thumbnail: body.thumbnail,
      description: body.description,
      status: body.status,
      date: body.date,
    },
  });

  return NextResponse.json({ data: newEvent }, { status: 201 });
}
