import { isArray, isEmpty } from "lodash";
// import { createCheckoutSession } from 'next-stripe/client'; // @see https://github.com/ynnoj/next-stripe
// import { loadStripe } from '@stripe/stripe-js';
import { createTheOrder, getCreateOrderData } from "./order";
import { clearCart } from "../cart";
import axios from "axios";
import { WOOCOMMERCE_STATES_ENDPOINT } from "../constants/endpoints";
import { RazorpayPayment } from "./RazorpayPayment";

export const handleRazorpayCheckout = async (
  input,
  products,
  setRequestError,
  setCart,
  setIsOrderProcessing,
  setCreatedOrderData,
  isOrderProcessing
) => {
  try {
    // Indicate order processing has started
    setIsOrderProcessing(true);

    // Step 1: Prepare the order data for backend
    const orderData = getCreateOrderData(input, products); // Function to structure order data
    const customerOrderData = await createTheOrder(
      orderData,
      setRequestError,
      ""
    );

    // If the backend fails to create the order
    if (!customerOrderData?.orderDetails) {
      throw new Error("Failed to create the order. Please try again.");
    }

    // Extract necessary details
    const { orderDetails } = customerOrderData.orderDetails;
    const { id: orderId, total: amount, currency } = orderDetails;
    const name = `${orderDetails.billing.first_name} ${orderDetails.billing.last_name}`;
    const email = input.billing.email;
    const contact = input.billing.phone;

    await RazorpayPayment({
      orderId,
      amount,
      currency,
      name,
      email,
      contact,
      setIsOrderProcessing,
      isOrderProcessing,
      setCart,
    });

    setIsOrderProcessing(false);
    setCreatedOrderData(customerOrderData.orderDetails);
  } catch (error) {
    console.error("Razorpay Checkout Error:", error);
    setRequestError(error.message || "An unexpected error occurred.");
  } finally {
    // Indicate order processing has completed
    setIsOrderProcessing(false);
  }
};

/**
 * Handle Other Payment Method checkout.
 *
 * @param input
 * @param products
 * @param setRequestError
 * @param setCart
 * @param setIsOrderProcessing
 * @param setCreatedOrderData
 * @return {Promise<{orderId: null, error: string}|null>}
 */
export const handleOtherPaymentMethodCheckout = async (
  input,
  products,
  setRequestError,
  setCart,
  setIsOrderProcessing,
  setCreatedOrderData
) => {
  // console.log(
  //   input,
  //   products,
  //   setRequestError,
  //   setCart,
  //   setIsOrderProcessing,
  //   setCreatedOrderData,
  //   "handleOtherPaymentMethodCheckout"
  // );

  setIsOrderProcessing(true);
  const orderData = getCreateOrderData(input, products);
  const customerOrderData = await createTheOrder(
    orderData,
    setRequestError,
    ""
  );
  // console.log(
  //   customerOrderData?.orderDetails?.orderDetails?.id,
  //   "customerOrderData?.orderDetails?.id"
  // );

  const updateOrderStatus = async (orderId) => {
    const data = {
      status: "pending",
    };

    const encodedCredentials = btoa(
      `${process.env.WC_CONSUMER_KEY}:${process.env.WC_CONSUMER_SECRET}`
    );

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/wc/v3/orders/${orderId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${encodedCredentials}`,
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP status ${response.status}`);
      }

      const responseData = await response.json();
      // console.log("Order updated:", responseData);
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };
  await updateOrderStatus(customerOrderData?.orderDetails?.orderDetails?.id);
  const cartCleared = await clearCart(setCart, () => {});
  setCart(null);

  if (isEmpty(customerOrderData?.orderDetails) || cartCleared?.error) {
    setRequestError("Clear cart failed");
    return null;
  }
  setCreatedOrderData(customerOrderData.orderDetails);
  localStorage.removeItem("next-cart");
  setIsOrderProcessing(false);

  return customerOrderData;
};

/**
 * Handle Stripe checkout.
 *
 * 1. Create Formatted Order data.
 * 2. Create Order using Next.js create-order endpoint.
 * 3. Clear the cart session.
 * 4. On success set show stripe form to true
 *
 * @param input
 * @param products
 * @param setRequestError
 * @param setCart
 * @param setIsProcessing
 *
 * @param setCreatedOrderData
 */
