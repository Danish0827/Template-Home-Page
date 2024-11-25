// pages/api/capturePayment.js
import Razorpay from "razorpay";
import { NextRequest, NextResponse } from "next/server";

const razorpay = new Razorpay({
  key_id: "rzp_test_4zQUczgof1KSEJ",
  key_secret: "DKBwQGVkSJpZKvA5aAX1cpMj",
});

export async function POST(request: NextRequest) {
  const { paymentId, amount, currency } = (await request.json()) as {
    paymentId: string;
    amount: number;
    currency: string; // Assuming currency is INR for simplicity
  };

  try {
    const captureResponse = await razorpay.payments.capture(
      paymentId,
      amount,
      currency
    );
    return NextResponse.json(
      { success: true, data: captureResponse },
      { status: 200 }
    );
  } catch (error) {
    console.error("Capture payment error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to capture payment", error },
      { status: 400 }
    );
  }
}
