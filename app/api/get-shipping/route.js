import { NextResponse } from "next/server";
const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

const api = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL,
  consumerKey: process.env.WC_CONSUMER_KEY,
  consumerSecret: process.env.WC_CONSUMER_SECRET,
  version: "wc/v3",
});
async function fetchShippingZonesWithDetails() {
  try {
    // Fetch all shipping zones
    const zonesResponse = await api.get("shipping/zones");
    const shippingZones = zonesResponse.data;

    // Iterate over each shipping zone to fetch its locations and methods
    const zonesWithDetails = await Promise.all(
      shippingZones.map(async (zone) => {
        // Fetch locations for the current shipping zone
        const locationsResponse = await api.get(
          `shipping/zones/${zone.id}/locations`
        );
        const locations = locationsResponse.data;

        // Fetch shipping methods for the current shipping zone
        const methodsResponse = await api.get(
          `shipping/zones/${zone.id}/methods`
        );
        const methods = methodsResponse.data;

        // Return the zone with its locations and methods
        return {
          ...zone,
          locations,
          methods,
        };
      })
    );

    return zonesWithDetails;
  } catch (error) {
    console.error(
      "Error fetching shipping zones details:",
      error.response?.data || error.message
    );
    throw error;
  }
}

export async function GET(req) {
  const responseData = {
    success: false,
    shipping_zones: [],
    error: null,
  };

  try {
    const zonesWithDetails = await fetchShippingZonesWithDetails();
    responseData.success = true;
    responseData.shipping_zones = zonesWithDetails;
    return NextResponse.json(responseData);
  } catch (error) {
    responseData.error = error.message;
    return NextResponse.json(responseData, { status: 500 });
  }
}
