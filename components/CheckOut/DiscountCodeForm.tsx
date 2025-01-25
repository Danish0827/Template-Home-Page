"use client";

import React, { useState, useCallback, useEffect } from "react";

interface DiscountCodeFormProps {
  cart: any;
  totalFinalPrice: number;
  DiscountPrice: any;
}

const DiscountCodeForm: React.FC<DiscountCodeFormProps> = ({
  cart,
  totalFinalPrice,
  DiscountPrice,
}) => {
  const [discountCode, setDiscountCode] = useState("");
  const [coupons, setCoupons] = useState<any>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [validationSuccess, setValidationSuccess] = useState<string | null>(
    null
  );
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    const cookies = document.cookie;
    const cookieValue = cookies
      .split("; ")
      .find((row) => row.startsWith("user_g="))
      ?.split("=")[1];

    if (!cookieValue) {
      console.error("Cookie 'user_g' not found");
      return;
    }

    const segments = cookieValue.split("-");
    if (segments.length < 3) {
      console.error("Invalid cookie format");
      return;
    }

    const secondSegment = segments[1];
    const userEmail = secondSegment.includes("@")
      ? secondSegment
      : `${secondSegment}@gmail.com`;

    setEmail(userEmail);
  }, []);
  useEffect(() => {
    // validateCoupon(coupons);
  }, [cart]);
  const validateCoupon = (coupon: any) => {
    const {
      date_expires,
      email_restrictions,
      free_shipping,
      discount_type,
      minimum_amount,
      maximum_amount,
      product_ids,
      excluded_product_ids,
      product_categories,
      excluded_product_categories,
      exclude_sale_items,
      usage_limit,
      limit_usage_to_x_items,
      usage_limit_per_user,
      usage_count,
    } = coupon;

    const cartProducts =
      cart?.cartItems?.map((item: any) => item.product_id) || [];
    const cartTotal = totalFinalPrice;

    // 1. Expiry Date
    if (date_expires && new Date(date_expires) < new Date()) {
      return "The coupon has expired.";
    }

    // 2. User Email
    if (email_restrictions.length > 0 && !email_restrictions.includes(email)) {
      return "Your email is not eligible for this coupon.";
    }

    // 3. Free Shipping
    if (free_shipping && !cart?.hasFreeShipping) {
      return "This coupon requires free shipping eligibility.";
    }

    // 4. Discount Type
    if (!["fixed_product", "percent", "fixed_cart"].includes(discount_type)) {
      return "Invalid discount type.";
    }

    // 5. Minimum & Maximum Amount
    if (
      cartTotal < parseFloat(minimum_amount) ||
      cartTotal > parseFloat(maximum_amount)
    ) {
      return `Your cart total must be between ${minimum_amount} and ${maximum_amount} to use this coupon.`;
    }

    // 6. Excluded Categories
    const cartCategories =
      cart?.cartItems?.map((item: any) => item.category_id) || [];
    if (
      excluded_product_categories.some((excludedCategory: any) =>
        cartCategories.includes(excludedCategory)
      )
    ) {
      return "Your cart contains items from excluded categories.";
    }

    // 7. Categories
    if (
      product_categories.length > 0 &&
      !cartCategories.some((category: any) =>
        product_categories.includes(category)
      )
    ) {
      return "Your cart does not contain items from eligible categories.";
    }

    // 8. Excluded Products
    if (
      excluded_product_ids.some((excludedProduct: any) =>
        cartProducts.includes(excludedProduct)
      )
    ) {
      return "Your cart contains excluded products.";
    }

    // 9. Products
    if (
      product_ids.length > 0 &&
      !cartProducts.some((product: any) => product_ids.includes(product))
    ) {
      return "Your cart does not contain eligible products.";
    }

    // 10. Exclude Sale Items
    if (
      exclude_sale_items &&
      cart?.cartItems.some((item: any) => item.onSale)
    ) {
      return "Sale items are not eligible for this coupon.";
    }

    // 11. Usage Limit Per Coupon
    if (usage_limit && usage_count >= usage_limit) {
      return "This coupon has reached its usage limit.";
    }

    // 12. Limit Usage to X Items
    if (
      limit_usage_to_x_items &&
      cartProducts.length > limit_usage_to_x_items
    ) {
      return `This coupon can only be applied to ${limit_usage_to_x_items} item(s) in your cart.`;
    }

    // 13. Usage Limit Per User
    const userUsageCount =
      coupon.used_by?.filter((user: string) => user === email).length || 0;
    if (usage_limit_per_user && userUsageCount >= usage_limit_per_user) {
      return "You have reached the usage limit for this coupon.";
    }

    return null; // Valid coupon
  };
  const handleApply = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>, discountCode: string) => {
      e.preventDefault();
      if (!discountCode.trim()) return;
      console.log(discountCode);

      try {
        const response = await fetch(`/api/get-coupons?code=${discountCode}`);
        const data = await response.json();
        setCoupons(data.coupon || []);
        if (data.success && data.coupon) {
          const validationMessage = validateCoupon(data.coupon);
          if (validationMessage) {
            setValidationError(validationMessage);
            setValidationSuccess("");
          } else {
            setValidationError(null);
            // console.log("Coupon applied successfully!");
            const coupon = data.coupon;

            // Validate the coupon
            // const now = new Date();
            // const expiryDate = new Date(coupon.date_expires);

            // if (expiryDate < now) {
            //   console.error("Coupon is expired");
            //   return;
            // }

            // if (!coupon.email_restrictions.includes(email)) {
            //   console.error("Email is not eligible for this coupon");
            //   return;
            // }

            // Parse total price and coupon amount as numbers
            // const cartTotal = parseFloat(cart.totalFinalPrice || "0");
            // Debugging parseFloat issue
            const rawAmount = coupon?.amount; // Get the raw value
            // console.log(rawAmount, "rawAmount from coupon"); // Log the raw value from coupon

            const couponAmount = parseFloat(rawAmount || "0"); // Parse it safely
            console.log(couponAmount, "parsed couponAmount"); // Log the parsed value

            // const couponAmount = parseFloat(coupon?.amount || "0");
            console.log(totalFinalPrice, "totalFinalPrice");
            console.log(couponAmount, "couponAmount");
            console.log(coupon.discount_type, "open");

            let discountedAmount = 0;

            // Apply discount based on the discount type
            if (coupon.discount_type === "percent") {
              // Percentage discount
              discountedAmount = (totalFinalPrice * couponAmount) / 100;
              console.log(totalFinalPrice, "totalFinalPrice");
              console.log(coupon.discount_type);

              console.log(discountedAmount);
            } else if (coupon.discount_type === "fixed_cart") {
              // Fixed discount for the entire cart
              discountedAmount = couponAmount;
            } else if (coupon.discount_type === "fixed_product") {
              discountedAmount = couponAmount;
            }
            console.log(discountedAmount);

            // Calculate the final price after applying the discount
            const finalPrice = Math.max(totalFinalPrice - discountedAmount, 0); // Ensure the price is not negative
            DiscountPrice(finalPrice);
            if (finalPrice) {
              setValidationSuccess("Coupon applied successfully!");
            }
            console.log("Final price after applying coupon:", finalPrice);
          }
        } else {
          setValidationError("Invalid discount code.");
        }
      } catch (error) {
        console.error("Error fetching coupons:", error);
      }
    },
    [discountCode, cart, email]
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
          <div className="flex items-center space-x-2 lg:space-x-3 mb-2">
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
          {validationError && (
            <div className="text-red-600 text-sm mb-3">{validationError}</div>
          )}
          {validationSuccess && (
            <div className="text-green-600 text-sm mb-3">
              {validationSuccess}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiscountCodeForm;
