"use client";
import React, { useContext } from "react";
import CartItem from "./CartItem";
import { AppContext } from "./../context";

const Cart = ({ TotalFinalPrice }: any) => {
  const [cart, setCart] = useContext<any>(AppContext);

  // Function to handle item removal
  const removeItem = async (variationId: any, productId: any) => {
    try {
      const response = await fetch("/api/cart", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ variationId, productId }),
      });

      const result = await response.json();
      if (response.ok) {
        const updatedCart = {
          ...cart,
          cartItems: cart.cartItems.filter(
            (item: any) => !(item.variation_id === variationId && item.product_id === productId)
          ),
        };
        setCart(updatedCart);
      } else {
        console.error("Failed to remove item:", result.message);
      }
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  // Function to update item quantity
  const updateItemQuantity = async (
    variationId: any,
    productId: any,
    newQuantity: number
  ) => {
    try {
      const response = await fetch("/api/cart", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ variationId, productId, quantity: newQuantity }),
      });

      const result = await response.json();
      if (response.ok) {
        const updatedCart = {
          ...cart,
          cartItems: cart.cartItems.map((item: any) =>
            item.variation_id === variationId && item.product_id === productId
              ? { ...item, quantity: newQuantity }
              : item
          ),
        };
        setCart(updatedCart);
      } else {
        console.error("Failed to update quantity:", result.message);
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  // Calculate total price
  const totalFinalPrice = cart?.cartItems
    ?.reduce((acc: number, item: any) => acc + item.line_total, 0)
    .toFixed(2);

  // Update total final price
  TotalFinalPrice(totalFinalPrice);

  return (
    <div style={{ scrollbarWidth: "thin" }} className="shadow-lg py-2 rounded-lg">
      {cart?.cartItems?.length > 0 ? (
        cart?.cartItems?.map((item: any) => (
          <CartItem
            key={`${item.variation_id}-${item.product_id}`}
            item={{
              ...item,
              variantName: item?.variation?.attribute_pa_colour
                ? `${item.variation.attribute_pa_colour}, ${item.variation.attribute_pa_size}`
                : "No Variations",
              variantImage: item?.data?.image?.src || "",
              variantPrice: item.line_total,
              variantQuantity: item.quantity,
              name: item.data.name,
            }}
            removeItem={() => removeItem(item.variation_id, item.product_id)}
            updateItemQuantity={updateItemQuantity}
          />
        ))
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
