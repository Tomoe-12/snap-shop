import NextAuth, { CredentialsSignin } from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import bcrypt from 'bcrypt'
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "@/types/login-schema";
import { db } from ".";
import { users } from "./schema";
import { eq } from "drizzle-orm";
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db) as any,
  secret: process.env.AUTH_SECRET!,
  session: { strategy: "jwt" },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
    Github({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    }),
    Credentials({
      authorize: async (credentials) => {
        try {
          const validatedData = loginSchema.safeParse(credentials);
          
          if (validatedData.error) {
            return null;
          }
          const { email, password } = validatedData.data;
          
          const user = await db.query.users.findFirst({
            where: eq(users.email, email),
          });

          if (!user || !password) {
            return null;
          }
          
          const isMatch = await bcrypt.compare(password, user?.password!);
          
          if (!isMatch) return null;

          return user;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
});
