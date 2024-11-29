"use client";
import React from "react";
import { products } from "@/lib/headerData";

const Product = () => {
  return (
    <>
      {products && (
        <div className="page-width page-width--flush-small py-16">
          <div>
            <h3 className="text-templatePrimaryHeading text-2xl md:text-3xl lg:text-4xl text-center pb-5">
              Best Sellers
            </h3>
          </div>
          <div className="px-4 md:px-8 lg:px-12 xl:px-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {products.slice(0, 10).map((product) => (
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
                  className="text-templateSecondaryHeading block mt-2 text-lg font-semibold text-center line-clamp-1"
                >
                  {product.title}
                </a>

                <div className="text-templateSecondaryText text-center mt-2 font-semibold text-gray-700">
                  {product.price}
                </div>

                {/* Size Variants */}
                <div className="flex justify-center flex-wrap mt-3 space-x-2">
                  {product.sizes.map((size, index) => (
                    <span
                      key={index}
                      className="border border-templatePrimary mt-2 rounded-full w-8 h-8 flex flex-wrap items-center justify-center text-sm font-medium text-templateDark"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center mt-16">
            <a
              href="/collections/kurtas"
              className="text-white py-3 px-6 bg-templatePrimary hover:bg-templatePrimaryLight"
            >
              View All
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default Product;
