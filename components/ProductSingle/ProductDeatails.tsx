"use client";
import React, { useEffect, useState } from "react";
import ProductDetailsCarousel from "@/components/ProductSingle/ProductDetailsCarousel";
import Wrapper from "@/components/ProductSingle/Wrapper";
import AddToCart from "@/components/Cart/add-to-cart";
import SkeletonLoader from "@/components/ProductSingle/SkeletonLoader"; // Import the SkeletonLoader
import Link from "next/link";
import { fetchCountryCurrencyData } from "../Currency/CurrencyChanger";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  regular_price: string;
  sale_price: string;
  images: Array<{ src: string }>;
  attributes: Array<{ name: string; options: string[] }>;
  meta_data: any;
  variations: Array<{
    id: number;
    price: string;
    regular_price: string;
    stock_status: string;
    image: { src: string };
    meta_data: any;
    attributes: Array<{ name: string; option: string }>;
  }>;
}

const ProductDetails = ({ params, productData, reviewsData, render }: any) => {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [price, setPrice] = useState<string | undefined>(undefined);
  const [regularPrice, setRegularPrice] = useState<string | undefined>(
    undefined
  );
  const [showPrice, setShowPrice] = useState<any>([]);
  const [wholesaleRegular, setWholesaleRegular] = useState<any>();
  const [wholesalePrice, setWholesalePrice] = useState<any>();
  const [wPrice, setWPrice] = useState<any>();
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
  const fetchProductColor = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/wp/v2/whole-sale-price?_fields=id,title,meta.whole_sale_price_quantity,meta.whole_sale_price_feature`
      );
      const data = await response.json();
      setShowPrice(data?.[0]);
      // console.log(data?.[0]);
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  useEffect(() => {
    fetchProductColor();
  }, []);

  // Fetch product data based on slug
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SITE_URL}/api/get-products?slug=${params}&includeVariations=true`
        );
        const data = await res.json();
        const fetchedProduct = data.products[0];
        setProduct(fetchedProduct);
        // console.log(fetchedProduct,"danish data sjka");
        productData(fetchedProduct);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SITE_URL}/api/get-productReviews?productId=${data.products[0]?.id}&page=1&perPage=100`
        );
        const datas = await response.json();
        // console.log(data, "product danish ahmed");

        if (data.success) {
          // setReviews(datas.reviews);
          reviewsData(datas.reviews);
        }

        // const urlSize = params.size; // Extract size from params
        const url = window.location.href;

        // Parse the URL and extract the 'size' parameter
        const parsedUrl = new URL(url);
        const urlSize = parsedUrl.searchParams.get("size");
        // console.log(urlSize, "urlSize");

        // console.log("Current URL:", url);
        // console.log("Size parameter:", size);

        const availableSize = fetchedProduct.attributes
          .find((attr: any) => attr.name === "Size")
          ?.options.find((size: string) => {
            const variant = fetchedProduct.variations.find((v: any) =>
              v.attributes.some((attr: any) => attr.option === size)
            );
            return variant && variant.stock_status !== "outofstock";
          });

        // Set the size based on URL parameter or default available size
        const initialSize =
          urlSize &&
          fetchedProduct.attributes
            .find((attr: any) => attr.name === "Size")
            ?.options.includes(urlSize)
            ? urlSize
            : availableSize;

        setSelectedSize(initialSize || null);

        const defaultVariant = fetchedProduct.variations.find((v: any) =>
          v.attributes.some((attr: any) => attr.option === initialSize)
        );
        setSelectedVariant(defaultVariant);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [params, render]);

  // Handle size selection
  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
    const variant = product?.variations.find((v) =>
      v.attributes.some((attr) => attr.option === size)
    );
    setSelectedVariant(variant);
  };

  // Handle color selection
  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    const variant = product?.variations.find((v) =>
      v.attributes.some((attr) => attr.option === color)
    );
    setSelectedVariant(variant);
  };
  // Render loading state if product is not yet available
  if (!product) return <SkeletonLoader />; // Show skeleton loader while loading

  return (
    <div className="w-full py-5 md:py-10 lg:py-16">
      <Wrapper>
        <div className="flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[50px]">
          {/* Left column: Carousel */}
          <div className="w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-[600px] mx-auto lg:mx-0">
            <ProductDetailsCarousel
              images={
                selectedVariant
                  ? [selectedVariant.image, ...product.images.slice(1)]
                  : product.images
              }
            />
          </div>

          {/* Right column: Product details */}
          <div className="flex-[1] py-3">
            {/* Product Title */}
            <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-2 leading-tight uppercase border-b pb-3">
              {product.name}
            </h1>

            {/* Price */}
            <div className="py-4">
              {selectedVariant &&
              selectedVariant.price !== selectedVariant.regular_price ? (
                <div className="text-xl font-semibold">
                  <del className="text-xl font-semibold">
                    {/* ₹{regularPrice} */}
                    {currencySymbol ? currencySymbol : "₹"}
                    {countryValue && regularPrice
                      ? (
                          parseFloat(countryValue.toString()) *
                          parseFloat(regularPrice.toString())
                        ).toFixed(2)
                      : regularPrice
                      ? parseFloat(regularPrice.toString()).toLocaleString(
                          undefined,
                          {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }
                        )
                      : "Price Not Available"}{" "}
                  </del>{" "}
                  {/* ₹{price} */}
                  {currencySymbol ? currencySymbol : "₹"}
                  {countryValue && price
                    ? (
                        parseFloat(countryValue.toString()) *
                        parseFloat(price.toString())
                      ).toFixed(2)
                    : price
                    ? parseFloat(price.toString()).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })
                    : product?.sale_price
                    ? product?.sale_price
                    : product?.regular_price}
                </div>
              ) : (
                <div className="text-xl font-semibold">
                  {" "}
                  {currencySymbol ? currencySymbol : "₹"}
                  {countryValue && regularPrice
                    ? (
                        parseFloat(countryValue.toString()) *
                        parseFloat(regularPrice.toString())
                      ).toFixed(2)
                    : regularPrice
                    ? parseFloat(regularPrice.toString()).toLocaleString(
                        undefined,
                        {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }
                      )
                    : "Price Not Available"}{" "}
                </div>
              )}

              {showPrice.meta?.["whole_sale_price_feature"]?.showPrice ==
                "true" ||
              product?.meta_data?.find(
                (data: any) => data.key === "show_wholesale_price"
              )?.value?.yes === "true" ? (
                <>
                  <div className="flex gap-2 mt-2">
                    <strong>WholeSale Rate:</strong>
                    {wPrice ==
                    selectedVariant?.meta_data?.find(
                      (data: any) =>
                        data.key === "wholesale_regular_price_amount"
                    )?.value ? (
                      <div className="text-xl font-semibold">
                        {" "}
                        {/* product */}
                        {currencySymbol ? currencySymbol : "₹"}
                        {countryValue && wholesaleRegular
                          ? (
                              parseFloat(countryValue.toString()) *
                              parseFloat(wholesaleRegular.toString())
                            ).toFixed(2)
                          : wholesaleRegular
                          ? parseFloat(
                              wholesaleRegular.toString()
                            ).toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })
                          : "Price Not Available"}{" "}
                      </div>
                    ) : (
                      <div className="text-xl font-semibold">
                        <del className="text-xl font-semibold">
                          {/* ₹{regularPrice} */}
                          {currencySymbol ? currencySymbol : "₹"}
                          {countryValue && wholesaleRegular
                            ? (
                                parseFloat(countryValue.toString()) *
                                parseFloat(wholesaleRegular.toString())
                              ).toFixed(2)
                            : wholesaleRegular
                            ? parseFloat(
                                wholesaleRegular.toString()
                              ).toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })
                            : "Price Not Available"}{" "}
                        </del>{" "}
                        {/* ₹{price} */}
                        {currencySymbol ? currencySymbol : "₹"}
                        {countryValue && wholesalePrice
                          ? (
                              parseFloat(countryValue.toString()) *
                              parseFloat(wholesalePrice.toString())
                            ).toFixed(2)
                          : wholesalePrice
                          ? parseFloat(
                              wholesalePrice.toString()
                            ).toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })
                          : "Price Not Available"}
                      </div>
                    )}
                  </div>
                  <div className="text-md font-medium text-black/[0.8]">
                    If the quantity is more than{" "}
                    {product?.meta_data?.find(
                      (data: any) => data.key === "show_wholesale_price"
                    )?.value?.yes === "true"
                      ? product?.meta_data?.find(
                          (data: any) => data.key === "whole_sale_quantity"
                        )?.value
                      : showPrice.meta?.["whole_sale_price_quantity"]}
                    , you will get the wholesale rate.
                  </div>
                </>
              ) : (
                ""
              )}
            </div>

            {/* Size selection */}
            <div className="mb-5">
              <div className="flex justify-between mb-2">
                <span className="text-md font-semibold">Select Size</span>
                <span className="text-md font-medium text-black/[0.5] cursor-pointer">
                  Size Guide
                </span>
              </div>

              <div
                id="sizesGrid"
                className="grid grid-cols-6 sm:grid-cols-10 lg:grid-cols-6 xl:grid-cols-9 2xl:grid-cols-12 gap-2"
              >
                {[
                  ...new Set(
                    product.variations?.map(
                      (variant) =>
                        variant.attributes.find((attr) => attr.name === "Size")
                          ?.option
                    )
                  ),
                ] // Create a unique array of size options
                  .sort((a: any, b: any) => {
                    // Custom sorting logic if necessary, e.g., numerical sorting
                    const sizeA = a.split("/").map(Number);
                    const sizeB = b.split("/").map(Number);
                    return sizeA[0] - sizeB[0] || sizeA[1] - sizeB[1];
                  })
                  .map((size: any) => {
                    // Find the variant with the corresponding size option
                    const variant = product.variations.find((v) =>
                      v.attributes.some((attr) => attr.option === size)
                    );
                    const isOutOfStock = variant?.stock_status === "outofstock";
                    return (
                      <div
                        key={`${product.id}-${size}`}
                        onClick={() => !isOutOfStock && handleSizeChange(size)}
                        className={`border text-sm xl:text-lg flex items-center justify-center rounded-md text-center w-12 h-12 sm:w-14 sm:h-14 lg:w-12 lg:h-12 xl:w-14 xl:h-14 font-medium cursor-pointer ${
                          selectedSize === size
                            ? "border-black"
                            : "border-gray-400"
                        } ${
                          isOutOfStock
                            ? "opacity-50 cursor-not-allowed line-through	"
                            : "hover:border-black"
                        }`}
                      >
                        {size}
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Color selection */}
            <div className="mb-5">
              <div className="flex justify-between mb-2">
                <span className="text-md font-semibold">Select Color</span>
                <span className="text-md font-medium text-black/[0.5] cursor-pointer">
                  Size Guide
                </span>
              </div>

              <div
                id="sizesGrid"
                className="grid grid-cols-6 sm:grid-cols-10 lg:grid-cols-8 xl:grid-cols-12 2xl:grid-cols-14 gap-2"
              >
                {[
                  ...new Set(
                    product.variations?.map(
                      (variant) =>
                        variant.attributes.find(
                          (attr) => attr.name === "Colour"
                        )?.option
                    )
                  ),
                ] // Create a unique array of size options
                  .sort((a: any, b: any) => {
                    // Custom sorting logic if necessary, e.g., numerical sorting
                    const sizeA = a.split("/").map(Number);
                    const sizeB = b.split("/").map(Number);
                    return sizeA[0] - sizeB[0] || sizeA[1] - sizeB[1];
                  })
                  .map((color: any) => {
                    // Find the variant with the corresponding size option
                    const variant = product.variations.find((v) =>
                      v.attributes.some((attr) => attr.option === color)
                    );
                    const isOutOfStock = variant?.stock_status === "outofstock";
                    return (
                      <div
                        key={`${product.id}-${color}`}
                        onClick={() =>
                          !isOutOfStock && handleColorChange(color)
                        }
                        className={`border text-[10px] text-white xl:text-sm flex items-center justify-center rounded-full text-center w-12 h-12 sm:w-14 sm:h-14 lg:w-12 lg:h-12 font-medium cursor-pointer ${
                          selectedColor === color
                            ? "border-black"
                            : "border-gray-400"
                        } ${
                          isOutOfStock
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:border-black border-black"
                        }`}
                        style={{ backgroundColor: color }}
                      >
                        {/* {color} */}
                      </div>
                    );
                  })}
              </div>
            </div>
            {/* Add to Cart and Buy Now buttons */}
            <AddToCart
              product={product}
              selectedVariant={selectedVariant}
              regular={setRegularPrice}
              price={setPrice}
              wholesaleRegular={setWholesaleRegular}
              wholesalePrice={setWholesalePrice}
              wPrice={setWPrice}
            />

            <Link href="#reviews">
              <button className="w-full py-2 bg-black text-white text-lg font-medium transition-transform active:scale-95 hover:opacity-75 mb-10 uppercase">
                Rate Now
              </button>
            </Link>

            {/* Product Description */}
            <div>
              <h2 className="text-xl font-bold mb-5">Product Details</h2>
              <div
                className="text-md mb-5"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default ProductDetails;
