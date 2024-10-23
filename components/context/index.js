"use client";

import React, { useState, useEffect } from "react";

// Create a context for the app
export const AppContext = React.createContext([{}, () => {}]);

export const AppProvider = (props) => {
  // Initialize the cart state with data from localStorage if available
  const [cart, setCart] = useState(() => {
    if (typeof window !== "undefined") {
      const cartData = localStorage.getItem("next-cart");
      return cartData ? JSON.parse(cartData) : [];
    }
    return [];
  });

  /**
   * This effect will run whenever the cart is updated.
   * It syncs the cart data to localStorage.
   */
  useEffect(() => {
    if (cart !== null) {
      localStorage.setItem("next-cart", JSON.stringify(cart));
    }
  }, [cart]);

  return (
    <AppContext.Provider value={[cart, setCart]}>
      {props.children}
    </AppContext.Provider>
  );
};
