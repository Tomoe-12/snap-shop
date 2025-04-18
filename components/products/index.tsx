"use client";
import formatCurrency from "@/lib/formatCurrency";
import { ProductsWithVariants, VariantsWithProduct } from "@/lib/infer-type";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

type ProductsProps = {
  productsWithVariants: VariantsWithProduct[];
};
const Products = ({ productsWithVariants }: ProductsProps) => {
  const params = useSearchParams();
  const tagParams = params.get("tag") || "all";

  const [filteredProducts, setFilteredProducts] = useState<
    VariantsWithProduct[]
  >([]);

  // useEffect(() => {
  //   const filteredItem = productsWithVariants.filter(
  //     (product) => product.variantTags[0].tag.toLowerCase() === tagParams
  //   );
  //   setFilteredProducts(filteredItem);
  // }, [tagParams]);
  useEffect(() => {
    if (tagParams === "all") {
      setFilteredProducts(productsWithVariants);
    } else {
      const filteredItem = productsWithVariants.filter(
        (product) => product.variantTags[0].tag.toLowerCase() === tagParams
      );
      setFilteredProducts(filteredItem);
    }
  }, [tagParams, productsWithVariants]);
  

  return (
    <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredProducts.map((product) => (
        <Link
          href={`/products/${product.id}?vid=${product.id}&productId=${product.product.id}&type=${product.productType}&image=${product.variantImages[0].image_url}&title=${product.product.title}&price=${product.product.price} `}
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
            {product.product.title.substring(0, 25)}......
          </h3>
          {/* <p>{product.product.description}</p> */}
          <p className="font-medium text-sm mt-1">
            {formatCurrency(product.product.price)} USD
          </p>
        </Link>
      ))}
    </main>
  );
};

export default Products;
