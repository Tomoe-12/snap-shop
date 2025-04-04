"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Minus, Plus } from "lucide-react";
import { redirect, useSearchParams } from "next/navigation";
import { useCartStore } from "@/store/cart-store";

const AddToCart = () => {
  const addToCart = useCartStore((state) => state.addToCart);

  const [quantity, setQuantity] = useState<number>(1);
  const searchParams = useSearchParams();
  const variantId = Number(searchParams.get("vid"));
  const productId = Number(searchParams.get("productId"));
  const title = searchParams.get("title");
  const price = searchParams.get("price");
  const image = searchParams.get("image");

  if (!variantId || !title || !price || !image ) {
    return redirect("/");
  }

  const addToCartHandler = () => {
    addToCart({
      id: productId,
      image,
      name: title,
      price,
      variant: {
        variantId : variantId,
        quantity
      },
    });
  };

  return (
    <>
      <div className="flex gap-2 items-center justify-between my-2 ">
        <Button
          onClick={() => {
            if (quantity > 1) {
              setQuantity(quantity - 1);
            }
          }}
        >
          <Minus size={16} />
        </Button>
        <div className="bg-black text-white text-center font-medium rounded-md px-2 py-1.5 w-full">
          Quantity : {quantity}
        </div>
        <Button onClick={() => setQuantity(quantity + 1)}>
          <Plus size={16} />
        </Button>
      </div>
      <Button className="w-full " size={"lg"} onClick={addToCartHandler}>
        Add to Cart
      </Button>
    </>
  );
};

export default AddToCart;
