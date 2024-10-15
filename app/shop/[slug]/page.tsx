import React from "react";
import HeaderV1 from "@/components/Headers/HeaderV1/HeaderV1";
import ColorPallete from "@/components/Pallete/ColorPallete";
import ProductPart from "@/components/ProductPage/Product";
import FooterV1 from "@/components/Footers/FooterV1/FooterV1";

const products = ({params}:any) => {
  return (
    <>
      <ColorPallete />
      <HeaderV1 />
      <ProductPart params={params.slug}/>
      <FooterV1 />
    </>
  );
};

export default products;
