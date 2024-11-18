"use client";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "./../context"; // Import the context
import { FaMinus, FaPlus } from "react-icons/fa";
import { updateCart, deleteCartItem } from "../../utils/cart";
import Link from "next/link";

interface CartItemType {
  variation_id: number;
  product_id: number;
  quantity: number;
  line_total: number;
  data: { name: string; image?: { src: string }; stock_quantity?: number };
  variation?: { attribute_pa_colour?: string; attribute_pa_size?: string };
}

interface CartItemProps {
  item: any;
  isLast: any;
  setCart: (newCart: any) => void; // SetCart function to update cart state
  setRemovingProduct: (isRemoving: boolean) => void;
  setUpdatingProduct: (isUpdating: boolean) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  isLast,
  setCart,
  setRemovingProduct,
  setUpdatingProduct,
}) => {
  const [quantity, setQuantity] = useState(item.quantity);

  // Update quantity state when item changes
  useEffect(() => {
    setQuantity(item.quantity);
  }, [item.quantity]);

  const handleDecrement = (e: any) => {
    e.preventDefault();
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      updateCart(item.key, newQuantity, setCart, setUpdatingProduct);
    }
  };

  const handleIncrement = (e: any) => {
    e.preventDefault();
    if (
      quantity <
      // item.quantity
      //   ? item.quantity - item?.data?.stock_quantity
      //   :
      item?.data?.stock_quantity
    ) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      updateCart(item.key, newQuantity, setCart, setUpdatingProduct);
    }
  };

  const handleRemove = (e: any) => {
    e.preventDefault();
    deleteCartItem(item.key, setCart, setRemovingProduct);
  };

  const finalPrice = (item.data?.price * quantity).toFixed(2);

  return (
    <div className={`${!isLast ? "border-b" : ""} py-4`}>
      <div className="flex flex-col lg:flex-row items-start">
        <div className="flex items-center lg:block gap-3">
          <a href={item?.link} className="flex-shrink-0">
            <img
              src={item?.data?.images?.[0]?.src || "fallback-image-url.jpg"}
              alt={item?.name || "Product Image"}
              className="w-24 h-auto object-cover object-top rounded-md"
            />
          </a>
          <a
            href={item?.link}
            className="lg:hidden text-base lg:text-xl font-semibold hover:text-gray-800 text-black"
          >
            {item?.data?.name}
          </a>
        </div>
        <div className="ml-0 lg:ml-4 mt-4 lg:mt-0 w-full">
          <a
            href={item?.link}
            className="hidden lg:block text-base lg:text-xl font-semibold hover:text-gray-800 text-black"
          >
            {item?.data?.name}
          </a>
          <div className="text-sm text-black lg:py-3">
            <div className="flex justify-between">
              <div>
                <p className="text-base lg:text-lg">
                  <b>Size:</b> {item?.variation?.attribute_pa_size}
                </p>
                <p className="text-base lg:text-lg">
                  <b className="font-bold">Color: </b>
                  {item?.variation?.attribute_pa_colour}
                </p>
                <div className="js-qty__wrapper flex items-center gap-2 mt-2">
                  <button
                    onClick={(e) => handleDecrement(e)}
                    className="p-2 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    <FaMinus />
                  </button>
                  <input
                    type="text"
                    className="js-qty__num w-12 text-center border border-gray-300 rounded-md"
                    value={quantity}
                    readOnly
                  />
                  <button
                    onClick={(e) => handleIncrement(e)}
                    className="p-2 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    <FaPlus />
                  </button>
                </div>
                <button
                  onClick={(e) => handleRemove(e)}
                  className="text-red-600 font-semibold text-base mt-2 hover:underline"
                >
                  Remove
                </button>
              </div>
              <div>
                <div className="text-right">
                  <p className="text-base lg:text-lg">
                    <b className="font-bold">
                      In Stock: {item?.data?.stock_quantity}
                    </b>
                  </p>
                  <p className="text-base lg:text-lg text-black font-bold">
                    Rs. {(item?.data?.price * quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CartPage = () => {
  const [cart, setCart] = useContext<any>(AppContext);
  // const [quantityFinal, setQuantityFinal] = useState(1);

  const fetchCart = async (method: string, body: any) => {
    const response = await fetch("/api/cart", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return response.json();
  };

  const removeItem = async (variationId: number, productId: number) => {
    try {
      const result = await fetchCart("DELETE", { variationId, productId });
      if (result.success) {
        setCart((prevCart: any) => ({
          ...prevCart,
          cartItems: prevCart.cartItems.filter(
            (item: CartItemType) =>
              !(
                item.variation_id === variationId &&
                item.product_id === productId
              )
          ),
        }));
      } else {
        console.error("Failed to remove item:", result.message);
      }
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const updateItemQuantity = async (
    variationId: number,
    productId: number,
    newQuantity: number
  ) => {
    try {
      const result = await fetchCart("PATCH", {
        variationId,
        productId,
        quantity: newQuantity,
      });
      if (result.success) {
        setCart((prevCart: any) => ({
          ...prevCart,
          cartItems: prevCart.cartItems.map((item: CartItemType) =>
            item.variation_id === variationId && item.product_id === productId
              ? { ...item, quantity: newQuantity }
              : item
          ),
        }));
      } else {
        console.error("Failed to update quantity:", result.message);
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  if (!cart?.cartItems?.length) return <p>Your cart is empty.</p>;
  const subtotal =
    cart?.cartItems?.reduce(
      (total: number, item: any) =>
        total + (item?.data?.price || 0) * (item.quantity || 0),
      0
    ) || 0; // Default to 0 if undefined

  const onCheckoutClick = () => {
    console.log("Proceeding to checkout...");
  };

  return (
    <main className="bg-gray-50 py-8 px-4 lg:px-16">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold uppercase">Cart</h1>
        <Link href="#" className="text-sm">
          Continue Shopping
        </Link>
      </header>

      <div className="flex flex-wrap lg:flex-nowrap gap-8">
        {/* Cart Items */}
        <div className="w-full lg:w-8/12 bg-white rounded-lg shadow-md p-4">
          {cart?.cartItems?.map((item: any, index: any) => (
            <CartItem
              key={`${item?.product_id}-${item?.variation_id}`}
              item={item}
              isLast={index === cart?.cartItems.length - 1}
              // quantity={setQuantityFinal}
              setCart={setCart}
              setRemovingProduct={() =>
                removeItem(item.variation_id, item.product_id)
              }
              setUpdatingProduct={(newQuantity: any) =>
                updateItemQuantity(
                  item.variation_id,
                  item.product_id,
                  newQuantity
                )
              }
            />
          ))}
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-4/12 bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg font-bold border-b pb-4 mb-4">
            Order Summary
          </h2>
          <div className="flex justify-between items-center mb-4">
            <span>Subtotal</span>
            <span className="font-bold">Rs. {subtotal.toFixed(2)}</span>
          </div>
          <Link href="/checkouts">
            <button className="w-full bg-black text-white py-3 rounded-md font-medium hover:bg-gray-800">
              Proceed to Checkout
            </button>
          </Link>
          <p className="text-sm text-gray-600 mt-2">
            Shipping and taxes will be calculated at checkout.
          </p>
        </div>
      </div>
    </main>
  );
};

export default CartPage;
