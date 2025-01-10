"use client";
import React, { useState, useEffect } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { updateCart, deleteCartItem } from "../../utils/cart";
import { fetchCountryCurrencyData } from "../Currency/CurrencyChanger";

interface CartItemProps {
  item: any;
  isLast: any;
  setCart: (newCart: any) => void; // SetCart function to update cart state
  setRemovingProduct: (isRemoving: boolean) => void;
  setUpdatingProduct: (isUpdating: boolean) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  isLast,
  setCart,
  setRemovingProduct,
  setUpdatingProduct,
}) => {
  const [quantity, setQuantity] = useState(item.quantity);

  // const [currencyCode, setCurrencyCode] = useState<any>();
  // const [convergenceData, setConvergenceData] = useState();
  const [currencySymbol, setCurrencySymbol] = useState();
  const [countryValue, setCountryValue] = useState<number | undefined>(); // For storing your country's value

  useEffect(() => {
    const someFunction = async () => {
      const currencyData = await fetchCountryCurrencyData();
      // console.log(currencyData, "currencyData");

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

  // Update quantity state when item changes
  useEffect(() => {
    setQuantity(item.quantity);
  }, [item.quantity]);

  const handleDecrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      updateCart(item.key, newQuantity, setCart, setUpdatingProduct);
    }
  };

  const handleIncrement = () => {
    if (quantity < item?.data?.stock_quantity) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      updateCart(item.key, newQuantity, setCart, setUpdatingProduct);
    }
  };

  const handleRemove = () => {
    deleteCartItem(item.key, setCart, setRemovingProduct);
  };

  const finalPrice = (item.data?.price * quantity).toFixed(2);

  return (
    <div
      className={`cart__item flex gap-6 p-2 bg-white ${
        !isLast ? "border-b" : ""
      }`}
    >
      <div className="cart__image w-1/4">
        <img
          src={
            item?.data?.images?.[0]?.src ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw_HeSzHfBorKS4muw4IIeVvvRgnhyO8Gn8w&s"
          }
          alt={item?.name || "Product Image"}
          className="rounded-lg w-full object-cover"
        />
      </div>

      <div className="cart__item-details w-3/4 flex flex-col justify-between">
        <div>
          <h3 className="text-base mb-2 font-semibold text-gray-900">
            {item.name}
          </h3>
          <p className="text-sm text-gray-500">
            <span>Size:</span> {item.variantName} {item.variantQuantity}
          </p>
        </div>

        <div className="flex justify-between items-center mt-2">
          <div className="js-qty__wrapper flex items-center gap-2">
            <button
              className="p-2 bg-gray-100 rounded-md hover:bg-gray-200"
              onClick={handleDecrement}
            >
              <FaMinus />
            </button>
            <input
              type="text"
              className="js-qty__num w-12 text-center border border-gray-300 rounded-md"
              value={quantity}
              readOnly
            />
            <button
              className="p-2 bg-gray-100 rounded-md hover:bg-gray-200"
              onClick={handleIncrement}
            >
              <FaPlus />
            </button>
          </div>
          <div>
            <p className="md:text-lg">
              <b className="font-bold">
                In Stock: {item?.data?.stock_quantity}
              </b>
            </p>
            <span className="md:text-lg font-semibold text-gray-900">
              {/* Rs. {finalPrice} */}
              {currencySymbol ? currencySymbol : "₹"}
              {countryValue && finalPrice
                ? (
                    parseFloat(countryValue.toString()) *
                    parseFloat(finalPrice.toString())
                  ).toFixed(2)
                : finalPrice
                ? parseFloat(finalPrice.toString()).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                : "0.00"}
            </span>
          </div>
        </div>

        <button
          className="mt-2 text-red-600 hover:underline font-bold"
          onClick={handleRemove}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
