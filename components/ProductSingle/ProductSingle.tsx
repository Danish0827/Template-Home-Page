import React from "react";
import ProductDetails from "./ProductDeatails";

const ProductSingle = ({ params }: any) => {
  return (
    <>
      <ProductDetails params={params} />
    </>
  );
};

export default ProductSingle;
