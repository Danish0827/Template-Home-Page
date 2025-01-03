import Razorpay from "razorpay";
import { NextRequest, NextResponse } from "next/server";

const razorpay = new Razorpay({
  key_id: "rzp_test_4zQUczgof1KSEJ", // Replace with your actual key_id
  key_secret: "DKBwQGVkSJpZKvA5aAX1cpMj", // Replace with your actual key_secret
});

export async function POST(request: NextRequest) {
  const { amount, currency } = (await request.json()) as {
    amount: string;
    currency: string;
  };

  var options = {
    amount: amount,
    currency: currency,
    receipt: "rcp1",
    payment_capture: 0, // Set to 0 for manual capture
  };
  const order = await razorpay.orders.create(options);
  console.log(order);
  return NextResponse.json({ orderId: order.id }, { status: 200 });
}
