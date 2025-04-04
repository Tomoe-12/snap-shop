"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Minus, Plus } from "lucide-react";

const AddToCart = () => {
  const [ quantity, setQuantity ] = useState<number>(1);

  return (
   <>
    <div className="flex gap-2 items-center justify-between my-2 ">
      <Button onClick={() =>{
        if (quantity > 1) {
          setQuantity(quantity - 1);
        }
      }}>
        <Minus size={16} />
      </Button>
      <div className="bg-black text-white text-center font-medium rounded-md px-2 py-1.5 w-full">
        Quantity : {quantity}
      </div>
      <Button onClick={() => setQuantity(quantity + 1)}>
        <Plus size={16} />
      </Button>
    </div>
    <Button className="w-full " size={"lg"} >
        Add to Cart
    </Button>
   </>
  );
};

export default AddToCart;
