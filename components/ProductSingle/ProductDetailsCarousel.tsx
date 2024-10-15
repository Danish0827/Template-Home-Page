'use client';
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const ProductDetailsCarousel = ({ images }: { images: Array<{ src: string }> }) => {
  return (
    <div className="text-white text-[20px] w-full max-w-[1360px] mx-auto sticky top-[50px]">
      <Carousel
        infiniteLoop={true}
        showIndicators={false}
        showStatus={false}
        thumbWidth={60}
        className="productCarousel"
      >
        {images?.map((img, index) => (
          <img key={index} src={img?.src} alt={`Product Image ${index + 1}`} />
        ))}
      </Carousel>
    </div>
  );
};

export default ProductDetailsCarousel;
