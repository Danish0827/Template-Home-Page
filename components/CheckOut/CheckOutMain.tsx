"use client";
import React, { useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import OrderSummary from "@/components/CheckOut/OrderSummary";
import ShippingAddressForm from "@/components/CheckOut/ShippingAddressForm";
import AccoutLogin from "@/components/CheckOut/AccoutLogin";
import ColorPallete from "@/components/Pallete/ColorPallete";
import HeaderV1 from "@/components/Headers/HeaderV1/HeaderV1";
import FooterV1 from "@/components/Footers/FooterV1/FooterV1";
import { AppContext } from "../context";

const CheckOutMain = () => {
  const [cart] = useContext<any>(AppContext);
  const [method, setMethod] = useState<any>();
  const router = useRouter();

  useEffect(() => {
    // Redirect to homepage if cartItems is empty
    if (!cart || !cart?.cartItems || cart?.cartItems?.length === 0) {
      router.push("/");
    }
  }, [cart, router]);

  return (
    <>
      <ColorPallete />
      <HeaderV1 />
      <div className="flex flex-wrap">
        <div className="lg:w-1/2 py-6">
          <AccoutLogin />
          <ShippingAddressForm setMethod={setMethod} />
        </div>
        <div className="lg:w-1/2">
          <OrderSummary Method={method} />
        </div>
      </div>
      <FooterV1 />
    </>
  );
};

export default CheckOutMain;
