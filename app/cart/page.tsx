import React from "react";
import CartPage from "@/components/Cart/CartPage";
import HeaderV1 from "@/components/Headers/HeaderV1/HeaderV1";
import ColorPallete from "@/components/Pallete/ColorPallete";
import FooterV1 from "@/components/Footers/FooterV1/FooterV1";

const cart = () => {
  return (
    <div>
      <ColorPallete />
      <HeaderV1 />
      <CartPage />
      <FooterV1 />
    </div>
  );
};

export default cart;
