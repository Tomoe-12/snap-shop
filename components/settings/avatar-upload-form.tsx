"use client";

import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { UploadButton } from "@/app/api/uploadthing/uploadthing";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { avatarSchema } from "@/types/settings-schema";
import { useAction } from "next-safe-action/hooks";
import { profileAvatarUpdate } from "@/server/actions/settings";
import { toast } from "sonner";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";

type AvatarUploadFormProps = {
  name: string;
  image: string | null;
};

const AvatarUploadForm = ({ image, name }: AvatarUploadFormProps) => {
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm({
    resolver: zodResolver(avatarSchema),
    defaultValues: {
      image : image || '',
    },
  });

  const { execute, status, result } = useAction(profileAvatarUpdate, {
    onSuccess({ data }) {
      form.reset();
      if (data?.error) {
        toast.error(data?.error);
        form.reset();
      }
      if (data?.success) {
        toast.success(data?.success);
      }
    },
  });

  const onSubmit = (values: z.infer<typeof avatarSchema>) => {
    console.log("values", values);

    const { image } = values;
    execute({ image }); 
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 px-4 lg:px-0"
        >
          <FormField
            name="image"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <Avatar className="w-14 h-14 ">
                  {form.getValues("image") ? (
                    <AvatarImage src={form.getValues('image')!} alt="Profile" />
                  ) : (
                    <AvatarFallback className="bg-primary text-white font-semibold w-32 ">
                      {name![0].toUpperCase()}
                    </AvatarFallback>
                  )}
                </Avatar>
                <UploadButton
                  className="scale-75 ut-button:bg-primary ut-button:hover:bg-green-500"
                  endpoint="imageUploader"
                  onUploadBegin={() => {
                    setIsUploading(true);
                  }}
                  onUploadError={() => {
                    form.setError('image', { 
                        type : 'validate',
                        message : 'Error uploading image'
                    });
                    setIsUploading(false);
                    return 
                  }}
                  content={{
                    button({ ready }) {
                      if (ready) {
                        return <div>Upload Avatar</div>;
                      }
                      return <div>Uploading...</div>;
                    },
                  }}
                  onClientUploadComplete={(res)=> {
                    console.log('res from thing ',res);
                    const uploadUrl = res[0].url
                    form.setValue("image",uploadUrl)
                    setIsUploading(false)
                    return
                  }}
                />
                <FormControl>
                  <Input type="hidden" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className={cn(
              "w-full my-4",
              status === "executing" && "animate-pulse"
            )}
            disabled={status === "executing"}
          >
            Save Changes
          </Button>
        </form>
      </Form>
    </>
  );
};

export default AvatarUploadForm;
