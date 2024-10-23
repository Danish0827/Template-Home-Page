import { isEmpty } from "lodash";
import { addToCart } from "../../utils/cart";
import { useContext, useState, useEffect } from "react";
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

  const maxStock = selectedVariant
    ? selectedVariant?.stock_quantity
    : product?.stock_quantity;

  // Reset quantity to 1 whenever selectedVariant changes
  useEffect(() => {
    setQuantity(1);
  }, [selectedVariant]);

  // Increment quantity
  const handleIncrement = () => {
    if (quantity < maxStock) {
      setQuantity((prevQuantity) => prevQuantity + 1);
    }
  };

  // Decrement quantity
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  // Handle Add to Cart logic
  const handleAddToCart = () => {
    setLoading(true);

    // Check if product with the same variant is already in the cart
    const existingItemIndex =
      cart?.items?.findIndex(
        (item) =>
          item.id === product.id && item.variantId === selectedVariant.id
      ) ?? -1;

    if (existingItemIndex !== -1) {
      // Update the quantity of the existing item
      const updatedCart = { ...cart };
      const existingItem = updatedCart.items[existingItemIndex];
      const newQuantity = existingItem.quantity + quantity;

      // Ensure the new quantity doesn't exceed stock
      if (newQuantity <= maxStock) {
        existingItem.quantity = newQuantity;
        setCart(updatedCart);
        setIsAddedToCart(true);
      } else {
        alert("Stock limit exceeded.");
      }
    } else {
      // Add new item to cart
      const imageSrc =
        selectedVariant?.images?.[0]?.src ||
        product?.images?.[0]?.src ||
        "default-image-url";

      const  variantPrice = selectedVariant?.regular_price === selectedVariant?.price ? selectedVariant.regular_price : selectedVariant.price

      const newCartItem = {
        id: product.id,
        name: product.name,
        image: imageSrc,
        price: product.regular_price === product.price ? product.regular_price : product.price,
        quantity: quantity,
        image: imageSrc,
        variantId: selectedVariant.id,
        variantName: selectedVariant.name,
        variantImage:selectedVariant.image.src,
        variantPrice: selectedVariant.regular_price === selectedVariant.price ? selectedVariant.regular_price : selectedVariant.price,
        variantQuantity : selectedVariant.stock_quantity,
        finalPrice : selectedVariant ? variantPrice*selectedVariant.stock_quantity : price*quantity
      };
      setCart({
        ...cart,
        items: [...(cart?.items || []), newCartItem],
      });
      setIsAddedToCart(true);
    }

    setLoading(false);
  };

  if (isEmpty(product)) return null;

  regular(quantity * selectedVariant.regular_price);
  price(quantity * selectedVariant.price);

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
                onClick={quantity > 1 ? handleDecrement : undefined}
              />
            }
            addonAfter={
              <FaPlus
                className={cx("cursor-pointer", {
                  "text-gray-300": quantity === maxStock,
                  "text-black": quantity < maxStock,
                })}
                onClick={quantity < maxStock ? handleIncrement : undefined}
              />
            }
            readOnly
          />
        </Space.Compact>
      </div>

      <button
        className={cx(
          "w-full py-2 border border-black text-lg font-medium transition-transform active:scale-95 flex items-center justify-center gap-2 hover:opacity-75 uppercase mb-3",
          {
            "bg-white hover:bg-gray-100": !loading,
            "bg-gray-200": loading,
          }
        )}
        onClick={handleAddToCart}
        disabled={loading}
      >
        {loading ? "Adding..." : "Add to cart"}
      </button>

      {isAddedToCart && !loading && (
        <Link href="/cart">
          <p className="hover:bg-gray-100 w-full py-2 border border-black text-lg font-medium transition-transform active:scale-95 flex items-center justify-center gap-2 hover:opacity-75 uppercase mb-3">
            View cart
          </p>
        </Link>
      )}
    </div>
  );
};

export default AddToCart;
