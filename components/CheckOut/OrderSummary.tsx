"use client";
import React, { useContext } from "react";
import DiscountCodeForm from "@/components/CheckOut/DiscountCodeForm";
import { AppContext } from "../context";
import CostSummary from "./CostSummary";

interface OrderSummaryProps {
  Method: string;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ Method }:any) => {
  const [cart] = useContext(AppContext) as any;

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
      <section className="shopping-cart">
        <h4 className="text-lg font-semibold mb-2">Shopping Cart</h4>
        <div className="overflow-x-auto">
          <div className="min-w-full border border-gray-200">
            {/* Header Row */}
            <div className="bg-gray-100 grid grid-cols-4 font-semibold text-gray-700">
              <div className="p-2">Product Image</div>
              <div className="p-2">Description</div>
              <div className="p-2">Quantity</div>
              <div className="p-2">Price</div>
            </div>
            {/* Cart Items */}
            {cart?.cartItems?.map((item: any) => (
              <div
                key={item.key}
                className="grid grid-cols-4 items-center border-t border-gray-200"
              >
                <div className="p-2">
                  <img
                    src={
                      item?.data?.images?.[0]?.src || "fallback-image-url.jpg"
                    }
                    alt={item?.name || "Product Image"}
                    className="w-16 h-16 object-cover"
                  />
                </div>
                <div className="p-2">
                  <p>{item?.data?.name}</p>
                  {item?.variation?.attribute_pa_size && (
                    <p className="text-sm text-gray-500">
                      Size: {item.variation.attribute_pa_size}
                    </p>
                  )}
                </div>
                <div className="p-2">{item.quantity}</div>
                <div className="p-2">{item.line_subtotal.toFixed(2)}</div>
              </div>
            ))}
          </div>
          {/* Discount Form and Cost Summary */}
          <DiscountCodeForm />
          <CostSummary Method={Method} />
        </div>
      </section>
    </div>
  );
};

export default OrderSummary;
