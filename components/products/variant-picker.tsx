"client";

import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

type variantPickerProps = {
  id: number;
  color: string;
  productType: string;
  title: string;
  price: number;
  productId: number;
  image: string;
};
const VariantPicker = ({
  id,
  color,
  productId,
  title,
  price,
  productType,
  image,
}: variantPickerProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedVariantColor = searchParams.get("type") || productType;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div
            onClick={() => {
              router.push(
                `/products/${id}?productId=${id}&type=${productType}&image=${image}&title=${title}&price=${price} `,
                { scroll: true }
              );
            }}
            style={{ backgroundImage: color }}
            className={cn(
              "w-5 h-5 rounded-full cursor-pointer",
              selectedVariantColor === productType
                ? "opacity-100"
                : "opacity-35"
            )}
          ></div>
        </TooltipTrigger>
        <TooltipContent>{productType}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default VariantPicker;
