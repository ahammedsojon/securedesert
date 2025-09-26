import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/prisma/client";
import type { Adapter, AdapterUser } from "next-auth/adapters";

export function CustomPrismaAdapter(): Adapter {
  const defaultAdapter = PrismaAdapter(prisma);

  return {
    ...defaultAdapter,
    async createUser(user: Omit<AdapterUser, "id">) {
      // user.name comes from provider (full name)
      const nameParts = (user.name || "").split(" ");
      const fname = nameParts[0] || null;
      const lname = nameParts.slice(1).join(" ") || null;

      const createdUser = await prisma.user.create({
        data: {
          email: user.email,
          image: user.image,
          fname,
          lname,
          role: "USER", // default role if needed
        },
      });

      return createdUser as AdapterUser;
    },
  };
}
