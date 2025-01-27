"use client";
import React, { useContext, useEffect, useState } from "react";
import { AiTwotoneQuestionCircle } from "react-icons/ai";
import { AppContext } from "../context";

interface CostSummaryProps {
  Method: string;
  discountPrice: any;
  afterDiscountPrice: any;
}

interface RowProps {
  label: React.ReactNode;
  value: string | any;
  labelClass?: string;
  valueClass?: string;
  prefix?: React.ReactNode;
}
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

const CostSummary: React.FC<CostSummaryProps> = ({
  Method,
  discountPrice,
  afterDiscountPrice,
}) => {
  const [cart] = useContext(AppContext) as [
    { cartItems: any; totalQty: number; totalPrice: any }
  ];
  const charge = parseFloat("99").toFixed(2);
  console.log(Method);
  const [products, setProducts] = useState<any[]>([]);
  const [showPrice, setShowPrice] = useState<any>([]);
  const [total, setSubTotalPrice] = useState<any>();
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
        console.log(fetchedProducts);
        console.log(cart);
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

      if (isWholesaleEnabled && itemQuantity > 10) {
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
          : regularWholesalePrice * itemQuantity;
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
  }, [cart, showPrice, products]);

  return (
    <section className="p-4 bg-gray-100 text-black rounded-md">
      <div className="mb-4">
        <h3 id="MoneyLine-Heading0" className="text-lg font-semibold ">
          Cost summary
        </h3>
      </div>

      <div role="table" aria-labelledby="MoneyLine-Heading0">
        {/* Header Row */}
        <div role="rowgroup" className="mb-2">
          <div role="row" className="flex justify-between text-black">
            <div role="columnheader" className="w-1/2">
              Item
            </div>
            <div role="columnheader" className="w-1/2 text-right">
              {cart?.totalQty ?? 0}

              <span className="pl-1 text-xs  uppercase">
                {cart?.totalQty === 0 ? "Item" : "Items"}
              </span>
            </div>
          </div>
        </div>

        {/* Body Rows */}
        <div role="rowgroup" className="space-y-2">
          {/* Subtotal Row */}
          <Row label="Subtotal" value={`₹${total || "0.00"}`} />

          {/* Shipping Row */}
          <Row
            label={
              <span className="flex items-center">
                Shipping
                <button
                  type="button"
                  aria-label="Shipping policy"
                  aria-haspopup="dialog"
                  className="ml-2 text-blue-500 hover:underline"
                >
                  <AiTwotoneQuestionCircle className="cursor-help" />
                </button>
              </span>
            }
            value={Method === "cashOnDelivery" ? `₹${charge}` : "FREE"}
            valueClass="text-gray-500"
          />

          <Row
            label={
              <span className="flex items-center">
                Discount
                <button
                  type="button"
                  aria-label="Shipping policy"
                  aria-haspopup="dialog"
                  className="ml-2 text-blue-500 hover:underline"
                ></button>
              </span>
            }
            value={`${discountPrice ? "₹" + discountPrice : "-"}`}
            valueClass="text-gray-500"
          />
          {/* Total Row */}
          <Row
            label="Total"
            value={`₹${
              afterDiscountPrice
                ? (
                    afterDiscountPrice +
                    (Method === "cashOnDelivery" ? parseFloat(charge) : 0)
                  ).toFixed(2)
                : (
                    parseFloat(total) +
                    (Method === "cashOnDelivery" ? parseFloat(charge) : 0)
                  ).toFixed(2)
            }`}
            labelClass="font-semibold text-gray-900"
            valueClass="font-semibold text-gray-900"
            prefix={
              <span
                title="Indian Rupees"
                className="mr-1 text-xs text-gray-500"
              >
                INR
              </span>
            }
          />
        </div>
      </div>
    </section>
  );
};

// Reusable row component with TypeScript props
const Row: React.FC<RowProps> = ({
  label,
  value,
  labelClass = "text-gray-700",
  valueClass = "text-gray-800",
  prefix = null,
}) => (
  <div
    role="row"
    className={`flex justify-between items-center ${
      label === "Total" ? "" : "border-b pb-2"
    } `}
  >
    <div role="rowheader" className={`w-1/2 ${labelClass}`}>
      {label}
    </div>
    <div role="cell" className={`w-1/2 text-right ${valueClass}`}>
      {prefix}
      {value}
    </div>
  </div>
);

export default CostSummary;
