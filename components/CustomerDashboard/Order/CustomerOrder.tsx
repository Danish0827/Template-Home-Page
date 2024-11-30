"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { notification } from "antd";
import { format } from "date-fns";

const CustomerOrder = () => {
  const router = useRouter();
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
        setOrders(data.orders);
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
    <div className="bg-gray-50 flex items-center justify-center py-10 px-3">
      <div className="w-full md:max-w-5xl lg:max-w-6xl xl:max-w-7xl bg-white shadow-lg rounded-lg p-6">
        <header className="border-b pb-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Orders</h1>
        </header>
        {!orders ? (
          <div className="text-center py-20">
            <h2 className="text-xl font-semibold text-gray-700">
              No orders yet
            </h2>
            <p className="text-gray-500 mt-2 pb-4">
              Go to store to place an order.
            </p>
            <Link
              href="/"
              className="px-6 py-2 text-white bg-templatePrimary hover:bg-templatePrimaryLight rounded-lg shadow-sm"
            >
              Go to Store
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left font-medium text-gray-600">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left font-medium text-gray-600">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left font-medium text-gray-600">
                    Item
                  </th>
                  <th className="px-6 py-3 text-left font-medium text-gray-600">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left font-medium text-gray-600">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left font-medium text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders?.map(
                  (order: any) =>
                    order.status !== "failed" && (
                      <tr
                        key={order.orderId}
                        className="border-b hover:bg-gray-50"
                      >
                        <td className="text-lg px-6 py-4 text-gray-700 font-bold">
                          #{order.id}
                        </td>
                        <td className="text-base px-6 py-4 text-gray-700 font-semibold">
                          {format(new Date(order.date_created), "dd MMM yyyy")}
                        </td>
                        <td className="text-base px-6 py-4 text-gray-700 font-semibold">
                          {order.line_items.length}
                        </td>
                        <td
                          className={`text-lg px-6 py-4 text-gray-700 font-bold capitalize ${
                            order.status === "Completed"
                              ? "text-green-600"
                              : "text-red-500"
                          }`}
                        >
                          {order.status}
                        </td>
                        <td className="text-base px-6 py-4 text-gray-700 font-semibold">
                          {order.currency_symbol} {order.total}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() =>
                              router.push(`/account/orders/${order.id}`)
                            }
                            className="text-base px-4 py-2 text-white bg-templatePrimary text-templatePrimaryText hover:bg-templatePrimaryLight rounded-lg shadow"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    )
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerOrder;
