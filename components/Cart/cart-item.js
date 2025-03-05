import React, { useEffect, useState, useRef } from "react";
import { isEmpty } from "lodash";
import Image from "../image";
import { deleteCartItem, updateCart } from "../../utils/cart";

const CartItem = ({ item, products, setCart }) => {
  const [productCount, setProductCount] = useState(item.quantity);
  const [updatingProduct, setUpdatingProduct] = useState(false);
  const [removingProduct, setRemovingProduct] = useState(false);
  const productImg = item?.data?.images?.[0] ?? "";

  const isMounted = useRef(false);

  // Track if the component is mounted
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  // Handle removing a product
  const handleRemoveProductClick = (event, cartKey) => {
    event.stopPropagation();

    if (!isMounted || updatingProduct) {
      return;
    }

    deleteCartItem(cartKey, setCart, setRemovingProduct).catch((error) => {
      console.error("Error removing product:", error);
    });
  };

  // Handle quantity change
  const handleQtyChange = (event, cartKey, type) => {
    if (typeof window !== "undefined") {
      event.stopPropagation();
      let newQty;

      // Prevent further updates if already updating or removing a product
      if (
        updatingProduct ||
        removingProduct ||
        (type === "decrement" && productCount === 1)
      ) {
        return;
      }

      // Update quantity based on type or manual input
      if (!isEmpty(type)) {
        newQty = type === "increment" ? productCount + 1 : productCount - 1;
      } else {
        newQty = event.target.value ? parseInt(event.target.value, 10) : 1;
      }

      setProductCount(newQty);

      if (products.length) {
        updateCart(item?.key, newQty, setCart, setUpdatingProduct).catch(
          (error) => {
            console.error("Error updating cart:", error);
          }
        );
      }
    }
  };

  return (
    <div className="cart-item-wrap grid grid-cols-3 gap-6 mb-5 border border-brand-bright-grey p-5">
      <div className="col-span-1 cart-left-col">
        <figure>
          <Image
            width="300"
            height="300"
            altText={productImg?.alt || ""}
            sourceUrl={!isEmpty(productImg?.src) ? productImg?.src : ""}
          />
        </figure>
      </div>

      <div className="col-span-2 cart-right-col">
        <div className="flex justify-between flex-col h-full">
          <div className="cart-product-title-wrap relative">
            <h3 className="cart-product-title text-brand-orange">
              {item?.data?.name}
            </h3>
            {item?.data?.description && <p>{item?.data?.description}</p>}
            <button
              className="cart-remove-item absolute right-0 top-0 px-4 py-2 flex items-center text-22px leading-22px bg-transparent border border-brand-bright-grey"
              onClick={(event) => handleRemoveProductClick(event, item?.key)}
              aria-label="Remove item"
            >
              &times;
            </button>
          </div>

          <footer className="cart-product-footer flex justify-between p-4 border-t border-brand-bright-grey">
            <div>
              <span className="cart-total-price">
                {item?.currency}
                {item?.line_subtotal}
              </span>
            </div>
            {updatingProduct && (
              <img
                className="woo-next-cart-item-spinner"
                width="24"
                src="/cart-spinner.gif"
                alt="spinner"
              />
            )}

            <div style={{ display: "flex", alignItems: "center" }}>
              <button
                className="decrement-btn text-24px"
                onClick={(event) =>
                  handleQtyChange(event, item?.cartKey, "decrement")
                }
                aria-label="Decrease quantity"
              >
                -
              </button>
              <input
                type="number"
                min="1"
                style={{
                  textAlign: "center",
                  width: "50px",
                  paddingRight: "0",
                }}
                data-cart-key={item?.data?.cartKey}
                className={`woo-next-cart-qty-input ml-3 ${
                  updatingProduct ? "disabled" : ""
                }`}
                value={productCount}
                onChange={(event) => handleQtyChange(event, item?.cartKey, "")}
                aria-label="Product quantity"
              />
              <button
                className="increment-btn text-20px"
                onClick={(event) =>
                  handleQtyChange(event, item?.cartKey, "increment")
                }
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
