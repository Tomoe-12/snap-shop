"use client";
import { Elements } from "@stripe/react-stripe-js";
import { useCartStore } from "@/store/cart-store";
import React, { useEffect } from "react";
import stripeInit from "@/lib/strip.init";
import { totalPriceCale } from "@/lib/total-price";
import PaymentForm from "./payment-form";

const stripe = stripeInit();
const Payment = () => {
  const cart = useCartStore((state) => state.cart);
  const setCartPosition = useCartStore((state) => state.setCartPosition);
  useEffect(() => {
    if (cart.length === 0) {
      setCartPosition("Order");
    }
  }, []);

  return (
    <Elements
      stripe={stripe}
      options={{
        mode: "payment",
        currency: "usd",
        amount: totalPriceCale(cart) * 100,
      }}
    >
      <PaymentForm totalPrice={totalPriceCale(cart)} />
    </Elements>
  );
};

export default Payment;
