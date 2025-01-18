"use client";

import { useAction } from "next-safe-action/hooks";
import AuthForm from "@/components/auth/auth-form";
import React, { useState } from "react";
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
import { toast } from "sonner";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const Login = () => {
  const [isTwoFactorOn, setIsTwoFactorOn] = useState(false);
  console.log("is two factor on or not", isTwoFactorOn);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      code: "",
    },
  });

  // const { execute, status, result } = useAction(login, {
  //   onSuccess({ data }) {
  //     form.reset();
  //     if (data?.error) {
  //       toast.error(data?.error);
  //       form.reset();
  //     }
  //     if (data?.success) {
  //       console.log("come in data.success");
  //       toast.success(data?.success);
  //       if (data.redirectTo) {
  //         setTimeout(() => {
  //           window.location.href = data.redirectTo;
  //         }, 1300);
  //       }
  //     }
  //     if (data?.twoFactor) {
  //       toast.success(data?.twoFactor);
  //       setIsTwoFactorOn(true);
  //     }
  //   },
  // });

  const { execute, status, result } = useAction(login, {
    onSuccess({ data }) {
      if (data?.error) {
        toast.error(data?.error);
        return; // Stop further actions
      }

      if (data?.twoFactor) {
        toast.success(data?.twoFactor, {
          action: {
            label: "Open Gmail",
            onClick: () => {
              window.open("https://mail.google.com", "_blank");
            },
          },
        });
        setIsTwoFactorOn(true);
        return; // Wait for the second submission
      }

      if (data?.success) {
        toast.success(data?.success);
        if (data.redirectTo) {
          setTimeout(() => {
            window.location.href = data.redirectTo;
          }, 1300);
        }
        form.reset(); // Reset only after full success
      }
    },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    console.log("values", values);

    const { email, password, code } = values;
    if (isTwoFactorOn) {
      // Handle second submission (two-factor authentication)
      if (!code) {
        toast.error("Please enter the two-factor authentication code.");
        return;
      }
    } else {
      // Handle initial login submission
      if (!email || !password) {
        toast.error("Please provide email and password.");
        return;
      }
    }

    execute({ email, password, code });
  };

  return (
    <div className="">
      <AuthForm
        formTitle={isTwoFactorOn ? "Please Enter Your code" : "Login"}
        footerLabel="Don't have an Account ?"
        footerHerf="/auth/register"
        showProvider
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {isTwoFactorOn && (
              <FormField
                name="code"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>We sent a code to your email.</FormLabel>
                    <FormControl>
                      <InputOTP
                        {...field}
                        maxLength={6}
                        disabled={status === "executing"}
                        onChange={(value) => field.onChange(value)} // Propagate changes
                      >
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {!isTwoFactorOn && (
              <div className="space-y-3">
                <FormField
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="snapLikeADoo@gmail.com"
                          {...field}
                          disabled={status === "executing"}
                        />
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
                        <Input
                          placeholder="******"
                          {...field}
                          type="password"
                          disabled={status === "executing"}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button variant={"link"} size={"sm"} className="pl-0 mb-1">
                  <Link href={"/auth/reset"}>Forget Password</Link>
                </Button>
              </div>
            )}

            <Button
              type="submit"
              className={cn(
                "w-full my-4",
                status === "executing" && "animate-pulse"
              )}
              disabled={status === "executing"}
            >
              {isTwoFactorOn ? "Verify Code " : "Login"}
            </Button>
          </form>
        </Form>
      </AuthForm>
    </div>
  );
};

export default Login;
