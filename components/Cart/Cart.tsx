"use client";
import React, { useContext } from "react";
import CartItem from "./CartItem";
import { AppContext } from "./../context";

const Cart = ({ TotalFinalPrice }: any) => {
  const [cart, setCart] = useContext<any>(AppContext);

  // Function to handle item removal
  const removeItem = async (variantId: any, productId: any) => {
    try {
      const response = await fetch("/api/cart", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ variantId, productId }),
      });

      const result = await response.json();
      if (response.ok) {
        // Update the local cart state by removing the item
        const updatedCart = {
          ...cart,
          items: cart.items.filter(
            (item: any) =>
              !(item.variantId === variantId && item.productId === productId)
          ),
        };
        setCart(updatedCart); // Update cart in context
      } else {
        console.error("Failed to remove item:", result.message);
      }
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  // Function to update item quantity
const updateItemQuantity = async (
  variantId: any,
  productId: any,
  newQuantity: number
) => {
  try {
    const response = await fetch("/api/cart", {
      method: "PATCH", // Use PATCH or PUT based on your API design
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ variantId, productId, quantity: newQuantity }),
    });

    const result = await response.json();
    if (response.ok) {
      // Ensure the new cart state is a new object to trigger re-renders
      const updatedCart = {
        ...cart,
        items: cart.items.map((item: any) =>
          item.variantId === variantId && item.productId === productId
            ? { ...item, quantity: newQuantity } // Update the quantity
            : item
        ),
      };

      // Update cart in context
      setCart(updatedCart);
    } else {
      console.error("Failed to update quantity:", result.message);
    }
  } catch (error) {
    console.error("Error updating quantity:", error);
  }
};


  // Calculate total price
  const totalFinalPrice = cart?.items
    ?.reduce((acc: number, item: any) => {
      return acc + item.variantPrice * item.quantity;
    }, 0)
    .toFixed(2);

  // Update total final price
  TotalFinalPrice(totalFinalPrice);

  return (
    <div style={{ scrollbarWidth: "thin" }} className="shadow-lg py-2 rounded-lg">
      {cart?.items?.length > 0 ? (
        cart.items.map((item: any) => (
          <CartItem
            key={`${item.variantId}-${item.productId}`}
            item={item}
            removeItem={() => removeItem(item.variantId, item.productId)} // Pass both IDs
            updateItemQuantity={updateItemQuantity} // Pass updateItemQuantity to CartItem
          />
        ))
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
