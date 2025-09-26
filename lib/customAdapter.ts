import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/prisma/client";
import type { AdapterUser } from "next-auth/adapters"; // import the type

export function CustomPrismaAdapter() {
  const defaultAdapter = PrismaAdapter(prisma);

  return {
    ...defaultAdapter,
    async createUser(user: AdapterUser) {
      // user.name comes from provider (full name)
      const nameParts = (user.name || "").split(" ");
      const fname = nameParts[0] || null;
      const lname = nameParts.slice(1).join(" ") || null;

      return prisma.user.create({
        data: {
          ...user,
          fname,
          lname,
        },
      });
    },
  };
}
