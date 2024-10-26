import React, { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

interface CartItemProps {
  item: any;
  removeItem: () => void;
  updateItemQuantity: (
    variantId: number,
    productId: number,
    newQuantity: number
  ) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  removeItem,
  updateItemQuantity,
}) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleDecrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      updateItemQuantity(item.variation_id, item.product_id, newQuantity);
    }
  };

  const handleIncrement = () => {
    if (quantity < item?.data?.stock_quantity) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      updateItemQuantity(item.variantId, item.productId, newQuantity);
    }
  };

  const finalPrice = (item.data?.price * quantity).toFixed(2);

  return (
    <div className="cart__item flex items-center gap-6 p-4 bg-white border-b">
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
            <p>che</p>
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
          <div className="text-right">
            <span className="text-base font-bold text-gray-900">
              IN STOCK: {item?.data?.stock_quantity}
            </span>
          </div>
        </div>

        <div className="mt-2 flex justify-between items-center">
          <button onClick={removeItem} className="text-red-600 hover:underline">
            Remove
          </button>
          <div className="text-right">
            <span className="text-lg font-bold text-gray-900">
              ₹ {finalPrice}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
