import { NextResponse } from "next/server";
const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

const api = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL,
  consumerKey: process.env.WC_CONSUMER_KEY,
  consumerSecret: process.env.WC_CONSUMER_SECRET,
  version: "wc/v3",
});

export async function POST(req) {
  try {
    const body = await req.json(); // Parse request body
    const { product_id, rating, reviewer, reviewer_email, review } = body;
    // console.log(product_id, rating, reviewer, reviewer_email, review);

    // Validation
    if (!product_id || !rating || !reviewer || !reviewer_email || !review) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    // Create review
    const response = await api.post("products/reviews", {
      product_id,
      review,
      reviewer,
      reviewer_email,
      rating,
    });

    return NextResponse.json(
      { success: true, data: response.data },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating review:", error);
    return NextResponse.json(
      { error: "Failed to create review." },
      { status: 500 }
    );
  }
}
