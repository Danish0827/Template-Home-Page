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
    customers: [],
    error: null,
  };

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page")) || 1;
  const perPage = parseInt(searchParams.get("per_page")) || 25;
  const orderby = searchParams.get("orderby") || "date_last_active";
  const order = searchParams.get("order") || "desc";

  try {
    // Fetch registered customers
    const customersResponse = await api.get("customers", {
      page,
      per_page: perPage,
      _locale: "user",
    });

    const registeredCustomers = customersResponse.data;

    // Fetch guest customers from orders
    const ordersResponse = await api.get("orders", {
      page,
      per_page: perPage,
      _locale: "user",
    });

    const orders = ordersResponse.data;

    // Extract guest customers (no registered user_id)
    const guestCustomers = orders
      .filter((order) => !order.customer_id)
      .map((order) => ({
        id: `guest-${order.id}`, // Unique ID for guest customers
        user_id: 0,
        username: "",
        name: `${order.billing.first_name} ${order.billing.last_name}`.trim(),
        email: order.billing.email,
        country: order.billing.country || "",
        city: order.billing.city || "",
        state: order.billing.state || "",
        postcode: order.billing.postcode || "",
        date_registered: null,
        date_last_active: order.date_modified,
        date_last_order: order.date_created,
        orders_count: 1,
        total_spend: order.total,
        avg_order_value: order.total,
        date_registered_gmt: null,
        date_last_active_gmt: order.date_modified,
      }));

    // Map registered customers to desired format
    const formattedRegisteredCustomers = registeredCustomers.map((customer) => ({
      id: customer.id,
      user_id: customer.id,
      username: customer.username || "",
      name: `${customer.first_name} ${customer.last_name}`.trim(),
      email: customer.email,
      country: customer.billing?.country || "",
      city: customer.billing?.city || "",
      state: customer.billing?.state || "",
      postcode: customer.billing?.postcode || "",
      date_registered: customer.date_created,
      date_last_active: customer.date_modified,
      date_last_order: customer.last_order_date || null,
      orders_count: customer.orders_count || 0,
      total_spend: customer.total_spent || 0,
      avg_order_value:
        customer.orders_count > 0
          ? (customer.total_spent / customer.orders_count).toFixed(2)
          : 0,
      date_registered_gmt: customer.date_created_gmt,
      date_last_active_gmt: customer.date_modified_gmt,
    }));

    // Combine registered and guest customers
    const allCustomers = [...formattedRegisteredCustomers, ...guestCustomers];

    // Optional sorting
    if (orderby === "date_last_active") {
      allCustomers.sort((a, b) => {
        const dateA = new Date(a.date_last_active);
        const dateB = new Date(b.date_last_active);
        return order === "desc" ? dateB - dateA : dateA - dateB;
      });
    }

    // Pagination logic
    const paginatedCustomers = allCustomers.slice(
      (page - 1) * perPage,
      page * perPage
    );

    responseData.success = true;
    responseData.customers = paginatedCustomers;

    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Error fetching customers or orders:", error.response?.data || error.message);
    responseData.error = error.message;
    return NextResponse.json(responseData, { status: 500 });
  }
}
