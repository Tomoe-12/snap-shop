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
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { register } from "@/server/actions/register-action";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import { changePasswordSchema } from "@/types/change-password-schema";
import { changePassword } from "@/server/actions/change-password";
import { signOut } from "next-auth/react";
const ChangePassword = () => {
  const [token,setToken] = useState<string | null>(null);
  const form = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  useEffect(()=>{
    const searchParam = new URLSearchParams(window.location.search);
    setToken(searchParam.get("token"));
  })

  // const searchParam = useSearchParams();
  // const token = searchParam.get("token");

  const { execute, status, result } = useAction(changePassword, {
    onSuccess({ data }) {
      form.reset();
      if (data?.error) {
        toast.error(data?.error);
      }
      if (data?.success) {
        signOut({ callbackUrl: "/auth/login" });
        toast.success(data?.success);
      }
    },
  });

  const onSubmit = (values: z.infer<typeof changePasswordSchema>) => {
    const { password } = values;
    execute({
      password,
      token,
    });
  };

  if(!token){
    return <div>loading....</div>
  }

  return (
    <div>
      <AuthForm
        footerLabel="Already have an account ?"
        showProvider={false}
        footerHerf="/auth/login"
        formTitle="Change your Password"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-3">
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Neww Password</FormLabel>
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
            </div>

            <Button
              className={cn(
                "w-full mt-4",
                status === "executing" && "animate-pulse"
              )}
              disabled={status === "executing"}
            >
              Change Password
            </Button>
          </form>
        </Form>
      </AuthForm>
    </div>
  );
};

export default ChangePassword;
