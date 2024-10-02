import React from "react";
import DiscountCodeForm from "@/components/CheckOut/DiscountCodeForm";

const OrderSummary = () => {
  const products = [
    {
      id: 1,
      image:
        "https://cdn.shopify.com/s/files/1/0883/8204/6526/files/KARTIKIOFFWHITE1_64x64.jpg?v=1727157760",
      description: "Off White Cotton Flax Straight Printed Kurta",
      size: "XS",
      quantity: 2,
      price: "₹1,798.00",
    },
    {
      id: 2,
      image:
        "https://cdn.shopify.com/s/files/1/0883/8204/6526/files/KARTIKIOFFWHITE2_64x64.jpg?v=1727157760",
      description: "Navy Blue Cotton Flax Straight Printed Kurta",
      size: "M",
      quantity: 1,
      price: "₹1,500.00",
    },
  ];

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
      <section className="shopping-cart">
        <h4 className="text-lg font-semibold mb-2">Shopping Cart</h4>
        <div className="overflow-x-auto">
          <div className="min-w-full border border-gray-200">
            <div className="bg-gray-100 grid grid-cols-4 font-semibold text-gray-700">
              <div className="p-2">Product Image</div>
              <div className="p-2">Description</div>
              <div className="p-2">Quantity</div>
              <div className="p-2">Price</div>
            </div>
            {products.map((product) => (
              <div
                key={product.id}
                className="grid grid-cols-4 items-center border-t border-gray-200"
              >
                <div className="p-2">
                  <img
                    src={product.image}
                    alt={product.description}
                    className="w-16 h-16 object-cover"
                  />
                </div>
                <div className="p-2">
                  <p>{product.description}</p>
                  <p className="text-sm text-gray-500">Size: {product.size}</p>
                </div>
                <div className="p-2">{product.quantity}</div>
                <div className="p-2">{product.price}</div>
              </div>
            ))}
          </div>
          <DiscountCodeForm />
        </div>
      </section>
    </div>
  );
};

export default OrderSummary;
