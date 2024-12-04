import React from "react";

const SkeletonLoader = () => {
  return (
    <div className="w-full flex flex-col lg:flex-row gap-[50px] lg:gap-[50px] py-16 px-3 md:px-10 lg:px-16">
      {/* Left column: Carousel skeleton */}
      <div className="w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-[600px] mx-auto lg:mx-0">
        <div className="animate-pulse bg-gray-200 h-[300px] rounded-md"></div>
      </div>

      {/* Right column: Product details skeleton */}
      <div className="flex-[1] py-3">
        <div className="h-8 bg-gray-200 animate-pulse mb-4 w-2/3"></div>
        <div className="h-8 bg-gray-200 animate-pulse mb-4 w-1/3"></div>
        <div className="h-6 bg-gray-200 animate-pulse mb-6 w-1/4"></div>
        <div className="grid grid-cols-6 gap-2">
          {[...Array(12)].map((_, index) => (
            <div
              key={index}
              className="bg-gray-200 animate-pulse w-12 h-12 rounded-md"
            ></div>
          ))}
        </div>
        <div className="mt-4 h-10 bg-gray-200 animate-pulse mb-2"></div>
        <div className="h-6 bg-gray-200 animate-pulse mb-4 w-3/4"></div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