export const handleStripeCheckout = async (
  input,
  products,
  setRequestError,
  setCart,
  setIsProcessing,
  setCreatedOrderData
) => {
  setIsProcessing(true);
  const orderData = getCreateOrderData(input, products);
  const customerOrderData = await createTheOrder(
    orderData,
    setRequestError,
    ""
  );
  const cartCleared = await clearCart(setCart, () => {});
  setIsProcessing(false);

  if (isEmpty(customerOrderData?.orderId) || cartCleared?.error) {
    setRequestError("Clear cart failed");
    return null;
  }

  // On success show stripe form.
  setCreatedOrderData(customerOrderData);
  await createCheckoutSessionAndRedirect(
    products,
    input,
    customerOrderData?.orderId
  );

  return customerOrderData;
};

/**
 * Create Checkout Session and redirect.
 * @param products
 * @param input
 * @param orderId
 * @return {Promise<void>}
 */
const createCheckoutSessionAndRedirect = async (products, input, orderId) => {
  const sessionData = {
    success_url:
      window.location.origin +
      `/thank-you?session_id={CHECKOUT_SESSION_ID}&order_id=${orderId}`,
    cancel_url: window.location.href,
    customer_email: input.billingDifferentThanShipping
      ? input?.billing?.email
      : input?.shipping?.email,
    line_items: getStripeLineItems(products),
    metadata: getMetaData(input, orderId),
    payment_method_types: ["card"],
    mode: "payment",
  };
  // console.log("sessionData", sessionData);
  let session = {};
  try {
    session = await createCheckoutSession(sessionData);
  } catch (err) {
    console.log("createCheckout session error", err);
  }
  try {
    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    );
    if (stripe) {
      stripe.redirectToCheckout({ sessionId: session.id });
    }
  } catch (error) {
    console.log(error);
  }
};

/**
 * Get Stripe Line Items
 *
 * @param products
 * @return {*[]|*}
 */
const getStripeLineItems = (products) => {
  if (isEmpty(products) && !isArray(products)) {
    return [];
  }

  return products.map((product) => {
    return {
      quantity: product?.quantity ?? 0,
      name: product?.data?.name ?? "",
      images: [product?.data?.images?.[0]?.src ?? "" ?? ""],
      amount: Math.round((product?.line_subtotal ?? 0) * 100),
      currency: "usd",
    };
  });
};

/**
 * Get meta data.
 *
 * @param input
 * @param {String} orderId Order Id.
 *
 * @returns {{shipping: string, orderId: String, billing: string}}
 */
export const getMetaData = (input, orderId) => {
  return {
    billing: JSON.stringify(input?.billing),
    shipping: JSON.stringify(
      input.billingDifferentThanShipping
        ? input?.billing?.email
        : input?.shipping?.email
    ),
    orderId,
  };

  // @TODO
  // if ( customerId ) {
  //     metadata.customerId = customerId;
  // }
};

/**
 * Handle Billing Different Than Shipping.
 *
 * @param input
 * @param setInput
 * @param target
 */
export const handleBillingDifferentThanShipping = (input, setInput, target) => {
  const newState = {
    ...input,
    [target.name]: !input.billingDifferentThanShipping,
  };
  setInput(newState);
};

/**
 * Handle Create Account.
 *
 * @param input
 * @param setInput
 * @param target
 */
export const handleCreateAccount = (input, setInput, target) => {
  const newState = { ...input, [target.name]: !input.createAccount };
  setInput(newState);
};

/**
 * Set states for the country.
 *
 * @param {Object} target Target.
 * @param {Function} setTheStates React useState function to set the value of the states basis country selection.
 * @param {Function} setIsFetchingStates React useState function, to manage loading state when request is in process.
 *
 * @return {Promise<void>}
 */
export const setStatesForCountry = async (
  target,
  setTheStates,
  setIsFetchingStates
) => {
  if ("country" === target.name) {
    setIsFetchingStates(true);
    const countryCode =
      target[target.selectedIndex].getAttribute("data-countrycode");
    const states = await getStates(countryCode);
    setTheStates(states || []);
    setIsFetchingStates(false);
  }
};

/**
 * Get states
 *
 * @param {String} countryCode Country code
 *
 * @returns {Promise<*[]>}
 */
export const getStates = async (countryCode = "") => {
  if (!countryCode) {
    return [];
  }

  const { data } = await axios.get(WOOCOMMERCE_STATES_ENDPOINT, {
    params: { countryCode },
  });

  return data?.states ?? [];
};
