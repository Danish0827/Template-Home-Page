import { NextResponse } from "next/server";
const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

const api = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL, // Your WordPress site URL
  consumerKey: process.env.WC_CONSUMER_KEY, // Your WooCommerce consumer key
  consumerSecret: process.env.WC_CONSUMER_SECRET, // Your WooCommerce consumer secret
  version: "wc/v3",
});

export async function GET(req) {
  const responseData = {
    success: false,
    terms: [],
    error: null,
  };

  const { searchParams } = new URL(req.url);
  const attributeId = 4;
  // const attributeId = searchParams.get("attributeId");
  const page = searchParams.get("page") || 1;
  const perPage = searchParams.get("perPage") || 100;
  if (!attributeId) {
    responseData.error = "Attribute ID is required.";
    return NextResponse.json(responseData, { status: 400 });
  }

  try {
    // Fetch terms for the given attribute ID
    const termsResponse = await api.get(
      `products/attributes/${attributeId}/terms`,
      {
        page,
        per_page: perPage,
      }
    );

    const terms = termsResponse.data;

    // Check if terms are found
    if (terms.length === 0) {
      throw new Error(`No terms found for attribute ID: ${attributeId}`);
    }

    responseData.success = true;
    responseData.terms = terms;
    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Error fetching attribute terms:", error);
    responseData.error = error.message || "An unknown error occurred";
    return NextResponse.json(responseData, { status: 500 });
  }
}
