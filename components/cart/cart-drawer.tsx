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
import { Button } from "../ui/button";

type CartDrawerProps = {
  children: React.ReactNode;
};

const CartDrawer = ({ children }: CartDrawerProps) => {
  return (
    <>
      <Drawer>
        <DrawerTrigger>{children}</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Your Cart</DrawerTitle>
            <DrawerDescription>Stay Home ,Stay Safe</DrawerDescription>
          </DrawerHeader>
         
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CartDrawer;
