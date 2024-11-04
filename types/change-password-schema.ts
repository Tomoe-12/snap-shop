import * as z from "zod";

export const changePasswordSchema = z.object({
  password: z.string().min(4, {
    message: "Please enter at least 4 letters ",
  }),
  token: z.string().optional().nullable(),
});
