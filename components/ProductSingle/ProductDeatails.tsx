"use client";
import React, { useEffect, useState } from "react";
import ProductDetailsCarousel from "@/components/ProductSingle/ProductDetailsCarousel";
import Wrapper from "@/components/ProductSingle/Wrapper";

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
    regular_price: string; // Add regular_price for the variant
    stock_status: string;
    images: Array<{ src: string }>; // Add images field for each variation
    attributes: Array<{ name: string; option: string }>;
  }>;
}

const ProductDetails = ({ params }: any) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<any>(null); // Store the selected variant details

  // Fetch product data based on slug
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SITE_URL}/api/get-products?slug=${params}&includeVariations=true`
        );
        const data = await res.json();
        const fetchedProduct = data.products[0];
        setProduct(fetchedProduct);

        // Find the first available size that is in stock
        const availableSize = fetchedProduct.attributes
          .find((attr: any) => attr.name === "Size")
          ?.options.find((size: string) => {
            const variant = fetchedProduct.variations.find((v: any) =>
              v.attributes.some((attr: any) => attr.option === size)
            );
            return variant && variant.stock_status !== "outofstock";
          });

        setSelectedSize(availableSize || null); // Set first available size as default if found

        const defaultVariant = fetchedProduct.variations.find((v: any) =>
          v.attributes.some((attr: any) => attr.option === availableSize)
        );
        setSelectedVariant(defaultVariant);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [params.slug]);

  // Handle size selection
  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
    const variant = product?.variations.find((v) =>
      v.attributes.some((attr) => attr.option === size)
    );
    setSelectedVariant(variant);
  };

  if (!product) {
    return <div>Loading...</div>; // Display loader while product is fetching
  }

  return (
    <div className="w-full md:py-20">
      <Wrapper>
        <div className="flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[50px]">
          {/* Left column: Carousel */}
          <div className="w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-[600px] mx-auto lg:mx-0">
            {/* Show variant images if available, else show product images */}
            <ProductDetailsCarousel
              images={
                Array.isArray(selectedVariant?.images) &&
                selectedVariant?.images.length > 0
                  ? selectedVariant.images
                  : product.images
              }
            />
          </div>

          {/* Right column: Product details */}
          <div className="flex-[1] py-3">
            {/* Product Title */}
            <div className="text-[34px] font-semibold mb-2 leading-tight uppercase border-b pb-3">
              {product.name}
            </div>

            {/* Price */}
            <div className="py-4">
              <div className="text-xl font-semibold">
                <div>
                  {selectedVariant.price !== selectedVariant.regular_price ? (
                    <div className="text-xl font-semibold">
                      <del className="text-xl font-semibold">
                        {selectedVariant.regular_price
                          ? `₹${selectedVariant.regular_price}`
                          : ""}
                      </del>{" "}
                      ₹{selectedVariant.price}
                    </div>
                  ) : (
                    <div className="text-xl font-semibold">₹{selectedVariant.regular_price}</div>
                  )}
              
              </div>
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
                  ?.options.map((size, index) => {
                    // Find the corresponding variant for the current size option
                    const variant = product.variations.find((v) =>
                      v.attributes.some((attr) => attr.option === size)
                    );

                    // Check if the variant is out of stock
                    const isOutOfStock = variant?.stock_status === "outofstock";

                    return (
                      <div
                        key={index}
                        onClick={() => !isOutOfStock && handleSizeChange(size)} // Only allow clicking if in stock
                        className={`border rounded-md text-center py-3 font-medium cursor-pointer ${
                          selectedSize === size ? "border-black" : ""
                        } ${
                          isOutOfStock
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:border-black"
                        }`}
                      >
                        {size}
                      </div>
                    );
                  })}
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
