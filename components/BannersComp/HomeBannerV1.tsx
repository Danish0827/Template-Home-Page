"use client";
import React, { useEffect } from "react";
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

  return (
    <div className="z-0">
      <div className="banner_embla">
        <div className="banner_embla__viewport" ref={emblaRef}>
          <div className="banner_embla__container">
            <div className="banner_embla__slide">
              <img
                className="banner_embla__slide__img"
                src={`https://static.vecteezy.com/system/resources/previews/006/726/067/non_2x/shopping-online-on-phone-with-podium-paper-art-modern-pink-background-gifts-box-free-vector.jpg`}
                alt="Your alt text"
              />
            </div>
            <div className="banner_embla__slide">
              <img
                className="banner_embla__slide__img"
                src={`https://static.vecteezy.com/system/resources/previews/004/299/815/non_2x/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-vector.jpg`}
                alt="Your alt text"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeBannerV1;
