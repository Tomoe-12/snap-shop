import NextAuth from "next-auth"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "@/server"
import Github from "next-auth/providers/github"
import Google from "next-auth/providers/google"
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db) as any,
  secret : process.env.NEXTAUTH_SECRET!,
  session : {strategy  : "jwt"},
  providers: [
    Google ( {
        clientId : process.env.AUTH_GOOGLE_ID!,
        clientSecret : process.env.AUTH_GOOGLE_SECRET!,
    }),
    Github({
        clientId : process.env.AUTH_GITHUB_ID!,
        clientSecret : process.env.AUTH_GITHUB_SECRET!,
    })
  ]
})