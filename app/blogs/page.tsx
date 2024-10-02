import React from "react";
import HeaderV1 from "@/components/Headers/HeaderV1/HeaderV1";
import ColorPallete from "@/components/Pallete/ColorPallete";
import FooterV1 from "@/components/Footers/FooterV1/FooterV1";
import Blog from "@/components/Blog/Blog";

const blogs = () => {
  return (
    <>
      <>
        <ColorPallete />
        <HeaderV1 />
        <Blog title="blog" />
        <FooterV1 />
      </>
    </>
  );
};

export default blogs;
