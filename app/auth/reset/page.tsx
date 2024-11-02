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
import { resetPasswordSchema } from "@/types/reset-password-schema";
import { resetPassword } from "@/server/actions/reset-password";

const ResetPassword = () => {
  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const { execute, status, result } = useAction(resetPassword, {
    onSuccess({ data }) {
      form.reset();
      if (data?.error) {
        toast.error(data?.error);
      }
      if (data?.success) {
        toast.success(data?.success, {
          action: {
            label: "Open Gmail",
            onClick: () => {
              window.open("https://mail.google.com", "_blank");
            },
          },
        });
      }
    },
  });

  const onSubmit = (values: z.infer<typeof resetPasswordSchema>) => {
    const { email } = values;
    execute({
      email,
    });
  };

  return (
    <div>
      <AuthForm
        footerLabel="Already have an account ?"
        showProvider={false}
        footerHerf="/auth/login"
        formTitle="Reset your Password"
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
            </div>

            <Button
              className={cn(
                "w-full mt-4",
                status === "executing" && "animate-pulse"
              )}
              disabled={status === "executing"}
            >
              Reset Password
            </Button>
          </form>
        </Form>
      </AuthForm>
    </div>
  );
};

export default ResetPassword;
