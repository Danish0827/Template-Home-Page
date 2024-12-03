"use client";
import React, { useCallback, useEffect, useState } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";
// import { products } from "@/lib/headerData";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowsButtons";
import "./EmblaStyle.css";

type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);
  // Autoplay functionality
  // const autoplay = useCallback(() => {
  //   if (!emblaApi) return;
  //   const autoplayInterval = setInterval(() => {
  //     emblaApi.scrollNext();
  //   }, 1000); // Autoplay interval of 1 second

  //   return () => clearInterval(autoplayInterval);
  // }, [emblaApi]);

  // useEffect(() => {
  //   autoplay();
  // }, [autoplay]);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/get-products?featured=true"
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

  if (loading) {
    return <div className="text-center py-16">Loading...</div>;
  }

  return (
    <section className="embla overflow-hidden py-4 md:py-8 lg:py-12">
      {/* <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={"embla__dot ".concat(
                index === selectedIndex ? " embla__dot--selected" : ""
              )}
            />
          ))}
        </div>
      </div> */}
      <div>
        <h3 className="text-templatePrimaryHeading text-2xl md:text-3xl lg:text-4xl text-center py-2">
          Best Sellers
        </h3>
      </div>

      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container p-2 ">
          {products.map((product: any) => (
            <div key={product.id} className="embla__slide rounded-lg">
              <div className="rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white overflow-hidden">
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

                <div className="p-4">
                  <a
                    href={product.permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-templateSecondaryHeading block mt-2 text-base font-semibold text-center line-clamp-2 h-[50px] hover:text-templatePrimary"
                  >
                    {product.name}
                  </a>

                  <div className="text-templateSecondaryText text-center mt-2 font-semibold text-gray-700">
                    ₹{product.price}
                  </div>

                  {/* Size Variants */}
                  <div className="flex justify-center flex-wrap mt-3 space-x-2">
                    {product.attributes
                      .find((attr: any) => attr.name.toLowerCase() === "size")
                      ?.options.map((size: any, index: any) => (
                        <span
                          key={index}
                          className="border border-templatePrimary mt-2 rounded-full w-8 h-8 flex items-center justify-center text-xs font-medium text-templateDark"
                        >
                          {size}
                        </span>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="embla__slide rounded-lg">
            <div className="text-center flex justify-center items-center mt-16 absolute top-1/2">
              <a
                href="/collections/kurtas"
                className="bg-black w-40 ml-4 -mt-20 text-white py-3 px-6 hover:bg-zinc-800"
              >
                View All <br />
                {products.length} Products
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmblaCarousel;
