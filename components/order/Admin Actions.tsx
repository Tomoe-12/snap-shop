"use client";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useAction } from "next-safe-action/hooks";
import { changeOrderStatus } from "@/server/actions/order";
import { toast } from "sonner";

type Status = "PENDING" | "COMPLETED" | "CANCELLED";

type AdminActionsProps = {
  orderId: string;
  currentStatus: Status;
};
const AdminActions = ({ orderId, currentStatus }: AdminActionsProps) => {
  const { execute, isExecuting } = useAction(changeOrderStatus, {
    onSuccess: ({ data }) => {
      if (data?.error) {
        toast.error(data.error);
      }
      if (data?.success) {
        toast.success(data.success);
      }
    },
  });

  const handleClick = (newStatus: Status) => {
    if (!isExecuting) {
      execute({ orderId: Number(orderId), status: newStatus });
    }
  };

  return (
    <DropdownMenu>
      {/* Optionally disable the trigger while executing */}
      <DropdownMenuTrigger className="underline" disabled={isExecuting}>
        Change Status {isExecuting ? "..." : ""}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[140px] p-2 border border-gray-500 rounded-lg bg-white ">
        <DropdownMenuLabel className=" ">Change Order Status</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* Pass the PROPS currentStatus to value, and remove onValueChange on the group */}
        <DropdownMenuRadioGroup value={currentStatus}>
          <DropdownMenuRadioItem
            // Call the handler directly
            onClick={() => handleClick("PENDING")}
            value="PENDING"
            // Optionally disable the item if it's the current status or executing
            disabled={currentStatus === "PENDING" || isExecuting}
            className="text-orange-500 hover:bg-gray-200 hover:font-bold "
          >
            PENDING
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            onClick={() => handleClick("COMPLETED")}
            value="COMPLETED"
            disabled={currentStatus === "COMPLETED" || isExecuting}
            className="text-green-500 hover:bg-gray-200 hover:font-bold "
          >
            COMPLETED
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            onClick={() => handleClick("CANCELLED")}
            value="CANCELLED"
            disabled={currentStatus === "CANCELLED" || isExecuting}
            className="text-red-500 hover:bg-gray-200 hover:font-bold"
          >
            CANCELLED
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AdminActions;
