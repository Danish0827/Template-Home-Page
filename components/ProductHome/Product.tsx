"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { fetchCountryCurrencyData } from "../Currency/CurrencyChanger";

// Skeleton Loader Component
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
    name: string;
    attributes: Array<{ name: any; option: any }>;
  }>;
}

const SkeletonLoader: React.FC = () => {
  return (
    <div className="rounded-lg shadow-lg bg-gray-200 animate-pulse overflow-hidden">
      <div className="w-full h-56 bg-gray-300"></div>
      <div className="p-4">
        <div className="h-4 bg-gray-300 rounded mb-4"></div>
        <div className="h-4 bg-gray-300 rounded w-2/3 mx-auto mb-4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/3 mx-auto"></div>
      </div>
    </div>
  );
};

const Product: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [attribute, setAttribute] = useState<any>([]);
  const [showColor, setShowColor] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [hoveredProductColor, setHoveredProductColor] = useState<
    Record<number, any | null>
  >({});

  // const [currencyCode, setCurrencyCode] = useState<any>();
  // const [convergenceData, setConvergenceData] = useState();
  const [currencySymbol, setCurrencySymbol] = useState();
  const [countryValue, setCountryValue] = useState<number | undefined>(); // For storing your country's value

  useEffect(() => {
    const someFunction = async () => {
      const currencyData = await fetchCountryCurrencyData();
      console.log(currencyData, "jshdkjhaskd hkjsd danish");

      if (currencyData) {
        // setCurrencyCode(currencyData.currencyCode);
        setCurrencySymbol(currencyData.currencySymbol);
        // setConvergenceData(currencyData.ConvergenceData);

        // Extracting your country's value
        const countryValue =
          currencyData.ConvergenceData[currencyData.currencyCode];
        setCountryValue(countryValue);
      } else {
        console.log("Failed to fetch currency data");
      }
    };
    someFunction();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        "/api/get-products?featured=true&includeVariations=true"
      );
      const data = await response.json();
      if (data.success) {
        setProducts(data.products);
      } else {
        setError("Failed to fetch products");
      }
    } catch (error) {
      console.error("Failed to fetch products", error);
      setError("Something went wrong while fetching products.");
    } finally {
      setLoading(false);
    }
  };
  const fetchProductAttribute = async () => {
    try {
      const response = await fetch("/api/get-attributeTerm");
      const data = await response.json();
      if (data.success) {
        setAttribute(data.terms);
      } else {
        setError("Failed to fetch products");
      }
    } catch (error) {
      console.error("Failed to fetch products", error);
      setError("Something went wrong while fetching products.");
    }
  };
  const fetchProductColor = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/wp/v2/product-color?_fields=id,title,meta.show-product-color`
      );
      const data = await response.json();
      setShowColor(data?.[0]);
    } catch (error) {
      console.error("Failed to fetch products", error);
      setError("Something went wrong while fetching products.");
    }
  };
  useEffect(() => {
    fetchProducts();
    fetchProductAttribute();
    fetchProductColor();
  }, []);

  const handleSizeChange = (productId: number, size: string) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    const variant = product.variations.find((v) =>
      v.attributes.some((attr) => attr.option === size)
    );

    setSelectedSize(size);
    setSelectedVariant(variant);
  };

  const getImageForColor = (product: Product, color: string) => {
    const variant = product.variations.find((v) =>
      v.attributes.some((attr) => attr.option === color)
    );
    return variant ? variant.image.src : product.images[0]?.src;
  };

  if (loading) {
    return (
      <div className="page-width page-width--flush-small py-16">
        <div>
          <h3 className="text-templatePrimaryHeading text-2xl md:text-3xl lg:text-4xl text-center pb-5 font-bold">
            Best Sellers
          </h3>
        </div>
        <div className="px-4 md:px-8 lg:px-12 xl:px-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-5 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <SkeletonLoader key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <h3 className="text-red-500 text-xl font-bold">{error}</h3>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-gray-700 text-xl font-semibold">
          No products found
        </h3>
      </div>
    );
  }

  return (
    <div className="page-width page-width--flush-small py-16">
      <div>
        <h3 className="text-templatePrimaryHeading text-2xl md:text-3xl lg:text-4xl text-center pb-5 font-bold">
          Best Sellers
        </h3>
      </div>
      <div className="px-4 md:px-8 lg:px-12 xl:px-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-5 gap-6">
        {products.slice(0, 8).map((product) => (
          <Link
            href={`/shop/best-sellers/product/${product.slug}?size=${selectedSize}`}
            key={product.id}
            className="rounded-lg border shadow-md block"
          >
            <div
              key={product.id}
              className="rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white overflow-hidden"
            >
              <div className="relative group">
                <img
                  className="w-full h-auto object-cover"
                  src={
                    hoveredProductColor[product.id]
                      ? getImageForColor(
                          product,
                          hoveredProductColor[product.id]
                        )
                      : product.images[0]?.src
                  }
                  alt={product.name}
                />
                {product.images[1] && (
                  <img
                    className="absolute top-0 left-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    src={product.images[1]?.src}
                    alt={product.name}
                  />
                )}
              </div>

              <div className="p-3">
                <h4 className="mt-0 text-xs lg:text-lg font-semibold text-center line-clamp-1 text-templateSecondaryHeading hover:text-templatePrimary">
                  {product.name}
                </h4>
                <div className="text-center text-sm mt-2 font-bold text-black">
                  {currencySymbol ? currencySymbol : "₹"}
                  {countryValue && product.price
                    ? (
                        parseFloat(countryValue.toString()) *
                        parseFloat(product.price.toString())
                      ).toFixed(2)
                    : product.price
                    ? parseFloat(product.price.toString()).toLocaleString(
                        undefined,
                        { minimumFractionDigits: 2, maximumFractionDigits: 2 }
                      )
                    : "Price Not Available"}
                </div>

                {/* Size Variants Color Image*/}
                {showColor.meta?.["show-product-color"]?.showImage ==
                  "true" && (
                  <div className="flex justify-center flex-wrap mt-0 space-x-2">
                    {product.attributes
                      .find((attr) => attr.name === "Colour")
                      ?.options.map((colour) => {
                        const variant = product.variations.find((v) =>
                          v.attributes.some((attr) => attr.option === colour)
                        );
                        const isOutOfStock =
                          variant?.stock_status === "outofstock";

                        return (
                          <>
                            <div
                              key={`${product.id}-${colour}`}
                              onMouseEnter={() =>
                                setHoveredProductColor((prevState) => ({
                                  ...prevState,
                                  [product.id]: colour,
                                }))
                              } // Set hovered color on hover for specific product
                              onMouseLeave={() =>
                                setHoveredProductColor((prevState) => ({
                                  ...prevState,
                                  [product.id]: null,
                                }))
                              }
                              className={` mt-0 rounded-ful flex items-center justify-center text-xs font-bold text-templateDark cursor-pointer ${
                                selectedSize === colour
                                  ? "border-black"
                                  : "border-gray-400"
                              } `}
                            >
                              {product.variations.find((v) =>
                                v.attributes.some(
                                  (attr) => attr.option === colour
                                )
                              )?.image.src && (
                                <img
                                  className="w-10 h-10 border bor shadow-md rounded-full m-auto object-cover"
                                  src={
                                    product.variations.find((v) =>
                                      v.attributes.some(
                                        (attr) => attr.option === colour
                                      )
                                    )?.image.src
                                  }
                                  alt={product.name}
                                />
                              )}
                            </div>
                            {/* <span className="sr-">{colour}</span> */}
                          </>
                        );
                      })}
                  </div>
                )}

                {/* Size Variants Color */}
                {showColor.meta?.["show-product-color"]?.showColor ==
                  "true" && (
                  <div className="flex justify-center flex-wrap mt-3 space-x-2">
                    {product.attributes
                      .find((attr) => attr.name === "Colour")
                      ?.options.map((colour) => {
                        const variant = product.variations.find((v) =>
                          v.attributes.some((attr) => attr.option === colour)
                        );
                        const isOutOfStock =
                          variant?.stock_status === "outofstock";

                        return (
                          <>
                            <div
                              key={`${product.id}-${colour}`}
                              onMouseEnter={() =>
                                setHoveredProductColor((prevState) => ({
                                  ...prevState,
                                  [product.id]: colour,
                                }))
                              } // Set hovered color on hover for specific product
                              onMouseLeave={() =>
                                setHoveredProductColor((prevState) => ({
                                  ...prevState,
                                  [product.id]: null,
                                }))
                              } // Reset on mouse leave for specific product
                              style={{
                                backgroundColor: attribute.find(
                                  (attr: any) => attr.name === colour
                                )?.woo_variation_swatches.primary_color, // Setting the background color to the colour value
                              }}
                              className={`border-black border mt-2 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold text-templateDark cursor-pointer ${
                                selectedSize === colour
                                  ? "border-black"
                                  : "border-gray-400"
                              } `}
                            ></div>
                          </>
                        );
                      })}
                  </div>
                )}
                {/* Size Variants size*/}

                <div className="flex justify-center flex-wrap mt-3 space-x-2">
                  {/* Extract unique size values from variations */}
                  {[
                    ...new Set(
                      product.variations?.map(
                        (variant) =>
                          variant.attributes.find(
                            (attr) => attr.name === "Size"
                          )?.option
                      )
                    ),
                  ] // Create a unique array of size options
                    .sort((a, b) => {
                      // Custom sorting logic if necessary, e.g., numerical sorting
                      const sizeA = a.split("/").map(Number);
                      const sizeB = b.split("/").map(Number);
                      return sizeA[0] - sizeB[0] || sizeA[1] - sizeB[1];
                    })
                    .map((size) => {
                      // Find the variant with the corresponding size option
                      const variant = product.variations.find((v) =>
                        v.attributes.some((attr) => attr.option === size)
                      );
                      const isOutOfStock =
                        variant?.stock_status === "outofstock";

                      return (
                        <Link
                          href={`/shop/best-sellers/product/${
                            product.slug
                          }?size=${isOutOfStock ? null : size}`}
                        >
                          <div
                            key={`${product.id}-${size}`}
                            onClick={() =>
                              !isOutOfStock &&
                              handleSizeChange(product.id, size)
                            }
                            className={`border border-templatePrimary mt-2 rounded-full md:w-10 md:h-10 w-7 h-7 flex items-center justify-center text-[10px] md:text-xs font-medium text-templateDark cursor-pointer ${
                              selectedSize === size
                                ? "border-black"
                                : "border-gray-400"
                            } ${
                              isOutOfStock
                                ? "opacity-50 cursor-not-allowed line-through"
                                : "hover:border-black"
                            }`}
                          >
                            {size} {/* Display the size option like "6/40" */}
                          </div>
                        </Link>
                      );
                    })}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center mt-16">
        <Link
          href="/shop/best-sellers"
          className="inline-block text-white py-3 px-8 bg-templatePrimary hover:bg-templatePrimaryLight rounded-lg shadow-md hover:shadow-lg transition"
        >
          View All
        </Link>
      </div>
    </div>
  );
};

export default Product;
