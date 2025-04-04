"use client";

import { useCartStore } from "@/store/cart-store";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import formatCurrency from "@/lib/formatCurrency";
import Image from "next/image";

const CartItem = () => {
  const cart = useCartStore((state) => state.cart);
  return (
    <div className= "lg:w-1/2  mb-10 mx-auto">
      {cart.length === 0 ? (
        <p className="text-center">Your Cart is Empty!</p>
      ) : (
        <div>
          <Table>
            <TableCaption>A list of your Cart. </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Product</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead className="text-right">Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cart.map((cItem) => (
                <TableRow key={cItem.id}>
                  <TableCell className="font-medium">{cItem.name}</TableCell>
                  <TableCell>
                    <div>
                        <Image src={cItem.image} alt={cItem.name} width={50} height={50}/>
                    </div>
                  </TableCell>
                  <TableCell>{cItem.variant.quantity}</TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(Number(cItem.price))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default CartItem;
