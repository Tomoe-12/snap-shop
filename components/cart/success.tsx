import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { PartyPopper } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { stat } from "fs";
import { useRouter } from "next/navigation";

const Success = () => {
  const setCartPosition = useCartStore((state) => state.setCartPosition);
  const cartPosition = useCartStore((state) => state.cartPosition);
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);

   const router = useRouter();

  useEffect(() => {
      setTimeout(() => {
        setCartPosition("Order");
        clearCart();
      }, 10000);
    
  }, []);
  return (
    <main className="max-w-4xl mx-auto my-10 text-center">
      <PartyPopper size={60} className="mx-auto animate-bounce " />
      <h2 className="text-4xl font-bold my-4">Your payment was successful</h2>
      <p className="text-sm font-medium text-muted-foreground mb-4">
        Thanks for your purchase
      </p>
      <Button className="mx-auto" onClick={()=>router.push('/dashboard/orders')}>View orders</Button>
    </main>
  );
};

export default Success;
