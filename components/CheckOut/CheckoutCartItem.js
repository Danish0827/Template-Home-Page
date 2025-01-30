"use client";

import { useEffect, useState } from "react";

const CheckoutCartItem = ({ item, currencySymbol, countryValue }) => {
  const [product, setProduct] = useState();
  const [showPrice, setShowPrice] = useState();
  useEffect(() => {
    const fetchProductColor = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/wp/v2/whole-sale-price?_fields=id,title,meta.whole_sale_price_quantity,meta.whole_sale_price_feature`
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

  const quantity = item.quantity;

  // const finalPrice =
  //   showPrice?.meta?.["whole_sale_price_feature"]?.showPrice == "true" ||
  //   product?.meta_data?.find((data) => data.key === "show_wholesale_price")
  //     ?.value?.yes === "true"
  //     ? quantity >
  //         product?.meta_data?.find(
  //           (data) => data.key === "show_wholesale_price"
  //         )?.value?.yes ===
  //       "true"
  //       ? product?.meta_data?.find((data) => data.key === "whole_sale_quantity")
  //           .value
  //       : showPrice.meta?.["whole_sale_price_quantity"]
  //       ? item.data?.meta_data?.find(
  //           (wSale) => wSale.key === "wholesale_sale_price_amount"
  //         )?.value !== ""
  //         ? item.data?.meta_data?.find(
  //             (wSale) => wSale.key === "wholesale_sale_price_amount"
  //           )?.value * quantity
  //         : item.data?.meta_data?.find(
  //             (wSale) => wSale.key === "wholesale_regular_price_amount"
  //           )?.value * quantity
  //         ? item.data?.meta_data?.find(
  //             (wSale) => wSale.key === "wholesale_regular_price_amount"
  //           )?.value * quantity
  //         : item.data?.price * quantity
  //       : item.data?.price * quantity
  //     : item.data?.price * quantity;

  const finalPrice =
    showPrice?.meta?.["whole_sale_price_feature"]?.showPrice == "true" ||
    product?.meta_data?.find((data) => data.key === "show_wholesale_price")
      ?.value?.yes === "true"
      ? quantity >
        (product?.meta_data?.find((data) => data.key === "show_wholesale_price")
          ?.value?.yes === "true"
          ? product?.meta_data?.find(
              (data) => data.key === "whole_sale_quantity"
            ).value
          : showPrice.meta?.["whole_sale_price_quantity"])
        ? item.data?.meta_data?.find(
            (wSale) => wSale.key === "wholesale_sale_price_amount"
          )?.value !== ""
          ? item.data?.meta_data?.find(
              (wSale) => wSale.key === "wholesale_sale_price_amount"
            )?.value * quantity
          : item.data?.meta_data?.find(
              (wSale) => wSale.key === "wholesale_regular_price_amount"
            )?.value * quantity
          ? item.data?.meta_data?.find(
              (wSale) => wSale.key === "wholesale_regular_price_amount"
            )?.value * quantity
          : item.data?.price * quantity
        : item.data?.price * quantity
      : item.data?.price * quantity;

  return (
    <tr className="border-b">
      <td className="py-2 px-2">
        <img
          className="object-cover rounded-md lg:w-20"
          src={item.data.images[0].src}
          alt={item.data.name}
        />
      </td>
      <td className="py-2 px-2 text-[13px] font-medium text-gray-800">
        {item.data.name}
      </td>
      <td className="py-2 px-2 text-sm text-gray-600">x{item.quantity}</td>
      <td className="py-2 px-2 text-sm text-gray-800">
        {/* Rs. {item.line_subtotal.toFixed(2)} */}
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
      </td>
    </tr>
  );
};

export default CheckoutCartItem;
