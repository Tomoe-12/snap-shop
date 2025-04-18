import Products from "@/components/products";
import SearchBox from "@/components/products/search-box";
import TagFilter from "@/components/products/tag-filter";
import { Button } from "@/components/ui/button";
import { db } from "@/server";
import { productVariants } from "@/server/schema";
import Image from "next/image";

export default async function Home() {
  const productsWithVariants = await db.query.productVariants.findMany({
    with: {
      variantImages: true,
      variantTags: true,
      product: true,
    },
    orderBy: (productVariants, { desc }) => [desc(productVariants.id)],
  });

  console.log("productsWithVariants", productsWithVariants);
  
  return (
   <main>
    <SearchBox productsWithVariants={productsWithVariants} />
    <TagFilter/>
    <Products productsWithVariants={productsWithVariants} />
    
   </main>
  );
}
  