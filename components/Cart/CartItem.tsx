import React, { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa"; // Icons for increment/decrement

interface CartItemProps {
  item: any;
  removeItem: (variantId: string, productId: string) => void;
  updateItemQuantity: (
    variantId: string,
    productId: string,
    newQuantity: number
  ) => void; // Add this prop
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
      updateItemQuantity(item.variantId, item.productId, newQuantity);
    }
  };

  const handleIncrement = () => {
    if (quantity < item.variantQuantity) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      updateItemQuantity(item.variantId, item.productId, newQuantity);
    }
  };

  const finalPrice = (item.variantPrice * quantity).toFixed(2);

  return (
    <div className="cart__item flex items-center gap-6 p-4 bg-white border-b ">
      {/* Product Image */}
      <div className="cart__image w-1/4">
        <img
          src={item?.variantImage}
          alt={item?.name}
          className="rounded-lg w-full object-cover"
        />
      </div>

      {/* Item Details */}
      <div className="cart__item-details w-3/4 flex flex-col justify-between">
        <div>
          <h3 className="text-base mb-2 font-semibold text-gray-900">
            {item.name}
          </h3>
          <p className="text-sm text-gray-500">
            <span>Size:</span> {item.variantName}
          </p>
        </div>

        {/* Quantity Adjuster */}
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
              IN STOCK : {item.variantQuantity}
            </span>
          </div>
        </div>

        {/* Remove Button & Price */}
        <div className="mt-2 flex justify-between items-center">
          <button
            onClick={() => removeItem(item.variantId, item.productId)}
            className="text-red-600 hover:underline"
          >
            Remove
          </button>
          <div className="text-right">
            <span className="text-lg font-bold text-gray-900">
              Rs. {finalPrice}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
