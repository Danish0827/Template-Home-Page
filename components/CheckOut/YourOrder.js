"use client";
import { Fragment, useEffect, useState } from "react";
import CheckoutCartItem from "./CheckoutCartItem";
import { fetchCountryCurrencyData } from "../Currency/CurrencyChanger";

const YourOrder = ({ cart }) => {
  if (!cart) return null; // Return early if cart is not present to avoid unnecessary renders
  // const [currencyCode, setCurrencyCode] = useState<any>();
  // const [convergenceData, setConvergenceData] = useState();
  const [currencySymbol, setCurrencySymbol] = useState();
  const [countryValue, setCountryValue] = useState(); // For storing your country's value

  useEffect(() => {
    const someFunction = async () => {
      const currencyData = await fetchCountryCurrencyData();
      console.log(currencyData, "currencyData yourOrderPage");

      if (currencyData) {
        // setCurrencyCode(currencyData.currencyCode);
        setCurrencySymbol(currencyData.currencySymbol);
        // setConvergenceData(currencyData.ConvergenceData);

        // Extracting your country's value
        const countryValue =
          currencyData.ConvergenceData[currencyData.currencyCode];
        setCountryValue(countryValue);
      } else {
        console.log("Failed to fetch currency data");
      }
    };
    someFunction();
  }, []);

  return (
    <Fragment>
      <div className="bg-white shadow-md rounded-md">
        <h2 className="text-xl font-bold text-gray-800 pb-6">Your Order</h2>
        <div className="overflow-x-auto">
          <table className="checkout-cart w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-4 px-2 text-left text-sm font-medium text-gray-600" />
                <th className="py-4 px-2 text-left text-sm font-bold text-gray-700">
                  Product
                </th>
                <th className="py-4 px-2 text-left text-sm font-bold text-gray-700">
                  Quantity
                </th>
                <th className="py-4 px-2 text-left text-sm font-bold text-gray-700">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {cart.cartItems?.length > 0 &&
                cart.cartItems.map((item) => (
                  <CheckoutCartItem key={item.key} item={item} currencySymbol={currencySymbol} countryValue={countryValue} />
                ))}
              {/* Total */}
            </tbody>
          </table>
        </div>
        <div className="bg-gray-50 border-t flex justify-between">
          <td className="py-4 px-2 font-bold text-gray-800">Subtotal:</td>
          <td className="py-4 px-2 text-lg font-bold text-gray-900">
            {/* Rs. {cart?.totalPrice?.toFixed(2)} */}
            {currencySymbol ? currencySymbol : "₹"}
            {countryValue && cart?.totalPrice
              ? (
                  parseFloat(countryValue.toString()) *
                  parseFloat((cart?.totalPrice).toString())
                ).toFixed(2)
              : cart?.totalPrice
              ? parseFloat((cart?.totalPrice).toString()).toLocaleString(
                  undefined,
                  {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }
                )
              : "0.00"}
          </td>
        </div>
      </div>
    </Fragment>
  );
};

export default YourOrder;
