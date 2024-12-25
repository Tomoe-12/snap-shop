"use client";

import { productSchema } from "@/types/product-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DollarSign } from "lucide-react";
import Tiptap from "./tip-tap";
import { useAction } from "next-safe-action/hooks";
import {
  getSingleProductId,
  insertOrUpdateProduct,
} from "@/server/actions/products";
import { toast } from "sonner";
import { redirect, useRouter, useSearchParams } from "next/navigation";

const CreateProductForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isEditParams = searchParams.get("edit_id") || null;
  const [editProduct, setEditProduct] = useState('')

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
    },
  });

  const { execute, status, result } = useAction(insertOrUpdateProduct, {
    onSuccess({ data }) {
      form.reset();
      if (data?.error) toast.error(data?.error);

      if (data?.success) {
        toast.success(data?.success);
        form.reset();
        router.push("/dashboard/products");
      }
    },
  });

  const onSubmit = (values: z.infer<typeof productSchema>) => {
    const { description, price, title, id } = values;
    execute({ title, description, price, id });
  };

  const isProductExist = async (id: number) => {
    if (isEditParams) {
      const res = await getSingleProductId(id);
      if (res.error) {
        toast.error(res.error);
        router.push("/products");
        return;
      }
      if (res.success) {
        form.setValue("title", res.success?.title);
        form.setValue("description", res.success?.description);
        form.setValue("price", res.success?.price);
        form.setValue("id", res.success?.id);
        setEditProduct(res.success.title)
      }
    }
  };

  useEffect(() => {
    if (isEditParams) {
      isProductExist(Number(isEditParams));
    }
  }, []);

  useEffect(() => {
    form.setValue("description", "");
  }, [form]);

  return (
    <Card>
      <CardHeader>
        <CardTitle> {isEditParams ? 'Edit Product' : 'Create Product' }</CardTitle>
        <CardDescription>{isEditParams ? `Edit your product : ${editProduct} ` : 'Create a new product .'}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Title</FormLabel>
                  <FormControl>
                    <Input placeholder="T-shirt" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Description</FormLabel>
                  <FormControl>
                    <Tiptap val={field.value} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Price</FormLabel>
                  <FormControl>
                    <div className=" flex items-center gap-2  ">
                      <DollarSign
                        size={36}
                        className="p-2 bg-muted rounded-md"
                      />
                      <Input
                        placeholder="Price must show in MMK"
                        {...field}
                        step={100}
                        min={0}
                        type="number"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button  disabled={status === "executing"} type="submit" className="w-full">
             {isEditParams ? 'Update Product' :'Create Product' }
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreateProductForm;
