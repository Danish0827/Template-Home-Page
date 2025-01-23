"use client";
import { Fragment, useEffect, useState } from "react";
import CheckoutCartItem from "./CheckoutCartItem";
import { fetchCountryCurrencyData } from "../Currency/CurrencyChanger";
import DiscountCodeForm from "./DiscountCodeForm";

const YourOrder = ({ cart }) => {
  if (!cart) return null; // Return early if cart is not present to avoid unnecessary renders
  const [products, setProducts] = useState();
  const [showPrice, setShowPrice] = useState();
  const [total, setSubTotalPrice] = useState();
  const [discountPrice, setDiscountPrice] = useState();

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

  useEffect(() => {
    fetchProductColor();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productIds =
          cart?.cartItems?.map((item) => item.product_id) || [];
        const fetchPromises = productIds.map((id) =>
          fetch(
            `${process.env.NEXT_PUBLIC_SITE_URL}/api/get-products?id=${id}`
          ).then((res) => res.json())
        );
        const responses = await Promise.all(fetchPromises);
        const fetchedProducts = responses.map((res) => res.products[0]);
        setProducts(fetchedProducts);
        // console.log(fetchedProducts);
        // console.log(cart);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [cart]);

  useEffect(() => {
    const calculateItemPrice = (item) => {
      const productMetaData = products?.find(
        (product) => product.id === item.product_id
      )?.meta_data;

      const isWholesaleEnabled =
        showPrice?.meta?.["whole_sale_price_feature"]?.showPrice === "true" ||
        productMetaData?.some(
          (data) =>
            data.key === "show_wholesale_price" && data.value?.yes === "true"
        );

      const itemQuantity = item.quantity || 1; // Default to 1 if quantity is missing

      if (isWholesaleEnabled && itemQuantity > 10) {
        const wholesalePrice =
          item.data?.meta_data?.find(
            (meta) => meta.key === "wholesale_sale_price_amount"
          )?.value || 0;
        const regularWholesalePrice =
          item.data?.meta_data?.find(
            (meta) => meta.key === "wholesale_regular_price_amount"
          )?.value || 0;

        return wholesalePrice
          ? wholesalePrice * itemQuantity
          : regularWholesalePrice * itemQuantity;
      }

      return (item.data?.price || 0) * itemQuantity;
    };

    const total = cart?.cartItems
      ?.reduce((acc, item) => {
        const itemPrice = calculateItemPrice(item);
        return acc + itemPrice;
      }, 0)
      ?.toFixed(2);

    setSubTotalPrice(total || "0.00");
  }, [cart, showPrice, products]);
  // const [currencyCode, setCurrencyCode] = useState<any>();
  // const [convergenceData, setConvergenceData] = useState();
  const [currencySymbol, setCurrencySymbol] = useState();
  const [countryValue, setCountryValue] = useState(); // For storing your country's value

  useEffect(() => {
    const someFunction = async () => {
      const currencyData = await fetchCountryCurrencyData();
      // console.log(currencyData, "currencyData yourOrderPage");

      if (currencyData) {
        setCurrencySymbol(currencyData.currencySymbol);

        const countryValue =
          currencyData.ConvergenceData[currencyData.currencyCode];
        setCountryValue(countryValue);
      } else {
        console.log("Failed to fetch currency data");
      }
    };
    someFunction();
  }, []);
  const totalFinalPrice =
    countryValue && total
      ? (
          parseFloat(countryValue.toString()) * parseFloat(total.toString())
        ).toFixed(2)
      : total
      ? parseFloat(total.toString()).toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      : "0.00";

  return (
    <Fragment>
      <div className="bg-white shadow-md rounded-md">
        <h2 className="text-xl font-bold text-gray-800 py-3 pl-3">
          Your Order
        </h2>
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
                  <CheckoutCartItem
                    key={item.key}
                    item={item}
                    currencySymbol={currencySymbol}
                    countryValue={countryValue}
                  />
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
            {discountPrice ? discountPrice : totalFinalPrice}
          </td>
        </div>
      </div>
      <DiscountCodeForm
        cart={cart}
        totalFinalPrice={totalFinalPrice}
        DiscountPrice={setDiscountPrice}
      />
    </Fragment>
  );
};

export default YourOrder;
