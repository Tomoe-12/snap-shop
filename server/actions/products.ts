"use server";

import { productSchema } from "@/types/product-schema";
import { actionClient } from "./safe-action";
import { db } from "@/server";
import { products } from "../schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const insertOrUpdateProduct = actionClient
  .schema(productSchema)
  .action(async ({ parsedInput: { id, title, description, price } }) => {
    try {
      if (id) {
        const existingProduct = await db.query.products.findFirst({
          where: eq(products.id, id),
        });
        if (!existingProduct) return { error: "Products not found!" };
        await db
          .update(products)
          .set({ description, price, title })
          .where(eq(products.id, id));
        revalidatePath("/dashboard/products");
        return { success: `${title} updated successfully.` };
      } else {
        const product = await db
          .insert(products)
          .values({ description, title, price })
          .returning();
        revalidatePath("/dashboard/products");
        return { success: `${product[0].title} is created successfully. ` };
      }
    } catch (error) {
      console.log(error);
      return { error: "sth went wrong" };
    }
  });

export const getSingleProductId = async(id:number) => {
  try {
    const product = await db.query.products.findFirst({
      where  : eq(products.id ,id)
    })
    if(!product) return {error : 'Product Not Found'}
    return {success : product }

  } catch (error) {
    return {error : 'sth went wrong'}
  }
}