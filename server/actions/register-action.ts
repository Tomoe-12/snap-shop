"use server";

import { registerSchema } from "@/types/register-schema";
import { actionClient } from "./safe-action";
import bcrypt from "bcrypt";
import { db } from "..";
import { users } from "../schema";
import { eq } from "drizzle-orm";
import { generateEmailVerificationToken } from "./token";

export const register = actionClient
  .schema(registerSchema)
  .action(async ({ parsedInput: { name, email, password } }) => {
    const hashpassword = await bcrypt.hash(password, 10);

    // check user exists or not
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (existingUser) {
      if (!existingUser.emailVerified) {
        const verificationToken = await generateEmailVerificationToken(email);

        return { success: "Email verification resent." };
      }

      // send verification email
      return { error: "Email is already exists " };
    }

    // record user
    await db.insert(users).values({
      name,
      email,
      password: hashpassword,
    });
    // generate verification token for email expires in 30 mins
    const verificationToken = await generateEmailVerificationToken(email);
    // send verification token
    console.log("verficaiont email", verificationToken);

    return {
      success: "Email verification sent.",
    };
  });
