"use client";
import { Input } from "antd";
import React, { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import SearchResult from "./SearchResult";

const SearchBar = () => {
  const [startSearch, setStartSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [products, setProducts] = useState<any[]>([]); // Holds the fetched products
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]); // Holds filtered products

  // Fetch products when component is mounted
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/get-products");
        const data = await response.json();
        setProducts(data.products); // Assuming the data has a 'products' key with the product list
        console.log(data.products);

        setFilteredProducts(data.products); // Initially, show all products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Handle search value change
  const handleInputChange = (e: any) => {
    setSearchValue(e.target.value);
    setStartSearch(e.target.value.trim().length > 0);
  };

  // Filter products based on the search value
  useEffect(() => {
    if (searchValue === "") {
      setFilteredProducts(products); // Show all products if search value is empty
    } else {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredProducts(filtered); // Update filtered products
    }
  }, [searchValue, products]);

  return (
    <div className="w-full">
      <Input
        suffix={<CiSearch className="text-xl" />}
        className="sm:h-12 rounded-none border-black"
        placeholder="Search"
        type="text"
        value={searchValue}
        onChange={handleInputChange}
      />
      <div className="absolute w-full bg-white left-0 top-20 lg:top-28 min-h-screen lg:min-h-auto h-full overflow-y-auto">
        <SearchResult
          searchValue={searchValue}
          products={filteredProducts}
          startSearch={startSearch}
        />
      </div>
      {/* <div className="product-list">
        {filteredProducts.length === 0 ? (
          <p>No products found</p>
        ) : (
          filteredProducts.map((product: any) => (
            <div key={product.id} className="product-item">
              <h3>{product.name}</h3>
              <p>{product.images[0].src}</p>
            </div>
          ))
        )}
      </div> */}
    </div>
  );
};

export default SearchBar;
