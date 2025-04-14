"use server";

import { eq } from "drizzle-orm";
import { db } from "..";
import { orders, products, users } from "../schema";

export const analytics = async () => {
  try {
    const pendingOrders = await db
      .select()
      .from(orders)
      .where(eq(orders.status, "PENDING"));
    const completeOrders = await db
    .select()
      .from(orders)
      .where(eq(orders.status, "COMPLETED"));

    const totalUsers = await db.select().from(users);

    const productCount = await db.select().from(products);

    return {
      pendingOrders: pendingOrders.length,
      completeOrders: completeOrders.length,
      totalUsers: totalUsers.length,
      productCount: productCount.length,
    };
  } catch (error) {
    console.log(error);
  }
};
