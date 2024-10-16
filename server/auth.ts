import NextAuth from "next-auth"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "@/server"
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db),
  secret : process.env.NEXTAUTH_SECRET!,
  session : {strategy  : "jwt"},
  providers: [],
})