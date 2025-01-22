import { NextResponse } from "next/server";
const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

// Initialize WooCommerce API
const api = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL,
  consumerKey: process.env.WC_CONSUMER_KEY,
  consumerSecret: process.env.WC_CONSUMER_SECRET,
  version: "wc/v3",
});

export async function GET(req) {
  const responseData = {
    success: false,
    coupon: null,
    error: null,
  };

  try {
    // Get the `code` parameter from the query string
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");

    if (!code) {
      responseData.error = "Coupon code is required.";
      return NextResponse.json(responseData);
    }

    // Fetch all coupons
    const response = await api.get("coupons");
    const coupons = response.data;

    // Find the coupon by code (case-insensitive)
    const matchingCoupon = coupons.find(
      (coupon) => coupon.code.toLowerCase() === code.toLowerCase()
    );

    if (matchingCoupon) {
      responseData.success = true;
      responseData.coupon = matchingCoupon;
    } else {
      responseData.error = `No coupon found for code: ${code}`;
    }
  } catch (error) {
    // Handle errors
    responseData.error = error.message || "Failed to fetch coupons.";
  }

  return NextResponse.json(responseData);
}
