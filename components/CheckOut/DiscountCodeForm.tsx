"use client";

import React, { useState, useCallback } from "react";

interface DiscountCodeFormProps {
  cart: any;
  totalFinalPrice: any;
}

const DiscountCodeForm: React.FC<DiscountCodeFormProps> = ({
  cart,
  totalFinalPrice,
}) => {
  const [discountCode, setDiscountCode] = useState("");
  const [coupons, setCoupons] = useState<any[]>([]);

  const handleApply = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>, discountCode: string) => {
      e.preventDefault();
      if (!discountCode.trim()) return;
      console.log(discountCode);

      try {
        const response = await fetch(`/api/get-coupons?code=${discountCode}`);
        const data = await response.json();
        setCoupons(data.coupon || []);
        console.log("Coupons fetched:", data);

        // Apply discount code to cart
        if (data.success === true) {
          console.log("Coupons fetched:", coupons);
        } else {
          console.error("Invalid discount code");
        }
      } catch (error) {
        console.error("Error fetching coupons:", error);
      }
    },
    [discountCode]
  );

  if (!cart) return null;

  return (
    <div className="mt-5 bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-4 lg:p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3 lg:mb-6">
          Apply Discount Code
        </h2>
        <div>
          <h5 className="block text-sm font-medium text-gray-700 mb-2">
            Enter your discount code
          </h5>
          <div className="flex items-center space-x-2 lg:space-x-3">
            <input
              id="discountCode"
              type="text"
              placeholder="e.g., SAVE20"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              className="flex-grow p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-templatePrimary focus:border-templatePrimary transition text-sm"
            />
            <button
              onClick={(e) => handleApply(e, discountCode)}
              disabled={!discountCode.trim()}
              className={`px-5 py-2 text-sm font-medium text-white rounded-lg shadow-md transition ${
                discountCode.trim()
                  ? "bg-templatePrimary hover:bg-templatePrimaryLight focus:ring-4 focus:ring-indigo-300"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscountCodeForm;
