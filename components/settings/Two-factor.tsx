"use client";
import React, { useEffect } from "react";
import SettingsCard from "./settings-card";
import { Button } from "../ui/button";
import { Check, X } from "lucide-react";
import { auth } from "@/server/auth";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { twoFactorSchema } from "@/types/settings-schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { twoFactorToogle } from "@/server/actions/settings";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
type twoFactorProps = {
  isTowFactorEnable: boolean;
  email: string;
};
const TwoFactor = ({ isTowFactorEnable, email }: twoFactorProps) => {
  const form = useForm<z.infer<typeof twoFactorSchema>>({
    resolver: zodResolver(twoFactorSchema),
    defaultValues: {
      isTowFactorEnable,
      email,
    },
  });

  const { execute, status, result } = useAction(twoFactorToogle, {
    onSuccess({ data }) {
      form.reset();
      if (data?.error) {
        toast.error(data?.error);
      }
      if (data?.success) {
        console.log("come in data.success");
        toast.success(data?.success);
      }
    },
  });

  const onSubmit = (values: z.infer<typeof twoFactorSchema>) => {
    const { isTowFactorEnable, email } = values;
    execute({ isTowFactorEnable, email });
  };

  useEffect(() => {
    form.setValue("isTowFactorEnable", isTowFactorEnable);
  }, [isTowFactorEnable]);

  return (
    <SettingsCard>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name="isTowFactorEnable"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Two Factor Authentication</FormLabel>
                <FormDescription>
                  {isTowFactorEnable ? "Disable" : "Enable"} Two Factor
                  Authentication For account{" "}
                </FormDescription>
                <FormControl>
                  <Switch
                    disabled={status === "executing"}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button
            className={cn(
              "w-full my-4",
              status === "executing" && "animate-pulse",
              isTowFactorEnable ? "bg-red-500 hover:bg-red-700" : "bg-primary"
            )}
            disabled={status === "executing"}
          >
            {isTowFactorEnable ? "Disable" : "Enable"}
          </Button>
        </form>
      </Form>
    </SettingsCard>
  );
};

export default TwoFactor;
