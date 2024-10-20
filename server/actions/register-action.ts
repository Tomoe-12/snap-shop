"use server";

import { registerSchema } from "@/types/register-schema";
import { actionClient } from "./safe-action";

export const register = actionClient
  .schema(registerSchema)
  .action(async ({ parsedInput: { name, email, password } }) => {
    console.log(email, password, name);

    return {
      success: { name, email, password },
    };
  });
