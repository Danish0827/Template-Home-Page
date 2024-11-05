"use client";
import React, { useState } from "react";

const ShippingMethodComponent = ({ Method }: any) => {
  const [selectedMethod, setSelectedMethod] = useState("freeDelivery");

  const handleMethodChange = (event: any) => {
    const method = event.target.value;
    setSelectedMethod(method);
    Method(method); // Update the method in parent component
  };

  return (
    <div className="max-w-lg mx-auto pb-5">
      <h3 className="text-2xl font-semibold mb-4">Shipping Method</h3>
      <fieldset className="space-y-4">
        <legend className="sr-only">Choose a shipping method</legend>
        <div className="flex items-center p-4 border rounded-lg hover:bg-gray-100 transition-colors duration-300">
          <input
            type="radio"
            id="freeDelivery"
            name="shipping_methods"
            value="freeDelivery"
            checked={selectedMethod === "freeDelivery"}
            onChange={handleMethodChange}
            className="h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500"
          />
          <label
            htmlFor="freeDelivery"
            className="ml-3 flex-grow cursor-pointer"
          >
            <div className="text-lg font-medium">Free Delivery (Prepaid)</div>
            <div className="text-gray-500">Free</div>
          </label>
        </div>
        <div className="flex items-center p-4 border rounded-lg hover:bg-gray-100 transition-colors duration-300">
          <input
            type="radio"
            id="cashOnDelivery"
            name="shipping_methods"
            value="cashOnDelivery"
            checked={selectedMethod === "cashOnDelivery"}
            onChange={handleMethodChange}
            className="h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500"
          />
          <label
            htmlFor="cashOnDelivery"
            className="ml-3 flex-grow cursor-pointer"
          >
            <div className="text-lg font-medium">Cash On Delivery Charges</div>
            <div className="text-gray-500">Non-Refundable</div>
            <div className="text-blue-600">₹99.00</div>
          </label>
        </div>
      </fieldset>
    </div>
  );
};

export default ShippingMethodComponent;
