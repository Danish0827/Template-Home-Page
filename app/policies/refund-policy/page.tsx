import React from "react";
import HeaderV1 from "@/components/Headers/HeaderV1/HeaderV1";
import ColorPallete from "@/components/Pallete/ColorPallete";
import FooterV1 from "@/components/Footers/FooterV1/FooterV1";
import RefundPolicy from "@/components/Policies/RefundPolicy";

const refund = () => {
  return (
    <>
      <ColorPallete />
      <HeaderV1 />
      <RefundPolicy />
      <FooterV1 />
    </>
  );
};

export default refund;
