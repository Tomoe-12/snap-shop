"use client";
import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Button } from "../ui/button";
import { processPayment } from "@/server/actions/payment";
import { useCartStore } from "@/store/cart-store";
import { useAction } from "next-safe-action/hooks";
import { createOrder } from "@/server/actions/order";
import { toast } from "sonner";

type paymentFormProps = {
  totalPrice: number;
};

const PaymentForm = ({ totalPrice }: paymentFormProps) => {
  const cart = useCartStore((state) => state.cart);
  const setCartPosition = useCartStore((state) => state.setCartPosition);
  const clearCart = useCartStore((state) => state.clearCart);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  const { execute } = useAction(createOrder, {
    onSuccess: ({ data }) => {
      if (data?.error) {
        toast.error(data.error)
        setErrorMsg(data?.error);
      }
      if (data?.success) {
        toast.success(data.success)
        // clearCart();
        setCartPosition("Success");
      }
    },
  });

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (!stripe || !elements) {
      setLoading(false);
      return;
    }
    const { error: submitError } = await elements.submit();
    if (submitError) {
      setLoading(false);
      setErrorMsg(submitError.message || "Something went wrong");
      return;
    }

    const res = await processPayment({
      amount: totalPrice * 100,
      currency: "usd",
      cart: cart.map((ci) => ({
        quantity: ci.variant.quantity,
        productId: ci.id,
        title: ci.name,
        price: Number(ci.price),
        image_url: ci.image,
      })),
    });

    if (res?.data?.error) {
      setErrorMsg(res.data.error);
      setLoading(false);
    }
    if (res?.data?.sucess) {
      const paymentResponse = await stripe.confirmPayment({
        elements,
        clientSecret: res.data.sucess.clientSecretId!,
        redirect: "if_required",
        confirmParams: {
          return_url:"https://localhost:3000/success",
          receipt_email: res.data.sucess.user_email!,
        },
      });

      if (paymentResponse.error) {
        setErrorMsg(paymentResponse.error.message!);
        setLoading(false);
        return;
      } else {
        setLoading(false);
        execute({
          paymentId: res.data.sucess.paymentIntentId!,
          status: "PENDING",
          totalPrice,
          products: cart.map((ci) => ({
            productId: ci.id,
            quantity: ci.variant.quantity,
            variantId: ci.variant.variantId,
          })),
        });
      }
    }
  };
  return (
    <main className="max-w-4xl mx-auto">
      <form onSubmit={onSubmitHandler}>
        <PaymentElement />
        <Button
          disabled={loading || !stripe || !elements}
          className=" w-full my-4 "
        >
          Pay
        </Button>
      </form>
    </main>
  );
};

export default PaymentForm;
