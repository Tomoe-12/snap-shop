import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { Box, Minus, ShoppingCart, Ticket } from "lucide-react";
import React from "react";

const CartStatus = () => {
  const cartPosition = useCartStore((state) => state.cartPosition);
  const setCartPosition = useCartStore((state) => state.setCartPosition);
  return (
    <div className="flex items-center justify-center gap-4 ">
      <ShoppingCart
        onClick={() => setCartPosition("Order")}
        size={22}
        className={cn(
          cartPosition === "Order" ? "text-primary" : "text-gray-400",
          cartPosition === "Checkout" && "text-primary",
          cartPosition === "Success" && "text-primary",
          "cursor-pointer"
        )}
      />
      <Minus
        className={cn(
          cartPosition === "Checkout" ? "text-primary" : "text-gray-400",
          cartPosition === "Success" && "text-primary"
        )}
      />
      <Ticket
        onClick={() => setCartPosition("Checkout")}
        size={22}
        className={cn(
          cartPosition === "Checkout" ? "text-primary" : "text-gray-400",
          cartPosition === "Success" && "text-primary",
          "cursor-pointer"
        )}
      />
      <Minus
        onClick={() => setCartPosition("Success")}
        className={cn(
          cartPosition === "Success" ? "text-primary" : "text-gray-400"
        )}
      />
      <Box
        size={22}
        className={cn(
          cartPosition === "Success" ? "text-primary" : "text-gray-400",
          "cursor-pointer"
        )}
      />
    </div>
  );
};

export default CartStatus;
