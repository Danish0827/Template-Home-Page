"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { notification } from "antd";
import { format } from "date-fns";

const CustomerSingleOrder = ({ params }: any) => {
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
        const response = await fetch(`/api/get-singleorder?orderid=${params}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch orders: ${response.statusText}`);
        }

        const data = await response.json();
        setOrders(data.order);
        console.log(data.order);
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
          <h1 className="text-2xl font-bold text-gray-800">
            Order #{!orders?.id ? "undefined" : orders?.id}
          </h1>
        </header>

        {!orders?.line_items?.length ? (
          <div className="text-center py-20">
            <h2 className="text-xl font-semibold text-gray-700">
              No Items Found
            </h2>
            <p className="text-gray-500 mt-2 pb-4">
              Go to the store to place an order.
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
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="text-left py-2 px-4 text-gray-700 font-semibold">
                    Image
                  </th>
                  <th className="text-left py-2 px-4 text-gray-700 font-semibold">
                    Product Name
                  </th>
                  <th className="text-left py-2 px-4 text-gray-700 font-semibold">
                    Price
                  </th>
                  <th className="text-left py-2 px-4 text-gray-700 font-semibold">
                    Quantity
                  </th>
                  <th className="text-left py-2 px-4 text-gray-700 font-semibold">
                    Subtotal
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.line_items.map((item: any) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4">
                      <img
                        src={item.image?.src || "/placeholder-image.png"}
                        alt={item.name}
                        className="h-12 w-12 object-cover rounded-lg border border-gray-200"
                      />
                    </td>
                    <td className="py-2 px-4 font-medium text-gray-800">
                      {item.name}
                    </td>
                    <td className="py-2 px-4 text-gray-600">₹{item.price}</td>
                    <td className="py-2 px-4 text-gray-600">{item.quantity}</td>
                    <td className="py-2 px-4 text-gray-600">
                      ₹{item.subtotal}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerSingleOrder;
