"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { siyafySlider } from "@/lib/headerData";
import { Swiper as SwiperType } from "swiper"; // Import the Swiper type

export default function App() {
  const { IsSlider, Slider } = siyafySlider;
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null); // Set the type to Swiper or null

  return (
    <>
      <Swiper
        // style={{
        //   "--swiper-navigation-color": "#fff",
        //   "--swiper-pagination-color": "#fff",
        // }}
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {Slider.map((media, index) => (
          <SwiperSlide key={index} style={{ padding: "0" }}>
            <img src={media.image} alt={`Slide ${index + 1}`} />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper} // This will now correctly handle the Swiper instance
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {Slider.map((media, index) => (
          <SwiperSlide key={index}>
            <img src={media.image} alt={`Thumb ${index + 1}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
