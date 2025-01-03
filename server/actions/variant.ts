"use server";

import { actionClient } from "./safe-action";
import { db } from "@/server";
import { eq } from "drizzle-orm";
import {
  products,
  productVariants,
  users,
  variantImages,
  variantTags,
} from "../schema";
import { variantSchema } from "@/types/variant-schema";
import { revalidatePath } from "next/cache";

export const createVariant = actionClient
  .schema(variantSchema)
  .action(
    async ({
      parsedInput: {
        color,
        tags,
        id,
        editMode,
        productID,
        variantImage: vImgs,
        productType,
      },
    }) => {
      try {
        if (editMode && id) {
          console.log("update variant");
        }

        if (!editMode) {
          const variant = await db
            .insert(productVariants)
            .values({
              color,
              productType,
              productID,
            })
            .returning();

          const product = await db.query.products.findFirst({
            where: eq(products.id, productID),
          });

          await db.insert(variantTags).values(
            tags.map((tag) => {
              return {
                tag,
                variantID: variant[0].id,
              };
            })
          );
          await db.insert(variantImages).values(
            vImgs.map((img, i) => {
              return {
                image_url: img.url,
                size: img.size.toString(),
                name: img.name,
                variantID: variant[0].id,
                order: i,
              };
            })
          )
          revalidatePath('/dashboard/products')
          return {success : `${product?.title}'s variants added.`}


        }
      } catch (error) {
        console.log("error at createVariant : ", error);
        return { error: "Sth went wrong" };
      }
    }
  );
