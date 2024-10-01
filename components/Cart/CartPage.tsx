import React from "react";

const CartItem = ({ item, isLast }: any) => {
  return (
    <div
      className={`flex justify-between items-center ${
        !isLast ? "border-b" : ""
      } py-4`}
    >
      <div className="flex items-start">
        <a href={item.link} className="flex-shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-24 h-24 object-cover object-top rounded-md"
          />
        </a>
        <div className="ml-4">
          <a
            href={item.link}
            className="text-xl font-semibold hover:text-gray-800 text-black"
          >
            {item.name}
          </a>
          <div className="text-sm text-black py-3">
            <p className="text-lg">
              <b>Size:</b> {item.size}
            </p>
            <p className="text-lg">
              <b className="font-bold">Color: </b>
              {item.color}
            </p>
            <div className="flex items-center space-x-2 py-2">
              <button
                className="bg-gray-200 p-2 rounded-full focus:outline-none w-8 h-8 flex items-center justify-center "
                aria-label="Reduce item quantity"
              >
                <span className="-mt-1">-</span>
              </button>
              <input
                type="text"
                className="w-10 text-center outline-none border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm sm:text-sm rounded-md"
                value={item.quantity}
                readOnly
              />
              <button
                className="bg-gray-200 p-2 rounded-full focus:outline-none w-8 h-8 flex items-center justify-center"
                aria-label="Increase item quantity"
              >
                <span className="-mt-0">+</span>
              </button>
            </div>
            <button className="text-black text-base hover:underline">
              Remove
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <div className="ml-4 text-right">
          <p className="text-lg font-medium text-black">Rs. {item.price}</p>
        </div>
      </div>
    </div>
  );
};

const CartPage = () => {
  const cartItems = [
    {
      id: 1,
      name: "Off White Cotton Flax Straight Printed Kurta",
      link: "/products/off-white-cotton-flax-straight-printed-kurta?variant=50436508680510",
      image:
        "//www.cottonculture.co.in/cdn/shop/files/KARTIKIOFFWHITE1.jpg?v=1727157760&width=540",
      size: "XS",
      color: "Off White",
      quantity: 2,
      price: 899,
    },
    {
      id: 2,
      name: "Off black Cotton Flax Straight Printed Kurta",
      link: "/products/off-white-cotton-flax-straight-printed-kurta?variant=50436508680510",
      image:
        "//www.cottonculture.co.in/cdn/shop/files/KARTIKIOFFWHITE1.jpg?v=1727157760&width=540",
      size: "XS",
      color: "Off White",
      quantity: 5,
      price: 999,
    },
    {
      id: 1,
      name: "Off White Cotton Flax Straight Printed Kurta",
      link: "/products/off-white-cotton-flax-straight-printed-kurta?variant=50436508680510",
      image:
        "//www.cottonculture.co.in/cdn/shop/files/KARTIKIOFFWHITE1.jpg?v=1727157760&width=540",
      size: "XS",
      color: "Off White",
      quantity: 2,
      price: 899,
    },
    {
      id: 2,
      name: "Off black Cotton Flax Straight Printed Kurta",
      link: "/products/off-white-cotton-flax-straight-printed-kurta?variant=50436508680510",
      image:
        "//www.cottonculture.co.in/cdn/shop/files/KARTIKIOFFWHITE1.jpg?v=1727157760&width=540",
      size: "XS",
      color: "Off White",
      quantity: 5,
      price: 999,
    },
  ];

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <main className=" bg-white py-8">
      <div className="px-4 lg:px-16">
        <header className="text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl text-black tracking-tight uppercase">
            Cart
          </h1>
          <p className="text-gray-600 mt-2">
            <a href="/collections/all" className="text-black  hover:underline">
              Continue shopping
            </a>
          </p>
        </header>

        <form className="flex flex-wrap gap-">
          {/* Cart Items */}
          <div className="w-8/12 px-8">
            {cartItems.map((item, index) => (
              <CartItem
                key={item.id}
                item={item}
                isLast={index === cartItems.length - 1}
              />
            ))}
          </div>

          {/* Summary */}
          <div className=" w-4/12">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-bold text-gray-900 border-b pb-4 mb-4">
                Order Summary
              </h2>
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold">Subtotal</span>
                <span className="font-bold text-gray-900">Rs. {subtotal}</span>
              </div>

              <div className="gokwik-checkout">
                <button
                  type="button"
                  // onClick={() => console.log("Checkout")}
                  className="w-full bg-black text-white py-3 px-4 rounded-md font-medium hover:bg-zinc-900 transition duration-150"
                >
                  CHECK OUT
                </button>
              </div>
              <p className="text-sm text-black mt-3">
                Shipping, taxes, and discount codes calculated at checkout.
              </p>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default CartPage;
