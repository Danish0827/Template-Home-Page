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
  // console.log(item, "item danish ");
  const [product, setProduct] = useState<any>(null);
  const [showPrice, setShowPrice] = useState<any>([]);

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
  // console.log(quantity,"sadj");

  useEffect(() => {
    const fetchProductColor = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/wp/v2/whole-sale-price?_fields=id,title,meta.whole_sale_price_feature`
        );
        const data = await response.json();
        setShowPrice(data?.[0]);
        // console.log(data?.[0]);
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };
    fetchProductColor();
  }, []);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SITE_URL}/api/get-products?id=${item?.product_id}`
        );
        const data = await res.json();
        const fetchedProduct = data.products[0];
        setProduct(fetchedProduct);
        // console.log(fetchedProduct, "danish data sjka");
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, []);

  const finalPrice =
    showPrice.meta?.["whole_sale_price_feature"]?.showPrice == "true" ||
    product?.meta_data?.find((data: any) => data.key === "show_wholesale_price")
      ?.value?.yes === "true"
      ? quantity > 10
        ? item.data?.meta_data?.find(
            (wSale: any) => wSale.key === "wholesale_sale_price_amount"
          )?.value !== ""
          ? item.data?.meta_data?.find(
              (wSale: any) => wSale.key === "wholesale_sale_price_amount"
            )?.value * quantity
          : item.data?.meta_data?.find(
              (wSale: any) => wSale.key === "wholesale_regular_price_amount"
            )?.value * quantity
        : item.data?.price * quantity
      : item.data?.price * quantity;

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
