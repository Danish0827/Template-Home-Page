"use client";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "./../context"; // Import the context
import { FaMinus, FaPlus } from "react-icons/fa";
import { updateCart, deleteCartItem } from "../../utils/cart";
import Link from "next/link";
import { fetchCountryCurrencyData } from "../Currency/CurrencyChanger";

type MetaDataType = {
  key: string;
  value: string;
};

interface CartItemType {
  variation_id: number;
  product_id: number;
  quantity: number;
  line_total: number;
  data: {
    name: string;
    image?: { src: string };
    stock_quantity?: number;
    price?: number;

    meta_data?: MetaDataType[];
  };
  variation?: { attribute_pa_colour?: string; attribute_pa_size?: string };
}

interface CartItemProps {
  item: any;
  isLast: any;
  setCart: (newCart: any) => void; // SetCart function to update cart state
  setRemovingProduct: (isRemoving: boolean) => void;
  setUpdatingProduct: (isUpdating: boolean) => void;
  countryValue: any;
  currencySymbol: any;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  isLast,
  setCart,
  setRemovingProduct,
  setUpdatingProduct,
  countryValue,
  currencySymbol,
}) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const [product, setProduct] = useState<any>(null);
  const [showPrice, setShowPrice] = useState<any>([]);

  // Update quantity state when item changes
  useEffect(() => {
    setQuantity(item.quantity);
  }, [item.quantity]);

  const handleDecrement = (e: any) => {
    e.preventDefault();
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      updateCart(item.key, newQuantity, setCart, setUpdatingProduct);
    }
  };

  const handleIncrement = (e: any) => {
    e.preventDefault();
    if (
      quantity <
      // item.quantity
      //   ? item.quantity - item?.data?.stock_quantity
      //   :
      item?.data?.stock_quantity
    ) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      updateCart(item.key, newQuantity, setCart, setUpdatingProduct);
    }
  };

  const handleRemove = (e: any) => {
    e.preventDefault();
    deleteCartItem(item.key, setCart, setRemovingProduct);
  };
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

  const finalPrice =
    showPrice.meta?.["whole_sale_price_feature"]?.showPrice == "true" ||
    product?.meta_data?.find((data: any) => data.key === "show_wholesale_price")
      ?.value?.yes === "true"
      ? quantity >
        (product?.meta_data?.find(
          (data: any) => data.key === "show_wholesale_price"
        )?.value?.yes === "true"
          ? product?.meta_data?.find(
              (data: any) => data.key === "whole_sale_quantity"
            ).value
          : showPrice.meta?.["whole_sale_price_quantity"])
        ? item.data?.meta_data?.find(
            (wSale: any) => wSale.key === "wholesale_sale_price_amount"
          )?.value !== ""
          ? item.data?.meta_data?.find(
              (wSale: any) => wSale.key === "wholesale_sale_price_amount"
            )?.value * quantity
          : item.data?.meta_data?.find(
              (wSale: any) => wSale.key === "wholesale_regular_price_amount"
            )?.value * quantity
          ? item.data?.meta_data?.find(
              (wSale: any) => wSale.key === "wholesale_regular_price_amount"
            )?.value * quantity
          : item.data?.price * quantity
        : item.data?.price * quantity
      : item.data?.price * quantity;

  return (
    <div className={`${!isLast ? "border-b" : ""} py-4`}>
      <div className="flex flex-col lg:flex-row items-start">
        <div className="flex items-center lg:block gap-3">
          <a href={item?.link} className="flex-shrink-0">
            <img
              src={item?.data?.images?.[0]?.src || "fallback-image-url.jpg"}
              alt={item?.name || "Product Image"}
              className="w-24 h-auto object-cover object-top rounded-md"
            />
          </a>
          <a
            href={item?.link}
            className="lg:hidden text-base lg:text-xl font-semibold hover:text-gray-800 text-black"
          >
            {item?.data?.name}
          </a>
        </div>
        <div className="ml-0 lg:ml-4 mt-4 lg:mt-0 w-full">
          <a
            href={item?.link}
            className="hidden lg:block text-base lg:text-xl font-semibold hover:text-gray-800 text-black"
          >
            {item?.data?.name}
          </a>
          <div className="text-sm text-black lg:py-3">
            <div className="flex justify-between">
              <div>
                <p className="text-base lg:text-lg">
                  <b>Size:</b> {item?.variation?.attribute_pa_size}
                </p>
                <p className="text-base lg:text-lg">
                  <b className="font-bold">Color: </b>
                  {item?.variation?.attribute_pa_colour}
                </p>
                <div className="js-qty__wrapper flex items-center gap-2 mt-2">
                  <button
                    onClick={(e) => handleDecrement(e)}
                    className="p-2 bg-gray-100 rounded-md hover:bg-gray-200"
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
                    onClick={(e) => handleIncrement(e)}
                    className="p-2 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    <FaPlus />
                  </button>
                </div>
                <button
                  onClick={(e) => handleRemove(e)}
                  className="text-red-600 font-semibold text-base mt-2 hover:underline"
                >
                  Remove
                </button>
              </div>
              <div>
                <div className="text-right">
                  <p className="text-base lg:text-lg">
                    <b className="font-bold">
                      In Stock: {item?.data?.stock_quantity}
                    </b>
                  </p>
                  <p className="text-base lg:text-lg text-black font-bold">
                    {/* Rs. {(item?.data?.price * quantity).toFixed(2)} */}

                    {currencySymbol ? currencySymbol : "₹"}
                    {countryValue && finalPrice
                      ? (
                          parseFloat(countryValue.toString()) *
                          parseFloat(finalPrice.toString())
                        ).toFixed(2)
                      : finalPrice
                      ? parseFloat(finalPrice.toString()).toLocaleString(
                          undefined,
                          {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }
                        )
                      : "0.00"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CartPage = () => {
  const [cart, setCart] = useContext<any>(AppContext);
  // const [quantityFinal, setQuantityFinal] = useState(1);

  const fetchCart = async (method: string, body: any) => {
    const response = await fetch("/api/cart", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return response.json();
  };
  // const [currencyCode, setCurrencyCode] = useState<any>();
  // const [convergenceData, setConvergenceData] = useState();
  const [currencySymbol, setCurrencySymbol] = useState();
  const [countryValue, setCountryValue] = useState<any>(); // For storing your country's value

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

  const removeItem = async (variationId: number, productId: number) => {
    try {
      const result = await fetchCart("DELETE", { variationId, productId });
      if (result.success) {
        setCart((prevCart: any) => ({
          ...prevCart,
          cartItems: prevCart.cartItems.filter(
            (item: CartItemType) =>
              !(
                item.variation_id === variationId &&
                item.product_id === productId
              )
          ),
        }));
      } else {
        console.error("Failed to remove item:", result.message);
      }
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const updateItemQuantity = async (
    variationId: number,
    productId: number,
    newQuantity: number
  ) => {
    try {
      const result = await fetchCart("PATCH", {
        variationId,
        productId,
        quantity: newQuantity,
      });
      if (result.success) {
        setCart((prevCart: any) => ({
          ...prevCart,
          cartItems: prevCart.cartItems.map((item: CartItemType) =>
            item.variation_id === variationId && item.product_id === productId
              ? { ...item, quantity: newQuantity }
              : item
          ),
        }));
      } else {
        console.error("Failed to update quantity:", result.message);
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };
  const [products, setProducts] = useState<any[]>([]);
  const [showPrice, setShowPrice] = useState<any>([]);
  const [total, setSubTotalPrice] = useState<any[]>([]);
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
    const fetchProducts = async () => {
      try {
        const productIds =
          cart?.cartItems?.map((item: any) => item.product_id) || [];
        const fetchPromises = productIds.map((id: any) =>
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
    const calculateItemPrice = (item: CartItemType): number => {
      const productMetaData = products.find(
        (product: any) => product.id === item.product_id
      )?.meta_data;

      const isWholesaleEnabled =
        showPrice.meta?.["whole_sale_price_feature"]?.showPrice === "true" ||
        productMetaData?.some(
          (data: any) =>
            data.key === "show_wholesale_price" && data.value?.yes === "true"
        );

      const itemQuantity = item.quantity || 1; // Default to 1 if quantity is missing
      console.log(itemQuantity, "itemQuantity");

      if (
        isWholesaleEnabled &&
        itemQuantity >
          productMetaData?.some(
            (data: any) =>
              data.key === "show_wholesale_price" && data.value?.yes === "true"
          )
          ? productMetaData?.some(
              (data: any) => data.key === "whole_sale_quantity"
            ).value
          : showPrice.meta?.["whole_sale_price_quantity"]
      ) {
        const wholesalePrice: any =
          item.data?.meta_data?.find(
            (meta: any) => meta.key === "wholesale_sale_price_amount"
          )?.value || 0;
        const regularWholesalePrice: any =
          item.data?.meta_data?.find(
            (meta: any) => meta.key === "wholesale_regular_price_amount"
          )?.value || 0;

        return wholesalePrice
          ? wholesalePrice * itemQuantity
          : regularWholesalePrice * itemQuantity
          ? regularWholesalePrice * itemQuantity
          : (item.data?.price || 0) * itemQuantity;
      }

      return (item.data?.price || 0) * itemQuantity;
    };

    const total = cart?.cartItems
      ?.reduce((acc: number, item: CartItemType) => {
        const itemPrice = calculateItemPrice(item);
        return acc + itemPrice;
      }, 0)
      ?.toFixed(2);

    setSubTotalPrice(total || "0.00");
    console.log(total, "total");
  }, [cart, showPrice, products]);

  if (!cart?.cartItems?.length) return <p>Your cart is empty.</p>;
  // const onCheckoutClick = () => {
  //   console.log("Proceeding to checkout...");
  // };

  return (
    <main className="bg-gray-50 py-8 px-4 lg:px-16">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold uppercase">Cart</h1>
        <Link href="#" className="text-sm">
          Continue Shopping
        </Link>
      </header>

      <div className="flex flex-wrap lg:flex-nowrap gap-8">
        {/* Cart Items */}
        <div className="w-full lg:w-8/12 bg-white rounded-lg shadow-md p-4">
          {cart?.cartItems?.map((item: any, index: any) => (
            <CartItem
              key={`${item?.product_id}-${item?.variation_id}`}
              item={item}
              isLast={index === cart?.cartItems.length - 1}
              // quantity={setQuantityFinal}
              setCart={setCart}
              setRemovingProduct={() =>
                removeItem(item.variation_id, item.product_id)
              }
              setUpdatingProduct={(newQuantity: any) =>
                updateItemQuantity(
                  item.variation_id,
                  item.product_id,
                  newQuantity
                )
              }
              currencySymbol={currencySymbol}
              countryValue={countryValue}
            />
          ))}
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-4/12 bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg font-bold border-b pb-4 mb-4">
            Order Summary
          </h2>
          <div className="flex justify-between items-center mb-4">
            <span>Subtotal</span>
            <span className="font-bold">
              {/* Rs. {subtotal.toFixed(2)} */}
              {currencySymbol ? currencySymbol : "₹"}
              {countryValue && total
                ? (
                    parseFloat(countryValue.toString()) *
                    parseFloat(total.toString())
                  ).toFixed(2)
                : total
                ? parseFloat(total.toString()).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                : "0.00"}
            </span>
          </div>
          <Link href="/checkouts">
            <button className="w-full bg-black text-white py-3 rounded-md font-medium hover:bg-gray-800">
              Proceed to Checkout
            </button>
          </Link>
          <p className="text-sm text-gray-600 mt-2">
            Shipping and taxes will be calculated at checkout.
          </p>
        </div>
      </div>
    </main>
  );
};

export default CartPage;
