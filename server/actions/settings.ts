"use server";

import { settingsSchema } from "@/types/settings-schema";
import { actionClient } from "./safe-action";
import { db } from "@/server";
import { eq } from "drizzle-orm";
import { users } from "../schema";
import { revalidatePath } from "next/cache";

export const updateDisplayName = actionClient
  .schema(settingsSchema)
  .action(async ({ parsedInput: { name, email } }) => {
    console.log("email", email , 'name : ',name);
    
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!existingUser) return { error: "User not found" };

    await db.update(users).set({ name }).where(eq(users.email, email));
    revalidatePath('/dashboard/settings')
    return { success: "Display name updated" };
  });
