"use server";

import { resetPasswordSchema } from "@/types/reset-password-schema";
import { actionClient } from "./safe-action";
import { db } from "@/server";
import { users } from "../schema";
import { eq } from "drizzle-orm";
import { generatePasswordResetToken } from "./token";
import { sendPasswordResetEmail } from "./email";

export const resetPassword = actionClient
  .schema(resetPasswordSchema)
  .action(async ({ parsedInput: { email } }) => {
    // check user exists or not
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!existingUser) return { error: "Email not found" };

    const passwordResetToken = await generatePasswordResetToken(email);

    if (!passwordResetToken)
      return { error: "Fail to generate password reset token" };

    await sendPasswordResetEmail(
      existingUser.name!,
      passwordResetToken[0].email,
      passwordResetToken[0].token
    );

    return { success: "Password reset email sent" };
  });
