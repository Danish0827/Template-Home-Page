"use client";
import React, { useState, useEffect } from "react";
import { ApolloProvider } from "@apollo/client";
import client from "@/components/ApolloClient"; // Import the Apollo Client

export const AppContext = React.createContext([{}, () => {}]);

export const AppProvider = (props) => {
  const [cart, setCart] = useState(null); // Start with null for loading state
  const [isLoaded, setIsLoaded] = useState(false); // Track loading state

  // Load cart data from localStorage on client-side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const cartData = localStorage.getItem("next-cart");
      setCart(cartData ? JSON.parse(cartData) : null); // Set cart or empty object
      setIsLoaded(true); // Mark as loaded
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined" && cart !== null) {
      localStorage.setItem("next-cart", JSON.stringify(cart));
    }

    // if (cart === null) {
    //   localStorage.setItem("next-cart", JSON.stringify(null));
    // }
  }, [cart]);

  // Show a loading message until cart data is ready
  if (!isLoaded) {
    return <div>Loading....</div>;
  }

  return (
    <ApolloProvider client={client}>
      {" "}
      {/* Wrap with ApolloProvider */}
      <AppContext.Provider value={[cart, setCart]}>
        {props.children}
      </AppContext.Provider>
    </ApolloProvider>
  );
};
