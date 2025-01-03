import { db } from "@/server";
import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import placeholder from '../../../public/placeholder.jpg'
const Products = async () => {
  const products = await db.query.products.findMany({
    with : {
      productVariants : { 
        with : {variantImage : true , variantTags : true }
      }
    },
    orderBy: (products, { desc }) => [desc(products.id)],
  });

  const productData = products.map((product)=>{
    if(product.productVariants.length === 0){
      return {
        id : product.id ,
        price : product.price,
        title : product.title ,
        description : product.description ,
        variants : [] ,
      image :  placeholder.src
      }
    }
    return {
      id : product.id ,
      price : product.price,
      title : product.title ,
      description : product.description ,
      variants : product.productVariants ,
    image : product.productVariants[0].variantImage[0].image_url 
    }
  })
  return <main>
    <DataTable columns={columns} data={productData} />
  </main>
};

export default Products;
