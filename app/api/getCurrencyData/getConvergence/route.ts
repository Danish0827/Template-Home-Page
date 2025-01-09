export async function POST(req: Request) {
  try {
    // Get the countryCode from the request body
    const { countryCode }: { countryCode: string } = await req.json(); // Use req.json() for parsing the body
    console.log(countryCode);

    if (!countryCode) {
      return new Response(`Webhook error: Country code is required`, {
        status: 400,
      });
    }

    // Call the external API to get country data (including currency)
    const response = await fetch(
      `https://restcountries.com/v3.1/alpha/${countryCode}`
    );

    if (!response.ok) {
      return new Response(
        `Failed to fetch data for country code: ${countryCode}`,
        {
          status: response.status,
        }
      );
    }

    const data = await response.json();
    console.log(data, "Country data fetched successfully.");

    // Return the data as the response
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching country data:", error);
    return new Response(
      JSON.stringify({
        error: "An error occurred while fetching country data.",
        details: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
