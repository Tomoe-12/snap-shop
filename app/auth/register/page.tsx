"use client";

import { useAction } from "next-safe-action/hooks";
import AuthForm from "@/components/auth/auth-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { registerSchema } from "@/types/register-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { register } from "@/server/actions/register-action";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { redirect } from "next/navigation";

const Register = () => {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { execute, status, result } = useAction(register, {
    onSuccess({ data }) {
      form.reset();
      console.log('data',data);

      toast.success(data?.success , {
        action : {
          label : 'Open Gmail',
          onClick :()=>{window.open('https://mail.google.com','_blank') }
        }
      });
    },
  });

  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    const { name, email, password } = values;
    execute({
      name,
      email,
      password,
    });
  };
  return (
    <div>
      <AuthForm
        footerLabel="Already have an account ?"
        showProvider
        footerHerf="/auth/login"
        formTitle="Create an Account"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-3">
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="snapsnap" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="snapLikeADoo@gmail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="******" {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              className={cn(
                "w-full my-4",
                status === "executing" && "animate-pulse"
              )}
            >
              Register
            </Button>
          </form>
        </Form>
      </AuthForm>
    </div>
  );
};

export default Register;
