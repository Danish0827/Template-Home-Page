export async function POST(req: Request) {
  try {
    // Get the countryCode from the request body
    const { currencyKey }: { currencyKey: string } = await req.json(); // Use req.json() for parsing the body
    // console.log(currencyKey);

    if (!currencyKey) {
      return new Response(`Webhook error: Country code is required`, {
        status: 400,
      });
    }

    // Call the external API to get country data (including currency)
    const response = await fetch(
      `https://open.er-api.com/v6/latest/INR`
    );

    if (!response.ok) {
      return new Response(
        `Failed to fetch data for country code: ${currencyKey}`,
        {
          status: response.status,
        }
      );
    }

    const data = await response.json();
    // console.log(data.rates, "Convergence data fetched successfully.");

    // Return the data as the response
    return new Response(JSON.stringify(data.rates), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching country data:", error);
    return new Response(
      JSON.stringify({
        error: "An error occurred while fetching country data.",
        details: "Faield to fetch Convergence data",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
