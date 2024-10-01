import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const ProductDetailsCarousel = () => {
  return (
    <>
      <div className="text-white text-[20px] w-full max-w-[1360px] mx-auto sticky top-[50px]">
        <Carousel
          infiniteLoop={true}
          showIndicators={false}
          showStatus={false}
          thumbWidth={60}
          className="productCarousel"
        >
          <img src="https://www.cottonculture.co.in/cdn/shop/files/ABHISHAMAROON1.jpg?v=1725634973&width=1080" />

          <img src="https://www.cottonculture.co.in/cdn/shop/files/ABHISHAMAROON6.jpg?v=1725634972&width=1080" />
          <img src="https://www.cottonculture.co.in/cdn/shop/files/ABHISHAMAROON6.jpg?v=1725634972&width=1080" />
          <img src="https://www.cottonculture.co.in/cdn/shop/files/ABHISHAMAROON6.jpg?v=1725634972&width=1080" />
          <img src="https://www.cottonculture.co.in/cdn/shop/files/ABHISHAMAROON6.jpg?v=1725634972&width=1080" />
          <img src="https://www.cottonculture.co.in/cdn/shop/files/ABHISHAMAROON6.jpg?v=1725634972&width=1080" />
          <img src="https://www.cottonculture.co.in/cdn/shop/files/ABHISHAMAROON6.jpg?v=1725634972&width=1080" />
        </Carousel>
      </div>
    </>
  );
};

export default ProductDetailsCarousel;