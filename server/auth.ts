import NextAuth, { CredentialsSignin } from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import bcrypt from "bcrypt";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "@/types/login-schema";
import { db } from ".";
import { accounts, users } from "./schema";
import { eq } from "drizzle-orm";
import Stripe from "stripe";
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db) as any,
  secret: process.env.AUTH_SECRET!,
  session: { strategy: "jwt" },
  callbacks: {
    async session({ session, token }) {
      if (session && token.sub) {
        session.user.id = token.sub;
      }
      if (session.user && token.role) {
        session.user.role = token.role as string;
      }

      if (session) {
        session.user.isTowFactorEnable = token.isTowFactorEnable as boolean;
        session.user.name = token.name as string;
        session.user.image = token.image as string;
        session.user.isOauth = token.isOauth as boolean;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await db.query.users.findFirst({
        where: eq(users.id, token.sub),
      });

      if (!existingUser) return token;

      const existingAccount = await db.query.accounts.findFirst({
        where: eq(accounts.userId, existingUser.id),
      });

      token.isOauth = !!existingAccount; //  token.Oauth = existingAccount ? true : false
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.image = existingUser.image;
      token.role = existingUser.role;
      token.isTowFactorEnable = existingUser.isTowFactorEnable;

      return token;
    },
  },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    Github({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
      allowDangerousEmailAccountLinking: true,
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
  events: {
    createUser: async ({ user }) => {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
        apiVersion: "2025-03-31.basil",
      });
      const customer = await stripe.customers.create({
        email: user.email!,
        name: user.name!,
      });
      await db
        .update(users)
        .set({
          customerId: customer.id,
        })
        .where(eq(users.id, user.id!));
    },
  },
});
