import React from "react";
import OrderSummary from "@/components/CheckOut/OrderSummary";
import ShippingAddressForm from "@/components/CheckOut/ShippingAddressForm";
import AccoutLogin from "@/components/CheckOut/AccoutLogin";
import ColorPallete from "@/components/Pallete/ColorPallete";
import HeaderV1 from "@/components/Headers/HeaderV1/HeaderV1";
import FooterV1 from "@/components/Footers/FooterV1/FooterV1";
import ShippingMethodComponent from "@/components/CheckOut/ShippingMethodComponent";

const checkouts = () => {
  return (
    <>
      <ColorPallete />
      <HeaderV1 />
      <div className="flex flex-wrap">
        <div className="lg:w-1/2 py-6">
          <AccoutLogin />
          <ShippingAddressForm />
          
        </div>
        <div className="lg:w-1/2">
          <OrderSummary />
        </div>
      </div>
      <FooterV1 />
    </>
  );
};

export default checkouts;
