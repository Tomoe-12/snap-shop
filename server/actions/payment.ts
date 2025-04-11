"use server";
import { Stripe } from "stripe";
import { act } from "react";
import { actionClient } from "./safe-action";
import { paymentSchema } from "@/types/payment-schema";
import { auth } from "../auth";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const processPayment = actionClient
  .schema(paymentSchema)
  .action(async ({ parsedInput: { amount, cart, currency } }) => {
    const user = await auth();
    if (!user) return { error: "You need to be logged in" };
    if (!amount) return { error: "No amount provided" };

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        cart: JSON.stringify(cart),
      },
    });

    return {
      sucess: {
        paymentIntentId: paymentIntent.id,
        clientSecretId: paymentIntent.client_secret,
        user_email: user.user.email,
      },
    };
  });
