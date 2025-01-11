"use client";
import { isEmpty } from "lodash";
import { addToCart } from "../../utils/cart";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context";
import Link from "next/link";
import cx from "classnames";
import { Input, Space } from "antd";
import { FaMinus, FaPlus } from "react-icons/fa";

const AddToCart = ({
  product,
  selectedVariant,
  regular,
  price,
  wholesaleRegular,
  wholesalePrice,
}) => {
  const [cart, setCart] = useContext(AppContext);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const maxStock =
    selectedVariant?.stock_quantity ?? product?.stock_quantity ?? 1;

  useEffect(() => setQuantity(1), [selectedVariant]);
  const updatePrice = () => {
    if (selectedVariant) {
      // console.log(selectedVariant,"sadsa");

      regular(quantity * selectedVariant.regular_price);
      price(quantity * selectedVariant.price);

      const wholesaleRegularPriceData = selectedVariant.meta_data.find(
        (data) => data.key === "wholesale_regular_price_amount"
      );

      const wholesaleSalePriceData = selectedVariant.meta_data.find(
        (data) => data.key === "wholesale_sale_price_amount"
      );
      console.log(
        wholesaleRegularPriceData?.value,
        "wholesaleRegularPriceData.value"
      );
      console.log(
        wholesaleSalePriceData?.value,
        "wholesaleSalePriceData.value"
      );

      wholesaleRegular(
        quantity *
          (wholesaleRegularPriceData
            ? parseFloat(wholesaleRegularPriceData?.value)
            : 0)
      );
      wholesalePrice(
        quantity *
          (wholesaleSalePriceData
            ? parseFloat(wholesaleSalePriceData?.value)
            : 0)
      );
    }
  };
  useEffect(updatePrice, [quantity, selectedVariant]);

  const adjustQuantity = (amount) => {
    setQuantity((prevQuantity) =>
      Math.min(Math.max(prevQuantity + amount, 1), maxStock)
    );
  };

  const handleAddToCart = () => {
    console.log(quantity, cart, "dadada");
    console.log(cart, "cart");

    //mark
    const productDetails = {
      id: product.id,
      name: product.name,
      image: product.images?.[0]?.src,
      price: selectedVariant?.price ?? product.price,
      quantity,
      variantId: selectedVariant?.id,
      variantImage: selectedVariant?.image?.src,
      variantName: selectedVariant?.attributes
        ?.map((attr) => attr.option)
        .join(", "),
      variantPrice: selectedVariant?.price,
    };

    addToCart(
      product.id,
      quantity,
      setCart,
      setIsAddedToCart,
      setLoading,
      productDetails
    );
  };

  if (isEmpty(product)) return null;

  const addToCartButton = cx(
    "w-full py-2 border border-black text-lg font-medium transition-transform active:scale-95 flex items-center justify-center gap-2 hover:opacity-75 uppercase mb-3",
    { "bg-white hover:bg-gray-100": !loading, "bg-gray-200": loading }
  );

  return (
    <div className="select-none">
      <div className="w-36 mb-5">
        <Space.Compact size="large">
          <Input
            className="text-center"
            value={quantity}
            addonBefore={
              <FaMinus
                className={cx("cursor-pointer", {
                  "text-gray-300": quantity === 1,
                  "text-black": quantity > 1,
                })}
                onClick={() => adjustQuantity(-1)}
              />
            }
            addonAfter={
              <FaPlus
                className={cx("cursor-pointer", {
                  "text-gray-300": quantity === maxStock,
                  "text-black": quantity < maxStock,
                })}
                onClick={() => adjustQuantity(1)}
              />
            }
            readOnly
          />
        </Space.Compact>
      </div>

      <button
        className={addToCartButton}
        onClick={handleAddToCart}
        disabled={loading}
      >
        {loading ? "Adding..." : "Add to cart"}
      </button>

      {isAddedToCart && !loading && (
        <Link
          href="/cart"
          className="w-full py-2 border border-black text-lg font-medium transition-transform active:scale-95 flex items-center justify-center gap-2 hover:opacity-75 uppercase mb-3"
        >
          View cart
        </Link>
      )}
    </div>
  );
};

export default AddToCart;
