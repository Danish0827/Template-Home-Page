import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

// Initialize the WooCommerce API with environment variables
const api = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL,
  consumerKey: process.env.WC_CONSUMER_KEY,
  consumerSecret: process.env.WC_CONSUMER_SECRET,
  version: "wc/v3",
});

export async function POST(req) {
  try {
    // Parse the request body
    const { formData, selectedCountry, shippingMethod } = await req.json();

    // Validate the required fields
    if (!formData.firstName || !formData.lastName || !formData.email) {
      return new Response(JSON.stringify({ success: false, error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Construct order data
    const orderData = {
      payment_method: "stripe", // Set payment method as required
      payment_method_title: "Stripe",
      set_paid: true,
      billing: {
        first_name: formData.firstName,
        last_name: formData.lastName,
        address_1: formData.address,
        address_2: formData.apartment,
        city: formData.city,
        state: formData.state,
        postcode: formData.postalCode,
        country: selectedCountry,
        email: formData.email,
        phone: formData.phone,
      },
      shipping: {
        first_name: formData.firstName,
        last_name: formData.lastName,
        address_1: formData.address,
        address_2: formData.apartment,
        city: formData.city,
        state: formData.state,
        postcode: formData.postalCode,
        country: selectedCountry,
      },
      line_items: [
        {
          product_id: formData.productId, // Assuming productId is part of formData
          quantity: formData.quantity || 1, // Assuming quantity is part of formData, default to 1
        },
      ],
      shipping_lines: [
        {
          method_id: shippingMethod.id,
          method_title: shippingMethod.name,
          total: shippingMethod.cost,
        },
      ],
    };

    // Create order through WooCommerce API
    const response = await api.post("orders", orderData);

    // Return success response
    return new Response(JSON.stringify({ success: true, order: response.data }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating order:", error); // Log full error for debugging
    return new Response(JSON.stringify({ success: false, error: "Failed to create order. Please try again." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
