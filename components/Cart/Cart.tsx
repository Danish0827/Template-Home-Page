import React from "react";
import CartItem from "./CartItem";

const cartData = [
  {
    key: "50195998212414:43dc2e987ef349a7fe32fdbfa1dc1473",
    product: {
      name: "Light Purple Georgette Flared Embroidered kurta Pant Suit Set",
      size: "XS",
      image:
        "//www.cottonculture.co.in/cdn/shop/files/ashira-cc112-311023-light-purple-1.jpg?v=1721303387",
      price: 1899.5,
      link: "/products/ashira-light-purple-georgette-embroidered-suit-set?variant=50195998212414",
    },
    quantity: 1,
  },
  {
    key: "50195998212414:43dc2e987ef349a7fe32fdbfa1dc1473",
    product: {
      name: "Light Purple Georgette Flared Embroidered kurta Pant Suit Set",
      size: "XS",
      image:
        "//www.cottonculture.co.in/cdn/shop/files/ashira-cc112-311023-light-purple-1.jpg?v=1721303387",
      price: 1899.5,
      link: "/products/ashira-light-purple-georgette-embroidered-suit-set?variant=50195998212414",
    },
    quantity: 1,
  },
  {
    key: "50195998212414:43dc2e987ef349a7fe32fdbfa1dc1473",
    product: {
      name: "Light Purple Georgette Flared Embroidered kurta Pant Suit Set",
      size: "XS",
      image:
        "//www.cottonculture.co.in/cdn/shop/files/ashira-cc112-311023-light-purple-1.jpg?v=1721303387",
      price: 1899.5,
      link: "/products/ashira-light-purple-georgette-embroidered-suit-set?variant=50195998212414",
    },
    quantity: 1,
  },
  {
    key: "50195998212414:43dc2e987ef349a7fe32fdbfa1dc1473",
    product: {
      name: "Light Purple Georgette Flared Embroidered kurta Pant Suit Set",
      size: "XS",
      image:
        "//www.cottonculture.co.in/cdn/shop/files/ashira-cc112-311023-light-purple-1.jpg?v=1721303387",
      price: 1899.5,
      link: "/products/ashira-light-purple-georgette-embroidered-suit-set?variant=50195998212414",
    },
    quantity: 1,
  },
];

const Cart = () => {
  return (
    <div style={{ scrollbarWidth: "thin" }} className="shadow-lg">
      {cartData.map((item) => (
        <CartItem key={item.key} item={item} />
      ))}
    </div>
  );
};

export default Cart;
