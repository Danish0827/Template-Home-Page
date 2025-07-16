import FooterV1 from "@/components/Footers/FooterV1/FooterV1";
import HeaderV1 from "@/components/Headers/HeaderV1/HeaderV1";
import ColorPallete from "@/components/Pallete/ColorPallete";
import BlogSingle from "@/components/Blog/BlogSingle";
import React from "react";

const blogSingle = ({ params }: any) => {
  return (
    <>
      <ColorPallete />
      <HeaderV1 />
      <BlogSingle params={params?.slug} />
      <FooterV1 />
    </>
  );
};


export default blogSingle;
