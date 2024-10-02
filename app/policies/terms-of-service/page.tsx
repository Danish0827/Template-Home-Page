import React from "react";
import HeaderV1 from "@/components/Headers/HeaderV1/HeaderV1";
import ColorPallete from "@/components/Pallete/ColorPallete";
import TermsOfService from "@/components/Policies/TermsOfService";
import FooterV1 from "@/components/Footers/FooterV1/FooterV1";

const term = () => {
  return (
    <>
      <ColorPallete />
      <HeaderV1 />
      <TermsOfService />
      <FooterV1 />
    </>
  );
};

export default term;
