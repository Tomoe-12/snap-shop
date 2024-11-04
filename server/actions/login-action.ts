"use server"

import { loginSchema } from "@/types/login-schema";
import { actionClient } from "./safe-action";
import { db } from "..";
import { users } from "../schema";
import { eq } from "drizzle-orm";
import { generateEmailVerificationToken } from "./token";
import { sendEmail } from "./email";
import { signIn } from "../auth";
import { AuthError } from "next-auth";

export const login = actionClient
  .schema(loginSchema)
  .action(async ({ parsedInput: { email, password } }) => {
    try {
      // check email
      const existingUser = await db.query.users.findFirst({
        where: eq(users.email, email),
      });

      console.log(existingUser);

      if (existingUser?.email !== email) {
        return { error: "Please provide valid credientials" };
      }

      if (!existingUser.emailVerified) {
        const verificationToken = await generateEmailVerificationToken(
          existingUser.email
        );
        await sendEmail(
          verificationToken[0].email,
          verificationToken[0].token,
          existingUser?.name?.split(" ")[0]! // return firstname
        );
        return { success: "Email verification resent." };
      }
      console.log("enter sign in");

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error)
        return { error: "Please provide valid credentials" };

      return { success: "Login successful", redirectTo: "/" };
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case "CredentialsSignin":
            return { error: "Please provide valid credientials" };
          case "OAuthSignInError":
            return { error: error.message };
        }
      }
    }
  });
