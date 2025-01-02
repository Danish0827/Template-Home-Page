"use client";
import React, { useEffect, useState } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Fade from "embla-carousel-fade";
import "./EmblaBannerStyle.css";

const HomeBannerV1: React.FC = () => {
  const options: EmblaOptionsType = { loop: true, duration: 30 };
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Fade()]);

  useEffect(() => {
    if (!emblaApi) return;

    const autoplay = setInterval(() => {
      if (emblaApi) emblaApi.scrollNext();
    }, 5000);

    return () => clearInterval(autoplay);
  }, [emblaApi]);

  const [sliderData, setSliderData] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(true);

  // Determine if the user is on a mobile device
  useEffect(() => {
    const updateDeviceType = () => {
      setIsMobile(window.innerWidth <= 768); // Mobile if screen width is <= 768px
    };

    updateDeviceType(); // Check on initial render
    window.addEventListener("resize", updateDeviceType);

    return () => {
      window.removeEventListener("resize", updateDeviceType);
    };
  }, []);

  // Fetch data from the appropriate API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Set loading to true before fetching
        const apiUrl = isMobile
          ? `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/wp/v2/mobile-image-sliders?_fields=meta.image`
          : `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/wp/v2/desktop-image-slider?_fields=meta.image`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        // Map the images from the API response
        const images = data.map((item: any) => ({
          image: item.meta.image,
        }));
        setSliderData(images);
      } catch (error) {
        console.error("Error fetching slider data:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchData();
  }, [isMobile]); // Refetch when `isMobile` changes

  return (
    <div className="z-0">
      {loading ? (
        // Skeleton loader
        <div className="skeleton-container flex items-center justify-center h-96">
          <div className="w-full h-full flex overflow-hidden space-x-4">
            {Array.from({ length: 1 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse bg-gray-300 rounded-lg w-full h-full"
              ></div>
            ))}
          </div>
        </div>
      ) : (
        <div className="banner_embla">
          <div className="banner_embla__viewport" ref={emblaRef}>
            <div className="banner_embla__container">
              {sliderData.map((media: any, index) => (
                <div className="banner_embla__slide" key={index}>
                  <img
                    className="banner_embla__slide__img"
                    src={media.image}
                    alt={`Slide ${index + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeBannerV1;
