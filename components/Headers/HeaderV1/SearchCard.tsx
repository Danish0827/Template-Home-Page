"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

interface ImageData {
  src: string;
}
interface catImageData {
  slug: string;
}

interface ProductDataProps {
  data: {
    name: string;
    slug: string;
    images: ImageData[];
    categories: catImageData[];
  };
}

const SearchCard: React.FC<ProductDataProps> = ({ data }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={`/shop/${data?.categories[0]?.slug}/product/${data?.slug}`}>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative aspect-[4/5] shadow-md border border-gray-100 overflow-hidden cursor-pointer mb-2"
      >
        {/* Badge */}
        {/* <div className="absolute top-0 right-0 bg-[#6d600b] text-white text-xs font-semibold px-2 py-1 rounded-bl-lg uppercase z-10">
          New
        </div> */}

        {/* Product Images */}
        {data?.images?.length > 0 && (
          <img
            src={
              isHovered && data.images[1]?.src
                ? data.images[1].src
                : data.images[0].src
            }
            // width={200}
            height={410}
            alt={data.name}
            // layout="responsive"
            // objectFit="cover"
            className={`object-cover -mt-6 lg:mt-0 w-52 lg:w-80 transition-transform duration-300 ${
              isHovered ? "scale-105" : ""
            }`}
          />
        )}

        {/* Product Title */}
        <div className="absolute bottom-0 text-center left-0 w-full">
          <h4 className="md:text-[14px] flex items-start lg:items-center justify-center text-[12px] font-semibold bg-templatePrimary leading-[15px] lg:leading-[20px] text-white rounded-b-md py-2 px-2 z-10 h-10 lg:h-12">
            {data.name}
          </h4>
        </div>
      </div>
    </Link>
  );
};

export default SearchCard;
