import { isEmpty } from "lodash";
import { addToCart } from "../../utils/cart";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context";
import Link from "next/link";
import cx from "classnames";
import { Input, Space } from "antd";
import { FaMinus, FaPlus } from "react-icons/fa";

const AddToCart = ({ product, selectedVariant, regular, price }) => {
  const [cart, setCart] = useContext(AppContext);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // Get maximum stock from selected variant or product
  const maxStock = selectedVariant?.stock_quantity ?? product?.stock_quantity ?? 1;

  // Reset quantity whenever selectedVariant changes
  useEffect(() => {
    setQuantity(1);
  }, [selectedVariant]);

  // Increment quantity up to max stock
  const handleIncrement = () => {
    setQuantity((prevQuantity) => Math.min(prevQuantity + 1, maxStock));
  };

  // Decrement quantity down to 1
  const handleDecrement = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
  };

  // Update the regular and price based on quantity and selected variant
  useEffect(() => {
    if (selectedVariant) {
      regular(quantity * selectedVariant.regular_price);
      price(quantity * selectedVariant.price);
    }
  }, [quantity, selectedVariant, regular, price]);

  // Button classes for Add to Cart
  const addToCartBtnClasses = cx(
    "w-full py-2 border border-black text-lg font-medium transition-transform active:scale-95 flex items-center justify-center gap-2 hover:opacity-75 uppercase mb-3",
    {
      "bg-white hover:bg-gray-100": !loading,
      "bg-gray-200": loading,
    }
  );

  // If product data is missing, return null
  if (isEmpty(product)) {
    return null;
  }

  // Handle adding to cart
  const handleAddToCart = () => {
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
      product.id ?? 0,
      quantity,
      setCart,
      setIsAddedToCart,
      setLoading,
      productDetails
    );
  };

  return (
    <div className="select-none">
      {/* Quantity Selector */}
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
                onClick={handleDecrement}
              />
            }
            addonAfter={
              <FaPlus
                className={cx("cursor-pointer", {
                  "text-gray-300": quantity === maxStock,
                  "text-black": quantity < maxStock,
                })}
                onClick={handleIncrement}
              />
            }
            readOnly
          />
        </Space.Compact>
      </div>

      {/* Add to Cart Button */}
      <button
        className={addToCartBtnClasses}
        onClick={handleAddToCart}
        disabled={loading}
      >
        {loading ? "Adding..." : "Add to cart"}
      </button>

      {/* View Cart Link if item is added */}
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
