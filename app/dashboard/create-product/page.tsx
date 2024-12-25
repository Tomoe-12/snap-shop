// "use client";

// import { productSchema } from "@/types/product-schema";
// import { zodResolver } from "@hookform/resolvers/zod";
// import React from "react";
// import { useForm } from "react-hook-form";
// import * as z from "zod";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { DollarSign } from "lucide-react";
// import Tiptap from "./tip-tap";


// const CreateProduct = () => {
//   const form = useForm<z.infer<typeof productSchema>>({
//     resolver: zodResolver(productSchema),
//     defaultValues: {
//       title: "",
//       description: "",
//       price: 0,
//     },
//   });

//   const onSubmit = (values: z.infer<typeof productSchema>) => {
//     console.log(values);
//   };
//   return (
   
//   );
// };

// export default CreateProduct;

import { auth } from '@/server/auth'
import { redirect } from 'next/navigation'
import React from 'react'
import CreateProductForm from './create-product-form'

const CreateProduct = async() => {

  const session = await auth()
  if(session?.user.role !== 'admin')return redirect('/dashboard/settings')
  return (
    <CreateProductForm>
      
    </CreateProductForm>
  )
}

export default CreateProduct
