"use client";
import { VariantsWithProduct } from "@/lib/infer-type";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import Image from "next/image";
import { format } from "path";
import formatCurrency from "@/lib/formatCurrency";
import Link from "next/link";

type SearchBoxProps = {
  productsWithVariants: VariantsWithProduct[];
};

const SearchBox = ({ productsWithVariants }: SearchBoxProps) => {
  const [searchKey, setSearchKey] = useState("");
  const [searchResult, setSearchResult] = useState<VariantsWithProduct[]>([]);

  useEffect(() => {
    if (searchKey !== "") {
      const filteredProducts = productsWithVariants.filter((product) => {
        const searchItem = searchKey.toLowerCase();
        const itemName = product.product.title.toLowerCase();

        return itemName.includes(searchItem);
      });
      setSearchResult(filteredProducts);
    }
    if (searchKey === "") {
      setSearchResult([]);
    }
  }, [searchKey]);

  return (
    <main className="my-6 relative">
      <div className="relative ">
        <Search
          className="absolute top-1/2 left-3 -translate-y-1/2  "
          size={20}
        />
        <Input
          type="text"
          placeholder="Search products ..."
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
          className="ps-10"
        />
      </div>
      {searchResult.length > 0 && (
        <div className=" absolute w-full max-h-80 overflow-y-scroll bg-white shadow-md rounded-md p-2 mt-4">
          <p className="my-2 text-sm font-medium ps-4 ">
            <span className="font-bold">{searchResult.length}</span> results
            found.
          </p>
          {searchResult.map((product) => (
            <ul key={product.id}>
              <li>
                <Link
                  href={`/products/${product.id}?vid=${product.id}&productId=${product.product.id}&type=${product.productType}&image=${product.variantImages[0].image_url}&title=${product.product.title}&price=${product.product.price} `}
                  className="flex items-center justify-between gap-2 py-2 border-b"
                >
                  <Image
                    src={product.variantImages[0].image_url}
                    alt={product.product.title}
                    width={50}
                    height={50}
                    className="rounded-md"
                  />
                  <h2>{product.product.title}</h2>
                  <p>{formatCurrency(product.product.price)} USD </p>
                </Link>
              </li>
            </ul>
          ))}
        </div>
      )}
      {searchResult.length === 0 && searchKey !== "" && (
        <p className="my-2 text-sm font-medium ps-4 absolute mt-4 p-2 text-red-500 bg-white shadow-sm w-full  ">
          No result found with this product name .
        </p>
      )}
    </main>
  );
};

export default SearchBox;
