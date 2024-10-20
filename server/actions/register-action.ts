"use server";

import { registerSchema } from "@/types/register-schema";
import { actionClient } from "./safe-action";
import bcrypt from "bcrypt";
import { db } from "..";
import { users } from "../schema";
import { eq } from "drizzle-orm";

export const register = actionClient
  .schema(registerSchema)
  .action(async ({ parsedInput: { name, email, password } }) => {
    const hashpassword = await bcrypt.hash(password, 10);
    console.log(hashpassword);
    
    // check user exists or not
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (existingUser) {
      if (!existingUser.emailVerified)
        // send verification email
      return {success : "Email verification sent "}
    }


    // create user
    return {
      success: "Email verification sent to your email.",
    };
  });
