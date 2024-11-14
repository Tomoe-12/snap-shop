"use server";

import { settingsSchema, twoFactorSchema } from "@/types/settings-schema";
import { actionClient } from "./safe-action";
import { db } from "@/server";
import { eq } from "drizzle-orm";
import { users } from "../schema";
import { revalidatePath } from "next/cache";

export const updateDisplayName = actionClient
  .schema(settingsSchema)
  .action(async ({ parsedInput: { name, email } }) => {
    console.log("email", email, "name : ", name);

    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!existingUser) return { error: "User not found" };

    await db.update(users).set({ name }).where(eq(users.email, email));
    revalidatePath("/dashboard/settings");
    return { success: "Display name updated" };
  });

export const twoFactorToogle = actionClient
  .schema(twoFactorSchema)
  .action(async ({ parsedInput: { isTowFactorEnable, email } }) => {

    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!existingUser) return { error: "Something Went Wrong :-( " };

    await db
      .update(users)
      .set({ isTowFactorEnable })
      .where(eq(users.email, email));

    revalidatePath("/dashboard/settings");

    return { success: "2FA Setting Saved " };
  });
