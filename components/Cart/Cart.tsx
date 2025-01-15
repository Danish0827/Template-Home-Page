"use client";
import React, { useContext, useEffect, useState } from "react";
import CartItem from "./CartItem";
import { AppContext } from "./../context";

type MetaDataType = {
  key: string;
  value: string;
};

interface CartItemType {
  variation_id: number;
  product_id: number;
  quantity: number;
  line_total: number;
  data: {
    name: string;
    image?: { src: string };
    stock_quantity?: number;
    price?: number;

    meta_data?: MetaDataType[];
  };
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
  const [showPrice, setShowPrice] = useState<any>([]);
  const fetchProductColor = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/wp/v2/whole-sale-price?_fields=id,title,meta.whole_sale_price_feature`
      );
      const data = await response.json();
      setShowPrice(data?.[0]);
      // console.log(data?.[0]);
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  useEffect(() => {
    fetchProductColor();
  }, []);

  useEffect(() => {
    const calculateItemPrice = (item: CartItemType): number => {
      const isWholesaleEnabled =
        showPrice.meta?.["whole_sale_price_feature"]?.showPrice === "true" ||
        cart?.cartItems?.meta_data?.some(
          (data: any) =>
            data.key === "show_wholesale_price" && data.value?.yes === "true"
        );

      const itemQuantity = item.quantity || 1; // Default to 1 if quantity is missing

      if (isWholesaleEnabled && itemQuantity > 10) {
        const wholesalePrice: any =
          item.data?.meta_data?.find(
            (meta: any) => meta.key === "wholesale_sale_price_amount"
          )?.value || 0;
        const regularWholesalePrice: any =
          item.data?.meta_data?.find(
            (meta: any) => meta.key === "wholesale_regular_price_amount"
          )?.value || 0;

        return wholesalePrice
          ? wholesalePrice * itemQuantity
          : regularWholesalePrice * itemQuantity;
      }

      return (item.data?.price || 0) * itemQuantity;
    };

    const total = cart?.cartItems
      ?.reduce((acc: number, item: CartItemType) => {
        const itemPrice = calculateItemPrice(item);
        return acc + itemPrice;
      }, 0)
      ?.toFixed(2);

    TotalFinalPrice(total || "0.00");
  }, [cart, TotalFinalPrice, showPrice]);

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
