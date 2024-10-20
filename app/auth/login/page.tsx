"use client";

import { useAction } from "next-safe-action/hooks";
import AuthForm from "@/components/auth/auth-form";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/types/login-schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { login } from "@/server/actions/login-action";
import { cn } from "@/lib/utils";

const Login = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { execute, status } = useAction(login);

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    const {email,password,} = values
    execute({email,password})
  };

  return (
    <div>
      <AuthForm
        formTitle="Login"
        footerLabel="Don't have an Account ?"
        footerHerf="/auth/register"
        showProvider
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-3">
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

              <Button variant={"link"} size={"sm"} className="pl-0 mb-1">
                <Link href={"/auth/reset"}>Forget Password</Link>
              </Button>
            </div>

            <Button
              type="submit"
              className={cn(
                "w-full my-4",
                status === "executing" && "animate-pulse"
              )}
            >
              Login
            </Button>
          </form>
        </Form>
      </AuthForm>
    </div>
  );
};

export default Login;
