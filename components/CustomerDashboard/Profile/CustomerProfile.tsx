"use client";
import { notification } from "antd";
import React, { useEffect, useState } from "react";
import CustomerProfileDisplay from "./CustomerProfileDisplay";

const CustomerProfile = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [orders, setOrders] = useState<any>();

  useEffect(() => {
    const cookies = document.cookie;
    const cookieValue = cookies
      .split("; ")
      .find((row) => row.startsWith("user_g="))
      ?.split("=")[1];

    if (!cookieValue) {
      console.error("Cookie 'user_g' not found");
      return;
    }

    const segments = cookieValue.split("-");
    if (segments.length < 3) {
      console.error("Invalid cookie format");
      return;
    }

    const secondSegment = segments[1];
    const userEmail = secondSegment.includes("@")
      ? secondSegment
      : `${secondSegment}@gmail.com`;

    setEmail(userEmail);
  }, []);

  useEffect(() => {
    if (!email) return;

    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `/api/get-orders?page=1&perPage=100&email=${email}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch orders: ${response.statusText}`);
        }

        const data = await response.json();
        setOrders(data.orders[0]);
        console.log(data.orders[0]);
      } catch (error) {
        console.error("Error fetching orders:", error);
        notification.error({
          message: "Error",
          description: `Failed to fetch orders. Please try again later.`,
          duration: 3,
        });
      }
    };

    fetchOrders();
  }, [email]);
  return (
    <>
      <CustomerProfileDisplay order={orders} />
    </>
  );
};

export default CustomerProfile;
