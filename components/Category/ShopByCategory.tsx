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
    return <div>Loading...</div>; // Replace with a loader component if desired
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="px-3 md:px-8 lg:px-12 xl:px-16 shop-by-category-section pt-12 bg-gray-50">
      <div className="page-width">
        <div className="section-header text-center mb-8">
          <h3 className="text-templatePrimaryHeading text-2xl md:text-3xl lg:text-4xl text-center">
            {categoriesHeading}
          </h3>
        </div>
        <div className="flex flex-wrap justify-center items-center">
          {categories.map((category) => (
            <div
              key={category.id}
              className="w-1/2 lg:w-1/4 xxl:w-1/5 px-1 sm:px-3 mb-3 sm:mb-5"
            >
              <a
                href={`/shop/${category.slug}`} // Adjust the link based on your routing structure
                className="collection-item relative block group"
              >
                <div className="collection-image overflow-hidden shadow-md">
                  <img
                    src={
                      category.image
                        ? category.image.src
                        : "default-image-url.jpg"
                    } // Use a placeholder if there's no image
                    alt={category.image ? category.image.alt : category.name}
                    className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-300 ease-in-out"
                  />
                </div>
                <h6 className="w-full text-center py-2 lg:py-3 text-templateSecondaryHeading bg-white bg-opacity-50 text-base sm:text-lg font-semibold">
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
