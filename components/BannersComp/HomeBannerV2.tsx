"use client";
import React from "react";

import { backgroundData } from "@/lib/headerData";

const BackgroundMediaText = ({ data }: any) => {
  return (
    <div
      className="background-media-text loaded aos-init aos-animate pt-12 mb-5 md:mb-28 lg:mb-0"
      data-aos="background-media-text__animation"
    >
      <div className="background-media-text__container relative md:flex items-center">
        <img
          style={{
            boxShadow:
              "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
            transform: " scaleX(-1)",
          }}         
          src={`https://bck.headless-woo-temp.demo-web.live/wp-content/uploads/2025/04/teenager-girl-summer-vacation-surprised-pointing-finger-copy-space-isolated-white-bac-scaled.jpg`}
          alt=""
          width="2400"
          height="889"
          loading="lazy"
          className="image-fit background-media-text__image h-[550px] object-cover md:h-auto hidden md:block"
        />
        <img
          src={`https://backend.headless-ecommerce-temp2.demo-web.live/wp-content/uploads/2025/01/tedyt.jpg`}
          alt=""
          width="2400"
          height="889"
          loading="lazy"
          className="image-fit background-media-text__image h-[400px] object-cover md:h-auto md:hidden block"
        />

        <div className="md:absolute lg:px-10 -bottom-28 lg:bottom-auto">
          <div
            style={{
              boxShadow:
                "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
            }}
            className="bg-white p-4 lg:p-5 w-full lg:w-1/2 rounde-lg shadowmd"
          >
            <div className="animation-contents border border-black rounde-lg overflow-hidden">
              <div className="background-media-text__text background-media-text__text--framed p-5">
                <p className="text-base font-bold text-templatePrimary pb-3 text-center lg:text-left leading-snug uppercase">
                  {data.heading}
                </p>

                <p className="text-3xl lg:text-4xl font-bold text-gray-900 pb-2 text-center lg:text-left leading-tight">
                  {data.subheading}
                </p>

                <div className="text-sm lg:text-base text-gray-600 leading-normal text-center lg:text-left">
                  <p>{data.description}</p>
                </div>

                <div className="text-center lg:text-left mt-6">
                  <a
                    href="/shop/best-sellers"
                    className="inline-block bg-black text-white py-2 px-6 rounded shadow-sm transition-all duration-300 hover:bg-gray-800 hover:shadow-md"
                  >
                    {data.buttonText}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="background-media-text__spacer"></div>
    </div>
  );
};


// Usage of component with data from object
const HomeBannerV2 = () => {
  return <BackgroundMediaText data={backgroundData} />;
};
export default HomeBannerV2;
