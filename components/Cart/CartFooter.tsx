"use client";
import React, { useContext } from "react";
import { useRouter } from "next/navigation"; // Import useRouter from Next.js
import { AppContext } from "./../context";

const CartFooter = ({ totalFinalPrice }: any) => {
  const [cart] = useContext<any>(AppContext);
  const router = useRouter(); // Initialize the router

  const onCheckoutClick = () => {
    console.log("Proceeding to checkout...");
    router.push("/checkouts"); // Redirect to the checkout page
  };

  return (
    <div className="drawer__footer bg-white p-6 rounded-lg shadow-md appear-animation appear-delay-4 ">
      {/* Discounts Section */}
      <div data-discounts="">
        <div className="cart__discounts cart__item-sub cart__item-row hidden">
          <div className="text-lg font-semibold text-gray-700">Discounts</div>
          <div>{/* Add discount logic here */}</div>
        </div>
      </div>

      {/* Subtotal Section */}
      <div className="cart__item-sub cart__item-row flex justify-between items-center mb-4">
        <div className="ajaxcart__subtotal text-lg font-bold text-gray-800">
          Subtotal
        </div>
        <div className="text-lg font-bold text-gray-900">
          Rs. {totalFinalPrice}
        </div>
      </div>

      {/* Checkout Button */}
      <div className="cart__checkout-wrapper mt-4">
        <div className="gokwik-checkout">
          <button
            type="button"
            className="button w-full bg-black hover:bg-zinc-900 text-white font-semibold py-3 px-6 rounded-lg transition-all ease-in-out duration-300 flex justify-between items-center"
            onClick={onCheckoutClick}
          >
            <span className="btn-text flex items-center space-x-2">
              <span className="text-xl">CHECK OUT</span>
              <span></span>
            </span>
            <span className="pay-opt-icon flex items-center space-x-2">
              {/* Optional UPI/Payment Icons */}
              <img
                src="https://cdn.gokwik.co/v4/images/upi-icons.svg"
                alt="UPI"
                className="w-6 h-6"
              />
              <img
                src="https://cdn.gokwik.co/v4/images/right-arrow.svg"
                alt="arrow"
                className="w-4 h-4"
              />
            </span>
          </button>
          <div style={{ display: "none" }} className="addloadr" id="btn-loader">
            <div className="cir-loader">Loading..</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartFooter;
