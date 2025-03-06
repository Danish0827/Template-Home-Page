"use client";
import React, { useContext, useEffect, useState } from "react";
import ShippingMethodComponent from "./ShippingMethodComponent";
import { AppContext } from "../context";

const ShippingAddressForm = ({ method }: any) => {
  const [shippingMethod, setShippingMethod] = useState("freeDelivery");

  const handleShippingMethod = (selectedMethod: string) => {
    setShippingMethod(selectedMethod);
    method(selectedMethod); // Call the method from the parent component
  };
  const [cart] = useContext(AppContext) as any;
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [formData, setFormData] = useState({
    firstName: "danish",
    lastName: "shaikh",
    address: "adb namd xyz ashdj dshj",
    apartment: "31",
    city: "mumbai",
    state: "maharashtra",
    postalCode: "400008",
    phone: "1234567890",
  });
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        const countryList = data
          .map((country: any) => country.name.common)
          .sort();
        setCountries(countryList);
      })
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Create the order data, including cart items
    const orderData = {
      formData,
      selectedCountry,
      shippingMethod,
      products: cart.cartItems, // Include the cart items in the order data
    };

    try {
      const response = await fetch("/api/createOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData), // Send the complete order data
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log("Order placed successfully:", data);

      // Redirect to "Thank You" page with order details after successful order placement
      window.location.href = `/thank-you?orderId=${data.orderId}&customerName=${formData.firstName}&country=${selectedCountry}`;
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <form className="max-w-md mx-auto " onSubmit={handleSubmit}>
      <h1 className="mb-7 text-3xl font-bold">Delivery</h1>
      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 top-3 peer-focus:text-blue-600">
            First Name
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 top-3 peer-focus:text-blue-600">
            Last Name
          </label>
        </div>
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 top-3 peer-focus:text-blue-600">
          Address
        </label>
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="apartment"
          value={formData.apartment}
          onChange={handleChange}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
        />
        <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 top-3 peer-focus:text-blue-600">
          Apartment (Optional)
        </label>
      </div>

      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 top-3 peer-focus:text-blue-600">
            City
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 top-3 peer-focus:text-blue-600">
            State
          </label>
        </div>
      </div>

      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 top-3 peer-focus:text-blue-600">
            Postal Code
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="number"
            // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 top-3 peer-focus:text-blue-600">
            Phone (123-456-7890)
          </label>
        </div>
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <select
          name="country"
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          required
        >
          <option value="">Select Country</option>
          {countries.map((country, index) => (
            <option key={index} value={country}>
              {country}
            </option>
          ))}
        </select>
        <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 top-3 peer-focus:text-blue-600">
          Country
        </label>
      </div>
      <ShippingMethodComponent setMethod={handleShippingMethod} />
      <button
        style={{ width: "100%", display: "block" }}
        className="text-white block w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-lg  sm:w-auto px-5 py-2.5 text-center"
        type="submit"
      >
        Pay Now
      </button>
    </form>
  );
};

export default ShippingAddressForm;
