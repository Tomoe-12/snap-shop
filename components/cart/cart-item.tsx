"use client";

import { useCartStore } from "@/store/cart-store";
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
import formatCurrency from "@/lib/formatCurrency";
import Image from "next/image";
import { Button } from "../ui/button";
import { Minus, Plus } from "lucide-react";
import { totalPriceCale } from "@/lib/total-price";

const CartItem = () => {
  const { cart, removeFromCart, addToCart } = useCartStore((state) => state);

  return (
    <div className="lg:w-1/2  mb-10 mx-auto">
      {cart.length === 0 ? (
        <p className="text-center">Your Cart is Empty!</p>
      ) : (
        <div>
          <Table>
            {/* <TableCaption>A list of your Cart. </TableCaption> */}
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Product</TableHead>
                <TableHead className="w-[100px]">Image</TableHead>
                <TableHead className="w-[170px]">Quantity</TableHead>
                <TableHead className="text-right">Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cart.map((cItem) => (
                <TableRow key={cItem.id}>
                  <TableCell className="font-medium">{cItem.name}</TableCell>
                  <TableCell>
                    <div>
                      <Image
                        src={cItem.image}
                        alt={cItem.name}
                        width={50}
                        height={50}
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-4 items-center">
                      <Button
                        onClick={() =>
                          removeFromCart({
                            ...cItem,
                            variant: {
                              variantId: cItem.variant.variantId,
                              quantity: 1,
                            },
                          })
                        }
                        size={"sm"}
                      >
                        <Minus size={16} />
                      </Button>
                      <p className="text-sm font-medium">
                        {cItem.variant.quantity}
                      </p>
                      <Button
                        onClick={() =>
                          addToCart({
                            ...cItem,
                            variant: {
                              variantId: cItem.variant.variantId,
                              quantity: 1,
                            },
                          })
                        }
                        size={"sm"}
                      >
                        <Plus size={16} />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(
                      Number(cItem.price) * Number(cItem.variant.quantity)
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total:</TableCell>
                <TableCell className="text-right font-medium">
                  {formatCurrency(totalPriceCale(cart))}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
          <Button size={"lg"} className="w-full mt-5 ">
            Place Order
          </Button>
        </div>
      )}
    </div>
  );
};

export default CartItem;
