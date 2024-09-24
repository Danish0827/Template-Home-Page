"use client";
import { shopCategories } from "@/lib/headerData";
import React from "react";
const ShopByCategory = () => {
  const { IsShoCategories, categoriesHeading, categories } = shopCategories;
  return (
    <div className="px-4 md:px-8 lg:px-12 xl:px-16 shop-by-category-section pt-12 bg-gray-50">
      <div className="page-width">
        <div className="section-header text-center mb-8">
          <h3 className="text-2xl md:text-3xl lg:text-4xl text-center">
            {categoriesHeading}
          </h3>
        </div>
        <div className="flex flex-wrap justify-center items-center">
          {categories.map((category, index) => (
            <div className="w-full md:w-1/2 lg:w-1/4 xl:w-1/5 px-3 mb-5">
              <a
                key={index}
                href={category.href}
                className="collection-item relative block group"
              >
                <div className="collection-image overflow-hidden rounded-lg shadow-md">
                  <img
                    src={category.imgSrc}
                    alt={category.imgAlt}
                    className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-300 ease-in-out"
                  />
                </div>
                <span className="collection-item__title absolute bottom-0 left-0 right-0 text-center py-2 text-white bg-black bg-opacity-50 text-lg font-semibold">
                  {category.name}
                </span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopByCategory;
