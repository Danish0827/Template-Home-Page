"use client";
import React, { useState } from "react";

const DiscountCodeForm = () => {
  const [discountCode, setDiscountCode] = useState("");
  const [isApplied, setIsApplied] = useState(false);

  const handleApply = (e:any) => {
    e.preventDefault();
    if (discountCode.trim()) {
      setIsApplied(true);
      alert(`Discount Code "${discountCode}" Applied!`);
    }
  };

  return (
    <div className="w-full py-6 bg-white shadow-md rounded-lg">
      <section className="mb-4">
        <h2 className="text-xl font-semibold mb-4">Discount Code</h2>
        <form onSubmit={handleApply} id="discount-form" className="space-y-4">
          <label
            htmlFor="discountCode"
            className="block font-medium text-gray-700"
          >
            Discount code
          </label>
          <div className="flex flex-wrap items-center space-x-4 w-full">
            <input
              id="discountCode"
              type="text"
              placeholder="Enter discount code"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              className="block w-[80%] p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <button
              type="submit"
              disabled={!discountCode.trim()}
              className={`w-[15%] bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition ${
                !discountCode.trim() ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Apply
            </button>
          </div>
        </form>
        {isApplied && (
          <div className="mt-4 text-green-600">Discount code applied!</div>
        )}
      </section>
    </div>
  );
};

export default DiscountCodeForm;
