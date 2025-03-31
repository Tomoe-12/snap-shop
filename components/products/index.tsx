import formatCurrency from "@/lib/formatCurrency";
import { VariantsWithProduct } from "@/lib/infer-type";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type ProductsProps = {
  productsWithVariants: VariantsWithProduct[];
};
const   Products = ({ productsWithVariants }: ProductsProps) => {
  console.log("productsWithVariants", productsWithVariants);

  return (
    <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {productsWithVariants.map((product) => (
        <Link
          href={`/products/${product.id}?productId=${product.product.id}&type=${product.productType}&image=${product.variantImages[0].image_url}&title=${product.product.title}&price=${product.product.price} `}
          key={product.id}
          className="bg-white p-4 rounded-md shadow-md"
        >
          <Image
            src={product.variantImages[0].image_url}
            alt={product.product.title}
            width={400}
            height={300}
          />
          <hr className="my-2" />
          <h3 className="font-semibold  ">
            {product.product.title.substring(0, 25)}
          </h3>
          <p>{product.product.description}</p>
          <p className="font-medium text-sm mt-1">
            {formatCurrency(product.product.price)} MMK
          </p>
        </Link>
      ))}
    </main>
  );
};

export default Products;
