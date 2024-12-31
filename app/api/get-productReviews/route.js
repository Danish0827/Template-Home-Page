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
    reviews: [],
    error: null,
  };

  const { searchParams } = new URL(req.url);
  const productId = searchParams.get("productId"); // Product ID for filtering reviews
  const page = searchParams.get("page") || 1; // Default page 1
  const perPage = searchParams.get("perPage") || 10; // Default 10 reviews per page

  try {
    // Fetch all reviews
    const reviewsResponse = await api.get("products/reviews", {
      page,
      per_page: perPage,
    });
    // console.log(reviewsResponse);

    let reviews = reviewsResponse.data || [];

    // Filter reviews for the specific product and ensure they are approved
    if (productId) {
      reviews = reviews.filter(
        (review) =>
          review.product_id === parseInt(productId) &&
          review.status === "approved"
      );
    }

    responseData.success = true;
    responseData.reviews = reviews;

    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    responseData.error = error.message;
    return NextResponse.json(responseData, { status: 500 });
  }
}
