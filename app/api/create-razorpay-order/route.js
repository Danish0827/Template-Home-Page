import Razorpay from "razorpay";

async function handler(req, res) {
  // console.log("Request Body:", req.body);

  // Ensure only POST method is allowed
  if (req.method !== "POST") {
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  // Extract and validate request body
  const { amount, currency, receipt } = req.body;
  if (!amount || !currency || !receipt) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // console.log("Request Body:", req.body);

  // Initialize Razorpay instance
  const razorpayInstance = new Razorpay({
    key_id: "rzp_test_4zQUczgof1KSEJ", // Replace with your actual key_id
    key_secret: "DKBwQGVkSJpZKvA5aAX1cpMj", // Replace with your actual key_secret
  });

  try {
    // Create Razorpay order
    const order = await razorpayInstance.orders.create({
      amount: Math.round(amount * 100), // Convert to paise
      currency,
      receipt,
    });

    // console.log("Order Created:", order);
    res.status(200).json(order);
  } catch (error) {
    console.error("Razorpay Order Error:", error);
    res.status(500).json({
      error: "Failed to create Razorpay order. Please try again later.",
    });
  }
}

export { handler as POST };
