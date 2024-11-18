"use client";
import React, { useEffect, useState } from "react";
// import { products } from "@/lib/headerData";
import { SlEqualizer } from "react-icons/sl";
import { IoIosArrowDown } from "react-icons/io";
import Filter from "./Filter";

interface Product {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  price: string;
  images: { src: string; name: string }[];
  attributes: { name: string; options: string[] }[];
}
const ProductPart = ({ params }: any) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/get-products?categorySlug=${params}`
      );
      const data = await response.json();
      // console.log(data); // Log the data to check its structure
      if (Array.isArray(data.products)) {
        setProducts(data.products); // Set the state only if data is an array
      } else {
        console.error("Fetched data is not an array:", data);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      {products && (
        <div className="page-width page-width--flush-small py-16 px-3 md:px-6 lg:px-10">
          <div className="pb-5">
            <h3 className="text-xl md:text-2xl lg:text-3xl pb-4">
              Best Sellers
            </h3>
            <p className={`text-lg ${isExpanded ? "" : "line-clamp-2"}`}>
              Short kurtas and kurtis make an excellent fashion choice for women
              and girls as they are versatile as well as stylish in their
              appearance. These designs feature cuts that are modern such as
              A-line styles and most of them are below knee length. The short
              kurtis and tunics can be worn for any occasion from the office to
              the festive occasions and can be coordinated with your favorite
              pair of leggings, palazzos, or jeans in order to achieve looks
              that will make you look and feel good. Made of different knitting
              materials such as cotton, silk, rayons and constructed in various
              colors and patterns, these could suit every woman's taste.
              <span
                onClick={toggleReadMore}
                className="text-blue-700 text-lg font-semibold hover:text-blue-800 underline pl-2 cursor-pointer"
              >
                {isExpanded ? "Read less" : ""}
              </span>
            </p>
            {isExpanded === false && (
              <span
                onClick={toggleReadMore}
                className="text-blue-700 text-lg font-semibold hover:text-blue-800 underline pl-2 cursor-pointer"
              >
                {isExpanded ? "" : "Read more"}
              </span>
            )}
          </div>

          <Filter count={products.length} />

          {Array.isArray(products) && products.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((product: Product) => (
                <div
                  key={product.id}
                  className="rounded-lg border shadow-md"
                >
                  <div className="relative">
                    <img
                      className="w-full h-auto rounded-t-lg"
                      src={product.images[0]?.src} // Optional chaining for safety
                      alt={product.name}
                    />
                    {product.images[1] && (
                      <img
                        className="absolute top-0 rounded-t-lg left-0 w-full h-full opacity-0 hover:opacity-100 transition-opacity"
                        src={product.images[1]?.src}
                        alt={product.name}
                      />
                    )}
                  </div>

                  <a
                    href={`/shop/${params}/product/${product.slug}`}
                    className="block mt-2 lg:text-lg font-semibold text-center line-clamp-1"
                  >
                    {product.name}
                  </a>

                  <div className="text-center mt-2 font-semibold text-gray-700">
                    {product.price
                      ? `₹${parseFloat(product.price).toLocaleString()}`
                      : "Price Not Available"}
                  </div>

                  {/* Size Variants */}
                  <div className="flex justify-center flex-wrap mt-3 space-x-1">
                    {product.attributes
                      .find((attr) => attr.name === "Size")
                      ?.options.map((size, index) => (
                        <span
                          key={index}
                          className="border border-gray-400 px-2 mb-2 rounded-full w-9 h-9 md:w-12 md:h-12 flex items-center justify-center text-sm font-medium text-gray-700"
                        >
                          {size}
                        </span>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* View All Button */}
        </div>
      )}
    </>
  );
};

export default ProductPart;
