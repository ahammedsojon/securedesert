import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const users = await prisma.user.findMany(); // fetch all users
    return NextResponse.json(users); // return as JSON
  } catch (err: any) {
    return NextResponse.json(
      { error: "❌ Failed to fetch users", details: err.message },
      { status: 500 },
    );
  } finally {
    await prisma.$disconnect();
  }
}
