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
    products: [],
    error: null,
  };

  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") || 1; // Default to page 1
  const perPage = searchParams.get("perPage") || 100; // Default to 100 products per page
  const slug = searchParams.get("slug"); // Slug for individual product
  const categorySlug = searchParams.get("categorySlug"); // Category slug for filtering by category
  const includeVariations = searchParams.get("includeVariations") === "true"; // Fetch variations or not
  const isFeatured = searchParams.get("featured") === "true"; // Filter for featured products

  try {
    let data;

    // If slug is provided, fetch the product by slug
    if (slug) {
      const productResponse = await api.get("products", { slug });
      data = productResponse.data;

      // Ensure a product with the slug is found
      if (data.length === 0) {
        throw new Error(`No product found with slug: ${slug}`);
      }
    } else {
      // Prepare the parameters for fetching products
      const params = {
        page,
        per_page: perPage,
      };

      if (categorySlug) {
        // Fetch the category first to get its ID
        const categoryResponse = await api.get("products/categories", {
          slug: categorySlug,
        });
        const category = categoryResponse.data[0];

        // Ensure a category with the slug is found
        if (!category) {
          throw new Error(`No category found with slug: ${categorySlug}`);
        }

        // Add the category ID to the params
        params.category = category.id;
      }

      // Add the featured filter if requested
      if (isFeatured) {
        params.featured = true;
      }

      // Fetch products with pagination and optional filters
      const productsResponse = await api.get("products", params);
      data = productsResponse.data;
    }

    // If variations are to be included, fetch them for each product
    if (includeVariations) {
      for (const product of data) {
        if (product.variations.length > 0) {
          const variationsResponse = await api.get(
            `products/${product.id}/variations`
          );
          product.variations = variationsResponse.data;
        }
      }
    }

    responseData.success = true;
    responseData.products = data;
    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Error fetching products:", error);
    responseData.error = error.message;
    return NextResponse.json(responseData, { status: 500 });
  }
}
