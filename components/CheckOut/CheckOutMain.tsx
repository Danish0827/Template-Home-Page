"use client";
import React, { useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { WOOCOMMERCE_COUNTRIES_ENDPOINT } from "@/utils/constants/endpoints";
import { AppContext } from "../context";
import CheckoutForm from "@/components/CheckOut/CheckoutForm";
import ColorPallete from "../Pallete/ColorPallete";
import HeaderV1 from "../Headers/HeaderV1/HeaderV1";
import FooterV1 from "../Footers/FooterV1/FooterV1";
import axios from "axios";

const CheckOutMain = () => {
  const [cart] = useContext<any>(AppContext);
  const [countries, setCountries] = useState(null); // State for countries data
  const router = useRouter();
  // Redirect if auth cookie exists
  useEffect(() => {
    const authCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("auth="));
    if (!authCookie) {
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    if (!cart || !cart?.cartItems || cart?.cartItems?.length === 0) {
      router.push("/");
    }

    // Fetch countries data on mount
    const fetchCountries = async () => {
      try {
        const response = await axios.get(WOOCOMMERCE_COUNTRIES_ENDPOINT);
        setCountries(response.data); // Set the countries data in state
      } catch (error) {
        console.error("Error fetching countries data:", error);
      }
    };

    fetchCountries();

    // Uncomment to redirect to homepage if cart is empty
  }, [cart, router]);

  return (
    <>
      <ColorPallete />
      <HeaderV1 />
      {countries ? (
        <CheckoutForm countriesData={countries} /> // Pass countries data to CheckoutForm
      ) : (
        <p>Loading countries data...</p> // Optional loading message
      )}

      <FooterV1 />
    </>
  );
};

export default CheckOutMain;
