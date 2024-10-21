"use server";

import { registerSchema } from "@/types/register-schema";
import { actionClient } from "./safe-action";
import bcrypt from "bcrypt";
import { db } from "..";
import { users } from "../schema";
import { eq } from "drizzle-orm";
import { generateEmailVerificationToken } from "./token";
import { sendEmail } from "./email";

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
        await sendEmail(
          verificationToken[0].email,
          verificationToken[0].token,
          name.split(" ")[0]
        );
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
    await sendEmail(
      verificationToken[0].email,
      verificationToken[0].token,
      name.split(" ")[0]
    );

    return {
      success: "Email verification sent.",
    };
  });
