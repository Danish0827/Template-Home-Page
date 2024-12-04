"use client";
import React, { useEffect, useState } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import "./EmblaStyle.css";

type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { options } = props;
  const [emblaRef] = useEmblaCarousel(options);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/get-products?featured=true");
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

  // Skeleton Loader
  const skeletons = Array.from({ length: 5 });

  return (
    <section className="embla overflow-hidden py-4 md:py-8 lg:py-12">
      <div>
        <h3 className="text-templatePrimaryHeading text-2xl md:text-3xl lg:text-4xl text-center py-2">
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
            : products.map((product: any) => (
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
                    <div className="py-4 px-1">
                      <a
                        href={product.permalink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-templateSecondaryHeading block mt-2 text-sm font-semibold text-center line-clamp-2 h-[50px] hover:text-templatePrimary"
                      >
                        {product.name}
                      </a>
                      <div className="text-templatePrimaryText text-base text-center mt-2 font-semibold text-gray-700">
                        ₹{product.price}
                      </div>
                      <div className="flex justify-center flex-wrap mt-3 space-x-1">
                        {product.attributes
                          .find(
                            (attr: any) =>
                              attr.name.toLowerCase() === "size"
                          )
                          ?.options.map((size: any, index: any) => (
                            <span
                              key={index}
                              className="border border-templatePrimary mt-2 rounded-full w-7 h-7 flex items-center justify-center text-[10px] font-medium text-templateDark"
                            >
                              {size}
                            </span>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
};

export default EmblaCarousel;
