import { NextResponse } from "next/server";

export async function POST(req) {
  const responseData = {
    success: false,
    tracking: null,
    error: null,
  };

  try {
    const { slug, trackingNumber } = await req.json();
    // console.log(
    //   "Received slug:",
    //   slug,
    //   "Received trackingNumber:",
    //   trackingNumber
    // );

    if (!slug || !trackingNumber) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required parameters: slug or trackingNumber",
        },
        { status: 400 }
      );
    }

    // console.log("API Key:", process.env.AFTERSHIP_API_KEY);

    const afterShipResponse = await fetch(
      `https://api.aftership.com/v4/trackings/${slug}/${trackingNumber}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "aftership-api-key": process.env.AFTERSHIP_API_KEY,
        },
      }
    );

    const responseText = await afterShipResponse.text(); // Read raw response as text
    console.log("AfterShip Response:", responseText);

    if (!afterShipResponse.ok) {
      // If the response is not OK, log and throw an error with raw response
      throw new Error(
        `AfterShip API returned ${afterShipResponse.status}: ${responseText}`
      );
    }

    // Directly assign the entire responseText to responseData.tracking
    responseData.success = true;
    responseData.tracking = JSON.parse(responseText); // Parse and assign the entire response
  } catch (error) {
    console.error("Error in AfterShip API:", error.message);
    responseData.error = error.message;
  }

  return NextResponse.json(responseData);
}
