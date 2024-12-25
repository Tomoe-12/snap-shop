import * as z from "zod";

export const productSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(4, {
    message: "Please enter at least 4 characters",
  }),
  description: z.string().min(40, {
    message: "Please enter at least 40 characters",
  }),
  price: z.coerce
    .number({ invalid_type_error: "Please Enter a number" })
    .positive({ message: "Please enter a positive number" }),
});

export const deleteProductSchema = z.object({
  id:z.number()
})