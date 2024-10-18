import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(4, {
    message: "Please enter at least 4 letters ",
  }),
  code: z.string().optional(),
});
