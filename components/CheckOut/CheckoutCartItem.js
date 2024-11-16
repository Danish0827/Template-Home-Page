"use client";
const CheckoutCartItem = ({ item }) => {
  return (
    <tr className="woo-next-cart-item" key={item.productId}>
      <td className="woo-next-cart-element">
        <img
          width="64"
          src={item.data.images[0].src}
          srcSet={item.data.images[0].src}
          alt={item.data.name}
        />
      </td>
      <td className="woo-next-cart-element">{item.data.name}</td>
      <td className="woo-next-cart-element">{item.line_subtotal.toFixed(2)}</td>
    </tr>
  );
};

export default CheckoutCartItem;
