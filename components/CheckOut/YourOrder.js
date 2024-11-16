import { Fragment } from "react";
import CheckoutCartItem from "./CheckoutCartItem";

const YourOrder = ({ cart }) => {
  if (!cart) return null; // Return early if cart is not present to avoid unnecessary renders

  return (
    <Fragment>
      <table className="checkout-cart table table-hover w-full mb-10">
        <thead>
          <tr className="woo-next-cart-head-container text-left">
            <th className="woo-next-cart-heading-el" scope="col" />
            <th className="woo-next-cart-heading-el" scope="col">
              Product
            </th>
            <th className="woo-next-cart-heading-el" scope="col">
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          {cart.cartItems?.length > 0 &&
            cart.cartItems.map((item) => (
              <CheckoutCartItem key={item.key} item={item} />
            ))}
          {/* Total */}
          <tr className="bg-gray-200">
            <td />
            <td className="woo-next-checkout-total font-normal text-xl">
              Subtotal
            </td>
            <td className="woo-next-checkout-total font-bold text-xl">
              {cart?.totalPrice?.toFixed(2)}
            </td>
          </tr>
        </tbody>
      </table>
    </Fragment>
  );
};

export default YourOrder;
