"use client";
import React from "react";
import { iconData } from "@/lib/headerData";

const TextWithIcons = () => {
  return (
    <div className="px-4 md:px-8 lg:px-12 xl:px-16 py-10">
      <div className="flex flex-wrap justify-center ">
        {iconData.map((item, index) => (
          <div
            className="w-full md:w-1/2 lg:w-1/4 xl:w-1/5 px-3 mb-5"
            key={index}
          >
            <div className="text-with-icons__block-icon">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-24  mx-auto"
              />
            </div>
            <div className="text-center text-templatePrimaryHeading text-3xl pb-2">
              <h3>{item.title}</h3>
            </div>
            <div className="text-center text-templatePrimaryText text-xl">
              <p>{item.text}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="text-with-icons__button"></div>
    </div>
  );
};

export default TextWithIcons;
