"use client";
import React from "react";

// Sample data object
import { backgroundData } from "@/lib/headerData";

const BackgroundMediaText = ({ data }: any) => {
  return (
    <div
      className="background-media-text loaded aos-init aos-animate pt-12"
      data-aos="background-media-text__animation"
    >
      <div className="background-media-text__container relative flex items-center">
        <img
          src={data.imageUrl}
          alt=""
          width="2400"
          height="889"
          loading="lazy"
          className="image-fit background-media-text__image h-[550px] object-cover md:h-auto"
        />

        <div className="absolute px-3 lg:px-10">
          <div className="bg-white p-4  w-full lg:w-1/2">
            <div className="animation-contents border-black border">
              <div className="background-media-text__text background-media-text__text--framed p-5">
                <p className="text-2xl pb-2 text-center lg:text-left">
                  {data.heading}
                </p>
                <p className="text-3xl lg:text-4xl pb-3 text-center lg:text-left">
                  {data.subheading}
                </p>
                <div className="text-lg text-center lg:text-left">
                  <p>{data.description}</p>
                </div>
                <div className="text-center lg:text-left mt-8">
                  <a
                    href="/collections/kurtas"
                    className="bg-black text-white py-3 px-6 hover:bg-zinc-800"
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
