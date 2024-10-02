import React from "react";
import HeaderV1 from "@/components/Headers/HeaderV1/HeaderV1";
import ColorPallete from "@/components/Pallete/ColorPallete";
import ShippingPolicy from "@/components/Policies/ShippingPolicy";
import FooterV1 from "@/components/Footers/FooterV1/FooterV1";

const shipping = () => {
  return (
    <>
      <ColorPallete />
      <HeaderV1 />
      <ShippingPolicy />
      <FooterV1 />
    </>
  );
};

export default shipping;
