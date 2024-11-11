"use client";

import { settingsSchema } from "@/types/settings-schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { updateDisplayName } from "@/server/actions/settings";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

type profilefileProps = {
  name: string;
  email: string;
};
const ProfileForm = ({ name, email }: profilefileProps) => {
  const form = useForm<z.infer<typeof settingsSchema>>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      name,
      email,
    },
  });

  const { execute, status, result } = useAction(updateDisplayName, {
    onSuccess({ data }) {
      form.reset();
      if (data?.error) toast.error(data?.error);

      if (data?.success) toast.success(data?.success);
    },
  });

  const onSubmit = (values: z.infer<typeof settingsSchema>) => {
    const { name, email } = values;
    execute({
      name,
      email,
    });
  };
  return (
    <main>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 px-4 md:px-0"
        >
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Display Name </FormLabel>
                <FormControl>
                  <Input placeholder="snapsnap" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className={cn(
              "w-full mb-4",
              status === "executing" && "animate-pulse"
            )}
            disabled={status === "executing"}
          >
            Save
          </Button>
        </form>
      </Form>
    </main>
  );
};

export default ProfileForm;
