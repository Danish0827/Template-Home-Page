"use client";
import React, { useState } from "react";
import ProductDetails from "./ProductDeatails";
import Reviews from "./Reviews";
import ReviewComponent from "./ReviewComponent";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  regular_price: string;
  images: Array<{ src: string }>;
  attributes: Array<{ name: string; options: string[] }>;
  variations: Array<{
    id: number;
    price: string;
    regular_price: string;
    stock_status: string;
    image: { src: string };
    attributes: Array<{ name: string; option: string }>;
  }>;
}
const ProductSingle = ({ params }: any) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState([]);

  return (
    <>
      <ProductDetails params={params} productData={setProduct} />
      <Reviews products={product} reviewsData={setReviews} />
      <ReviewComponent reviews={reviews} />
    </>
  );
};

export default ProductSingle;
