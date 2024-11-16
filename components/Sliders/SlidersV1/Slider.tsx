"use client";
import React, { useRef, useState } from "react";
import { siyafySlider } from "@/lib/headerData";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "./styles.css";

export default function App() {
  const { IsSlider, Slider } = siyafySlider;
  return (
    <>
      <Swiper
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        className="mySwiper cursor-grab p-0"
      >
        {Slider.map((media, index) => (
          <SwiperSlide
            key={`${media.id}-${index}`} // Combines id and index as a fallback
            style={{ padding: "0" }}
            className="p-0"
          >
            <div className="banner_embla__slide p-0">
              <img
                className="banner_embla__slide__img"
                src={media.image}
                alt="Your alt text"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
