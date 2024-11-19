"use client";
import React, { useEffect, useState } from "react";
import ProductDetailsCarousel from "@/components/ProductSingle/ProductDetailsCarousel";
import Wrapper from "@/components/ProductSingle/Wrapper";
import AddToCart from "@/components/Cart/add-to-cart";

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

const ProductDetails = ({ params }: any) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [price, setPrice] = useState<string | undefined>(undefined);
  const [regularPrice, setRegularPrice] = useState<string | undefined>(
    undefined
  );

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

        const availableSize = fetchedProduct.attributes
          .find((attr: any) => attr.name === "Size")
          ?.options.find((size: string) => {
            const variant = fetchedProduct.variations.find((v: any) =>
              v.attributes.some((attr: any) => attr.option === size)
            );
            return variant && variant.stock_status !== "outofstock";
          });

        setSelectedSize(availableSize || null);

        const defaultVariant = fetchedProduct.variations.find((v: any) =>
          v.attributes.some((attr: any) => attr.option === availableSize)
        );
        setSelectedVariant(defaultVariant);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [params]);

  // Handle size selection
  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
    const variant = product?.variations.find((v) =>
      v.attributes.some((attr) => attr.option === size)
    );
    setSelectedVariant(variant);
  };

  // Render loading state if product is not yet available
  if (!product) return <div>Loading...</div>;

  // console.log(selectedVariant,"asdsa");

  return (
    <div className="w-full md:py-20">
      <Wrapper>
        <div className="flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[50px]">
          {/* Left column: Carousel */}
          <div className="w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-[600px] mx-auto lg:mx-0">
            <ProductDetailsCarousel
              images={
                selectedVariant
                  ? [selectedVariant.image, ...product.images.slice(1)]
                  : product.images
              }
            />
          </div>

          {/* Right column: Product details */}
          <div className="flex-[1] py-3">
            {/* Product Title */}
            <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-2 leading-tight uppercase border-b pb-3">
              {product.name}
            </h1>

            {/* Price */}
            <div className="py-4">
              {selectedVariant &&
              selectedVariant.price !== selectedVariant.regular_price ? (
                <div className="text-xl font-semibold">
                  <del className="text-xl font-semibold">₹{regularPrice}</del> ₹
                  {price}
                </div>
              ) : (
                <div className="text-xl font-semibold">₹{regularPrice}</div>
              )}
              <div className="text-md font-medium text-black/[0.5]">
                incl. of taxes
              </div>
            </div>

            {/* Size selection */}
            <div className="mb-10">
              <div className="flex justify-between mb-2">
                <span className="text-md font-semibold">Select Size</span>
                <span className="text-md font-medium text-black/[0.5] cursor-pointer">
                  Size Guide
                </span>
              </div>

              <div
                id="sizesGrid"
                className="grid grid-cols-6 sm:grid-cols-10 lg:grid-cols-6 xl:grid-cols-9 2xl:grid-cols-12 gap-2"
              >
                {product.attributes
                  .find((attr) => attr.name === "Size")
                  ?.options.map((size, index) => {
                    const variant = product.variations.find((v) =>
                      v.attributes.some((attr) => attr.option === size)
                    );
                    const isOutOfStock = variant?.stock_status === "outofstock";

                    return (
                      <div
                        key={index}
                        onClick={() => !isOutOfStock && handleSizeChange(size)}
                        className={`border text-sm xl:text-lg flex items-center justify-center rounded-md text-center w-12 h-12 sm:w-14 sm:h-14 lg:w-12 lg:h-12 xl:w-14 xl:h-14 font-medium cursor-pointer ${
                          selectedSize === size
                            ? "border-black"
                            : "border-gray-400"
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
            <AddToCart
              product={product}
              selectedVariant={selectedVariant}
              regular={setRegularPrice}
              price={setPrice}
            />

            <button className="w-full py-2 bg-black text-white text-lg font-medium transition-transform active:scale-95 hover:opacity-75 mb-10 uppercase">
              Buy it Now
            </button>

            {/* Product Description */}
            <div>
              <h2 className="text-xl font-bold mb-5">Product Details</h2>
              <div
                className="text-md mb-5"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default ProductDetails;
