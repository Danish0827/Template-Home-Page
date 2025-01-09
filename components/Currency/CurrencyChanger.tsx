export const fetchCountryCurrencyData = async () => {
  try {
    // Step 1: Fetch user's country code using IP lookup
    const countryResponse = await fetch(
      `https://extreme-ip-lookup.com/json/?key=HWNcygh87eXFmqOzrPnX`
    );

    if (!countryResponse.ok) {
      throw new Error("Failed to fetch country code");
    }

    const countryData = await countryResponse.json();
    const countryCode = countryData.countryCode;

    console.log("Detected Country Code:", countryCode);

    // Step 2: Fetch currency data using the country code from the API
    const currencyResponse = await fetch(`/api/getCurrencyData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        countrycode: countryCode, // Send country code as header instead of in the body (optional)
      },
      body: JSON.stringify({ countryCode }), // This could also be omitted if you prefer sending country code only in headers
    });

    if (!currencyResponse.ok) {
      throw new Error("Failed to fetch currency data");
    }

    const currencyData = await currencyResponse.json();
    console.log("Currency Data:", currencyData[0]);

    // Step 3: Extract required currency information
    if (Array.isArray(currencyData) && currencyData.length > 0) {
      const currencyInfo = currencyData[0]?.currencies;
      if (currencyInfo) {
        const [currencyKey] = Object.keys(currencyInfo);
        const symbol = currencyInfo[currencyKey]?.symbol || "N/A";
        console.log(currencyKey,currencyKey,'currencyKeyjahDKJ SDJLK');
        

        return {
          countryCode,
          currencyCode: currencyKey || "Unknown",
          currencySymbol: symbol,
        };
      } else {
        throw new Error("Currency information not available");
      }
    } else {
      throw new Error("Currency data not returned from the API");
    }
  } catch (error) {
    console.error("Error fetching currency data:", error);
    return null;
  }
};
