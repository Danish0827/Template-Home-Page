import { Fragment } from "react";
import CheckoutCartItem from "./CheckoutCartItem";

const YourOrder = ({ cart }) => {
  if (!cart) return null; // Return early if cart is not present to avoid unnecessary renders

  return (
    <Fragment>
      <div className="bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold text-gray-800 p-6">Your Order</h2>
        <div className="overflow-x-auto">
          <table className="checkout-cart w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-4 px-2 text-left text-sm font-medium text-gray-600" />
                <th className="py-4 px-2 text-left text-sm font-bold text-gray-700">
                  Product
                </th>
                <th className="py-4 px-2 text-left text-sm font-bold text-gray-700">
                  Quantity
                </th>
                <th className="py-4 px-2 text-left text-sm font-bold text-gray-700">
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
            </tbody>
          </table>
        </div>
        <div className="bg-gray-50 border-t flex justify-between">
          <td className="py-4 px-2 font-bold text-gray-800">Subtotal:</td>
          <td className="py-4 px-2 text-lg font-bold text-gray-900">
            Rs. {cart?.totalPrice?.toFixed(2)}
          </td>
        </div>
      </div>
    </Fragment>
  );
};

export default YourOrder;
