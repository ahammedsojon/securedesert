/* eslint-disable no-param-reassign */
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import EmailProvider from "next-auth/providers/email";
import { CustomPrismaAdapter } from "@/lib/customAdapter";
import type { user as PrismaUser } from "@prisma/client";

export const authOptions: NextAuthOptions = {
  adapter: CustomPrismaAdapter(),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    // Session callback
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.username = token.username as string | "";
        session.user.team = token.team as string | null;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.image = token.picture as string | null;
      }
      return session;
    },

    // JWT callback
    async jwt({ token, user }) {
      // First login: user object exists
      if (user && "id" in user) {
        const u = user as PrismaUser; // type assertion to PrismaUser
        token.id = u.id;
        token.role = u.role;
        token.username = u.username || "";
        token.team = u.team_id;
        token.name = (u.fname || "") + (u.lname ? ` ${u.lname}` : "");
        token.picture = u.image || null;
        token.email = u.email;
      }
      return token;
    },
  },
};
