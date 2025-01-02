import React from "react";
import About from "@/components/AboutUs/About";
import HeaderV1 from "@/components/Headers/HeaderV1/HeaderV1";
import ColorPallete from "@/components/Pallete/ColorPallete";
import FooterV1 from "@/components/Footers/FooterV1/FooterV1";

const about = () => {
  return (
    <>
      <ColorPallete />
      <HeaderV1 />
      <About />
      <FooterV1 />
    </>
  );
};

export default about;
