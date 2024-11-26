"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "./styles.css";

export default function App() {
  const [sliderData, setSliderData] = useState([]);

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://bovinosbck.demo-web.live/wp-json/wp/v2/main-banner?_fields=meta.image"
        );
        const data = await response.json();
        // Map the images from the API response
        const images = data.map((item: any) => ({
          image: item.meta.image,
        }));
        setSliderData(images);
      } catch (error) {
        console.error("Error fetching slider data:", error);
      }
    };

    fetchData();
  }, []);

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
        {sliderData.map((media: any, index) => (
          <SwiperSlide
            key={`${index}`} // Use index as key if id is not available
            style={{ padding: "0" }}
            className="p-0"
          >
            <div className="banner_embla__slide p-0">
              <img
                className="banner_embla__slide__img"
                src={media.image}
                alt={`Slide ${index + 1}`}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
