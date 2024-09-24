import HomeBannerV1 from "@/components/BannersComp/HomeBannerV1";
import EmblaCarousel from "@/components/ProductCarousel/EmblaCarousel";
import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import Product from "@/components/Product/Product";
import ProductMobile from "@/components/Product/ProductMobile";
import Slider from "@/components/Sliders/SlidersV1/Slider";
import ShopByCategory from "@/components/Category/ShopByCategory";
import HomeBannerV2 from "@/components/BannersComp/HomeBannerV2";
import TextWithIcons from "@/components/ProcessType/TextWithIcons";

// import Slider from "@/components/Sliders/SlidersV2/Slider";

const OPTIONS: EmblaOptionsType = { align: "start" };
const SLIDE_COUNT = 8;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

const Homepage = () => {
  return (
    <div>
      <Slider />
      <ShopByCategory />
      <HomeBannerV2 />
      <div className="hidden lg:block">
        <Product />
      </div>
      <div className="lg:hidden">
        <EmblaCarousel slides={SLIDES} options={OPTIONS} />
      </div>
      {/* <ProductMobile /> */}
      <HomeBannerV1 />
      <TextWithIcons />
    </div>
  );
};

export default Homepage;
