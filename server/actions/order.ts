"use server";
import { orderProduct } from "./../schema";
import {
  changeOrderStatusSchema,
  createOrderSchema,
} from "@/types/order-schema";
import { actionClient } from "./safe-action";
import { auth } from "../auth";
import { db } from "..";
import { orders } from "../schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const createOrder = actionClient
  .schema(createOrderSchema)
  .action(async ({ parsedInput: { products, status, totalPrice } }) => {
    const session = await auth();
    if (!session) return { error: "You need to be logged in" };

    const order = await db
      .insert(orders)
      .values({
        userID: session.user.id as string,
        status,
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

export const changeOrderStatus = actionClient
  .schema(changeOrderStatusSchema)
  .action(async ({ parsedInput: { orderId, status } }) => {
    const session = await auth();
    if (!session) return { error: "You need to be logged in" };
    try {
      if (orderId) {
        const existingProduct = await db.query.orders.findFirst({
          where: eq(orders.id, orderId),
        });
        if (!existingProduct) return { error: "Order not found!" };
        await db.update(orders).set({ status }).where(eq(orders.id, orderId));

        revalidatePath("/dashboard/orders");

        return { success: `Order status updated successfully.` };
      }
    } catch (error) {
      console.log(error);
      return { error: "Sth went wrong" };
    }

    return { success: "Order status change initiated" };
  });
