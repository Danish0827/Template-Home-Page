"use client";
import React, { useEffect, useState } from "react";

const DiscountCodeForm = ({ cart, totalFinalPrice }: any) => {
  if (!cart) return null; // Return early if cart is not present to avoid unnecessary renders

  const [discountCode, setDiscountCode] = useState("");
  const [isApplied, setIsApplied] = useState(false);
  const [coupons, setCoupons] = useState<any>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [finalAmount, setFinalAmount] = useState(totalFinalPrice);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();

    setErrorMessage(""); // Clear previous error message

    // Check if the entered discount code exists in the fetched coupons
    const validCoupon = coupons.find(
      (coupon: any) => coupon.code.toLowerCase() === discountCode.toLowerCase()
    );

    if (validCoupon) {
      // Check if the totalFinalPrice meets the minimum and maximum requirements
      if (
        totalFinalPrice >= parseFloat(validCoupon.minimum_amount) &&
        totalFinalPrice <= parseFloat(validCoupon.maximum_amount)
      ) {
        const discount =
          validCoupon.discount_type === "fixed_product"
            ? parseFloat(validCoupon.amount)
            : (parseFloat(validCoupon.amount) / 100) * totalFinalPrice;

        const discountedPrice = totalFinalPrice - discount;

        setFinalAmount(discountedPrice > 0 ? discountedPrice : 0);
        setIsApplied(true);
        alert(`Discount Code "${discountCode}" Applied!`);
        console.log(`Final Amount After Discount: ₹${discountedPrice}`);
      } else {
        setErrorMessage(
          `This coupon is not valid for the total amount of ₹${totalFinalPrice}.`
        );
      }
    } else {
      setErrorMessage("Invalid discount code. Please try again.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/get-coupons");
        const data = await response.json();

        if (data && data.coupons) {
          setCoupons(data.coupons);
        } else {
          console.error("Failed to fetch coupon data");
        }
      } catch (error) {
        console.error("Error fetching coupons:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="mt-5 bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Apply Discount Code
        </h2>
        <form
          onSubmit={(e) => handleApply(e)}
          id="discount-form"
          className="space-y-4"
        >
          <div>
            <label
              htmlFor="discountCode"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Enter your discount code
            </label>
            <div className="flex items-center space-x-3">
              <input
                id="discountCode"
                type="text"
                placeholder="e.g., SAVE20"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                className="flex-grow p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition text-sm"
              />
              <button
                type="submit"
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
        </form>
        {isApplied && (
          <div className="mt-4 p-3 bg-green-50 border border-green-400 text-green-700 rounded-lg text-sm">
            <span className="font-semibold">Success!</span> Discount code has
            been applied.
            <br />
            Final Amount: ₹{finalAmount.toFixed(2)}
          </div>
        )}
        {errorMessage && (
          <div className="mt-4 p-3 bg-red-50 border border-red-400 text-red-700 rounded-lg text-sm">
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default DiscountCodeForm;
