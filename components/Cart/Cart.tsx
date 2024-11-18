"use client";
import React, { useContext, useEffect } from "react";
import CartItem from "./CartItem";
import { AppContext } from "./../context";

interface CartItemType {
  variation_id: number;
  product_id: number;
  quantity: number;
  line_total: number;
  data: { name: string; image?: { src: string }; stock_quantity?: number };
  variation?: { attribute_pa_colour?: string; attribute_pa_size?: string };
}

interface CartProps {
  TotalFinalPrice: (price: any) => void;
}

const Cart: React.FC<CartProps> = ({ TotalFinalPrice }) => {
  const [cart, setCart] = useContext<any>(AppContext);

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

  useEffect(() => {
    const total = cart?.cartItems
      ?.reduce((acc: number, item: CartItemType) => acc + item.line_total, 0)
      ?.toFixed(2);
    TotalFinalPrice(total || "0.00");
  }, [cart, TotalFinalPrice]);

  if (!cart?.cartItems?.length) return <p>Your cart is empty.</p>;

  return (
    <div
      style={{ scrollbarWidth: "thin" }}
      className="shadow-lg py-2 rounded-lg"
    >
      {cart.cartItems.map((item: CartItemType, index: any) => (
        <CartItem
          key={`${item.variation_id}-${item.product_id}`}
          item={{
            ...item,
            variantName: item.variation?.attribute_pa_colour
              ? `${item.variation.attribute_pa_colour}, ${item.variation.attribute_pa_size}`
              : "No Variations",
            variantImage: item.data.image?.src || "",
            variantPrice: item.line_total,
            variantQuantity: item.quantity,
            name: item.data.name,
          }}
          isLast={index === cart?.cartItems.length - 1}
          setCart={setCart}
          setRemovingProduct={() =>
            removeItem(item.variation_id, item.product_id)
          }
          setUpdatingProduct={(newQuantity: any) =>
            updateItemQuantity(item.variation_id, item.product_id, newQuantity)
          }
        />
      ))}
    </div>
  );
};

export default Cart;
