"use client";
import React, { useEffect, useState } from "react";
import { topAnnouncement } from "@/lib/headerData";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "./styles.css";
import Link from "next/link";

export default function App() {
  const [announcements, setAnnouncements] = useState([]);

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/wp/v2/announcement?_fields=id,slug,meta.title`
        );
        const data = await response.json();
        // console.log(data, "sas");

        // // Map the images from the API response
        // const images = data.map((item: any) => ({
        //   image: item.meta.image,
        // }));
        setAnnouncements(data);
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
          delay: 2000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="mySwiper cursor-grab"
      >
        {announcements.map((media: any, index) => (
          <SwiperSlide
            key={`${media?.id}-${index}`} // Combines id and index as a fallback
            className="bg-templateDark bg-gradient-to-r from-templatePrimary to-templateSecondary"
          >
            <Link href={media?.slug}>
              <p className="text-white text-[13px] lg:py-[6px] cursor-grab font-semibold line-clamp-1">
                {media?.meta?.title}
              </p>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
