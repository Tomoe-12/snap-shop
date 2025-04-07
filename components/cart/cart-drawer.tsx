import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import CartItem from "./cart-item";
import CartStatus from "./cart-status";
import { useCartStore } from "@/store/cart-store";

type CartDrawerProps = {
  children: React.ReactNode;
};

const CartDrawer = ({ children }: CartDrawerProps) => {
  const cartPosition = useCartStore((state) => state.cartPosition);
  return (
    <>
      <Drawer>
        <DrawerTrigger>{children}</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Your Cart</DrawerTitle>
            <DrawerDescription>Stay Home ,Stay Safe</DrawerDescription>
            <CartStatus />
          </DrawerHeader>
          {cartPosition === "Order" && <CartItem />}
          {cartPosition === "Checkout" && <p>I am ordering sth .</p>}
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CartDrawer;
