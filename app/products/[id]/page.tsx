import VariantPicker from "@/components/products/variant-picker";
import formatCurrency from "@/lib/formatCurrency";
import { db } from "@/server";
import { productVariants } from "@/server/schema";
import { eq } from "drizzle-orm";
import React from "react";

type SingleProductProps = {
  params: {
    id: number;
  };
};

//  improve user experience by using static params should used it 
export async function generateStaticParams() {
  const data = await db.query.productVariants.findMany({
    with : {
      variantImages : true ,
      variantTags : true ,
      product : true ,
    }
  })
  if(data){
    const idArr = data.map((d) => ({
      id : d.id.toString()
    }))
    return idArr;
  }
  return []
}

const SingleProduct = async ({ params }: SingleProductProps) => {
  const productsWithVariants = await db.query.productVariants.findFirst({
    where: eq(productVariants.id, params.id),
    with: {
      product: {
        with: {
          productVariants: {
            with: {
              variantImages: true,
              variantTags: true,
            },
          },
        },
      },
    },
  });
  return (
    <main>
      {productsWithVariants && (
        <main>
          <div></div>
          <div>
            <h2 className="font-bold text-2xl ">
              {productsWithVariants.product.title}
            </h2>
            <p className=" text-xs bg-gray-200 font-medium w-fit p-1 my-2 rounded-md  ">
              {productsWithVariants.productType} Variant
            </p>
            <div
              dangerouslySetInnerHTML={{
                __html: productsWithVariants.product.description,
              }}
            />
            <p className=" text-2xl font-bold my-2 ">
              {formatCurrency(productsWithVariants.product.price)} Ks
            </p>
            <div className=" flex gap-2 items-center ">
              <p className=" font-medium ">Available Variants : </p>
              {productsWithVariants.product.productVariants.map((v) => (
                <VariantPicker
                  key={v.id}
                  {...v}
                  title={productsWithVariants.product.title}
                  price={productsWithVariants.product.price}
                  image={v.variantImages[0].image_url}
                  productId={productsWithVariants.product.id}
                />
              ))}
            </div>
          </div>
        </main>
      )}
    </main>
  );
};

export default SingleProduct;
