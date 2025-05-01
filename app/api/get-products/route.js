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
  const page = searchParams.get("page") || 1;
  const perPage = searchParams.get("perPage") || 100;
  const id = searchParams.get("id");
  const slug = searchParams.get("slug");
  const categorySlug = searchParams.get("categorySlug");
  const includeVariations = searchParams.get("includeVariations") === "true";
  const isFeatured = searchParams.get("featured") === "true";

  // New Filters
  const filterColor = searchParams.get("color")?.toLowerCase();
  const filterSize = searchParams.get("size")?.toLowerCase();
  const filterStockStatus = searchParams.get("availability"); // 'instock', 'outofstock'

  try {
    let data;

    if (id) {
      const productResponse = await api.get(`products/${id}`);
      data = [productResponse.data];
    } else if (slug) {
      const productResponse = await api.get("products", { slug });
      data = productResponse.data;

      if (data.length === 0) {
        throw new Error(`No product found with slug: ${slug}`);
      }
    } else {
      const params = { page, per_page: perPage };
      if (categorySlug) {
        const categoryResponse = await api.get("products/categories", {
          slug: categorySlug,
        });
        const category = categoryResponse.data[0];
        if (!category)
          throw new Error(`No category found with slug: ${categorySlug}`);
        params.category = category.id;
      }

      if (isFeatured) {
        params.featured = true;
      }

      const productsResponse = await api.get("products", params);
      data = productsResponse.data;
    }

    // If filtering by variations or requesting variations explicitly
    const filteringByVariation = !!(
      filterColor ||
      filterSize ||
      filterStockStatus
    );

    if (includeVariations || filteringByVariation) {
      const filteredProducts = [];

      for (const product of data) {
        if (product.variations.length > 0 || product.type === "variable") {
          const variationsResponse = await api.get(
            `products/${product.id}/variations`
          );
          const variations = variationsResponse.data;

          const matchedVariations = variations.filter((variation) => {
            const attrMap = {};
            (variation.attributes || []).forEach((attr) => {
              attrMap[attr.name.toLowerCase()] = attr.option?.toLowerCase();
            });

            const colorMatch = filterColor
              ? attrMap["colour"] === filterColor
              : true;
            const sizeMatch = filterSize
              ? attrMap["size"] === filterSize
              : true;
            const stockMatch = filterStockStatus
              ? variation.stock_status === filterStockStatus
              : true;

            return colorMatch && sizeMatch && stockMatch;
          });

          if (matchedVariations.length > 0) {
            product.variations = matchedVariations;
            filteredProducts.push(product);
          }
        } else {
          // Simple product with no variations
          const stockMatch = filterStockStatus
            ? product.stock_status === filterStockStatus
            : true;
          if (stockMatch) {
            filteredProducts.push(product);
          }
        }
      }

      data = filteredProducts;
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
