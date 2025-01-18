"use client";
import React, { useEffect, useState } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import "./EmblaStyle.css";
import Link from "next/link";
import { fetchCountryCurrencyData } from "../Currency/CurrencyChanger";
import { FaHeart, FaRegHeart } from "react-icons/fa";

type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
};

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

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { options } = props;
  const [emblaRef] = useEmblaCarousel(options);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  // const [currencyCode, setCurrencyCode] = useState<any>();
  // const [convergenceData, setConvergenceData] = useState();
  const [currencySymbol, setCurrencySymbol] = useState();
  const [countryValue, setCountryValue] = useState<number | undefined>(); // For storing your country's value
  const [wishlist, setWishlist] = useState<Product[]>([]);
  useEffect(() => {
    const storedWishlist = localStorage.getItem("wishlist");
    if (storedWishlist) {
      try {
        setWishlist(JSON.parse(storedWishlist)); // Parse JSON string into an array of products
      } catch (error) {
        console.error("Error parsing wishlist from localStorage:", error);
        setWishlist([]); // Fallback to an empty array if parsing fails
      }
    }
  }, []);

  const handleWishlistToggle = (product: any) => {
    const productExists = wishlist.find((item: any) => item.id === product.id);

    const updatedWishlist = productExists
      ? wishlist.filter((item: any) => item.id !== product.id) // Remove product if it exists
      : [...wishlist, product]; // Add the whole product to wishlist

    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist)); // Update localStorage with the updated wishlist
  };

  // Load wishlist from localStorage when the component mounts
  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist)); // Set wishlist state with saved data
    }
  }, []);

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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "/api/get-products?featured=true&includeVariations=true"
        );
        const data = await response.json();
        if (data.success) {
          setProducts(data.products);
        }
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
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
    // console.log(size, "sadsad");

    setSelectedVariant(variant);
  };
  // Skeleton Loader
  const skeletons = Array.from({ length: 50 });

  return (
    <section className="embla overflow-hidden py-4 md:py-8 lg:py-12">
      <div>
        <h3 className="text-templatePrimaryHeading text-2xl md:text-3xl lg:text-4xl text-center py-2 uppercase">
          Best Sellers
        </h3>
      </div>

      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container p-2">
          {loading
            ? skeletons.map((_, index) => (
                <div
                  key={index}
                  className="embla__slide rounded-lg animate-pulse"
                >
                  <div className="rounded-lg shadow-lg bg-gray-200 overflow-hidden">
                    <div className="h-48 bg-gray-300"></div>
                    <div className="py-4 px-2">
                      <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto mb-2"></div>
                      <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
                    </div>
                  </div>
                </div>
              ))
            : products.map((product) => (
                <>
                  <div key={product.id} className="embla__slide rounded-lg">
                    <Link
                      href={`/shop/best-sellers/product/${product.slug}?size=${selectedSize}`}
                      key={product.id}
                      className="rounded-lg border shadow-md block"
                    >
                      <div className="rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white overflow-hidden">
                        <div
                          className="absolute top-2 right-2 bg-[#fff] text-black text-xs font-semibold px-2 py-1 rounded-lg uppercase z-10 cursor-pointer"
                          onClick={(e) => {
                            e.preventDefault(); // Prevent link navigation if wrapped in a link
                            e.stopPropagation(); // Prevent link navigation
                            handleWishlistToggle(product); // Pass the whole product object
                          }}
                        >
                          {wishlist.some(
                            (item: any) => item.id === product.id
                          ) ? (
                            <FaHeart className="cursor-pointer text-red-500 text-xl" />
                          ) : (
                            <FaRegHeart className="text-xl" /> // Empty heart icon
                          )}
                        </div>
                        <div className="relative group">
                          <img
                            className="w-full h-auto object-cover"
                            src={product.images[0]?.src}
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
                        <div className="py-4 px-1">
                          <Link
                            href={product.permalink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-templateSecondaryHeading line-clamp-1 block mt-2 text-sm font-semibold text-center h-[50px] hover:text-templatePrimary"
                          >
                            {product.name}
                          </Link>
                          <div className="text-templatePrimaryText text-base text-center mt-0 font-semibold text-gray-700">
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
                          <div className="flex justify-center flex-wrap mt-0 space-x-1">
                            {product.attributes
                              .find((attr) => attr.name === "Size")
                              ?.options.map((size) => {
                                const variant = product.variations.find((v) =>
                                  v?.attributes?.some(
                                    (attr) => attr.option === size
                                  )
                                );

                                const isOutOfStock =
                                  variant?.stock_status === "outofstock";

                                return (
                                  <div
                                    key={`${product.id}-${size}`}
                                    onClick={() =>
                                      !isOutOfStock &&
                                      handleSizeChange(product.id, size)
                                    }
                                    className={`border border-templatePrimary mt-2 rounded-full w-7 h-7 flex items-center justify-center text-[10px] font-medium text-templateDark cursor-pointer ${
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
                      </div>
                    </Link>
                  </div>
                </>
              ))}
          <div className="embla__slide rounded-lg">
            <div className="text-center flex justify-center items-center mt-16 absolute top-1/2">
              <Link
                href="/shop/best-sellers"
                className="bg-black text-sm w-28 sm:w-40 ml-4 sm:ml-6 -mt-20 text-white py-3 sm:px-3 hover:bg-zinc-800"
              >
                View All <br />
                {products.length} Products
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmblaCarousel;
