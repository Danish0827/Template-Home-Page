import React from "react";
import HeaderV1 from "@/components/Headers/HeaderV1/HeaderV1";
import ColorPallete from "@/components/Pallete/ColorPallete";
import ProductSingle from "@/components/ProductSingle/ProductSingle";
import FooterV1 from "@/components/Footers/FooterV1/FooterV1";

const single = () => {
  return (
    <>
      <ColorPallete />
      <HeaderV1 />
      <ProductSingle />
      <FooterV1 />
    </>
  );
};

export default single;
