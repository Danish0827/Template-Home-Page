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
    coupons: [],
    error: null,
  };

  try {
    // Fetch all coupons
    const response = await api.get("coupons");
    responseData.success = true;
    responseData.coupons = response.data; // Assign fetched coupon data
  } catch (error) {
    // Handle errors
    responseData.error = error.message || "Failed to fetch coupons.";
  }

  return NextResponse.json(responseData);
}
