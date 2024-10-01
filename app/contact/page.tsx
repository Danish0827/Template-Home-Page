import React from "react";
import ContactInfo from "@/components/Contact/ContactInfo";
import HeaderV1 from "@/components/Headers/HeaderV1/HeaderV1";
import ColorPallete from "@/components/Pallete/ColorPallete";
import FooterV1 from "@/components/Footers/FooterV1/FooterV1";

const contact = () => {
  return (
    <>
      <ColorPallete />
      <HeaderV1 />
      <ContactInfo />
      <FooterV1 />
    </>
  );
};

export default contact;
