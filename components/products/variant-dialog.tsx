"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { VariantsWithImagesTags } from "@/lib/infer-type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { variantSchema } from "@/types/variant-schema";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import TagsInput from "./tags-input";
import VariantImages from "./variant-images";
import { useAction } from "next-safe-action/hooks";
import { createVariant } from "@/server/actions/variant";
import { toast } from "sonner";

type VariantDialogProps = {
  children: React.ReactNode;
  editMode: boolean;
  productID?: number;
  variant?: VariantsWithImagesTags;
};

const VariantDialog = ({
  children,
  editMode,
  productID,
  variant,
}: VariantDialogProps) => {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof variantSchema>>({
    resolver: zodResolver(variantSchema),
    defaultValues: {
      tags: [],
      variantImage: [],
      color: "#000000",
      id: undefined,
      productType: "Black",
      productID,
      editMode,
    },
  });

  const { execute, status, result } = useAction(createVariant, {
    onSuccess({ data }) {
      setOpen(false);
      if (data?.error) {
        toast.error(data?.error);
        form.reset();
      }
      if (data?.success) {
        toast.success(data?.success);
      }
    },
  });

  const onSubmit = (values: z.infer<typeof variantSchema>) => {
    const { id, color, editMode, productType, productID, tags, variantImage } =
      values;
    execute({
      id,
      color,
      editMode,
      productType,
      productID,
      tags,
      variantImage,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="h-[52rem] overflow-auto">
        <DialogHeader>
          <DialogTitle>
            {editMode ? "Update an existing" : "Create New"} product's Variant{" "}
          </DialogTitle>
          <DialogDescription>Manage Your product's variants.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="productType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Variant Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Your variant's title"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Variant Color</FormLabel>
                  <FormControl>
                    <Input type="color" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Variant Tags</FormLabel>
                  <FormControl>
                    <TagsInput
                      {...field}
                      handleOnChange={(e) => field.onChange(e)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <VariantImages />
            <Button
              className="w-full"
              type="submit"
              disabled={status === "executing"}
            >
              {editMode
                ? "Update product's variant"
                : "Create Proudct's Variant"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default VariantDialog;
