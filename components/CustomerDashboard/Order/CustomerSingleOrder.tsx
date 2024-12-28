"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Descriptions, Modal, notification, Steps } from "antd";
import { format } from "date-fns";

const CustomerSingleOrder = ({ params }: any) => {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [orders, setOrders] = useState<any>();
  const [trackData, setTrackData] = useState<any>();
  const [trackingSlug, setTrackingSlug] = useState();
  const [trackingNumber, setTrackingNumber] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);

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
        // Accessing and logging the tracking_number
        const metaData = data?.order?.meta_data;
        const aftershipMeta = metaData?.find(
          (meta: any) => meta?.key === "_aftership_tracking_items"
        );

        if (aftershipMeta && Array.isArray(aftershipMeta.value)) {
          aftershipMeta?.value?.forEach((item: any) => {
            setTrackingNumber(item?.tracking_number);
            setTrackingSlug(item?.slug);
            console.log(item?.slug, "geiuwqh");

            const trackOrders = async () => {
              // console.log(item?.tracking_number,"item?.tracking_number");

              const response = await fetch("/api/order-track", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  slug: item?.slug,
                  trackingNumber: item?.tracking_number,
                }),
              });

              const data = await response.json();
              setTrackData(data);
            };
            trackOrders();
          });
        } else {
          console.log("No tracking data found.");
        }

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

  // useEffect(() => {
  // const trackOrder = async () => {
  //   try {
  //     const response = await fetch("/api/order-track", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         slug: trackingSlug,
  //         trackingNumber: trackingNumber,
  //       }),
  //     });

  //     const data = await response.json();
  //     console.log(data, "sdgadjgjh");

  //     if (data.success) {
  //       setTrackData(data.tracking);
  //     } else {
  //       console.error("Error in tracking:", data.error);
  //     }
  //   } catch (error) {
  //     console.error("Track order fetch error:", error);
  //   }
  // };

  // trackOrder();
  // }, [orders]);

  // Show the modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Handle OK button
  const handleOk = () => {
    console.log("Tracking Order Confirmed");
    setIsModalVisible(false);
  };

  // Handle Cancel button
  const handleCancel = () => {
    console.log("Tracking Order Cancelled");
    setIsModalVisible(false);
  };
  return (
    <div className="bg-gray-50 flex items-center justify-center py-10 px-3">
      <div className="w-full md:max-w-5xl lg:max-w-6xl xl:max-w-7xl bg-white shadow-lg rounded-lg p-6">
        <header className="border-b pb-4 mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Order #{!orders?.id ? "undefined" : orders?.id}
          </h1>
          {trackData?.success === true && (
            <button
              onClick={showModal}
              className="text-base px-4 py-2 text-white bg-templatePrimary text-templatePrimaryText hover:bg-templatePrimaryLight rounded-lg shadow"
            >
              Track Order
            </button>
          )}
          {/* Ant Design Modal */}
          <Modal
            title=""
            open={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="Confirm"
            footer={false}
            width={800}
            cancelText="Cancel"
          >
            <div className="max-w-4xl mx-auto">
              <h1 className="text-2xl font-bold text-gray-800 mb-4">
                Tracking Details
              </h1>

              {/* Tracking Information */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 shadow-xl rounded-2xl p-6 mb-6 border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  📦{" "}
                  {trackData?.tracking?.data?.tracking?.subtag_message || "N/A"}{" "}
                  on{" "}
                  {trackData?.tracking?.data?.tracking?.shipment_delivery_date
                    ? new Intl.DateTimeFormat("en-US", {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      }).format(
                        new Date(
                          trackData?.tracking?.data?.tracking?.shipment_delivery_date
                        )
                      )
                    : "N/A"}
                </h2>
                <div className="space-y-3">
                  <p className="text-gray-700">
                    <span className="font-semibold text-indigo-600">
                      Tracking Number:
                    </span>{" "}
                    <span className="text-gray-900">
                      {trackData?.tracking?.data?.tracking?.tracking_number ||
                        "N/A"}
                    </span>
                  </p>

                  <p className="text-gray-700">
                    <span className="font-semibold text-indigo-600">
                      Status:
                    </span>{" "}
                    <span className="text-gray-900">
                      {trackData?.tracking?.data?.tracking?.subtag_message ||
                        "N/A"}
                    </span>
                  </p>

                  <p className="text-gray-700">
                    <span className="font-semibold text-indigo-600">
                      Pickup Date:
                    </span>{" "}
                    <span className="text-gray-900">
                      {trackData?.tracking?.data?.tracking?.shipment_pickup_date
                        ? new Intl.DateTimeFormat("en-US", {
                            month: "short",
                            day: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          }).format(
                            new Date(
                              trackData?.tracking?.data?.tracking?.shipment_pickup_date
                            )
                          )
                        : "N/A"}
                    </span>
                  </p>

                  <p className="text-gray-700">
                    <span className="font-semibold text-indigo-600">
                      Delivery Date:
                    </span>{" "}
                    <span className="text-gray-900">
                      {trackData?.tracking?.data?.tracking
                        ?.shipment_delivery_date
                        ? new Intl.DateTimeFormat("en-US", {
                            month: "short",
                            day: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          }).format(
                            new Date(
                              trackData?.tracking?.data?.tracking?.shipment_delivery_date
                            )
                          )
                        : "N/A"}
                    </span>
                  </p>
                </div>
              </div>

              {/* Checkpoints */}
              <h2 className="text-sm font-semibold text-gray-800 mb-4">
                Times are in local time of the checkpoint location.
              </h2>
              <div className="bg-white shadow-md rounded-lg p-4">
                <Steps
                  progressDot
                  direction="vertical"
                  current={
                    trackData?.tracking?.data?.tracking?.checkpoints.length - 1
                  } // Mark the latest checkpoint as active
                  size="small"
                  className="custom-steps"
                >
                  {trackData?.tracking?.data?.tracking?.checkpoints
                    .slice()
                    .reverse()
                    .map((checkpoint: any, index: any) => (
                      <Steps.Step
                        className="mb-2"
                        key={index}
                        title={
                          <strong className="font-bold">
                            {checkpoint.subtag_message}
                            {/* checkpoint.message */}
                          </strong>
                        }
                        description={
                          <>
                            <p className="text-gray-600">
                              {/* <strong>Time:</strong>{" "} */}
                              {new Intl.DateTimeFormat("en-US", {
                                month: "short",
                                day: "2-digit",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                              }).format(
                                new Date(checkpoint.checkpoint_time)
                              )}{" "}
                              - {checkpoint.location}
                            </p>
                          </>
                        }
                      />
                    ))}
                </Steps>
              </div>
            </div>
          </Modal>
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
                        {item.meta_data
                          .filter((meta: any) => meta.key !== "_reduced_stock") // Exclude "_reduced_stock"
                          .map((meta: any) => (
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
