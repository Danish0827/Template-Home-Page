"use client";
import React, { useRef, useState } from "react";
import { topAnnouncement } from "@/lib/headerData";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "./styles.css";

export default function App() {
  const { announcement } = topAnnouncement;
  return (
    <>
      <Swiper
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        className="mySwiper cursor-grab"
      >
        {announcement.map((media) => (
          <SwiperSlide className="bg-templateDark from-templatePrimary to-templateSecondary">
            <p className=" text-[13px] lg:py-[6px] cursor-grab font-semibold line-clamp-1">
              {media.heading}
            </p>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
