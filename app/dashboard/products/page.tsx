import { db } from "@/server";
import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import myMan from '../../../public/91041aca4100e4743ba56f6f70497884.jpg'
const Products = async () => {
  const products = await db.query.products.findMany({
    orderBy: (products, { desc }) => [desc(products.id)],
  });

  const productData = products.map((product)=>{
    return {
      id : product.id ,
      price : product.price,
      title : product.title ,
      description : product.description ,
      variants : [],
    image : myMan.src
    }
  })
  return <main>
    <DataTable columns={columns} data={productData} />
  </main>
};

export default Products;
