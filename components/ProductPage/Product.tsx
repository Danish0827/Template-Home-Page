"use client";
import React, { useState } from "react";
import { products } from "@/lib/headerData";
import { SlEqualizer } from "react-icons/sl";
import { IoIosArrowDown } from "react-icons/io";
import Filter from "./Filter";

const ProductPart = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };
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

          <Filter />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <div key={product.id} className="rounded-lg ">
                <div className="relative">
                  <img
                    className="w-full h-auto"
                    src={product.images[0].primary}
                    alt={product.title}
                  />
                  <img
                    className="absolute top-0 left-0 w-full h-full opacity-0 hover:opacity-100 transition-opacity"
                    src={product.images[0].secondary}
                    alt={product.title}
                  />
                </div>

                <a
                  href={product.productUrl}
                  className="block mt-2 text-lg font-semibold text-center line-clamp-1"
                >
                  {product.title}
                </a>

                <div className="text-center mt-2 font-semibold text-gray-700">
                  {product.price}
                </div>

                {/* Size Variants */}
                <div className="flex justify-center flex-wrap mt-3 space-x-2">
                  {product.sizes.map((size, index) => (
                    <span
                      key={index}
                      className="border border-gray-400 mt-2 rounded-full w-8 h-8 flex flex-wrap items-center justify-center text-sm font-medium text-gray-700"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* View All Button */}
        </div>
      )}
    </>
  );
};

export default ProductPart;
