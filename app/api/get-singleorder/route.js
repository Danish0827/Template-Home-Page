import { NextResponse } from "next/server";
const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

const api = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL,
  consumerKey: process.env.WC_CONSUMER_KEY,
  consumerSecret: process.env.WC_CONSUMER_SECRET,
  version: "wc/v3",
});

export async function GET(req) {
  const responseData = {
    success: false,
    order: null,
    error: null,
  };

  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get("orderid"); // Order ID to fetch

  if (!orderId) {
    responseData.error = "Order ID is required.";
    return NextResponse.json(responseData, { status: 400 });
  }

  try {
    // Fetch the specific order by its ID
    const orderResponse = await api.get(`orders/${orderId}`);
    const order = orderResponse.data;

    responseData.success = true;
    responseData.order = order;
    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Error fetching order:", error);
    responseData.error = error.message;
    return NextResponse.json(responseData, { status: 500 });
  }
}
