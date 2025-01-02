import { variantSchema } from "@/types/variant-schema";
import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import * as z from "zod";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { UploadDropzone } from "@/app/api/uploadthing/uploadthing";
import Image from "next/image";
import { Trash, X } from "lucide-react";
import { cn } from "@/lib/utils";

const VariantImages = () => {
  const { control, getValues, setError } =
    useFormContext<z.infer<typeof variantSchema>>();

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "variantImage",
  });

  return (
    <div>
      <FormField
        control={control}
        name="variantImage"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Upload Images</FormLabel>
            <FormDescription>
              You Can upload up to 10 images at once.
            </FormDescription>
            <FormControl>
              <UploadDropzone
                endpoint={"variantImagesUploader"}
                className="cursor-pointer ut-label:text-primary ut-allowed-content:text-primary ut-upload-icon:text-primary ut-button:bg-primary ut-button:text-white"
                onBeforeUploadBegin={(files) => {
                  files.forEach((file) => {
                    append({
                      name: file.name,
                      size: file.size,
                      url: URL.createObjectURL(file),
                    });
                  });
                  return files;
                }}
                onUploadError={(error) => {
                  setError("variantImage", {
                    type: "validate",
                    message: error.message,
                  });
                }}
                onClientUploadComplete={(data) => {
                  const variantImages = getValues("variantImage");
                  variantImages.forEach((img, i) => {
                    if (img.url.startsWith("blob:")) {
                      const image = data.find((img) => img.name === field.name);
                      if (image) {
                        update(i, {
                          url: image.url,
                          name: image.name,
                          size: image.size,
                          key: image.key,
                        });
                      }
                    }
                  });
                }}
                config={{ mode: "auto" }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="flex overflow-x-scroll gap-2 my-2 border-red-00 border ">
        {fields.map((field, i) => (
          <div
            key={i}
            className={cn(
              "flex border border-gray-400 rounded-md relative group overflow-hidden",
              field.url.startsWith("blob:")
                ? "animate-pulse "
                : ""
            )}
          >
            <Image
              src={field.url}
              alt={field.name}
              width={100}
              height={70}
              className="object-cover"
            />
            <div
              className="absolute w-full flex justify-center bg-gray-800/60 -bottom-0 translate-y-2 cursor-pointer  text-red-600 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
              onClick={(e) => {
                e.preventDefault();
                remove(i);
              }}
            >
              <Trash className="w-5 h-5 my-0.5 cursor-pointer  rounded-full text-red-600 fill-red-600" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VariantImages;
