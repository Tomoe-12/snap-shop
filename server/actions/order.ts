'use server'
import { orderProduct } from "./../schema";
import { createOrderSchema } from "@/types/order-schema";
import { actionClient } from "./safe-action";
import { auth } from "../auth";
import { db } from "..";
import { orders } from "../schema";

export const createOrder = actionClient
  .schema(createOrderSchema)
  .action(async ({ parsedInput: { products, status, totalPrice } }) => {
    const session = await auth();
    if (!session) return { error: "You need to be logged in" };

    const order = await db
      .insert(orders)
      .values({
        userID: session.user.id as string,
        status ,
        total: totalPrice,
      })    
      .returning();

    products.map(async ({ productId, quantity, variantId }) => {
      await db.insert(orderProduct).values({
        quantity,
        productID: productId,
        productVariantID: variantId,
        orderID: order[0].id,
      });
    });
    return { success: "Order added" };
  });
