"use client";
import React, { useEffect, useState } from "react";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `/api/get-products?featured=true`
        );
        const data = await response.json();
        if (data.success) {
          setProducts(data.products);
        }
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="text-center py-16">Loading...</div>;
  }

  return (
    <div className="page-width page-width--flush-small py-16">
      <div>
        <h3 className="text-templatePrimaryHeading text-2xl md:text-3xl lg:text-4xl text-center pb-5 font-bold">
          Best Sellers
        </h3>
      </div>
      <div className="px-4 md:px-8 lg:px-12 xl:px-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xxl:grid-cols-5 gap-6">
        {products.slice(0, 10).map((product: any) => (
          <div
            key={product.id}
            className="rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white overflow-hidden"
          >
            <div className="relative group">
              <img
                className="w-full h-auto object-cover"
                src={product.images[0]?.src}
                alt={product.name}
              />
              {product.images[1] && (
                <img
                  className="absolute top-0 left-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  src={product.images[1]?.src}
                  alt={product.name}
                />
              )}
            </div>

            <div className="p-4">
              <a
                href={product.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-templateSecondaryHeading block mt-2 text-lg font-semibold text-center line-clamp-2 h-[55px] hover:text-templatePrimary"
              >
                {product.name}
              </a>

              <div className="text-templateSecondaryText text-center mt-2 font-semibold text-gray-700">
                ₹{product.price}
              </div>

              {/* Size Variants */}
              <div className="flex justify-center flex-wrap mt-3 space-x-2">
                {product.attributes
                  .find((attr: any) => attr.name.toLowerCase() === "size")
                  ?.options.map((size: any, index: any) => (
                    <span
                      key={index}
                      className="border border-templatePrimary mt-2 rounded-full w-10 h-10 flex items-center justify-center text-sm font-medium text-templateDark"
                    >
                      {size}
                    </span>
                  ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center mt-16">
        <a
          href="/collections/kurtas"
          className="bg-black w-40 ml-4 -mt-20 text-white py-3 px-6 hover:bg-zinc-800"
        >
          View All <br />
          {products.length} Products
        </a>
      </div>
    </div>
  );
};

export default Product;
