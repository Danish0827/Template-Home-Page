"use client";
import React, { useEffect, useState } from "react";
import { SlEqualizer } from "react-icons/sl";
import { IoIosArrowDown } from "react-icons/io";
import Filter from "./Filter";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  price: string;
  images: { src: string; name: string }[];
  attributes: { name: string; options: string[] }[];
  variations: Array<{
    id: number;
    price: string;
    regular_price: string;
    stock_status: string;
    image: { src: string };
    attributes: Array<{ name: string; option: string }>;
  }>;
}

const ProductPart = ({ params }: any) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Build the API URL conditionally
        const apiUrl =
          `${process.env.NEXT_PUBLIC_SITE_URL}/api/get-products?` +
          (params === "best-sellers" ? "" : `categorySlug=${params}&`) +
          "includeVariations=true";

        const response = await fetch(apiUrl);
        const data = await response.json();

        if (Array.isArray(data.products)) {
          setProducts(data.products);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [params]);

  const [categories, setCategories] = useState<any>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SITE_URL}/api/get-categories?slug=${params}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();

        if (data.success) {
          setCategories(data.categories[0]);
        } else {
          throw new Error(data.error || "No categories found");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      }
    };

    fetchCategories();
  }, []);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const handleSizeChange = (productId: number, size: string) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    const variant = product.variations.find((v) =>
      v.attributes.some((attr) => attr.option === size)
    );

    setSelectedSize(size);
    setSelectedVariant(variant);
  };

  const star = params.replace("-", " ");
  return (
    <>
      <div className="page-width page-width--flush-small py-16 px-3 md:px-6 lg:px-10">
        {loading ? (
          ""
        ) : (
          <div className="pb-5">
            <h3 className="text-templatePrimaryHeading text-xl md:text-2xl lg:text-3xl pb-3 font-bold capitalize">
              {categories.name ? categories.name : star}
            </h3>

            {categories.description && (
              <p
                className={`text-templatePrimaryText ext-lg ${
                  isExpanded ? "" : "line-clamp-2"
                }`}
              >
                {categories.description}
                <span
                  onClick={toggleReadMore}
                  className="text-blue-700 text-lg font-semibold hover:text-blue-800 underline pl-2 cursor-pointer"
                >
                  {isExpanded ? "Read less" : ""}
                </span>
              </p>
            )}

            {params === "best-sellers" ? (
              ""
            ) : (
              <>
                {isExpanded === false && categories.description !== "" && (
                  <span
                    onClick={toggleReadMore}
                    className="text-blue-700 text-lg font-semibold hover:text-blue-800 underline pl-2 cursor-pointer"
                  >
                    {isExpanded ? "" : "Read more"}
                  </span>
                )}
              </>
            )}
          </div>
        )}
        <Filter count={products.length} />
        {loading ? (
          <div className="page-width page-width--flush-small py-3 px-3 md:px-6 lg:px-10">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="rounded-lg border shadow-md animate-pulse bg-gray-100"
                >
                  <div className="h-60 bg-gray-300 rounded-t-lg"></div>
                  <div className="p-3">
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          products && (
            <>
              {Array.isArray(products) && products.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
                  {products.map((product: Product) => (
                    <Link
                      href={`/shop/${params}/product/${product.slug}?size=${selectedSize}`}
                      key={product.id}
                      className="rounded-lg border shadow-md block"
                    >
                      <div className="relative">
                        <img
                          className="w-full h-auto rounded-t-lg"
                          src={product.images[0]?.src}
                          alt={product.name}
                        />
                        {product.images[1] && (
                          <img
                            className="absolute top-0 left-0 w-full h-full opacity-0 hover:opacity-100 transition-opacity rounded-t-lg"
                            src={product.images[1]?.src}
                            alt={product.name}
                          />
                        )}
                      </div>
                      <div className="p-3">
                        <h4 className="mt-2 text-xs lg:text-lg font-semibold text-center line-clamp-1 text-templateSecondaryHeading hover:text-templatePrimary">
                          {product.name}
                        </h4>
                        <div className="text-center text-sm mt-2 font-semibold text-gray-700">
                          {product.price
                            ? `₹${parseFloat(product.price).toLocaleString()}`
                            : "Price Not Available"}
                        </div>
                        <div className="flex justify-center flex-wrap my-3 space-x-1">
                          {product.attributes
                            .find((attr) => attr.name === "Size")
                            ?.options.map((size, index) => {
                              const variant = product.variations.find((v) =>
                                v.attributes.some(
                                  (attr) => attr.option === size
                                )
                              );
                              const isOutOfStock =
                                variant?.stock_status === "outofstock";

                              return (
                                <div
                                  key={index}
                                  onClick={() =>
                                    !isOutOfStock &&
                                    handleSizeChange(product.id, size)
                                  }
                                  className={`border border-templatePrimary mt-2 rounded-full w-10 h-10 flex items-center justify-center text-xs font-medium text-templateDark cursor-pointer ${
                                    selectedSize === size
                                      ? "border-black"
                                      : "border-gray-400"
                                  } ${
                                    isOutOfStock
                                      ? "opacity-50 cursor-not-allowed line-through"
                                      : "hover:border-black "
                                  }`}
                                >
                                  {size}
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )
        )}
      </div>
    </>
  );
};

export default ProductPart;
