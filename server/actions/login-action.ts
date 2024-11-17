"use server";

import { loginSchema } from "@/types/login-schema";
import { actionClient } from "./safe-action";
import { db } from "..";
import { twoFactorToken, users } from "../schema";
import { eq } from "drizzle-orm";
import {
  generateEmailVerificationToken,
  generateTwoFactorCode,
  getTwoFactorCodeByEmail,
} from "./token";
import { sendEmail, sendTwoFactorEmail } from "./email";
import { signIn } from "../auth";
import { AuthError } from "next-auth";

export const login = actionClient
  .schema(loginSchema)
  .action(async ({ parsedInput: { email, password, code } }) => {
    try {
      // check email
      const existingUser = await db.query.users.findFirst({
        where: eq(users.email, email),
      });

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

      if (existingUser.isTowFactorEnable) {
        if (code) {
          const twoFactorCode = await getTwoFactorCodeByEmail(
            existingUser.email
          );
          if (!twoFactorCode) return { twoFactor: "Invalid code" };

          if (code !== twoFactorCode.token) return { twoFactor: "Invalid code" };

          const isExpired = new Date() > new Date(twoFactorCode.expires);

          if (isExpired) return { twoFactor: "Code expired" };

          await db
            .delete(twoFactorToken)
            .where(eq(twoFactorToken.id, twoFactorCode.id));
        } else {
          const twoFactorCode = await generateTwoFactorCode(existingUser.email);

          if (!twoFactorCode)
            return { twoFactor: "Fail to generate two factors code" };

          await sendTwoFactorEmail(
            existingUser.name!,
            twoFactorCode[0].email,
            twoFactorCode[0].token
          );

          return { twoFactor: "Two factors code sent" };
        }
      }

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) return { error: "Please provide valid credentials" };

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
