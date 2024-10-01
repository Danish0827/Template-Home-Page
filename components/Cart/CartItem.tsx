import React from "react";

const CartItem = ({ item }:any) => {
  return (
    <div style={{scrollbarWidth:'thin'}} className="cart__item flex items-start gap-6 p-4 bg-white">
      {/* Product Image */}
      <div className="cart__image w-1/4">
        <a href={item.product.link} className="image-wrap block">
          <img
            src={item.product.image}
            alt={item.product.name}
            className="rounded-lg w-full object-cover"
          />
        </a>
      </div>

      {/* Item Details */}
      <div className="cart__item-details w-3/4 flex flex-col justify-between">
        <div>
          {/* Item Title and Variants */}
          <h3 className="text-lg font-semibold text-gray-900">
            <a href={item.product.link}>{item.product.name}</a>
          </h3>
          <p className="text-sm text-gray-500">
            <span>Size:</span> {item.product.size}
          </p>
        </div>

        {/* Quantity Adjuster */}
        <div className="flex items-center mt-4">
          <label htmlFor={`cart_updates_${item.key}`} className="hidden-label">
            Quantity
          </label>
          <div className="js-qty__wrapper flex items-center gap-2">
            <button
              type="button"
              className="js-qty__adjust js-qty__adjust--minus p-2 bg-gray-100 rounded-md hover:bg-gray-200"
              aria-label="Reduce item quantity by one"
            >
              <svg
                aria-hidden="true"
                focusable="false"
                role="presentation"
                className="icon icon-minus w-4 h-4 text-gray-500"
                viewBox="0 0 20 20"
              >
                <path
                  fill="currentColor"
                  d="M17.543 11.029H2.1A1.032 1.032 0 0 1 1.071 10c0-.566.463-1.029 1.029-1.029h15.443c.566 0 1.029.463 1.029 1.029 0 .566-.463 1.029-1.029-1.029 1.029z"
                />
              </svg>
            </button>
            <input
              type="text"
              id={`cart_updates_${item.key}`}
              name="updates[]"
              className="js-qty__num w-12 text-center border border-gray-300 rounded-md"
              value={item.quantity}
              min="0"
              pattern="[0-9]*"
            />
            <button
              type="button"
              className="js-qty__adjust js-qty__adjust--plus p-2 bg-gray-100 rounded-md hover:bg-gray-200"
              aria-label="Increase item quantity by one"
            >
              <svg
                aria-hidden="true"
                focusable="false"
                role="presentation"
                className="icon icon-plus w-4 h-4 text-gray-500"
                viewBox="0 0 20 20"
              >
                <path
                  fill="currentColor"
                  d="M17.409 8.929h-6.695V2.258c0-.566-.506-1.029-1.071-1.029s-1.071.463-1.071 1.029v6.671H1.967C1.401 8.929.938 9.435.938 10s.463 1.071 1.029 1.071h6.605V17.7c0 .566.506 1.029 1.071 1.029s1.071-.463 1.071-1.029v-6.629h6.695c.566 0 1.029-.506 1.029-1.071s-.463-1.071-1.029-1.071z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Remove Button & Price */}
        <div className="mt-4 flex justify-between items-center">
          <div className="cart__remove">
            <a
              href={`/cart/change?id=${item.key}&quantity=0`}
              className="text-red-600 hover:underline"
            >
              Remove
            </a>
          </div>
          <div className="cart__item-price-col text-right">
            <span className="cart__price text-lg font-bold text-gray-900">
              Rs. {item.product.price.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
