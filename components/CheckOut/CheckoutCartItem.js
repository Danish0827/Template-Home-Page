"use client";
const CheckoutCartItem = ({ item, currencySymbol, countryValue }) => {
  return (
    <tr className="border-b">
      <td className="py-2 px-2">
        <img
          className="object-cover rounded-md lg:w-20"
          src={item.data.images[0].src}
          alt={item.data.name}
        />
      </td>
      <td className="py-2 px-2 text-[13px] font-medium text-gray-800">
        {item.data.name}
      </td>
      <td className="py-2 px-2 text-sm text-gray-600">x{item.quantity}</td>
      <td className="py-2 px-2 text-sm text-gray-800">
        {/* Rs. {item.line_subtotal.toFixed(2)} */}
        {currencySymbol ? currencySymbol : "₹"}
        {countryValue && item.line_subtotal
          ? (
              parseFloat(countryValue.toString()) *
              parseFloat(item.line_subtotal.toString())
            ).toFixed(2)
          : item.line_subtotal
          ? parseFloat(item.line_subtotal.toString()).toLocaleString(
              undefined,
              {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }
            )
          : "0.00"}
      </td>
    </tr>
  );
};

export default CheckoutCartItem;
