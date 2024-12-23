import { clearCart } from "../cart";
// utils/loadRazorpayScript.js
const loadRazorpayScript = async () => {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => reject(new Error("Failed to load Razorpay SDK"));
    document.body.appendChild(script);
  });
};

declare global {
  interface Window {
    Razorpay: any;
  }
}
const createOrderId = async (amount: number) => {
  try {
    const response = await fetch("/api/createOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amount * 100,
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.orderId;
  } catch (error) {
    console.error("There was a problem with your fetch operation:", error);
  }
};

export const RazorpayPayment = async ({
  orderId,
  amount,
  currency,
  name,
  email,
  contact,
  setIsOrderProcessing,
  setCart,
}: any) => {
  // {
  //   isOrderProcessing && (
  //     <div className="fixed inset-0 bg-gray-800 bg-opacity-75 z-50 flex items-center justify-center">
  //       <div className="text-center">
  //         <div className="w-16 h-16 block m-auto border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
  //         <p className="mt-4 text-white font-medium">
  //           Processing your order...
  //         </p>
  //       </div>
  //     </div>
  //   );
  // }
  try {
    // Load the Razorpay script
    const isScriptLoaded = await loadRazorpayScript();
    if (!isScriptLoaded || !window.Razorpay) {
      throw new Error("Razorpay SDK failed to load.");
    }
    setIsOrderProcessing(true);

    // Generate a Razorpay order ID
    const createdOrderId = await createOrderId(amount);
    if (!createdOrderId) {
      throw new Error("Failed to create Razorpay order ID.");
    }

    const options = {
      key: "rzp_test_4zQUczgof1KSEJ", // Replace with your actual Razorpay key
      amount: amount * 100,
      currency: currency,
      name,
      description: "Payment description",
      order_id: createdOrderId,
      prefill: {
        name,
        email,
        contact,
      },
      theme: {
        color: "#3399cc",
      },
      handler: async (response: any) => {
        setIsOrderProcessing(true);
        const dataRes = {
          orderCreationId: createdOrderId,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        try {
          // Verify payment signature
          const verifyRes = await fetch("/api/verify", {
            method: "POST",
            body: JSON.stringify(dataRes),
            headers: { "Content-Type": "application/json" },
          });

          const verifyData = await verifyRes.json();

          if (verifyData.isOk) {
            // Capture the payment manually
            const captureRes = await fetch("/api/capturePayment", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                paymentId: response.razorpay_payment_id,
                amount: amount * 100,
                currency: currency,
              }),
            });

            const captureData = await captureRes.json();
            if (captureRes.ok && captureData.success) {
              // Update order status to 'completed'
              await updateOrderStatuss(orderId);

              // alert("Payment captured successfully and order status updated!");
              // console.log("x-wc-session");

              // setIsOrderProcessing(false);

              const cartCleared = await clearCart(setCart, () => {});
              setCart(null);
              setIsOrderProcessing(false);

              // if (isEmpty(customerOrderData?.orderDetails) || cartCleared?.error) {
              //   setRequestError("Clear cart failed");
              //   return null;
              // }
              window.location.href = `${process.env.NEXT_PUBLIC_SITE_URL}/thank-you?orderId=${orderId}`;
              localStorage.setItem("x-wc-session", JSON.stringify(null));
              localStorage.removeItem("x-wc-session");
              localStorage.removeItem("next-cart");
            } else {
              // alert("Failed to update order status.");
              alert(captureData.message || "Payment capture failed.");
            }
          } else {
            alert(verifyData.message || "Payment verification failed.");
          }
        } catch (err) {
          console.error("Handler error:", err);
          alert("An error occurred. Please try again.");
        }
      },
    };

    // Initialize Razorpay
    const paymentObject = new window.Razorpay(options);

    // Handle payment failures
    paymentObject.on("payment.failed", (response: any) => {
      alert(response.error.description);
    });

    paymentObject.open();
  } catch (error) {
    console.error("Razorpay Payment Error:", error);
    alert("Payment initialization failed. Please try again.");
  }
};

const updateOrderStatuss = async (orderId: any) => {
  const data = {
    status: "completed",
    set_paid: true,
  };

  const encodedCredentials = btoa(
    `${process.env.WC_CONSUMER_KEY}:${process.env.WC_CONSUMER_SECRET}`
  );

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/wc/v3/orders/${orderId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${encodedCredentials}`,
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP status ${response.status}`);
    }

    const responseData = await response.json();
    console.log("Order updated:", responseData);
  } catch (error) {
    console.error("Error updating order:", error);
  }
};
