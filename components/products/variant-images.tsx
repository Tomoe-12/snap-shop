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
    </div>
  );
};

export default VariantImages;
