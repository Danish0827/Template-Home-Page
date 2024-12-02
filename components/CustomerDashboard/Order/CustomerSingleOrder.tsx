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
              <div className="">
                {orders.line_items.map((item: any) => (
                  <div
                    key={item.id}
                    className="flex flex-col lg:flex-row items-start bg-white overflow-hidden border-b duration-300"
                  >
                    {/* Image Section */}
                    <div className="w-full lg:w-1/4">
                      <img
                        src={item.image?.src || "/placeholder-image.png"}
                        alt={item.parent_name}
                        className="w-full h-auto object-cover border-b lg:border-b-0 lg:border-r border-gray-200"
                      />
                    </div>

                    {/* Details Section */}
                    <div className="flex flex-col flex-grow p-6">
                      {/* Product Name */}
                      <a
                        href={item?.link}
                        className="text-lg lg:text-2xl font-semibold text-gray-800 hover:text-gray-600 transition-colors duration-200"
                      >
                        {item.name}
                      </a>

                      {/* Metadata */}
                      <div className="mt-4 space-y-2">
                        {item.meta_data.map((meta: any) => (
                          <p
                            key={meta.id}
                            className="text-sm lg:text-base text-gray-700"
                          >
                            <b>{meta.display_key}:</b> {meta.display_value}
                          </p>
                        ))}

                        {/* Quantity */}
                        <p className="text-sm lg:text-base text-gray-700 font-semibold">
                          Quantity:{" "}
                          <span className="font-medium">{item.quantity}</span>
                        </p>

                        {/* Price */}
                        <p className="text-lg font-semibold text-gray-800">
                          Price: Rs. {parseFloat(item.total).toFixed(2)}
                        </p>

                        {/* Subtotal */}
                        <p className="text-lg text-gray-900 font-bold mt-2">
                          Subtotal: Rs. {parseFloat(item.subtotal).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerSingleOrder;
