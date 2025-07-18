"use client";
import React, { useEffect, useState } from "react";
import Filter from "./Filter";
import Link from "next/link";
import { fetchCountryCurrencyData } from "../Currency/CurrencyChanger";
import { useSearchParams } from "next/navigation";

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

const ProductPart = ({ params }: any) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const [products, setProducts] = useState<Product[]>([]);
  const [attribute, setAttribute] = useState<any>([]);
  const [showColor, setShowColor] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [hoveredProductColor, setHoveredProductColor] = useState<
    Record<number, any | null>
  >({}); // Track hovered color per product
  // const [currencyCode, setCurrencyCode] = useState<any>();
  // const [convergenceData, setConvergenceData] = useState();
  const [currencySymbol, setCurrencySymbol] = useState();
  const [countryValue, setCountryValue] = useState<number | undefined>(); // For storing your country's value

  useEffect(() => {
    const someFunction = async () => {
      const currencyData = await fetchCountryCurrencyData();
      // console.log(currencyData, "currencyData");

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
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string[]>
  >({
    availability: [],
    size: [],
    color: [],
  });
  const searchParams = useSearchParams();
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const initialSelections: Record<string, string[]> = {
      availability: [],
      size: [],
      color: [],
    };

    Object.keys(initialSelections).forEach((key) => {
      const values = params.getAll(key);
      if (values.length) {
        initialSelections[key] = values;
      }
    });

    setSelectedOptions(initialSelections);
  }, [searchParams]); // ✅ FIXED HERE

  console.log(selectedOptions);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const query = new URLSearchParams();

        if (params !== "best-sellers") {
          query.append("categorySlug", params);
        }

        query.append("includeVariations", "true");

        Object.entries(selectedOptions).forEach(([key, values]) => {
          if (Array.isArray(values)) {
            values.forEach((value) => {
              if (value) query.append(key, value);
            });
          }
        });

        const apiUrl = `${
          process.env.NEXT_PUBLIC_SITE_URL
        }/api/get-products?${query.toString()}`;

        console.log(apiUrl, "apiUrl");

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
  }, [params, selectedOptions]); // ✅ ADD selectedOptions here

  const [categories, setCategories] = useState<any>([]);
  const [error, setError] = useState<string | null>(null);

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
      // console.log(data?.[0]);
    } catch (error) {
      console.error("Failed to fetch products", error);
      setError("Something went wrong while fetching products.");
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProductAttribute();
    fetchProductColor();
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
  const getImageForColor = (product: Product, color: string) => {
    const variant = product.variations.find((v) =>
      v.attributes.some((attr) => attr.option === color)
    );
    return variant ? variant?.image?.src : product.images[0]?.src;
  };

  const star = params.replace("-", " ");

  return (
    <>
      <div className="page-width page-width--flush-small py-16 px-3 md:px-6 lg:px-10">
        {loading ? (
          ""
        ) : (
          <div className="md:pb-5">
            <h3 className="text-templatePrimaryHeading text-xl md:text-2xl lg:text-3xl pb-3 font-bold uppercase">
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
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-5 gap-2 md:gap-4">
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
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-5 gap-2 md:gap-4">
                  {products.map((product) => (
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

                        <div className="py-3">
                          <h4 className="mt-2 text-xs lg:text-lg font-semibold text-center line-clamp-1 text-templateSecondaryHeading hover:text-templatePrimary">
                            {product.name}
                          </h4>
                          <div className="text-center text-sm mt-2 font-bold text-gray-700">
                            {currencySymbol ? currencySymbol : "₹"}
                            {countryValue && product.price
                              ? (
                                  parseFloat(countryValue.toString()) *
                                  parseFloat(product.price.toString())
                                ).toFixed(2)
                              : product.price
                              ? parseFloat(
                                  product.price.toString()
                                ).toLocaleString(undefined, {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                })
                              : "Price Not Available"}
                          </div>

                          {/* Size Variants Color Image*/}
                          {showColor.meta?.["show-product-color"]?.showImage ==
                            "true" && (
                            <div className="flex justify-center flex-wrap mt-3 space-x-2">
                              {product.attributes
                                .find((attr) => attr.name === "Colour")
                                ?.options.map((colour) => {
                                  const variant = product.variations.find((v) =>
                                    v.attributes.some(
                                      (attr) => attr.option === colour
                                    )
                                  );
                                  const isOutOfStock =
                                    variant?.stock_status === "outofstock";

                                  return (
                                    <>
                                      <div
                                        key={`${product.id}-${colour}`}
                                        onMouseEnter={() =>
                                          setHoveredProductColor(
                                            (prevState) => ({
                                              ...prevState,
                                              [product.id]: colour,
                                            })
                                          )
                                        } // Set hovered color on hover for specific product
                                        onMouseLeave={() =>
                                          setHoveredProductColor(
                                            (prevState) => ({
                                              ...prevState,
                                              [product.id]: null,
                                            })
                                          )
                                        }
                                        className={` mt-2 rounded-ful flex items-center justify-center text-xs font-bold text-templateDark cursor-pointer ${
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
                                                  (attr) =>
                                                    attr.option === colour
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
                            <div className="flex justify-center flex-wrap mt-0 space-x-2">
                              {product.attributes
                                .find((attr) => attr.name === "Colour")
                                ?.options.map((colour) => {
                                  const variant = product.variations.find((v) =>
                                    v.attributes.some(
                                      (attr) => attr.option === colour
                                    )
                                  );
                                  const isOutOfStock =
                                    variant?.stock_status === "outofstock";

                                  return (
                                    <>
                                      <div
                                        key={`${product.id}-${colour}`}
                                        onMouseEnter={() =>
                                          setHoveredProductColor(
                                            (prevState) => ({
                                              ...prevState,
                                              [product.id]: colour,
                                            })
                                          )
                                        } // Set hovered color on hover for specific product
                                        onMouseLeave={() =>
                                          setHoveredProductColor(
                                            (prevState) => ({
                                              ...prevState,
                                              [product.id]: null,
                                            })
                                          )
                                        } // Reset on mouse leave for specific product
                                        style={{
                                          backgroundColor: attribute.find(
                                            (attr: any) => attr.name === colour
                                          )?.woo_variation_swatches
                                            .primary_color, // Setting the background color to the colour value
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
                          <div className="flex justify-center flex-wrap mt-3 space-x-1 md:space-x-2">
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
                                return (
                                  sizeA[0] - sizeB[0] || sizeA[1] - sizeB[1]
                                );
                              })
                              .map((size) => {
                                // Find the variant with the corresponding size option
                                const variant = product.variations.find((v) =>
                                  v.attributes.some(
                                    (attr) => attr.option === size
                                  )
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
                                      className={`border border-templatePrimary rounded-full md:w-10 md:h-10 w-7 h-7 flex items-center justify-center text-[10px] md:text-xs font-medium text-templateDark cursor-pointer ${
                                        selectedSize === size
                                          ? "border-black"
                                          : "border-gray-400"
                                      } ${
                                        isOutOfStock
                                          ? "opacity-50 cursor-not-allowed line-through"
                                          : "hover:border-black"
                                      }`}
                                    >
                                      {size}{" "}
                                      {/* Display the size option like "6/40" */}
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
              )}
            </>
          )
        )}
      </div>
    </>
  );
};

export default ProductPart;
