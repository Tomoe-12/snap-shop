import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import { db } from "@/server";
import { desc, eq } from "drizzle-orm";
import { orders } from "@/server/schema";
import formatCurrency from "@/lib/formatCurrency";
import Image from "next/image";
import AdminActions from "@/components/order/Admin Actions";

type Status = "PENDING" | "COMPLETED" | "CANCELLED";

const Orders = async () => {
  const session = await auth();
  if (!session?.user) return redirect("/");
  console.log("session", session.user.role);

  const userOrders = await db.query.orders.findMany({
    where: eq(orders.userID, session?.user.id as string),
    orderBy: [desc(orders.createdAt)],
    with: {
      orderProduct: {
        with: {
          product: true,
          productVariants: {
            with: {
              variantImages: true,
            },
          },
          order: true,
        },
      },
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Orders</CardTitle>
        <CardDescription>View your orders here</CardDescription>
        <CardContent>
          <Table className="overflow-x-scroll">
            <TableCaption>A list of your orders.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[30px] ">ID</TableHead>
                <TableHead className="min-w-24 ">Status</TableHead>
                <TableHead className="min-w-36">Orders On</TableHead>
                <TableHead className="min-w-28">Total</TableHead>
                <TableHead>Details</TableHead>
                {session.user.role.toUpperCase() === "ADMIN" && (
                  <TableHead>Admin Actions</TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {userOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>
                    {order.status === "PENDING" && (
                      <span className="text-white bg-orange-500 rounded-md text-xs px-2 py-1">
                        {order.status}
                      </span>
                    )}
                    {order.status === "COMPLETED" && (
                      <span className="text-white bg-green-500 rounded-md text-xs px-2 py-1">
                        {order.status}
                      </span>
                    )}
                    {order.status === "CANCELLED" && (
                      <span className="text-white bg-red-500 rounded-md text-xs px-2 py-1">
                        {order.status}
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    {order.createdAt
                      ? // Date
                        order.createdAt.toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }) +
                        " " +
                        // Time (12-hour format)
                        order.createdAt.toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true, // AM/PM ဖြင့်ပြသရန်
                        })
                      : "N/A"}
                  </TableCell>
                  <TableCell>{formatCurrency(order.total)}</TableCell>

                  <TableCell>
                    <Dialog>
                      <DialogTrigger className="underline">
                        View Details
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl rounded-xl">
                        <DialogHeader>
                          <DialogTitle>Orders Details # {order.id}</DialogTitle>
                          {/* <DialogDescription>
                            Order's total price - {formatCurrency(order.total)}
                          </DialogDescription> */}
                        </DialogHeader>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-[100px]">Image</TableHead>
                              <TableHead>Product</TableHead>
                              <TableHead>Price</TableHead>
                              <TableHead>Variant</TableHead>
                              <TableHead>Quantity</TableHead>

                              <TableHead className="text-right">
                                Amount
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {order.orderProduct.map((product) => (
                              <TableRow key={product.id}>
                                <TableCell>
                                  <Image
                                    src={
                                      product.productVariants.variantImages[0]
                                        .image_url
                                    }
                                    alt={product.product.title}
                                    width={50}
                                    height={50}
                                    className="rounded-md"
                                  />
                                </TableCell>
                                <TableCell>{product.product.title}</TableCell>
                                <TableCell>{product.product.price}</TableCell>
                                <TableCell>
                                  <div
                                    className="w-4 h-4 rounded-full "
                                    style={{
                                      backgroundColor:
                                        product.productVariants.color,
                                    }}
                                  />
                                </TableCell>
                                <TableCell>{product.quantity}</TableCell>
                                <TableCell className="text-right">
                                  $250.00
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                          <TableFooter>
                            <TableRow className="bg-gray-300 hover:bg-gray-300">
                              <TableCell colSpan={5}>Total</TableCell>
                              <TableCell className="text-right">
                                {formatCurrency(order.total)}
                              </TableCell>
                            </TableRow>
                          </TableFooter>
                        </Table>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                  {session.user.role.toUpperCase() === "ADMIN" && (
                    <TableCell>
                      <AdminActions
                        orderId={order.id.toString()}
                        currentStatus={order.status as Status}
                      />
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default Orders;
