import { getSession, storeSession } from "./session";
import { getApiCartConfig } from "./api";
import axios from "axios";
import { CART_ENDPOINT } from "../constants/endpoints";
import { isEmpty, isArray } from "lodash";
import Swal from "sweetalert2"; // Import SweetAlert for alerts
/**
 * Add To Cart Request Handler.
 *
 * @param {int} productId Product Id.
 * @param {int} qty Product Quantity.
 * @param {Function} setCart Sets The New Cart Value
 * @param {Function} setIsAddedToCart Sets A Boolean Value If Product Is Added To Cart.
 * @param {Function} setLoading Sets A Boolean Value For Loading State.
 */

export const addToCart = (
  productId,
  qty = 1,
  setCart,
  setIsAddedToCart,
  setLoading,
  productDetails
) => {
  console.log(productDetails, "productDetails");

  const storedSession = getSession(); // Get the session (if exists)
  const addOrViewCartConfig = getApiCartConfig(); // API configuration

  setLoading(true); // Start the loading state

  // Construct the payload according to WooCommerce's format
  const payload = {
    product_id: productId,
    quantity: qty,
    variation_id: productDetails.variantId, // Pass the specific variant ID
    meta_data: productDetails.metaData,
    variations: {
      attribute_pa_size: productDetails.variantName, // For example, size attribute
      // Add other attributes if necessary, like color, material, etc.
    },
  };

  console.log("Sending to cart:", payload); // Debugging the payload

  axios
    .post(CART_ENDPOINT, payload, addOrViewCartConfig) // Send the payload to the WooCommerce endpoint
    .then((res) => {
      if (isEmpty(storedSession)) {
        storeSession(res?.headers?.["x-wc-session"]); // Store session if not already stored
      }
      setIsAddedToCart(true); // Mark as added
      setLoading(false); // Stop loading
      viewCart(setCart); // Fetch and update the cart
    })
    .catch((err) => {
      Swal.fire({
        icon: "warning",
        title: "Stock Limit Exceeded",
        text: `In stock, we have only  items.`,
      });
      console.log("Error adding to cart:", err); // Handle any errors
      setLoading(false);
    });
};
/**
 * View Cart Request Handler
 *
 * @param {Function} setCart Set Cart Function.
 * @param {Function} setProcessing Set Processing Function.
 */
export const viewCart = (setCart, setProcessing = () => {}) => {
  const addOrViewCartConfig = getApiCartConfig();

  axios
    .get(CART_ENDPOINT, addOrViewCartConfig)
    .then((res) => {
      const formattedCartData = getFormattedCartData(res?.data ?? []);
      setCart(formattedCartData);
      setProcessing(false);
    })
    .catch((err) => {
      console.log("err", err);
      setProcessing(false);
    });
};

/**
 * Update Cart Request Handler
 */
export const updateCart = (cartKey, qty = 1, setCart, setUpdatingProduct) => {
  const addOrViewCartConfig = getApiCartConfig();

  setUpdatingProduct(true);

  axios
    .put(
      `${CART_ENDPOINT}${cartKey}`,
      {
        quantity: qty,
      },
      addOrViewCartConfig
    )
    .then((res) => {
      viewCart(setCart, setUpdatingProduct);
    })
    .catch((err) => {
      console.log("err", err);
      setUpdatingProduct(false);
    });
};

/**
 * Delete a cart item Request handler.
 *
 * Deletes all products in the cart of a
 * specific product id ( by its cart key )
 * In a cart session, each product maintains
 * its data( qty etc ) with a specific cart key
 *
 * @param {String} cartKey Cart Key.
 * @param {Function} setCart SetCart Function.
 * @param {Function} setRemovingProduct Set Removing Product Function.
 */
export const deleteCartItem = (cartKey, setCart, setRemovingProduct) => {
  console.log(cartKey, setCart, setRemovingProduct, "sadas");

  const addOrViewCartConfig = getApiCartConfig();

  setRemovingProduct(true);

  axios
    .delete(`${CART_ENDPOINT}${cartKey}`, addOrViewCartConfig)
    .then((res) => {
      viewCart(setCart, setRemovingProduct);
    })
    .catch((err) => {
      console.log("err", err);
      setRemovingProduct(false);
    });
};

/**
 * Clear Cart Request Handler
 *
 * @param {Function} setCart Set Cart
 * @param {Function} setClearCartProcessing Set Clear Cart Processing.
 */
export const clearCart = async (setCart, setClearCartProcessing) => {
  setClearCartProcessing(true);

  const addOrViewCartConfig = getApiCartConfig();

  try {
    const response = await axios.delete(CART_ENDPOINT, addOrViewCartConfig);
    viewCart(setCart, setClearCartProcessing);
    console.log(response, "clearcart");
  } catch (err) {
    console.log("err", err);
    setClearCartProcessing(false);
  }
};

/**
 * Get Formatted Cart Data.
 *
 * @param cartData
 * @return {null|{cartTotal: {totalQty: number, totalPrice: number}, cartItems: ({length}|*|*[])}}
 */
const getFormattedCartData = (cartData) => {
  if (!cartData.length) {
    return null;
  }
  const cartTotal = calculateCartQtyAndPrice(cartData || []);
  return {
    cartItems: cartData || [],
    ...cartTotal,
  };
};

/**
 * Calculate Cart Qty And Price.
 *
 * @param cartItems
 * @return {{totalQty: number, totalPrice: number}}
 */
const calculateCartQtyAndPrice = (cartItems) => {
  const qtyAndPrice = {
    totalQty: 0,
    totalPrice: 0,
  };

  if (!isArray(cartItems) || !cartItems?.length) {
    return qtyAndPrice;
  }

  cartItems.forEach((item, index) => {
    qtyAndPrice.totalQty += item?.quantity ?? 0;
    qtyAndPrice.totalPrice += item?.line_total ?? 0;
  });

  return qtyAndPrice;
};
