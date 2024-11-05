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
    <div
      className={`flex justify-between items-center ${
        !isLast ? "border-b" : ""
      } py-4`}
    >
      <div className="flex items-start">
        <a href={item?.link} className="flex-shrink-0">
          <img
            src={item?.data?.images?.[0]?.src || "fallback-image-url.jpg"}
            alt={item?.name || "Product Image"}
            className="w-24 h-auto object-cover object-top rounded-md"
          />
        </a>
        <div className="ml-4">
          <a
            href={item?.link}
            className="text-xl font-semibold hover:text-gray-800 text-black"
          >
            {item?.data?.name}
          </a>
          <div className="text-sm text-black py-3">
            <p className="text-lg">
              <b>Size:</b> {item?.variation?.attribute_pa_size}
            </p>
            <p className="text-lg">
              <b className="font-bold">Color: </b>
              {item?.variation?.attribute_pa_colour}
            </p>

            <div className="js-qty__wrapper flex items-center gap-2">
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
              className="text-black text-base hover:underline"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <div className="ml-4 text-right">
          <p className="text-lg text-black font-bold">
            Rs. {(item?.data?.price * quantity).toFixed(2)}
          </p>
          <p className="text-lg">
            <b className="font-bold">In Stock: </b>
            {item?.data?.stock_quantity}
          </p>
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
    <main className="bg-white py-8">
      <div className="px-4 lg:px-16">
        <header className="text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl text-black tracking-tight uppercase">
            Cart
          </h1>
          <p className="text-gray-600 mt-2">
            <a href="/collections/all" className="text-black hover:underline">
              Continue shopping
            </a>
          </p>
        </header>

        <form className="flex flex-wrap">
          {/* Cart Items */}
          <div className="w-8/12 px-8">
            {cart?.cartItems?.map((item: any, index: any) => (
              <CartItem
                key={item?.id}
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

          {/* Summary */}
          <div className="w-4/12">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-bold text-gray-900 border-b pb-4 mb-4">
                Order Summary
              </h2>
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold">Subtotal</span>
                <span className="font-bold text-gray-900">
                  Rs. {subtotal.toFixed(2)}
                </span>
              </div>

              <div className="gokwik-checkout">
                <Link href="/checkouts">
                <button
                  onClick={onCheckoutClick}
                  type="button"
                  className="w-full bg-black text-white py-3 px-4 rounded-md font-medium hover:bg-zinc-900 transition duration-150"
                >
                  CHECK OUT
                </button>
                </Link>
              </div>
              <p className="text-sm text-black mt-3">
                Shipping, taxes, and discount codes calculated at checkout.
              </p>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default CartPage;
