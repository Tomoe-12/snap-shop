"use server";

import bcrypt from "bcrypt";
import { changePasswordSchema } from "@/types/change-password-schema";
import { actionClient } from "./safe-action";
import { checkPasswordResetTokenByToken } from "./token";
import { db } from "@/server";
import { resetPasswordVerificationToken, users } from "../schema";
import { eq } from "drizzle-orm";

import { Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";

export const changePassword = actionClient
  .schema(changePasswordSchema)
  .action(async ({ parsedInput: { password, token } }) => {
    const pool = new Pool({
      connectionString: process.env.DRIZZLE_DATABASE_URL!,
    });
    const dbPool = drizzle(pool);

    if (!token) return { error: "Missing token" };

    const existingToken = await checkPasswordResetTokenByToken(token);

    if (!existingToken) return { error: "Invalid token" };

    const isExpired = new Date() > new Date(existingToken.expires);

    if (isExpired) return { error: "Token expired . Try again" };

    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, existingToken.email),
    });

    if (!existingUser) return { error: "User not found" };

    const hashpassword = await bcrypt.hash(password, 10);

    // double query  not like the https , using iwth websocket
    await dbPool.transaction(async (context) => {
      await context
        .update(users)
        .set({ password: hashpassword })
        .where(eq(users.email, existingToken.email));

      await context
        .delete(resetPasswordVerificationToken)
        .where(eq(resetPasswordVerificationToken.email, existingToken.email));
    });
    
    return { success: "Password changed successfully" };
  });
