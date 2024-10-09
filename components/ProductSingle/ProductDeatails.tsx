"use client";
import React, { useEffect, useState } from "react";
import ProductDetailsCarousel from "@/components/ProductSingle/ProductDetailsCarousel";
import Wrapper from "@/components/ProductSingle/Wrapper";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  images: Array<{ src: string }>;
  attributes: Array<{ name: string; options: string[] }>;
}

const ProductDetails = ({ params }: any) => {
  const [product, setProduct] = useState<Product | null>(null);

  // Fetch product data based on slug
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SITE_URL}/api/get-products?slug=${params}`
        );
        const data = await res.json();
        setProduct(data.products[0]); // Access the first product in the array
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [params.slug]);

  if (!product) {
    return <div>Loading...</div>; // Display loader while product is fetching
  }

  return (
    <div className="w-full md:py-20">
      <Wrapper>
        <div className="flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[50px]">
          {/* Left column: Carousel */}
          <div className="w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-[600px] mx-auto lg:mx-0">
            <ProductDetailsCarousel images={product.images} />
          </div>

          {/* Right column: Product details */}
          <div className="flex-[1] py-3">
            {/* Product Title */}
            <div className="text-[34px] font-semibold mb-2 leading-tight uppercase border-b pb-3">
              {product.name}
            </div>

            {/* Price */}
            <div className="py-4">
              <div className="text-lg font-semibold">
                MRP: ₹{product.price} {/* Fixed currency symbol */}
              </div>
              <div className="text-md font-medium text-black/[0.5]">
                incl. of taxes
              </div>
            </div>

            {/* Size selection */}
            <div className="mb-10">
              <div className="flex justify-between mb-2">
                <div className="text-md font-semibold">Select Size</div>
                <div className="text-md font-medium text-black/[0.5] cursor-pointer">
                  Size Guide
                </div>
              </div>

              <div id="sizesGrid" className="grid grid-cols-12 gap-2">
                {product.attributes
                  .find((attr) => attr.name === "Size")
                  ?.options.map((size, index) => (
                    <div
                      key={index}
                      className="border rounded-md text-center py-3 font-medium hover:border-black cursor-pointer"
                    >
                      {size}
                    </div>
                  ))}
              </div>
            </div>

            {/* Add to Cart and Buy Now buttons */}
            <button className="w-full py-2 border border-black text-lg font-medium transition-transform active:scale-95 flex items-center justify-center gap-2 hover:opacity-75 uppercase mb-3">
              Add to Cart
            </button>
            <button className="w-full py-2 bg-black text-white text-lg font-medium transition-transform active:scale-95 hover:opacity-75 mb-10 uppercase">
              Buy it Now
            </button>

            {/* Product Description */}
            <div>
              <div className="text-xl font-bold mb-5">Product Details</div>
              <div
                className="text-md mb-5"
                dangerouslySetInnerHTML={{ __html: product.description }} // Handle HTML content safely
              />
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default ProductDetails;
