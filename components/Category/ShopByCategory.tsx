"use client";
import React, { useEffect, useState } from "react";

interface CategoryImage {
  id: number;
  src: string;
  alt: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  image: CategoryImage | null;
}

const SkeletonLoader: React.FC = () => {
  return (
    <div className="w-1/2 lg:w-1/4 xxl:w-1/5 px-1 sm:px-3 mb-3 sm:mb-5">
      <div className="collection-item relative block">
        <div className="collection-image overflow-hidden shadow-md bg-gray-200 h-80 animate-pulse"></div>
        <div className="w-full text-center py-2 lg:py-3 bg-gray-200 h-6 mt-2 animate-pulse"></div>
      </div>
    </div>
  );
};

const ShopByCategory: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const categoriesHeading = "Shop By Category"; // Customize as needed

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SITE_URL}/api/get-categories`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();

        if (data.success) {
          setCategories(data.categories); // Assuming categories is an array of your Category objects
        } else {
          throw new Error(data.error || "No categories found");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="px-3 md:px-8 lg:px-12 xl:px-16 shop-by-category-section pt-12 bg-gray-50">
        <div className="page-width">
          <div className="section-header text-center mb-8">
            <h3 className="text-templatePrimaryHeading text-2xl md:text-3xl lg:text-4xl text-center uppercase">
              {categoriesHeading}
            </h3>
          </div>
          <div className="flex flex-wrap justify-center items-center">
            {Array.from({ length: 8 }).map((_, index) => (
              <SkeletonLoader key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    // <div className="px-3 md:px-8 lg:px-12 xl:px-16 shop-by-category-section pt-12 bg-gray-50">
    //   <div className="page-width">
    //     <div className="section-header text-center mb-8">
    //       <h3 className="text-templatePrimaryHeading text-2xl md:text-3xl lg:text-4xl text-center">
    //         {categoriesHeading}
    //       </h3>
    //     </div>
    //     <div className="flex flex-wrap justify-center items-center">
    //       {categories.map((category) => (
    //         <div
    //           key={category.id}
    //           className="w-1/2 lg:w-1/4 xxl:w-1/5 px-1 sm:px-3 mb-3 sm:mb-5"
    //         >
    //           <a
    //             href={`/shop/${category.slug}`} // Adjust the link based on your routing structure
    //             className="collection-item relative block group"
    //           >
    //             <div className="collection-image overflow-hidden shadow-md">
    //               <img
    //                 src={
    //                   category.image
    //                     ? category.image.src
    //                     : "default-image-url.jpg"
    //                 } // Use a placeholder if there's no image
    //                 alt={category.image ? category.image.alt : category.name}
    //                 className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-300 ease-in-out"
    //               />
    //             </div>
    //             <h6 className="w-full text-center py-2 lg:py-3 text-templateSecondaryHeading bg-white bg-opacity-50 text-base sm:text-lg font-semibold">
    //               {category.name}
    //             </h6>
    //           </a>
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    // </div>
    <div className="px-4 md:px-12 lg:px-16 xl:px-24 shop-by-category-section pt-16 bg-gradient-to-b from-gray-50 via-white to-gray-100">
      <div className="page-width max-w-7xl mx-auto">
        <div className="section-header text-center mb-12">
          <h3 className="text-templatePrimaryHeading text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-800 uppercase">
            {categoriesHeading}
          </h3>
          <p className="text-gray-600 mt-4 text-lg md:text-xl">
            Discover our curated collections and find your favorite products.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-center">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group relative bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-out hover:shadow-lg"
            >
              <a
                href={`/shop/${category.slug}`}
                className="block w-full h-full"
              >
                <div className="relative">
                  <img
                    src={
                      category.image
                        ? category.image.src
                        : "https://via.placeholder.com/300" // Placeholder image
                    }
                    alt={category.image ? category.image.alt : category.name}
                    className="w-full h-60 sm:h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
                </div>
                <h6 className="absolute bottom-4 left-4 right-4 text-white text-lg font-semibold bg-black bg-opacity-50 rounded-md px-3 py-1 md:py-2 text-center shadow-md group-hover:bg-opacity-70">
                  {category.name}
                </h6>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopByCategory;
