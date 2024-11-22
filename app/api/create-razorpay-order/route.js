import Razorpay from "razorpay";

async function handler(req, res) {
  // Check for POST method
  if (req.method !== "POST") {
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  const razorpayInstance = new Razorpay({
    key_id: "rzp_test_4zQUczgof1KSEJ",
    key_secret: "DKBwQGVkSJpZKvA5aAX1cpMj",
  });

  const { amount, currency, receipt } = req.body;

  if (!amount || !currency || !receipt) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const order = await razorpayInstance.orders.create({
      amount: Math.round(amount * 100), // Amount in paise
      currency,
      receipt, // Use 'receipt' instead of 'orderId'
    });

    console.log(order, "order created");
    res.status(200).json(order);
  } catch (error) {
    console.error("Razorpay Order Error:", error);
    res.status(500).json({ error: "Unable to create Razorpay order." });
  }
}

export { handler as POST };
