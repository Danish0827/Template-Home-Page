"use client";
import React, { useCallback, useEffect } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";
import { products } from "@/lib/headerData";
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
        <div className="embla__container p-2 items-center">
          {products.map((product) => (
            <div key={product.id} className="embla__slide rounded-lg">
              <div className="relative">
                <img
                  className="w-full h-auto"
                  src={product.images[0].primary}
                  alt={product.title}
                />
                <img
                  className="absolute top-0 left-0 w-full h-full opacity-0 hover:opacity-100 transition-opacity"
                  src={product.images[0].secondary}
                  alt={product.title}
                />
              </div>

              <a
                href={product.productUrl}
                className="mt-2 text-lg font-semibold text-center line-clamp-1"
              >
                {product.title}
              </a>

              <div className="text-center mt-2 font-semibold text-gray-700">
                {product.price}
              </div>

              {/* Size Variants */}
              <div className="flex justify-center flex-wrap mt-3 space-x-2 h-20">
                {product.sizes.map((size, index) => (
                  <span
                    key={index}
                    className="border border-gray-400 mt-2 rounded-full w-8 h-8 flex flex-wrap items-center justify-center text-sm font-medium text-gray-700"
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>
          ))}
          <div className="embla__slide rounded-lg">
            <div className="text-center flex justify-center items-center mt-16">
              <a
                href="/collections/kurtas"
                className="bg-black -mt-20 text-white py-3 px-6 hover:bg-zinc-800"
              >
                View All <br />
                250 Products
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmblaCarousel;
