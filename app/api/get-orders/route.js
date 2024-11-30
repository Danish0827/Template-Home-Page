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
    orders: [],
    error: null,
  };

  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") || 1; // Default to page 1
  const perPage = searchParams.get("perPage") || 100; // Default to 100 orders per page
  const email = searchParams.get("email"); // Customer email for filtering
  const orderId = searchParams.get("orderid"); // Customer email for filtering

  try {
    // Fetch orders with pagination
    const ordersResponse = await api.get("orders", { page, per_page: perPage });
    let orders = ordersResponse.data;

    // If email is provided, filter orders by billing email
    if (email) {
      orders = orders.filter((order) => order.billing.email === email);
    }

    if (orderId) {
      orders = orders.filter((order) => order.id === orderId);
    }

    responseData.success = true;
    responseData.orders = orders;
    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Error fetching orders:", error);
    responseData.error = error.message;
    return NextResponse.json(responseData, { status: 500 });
  }
}
