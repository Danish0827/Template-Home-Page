"use client";
import { Input } from "antd";
import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (e: any) => {
    setSearchValue(e.target.value);
  };
  return (
    <>
      <Input
        suffix={<CiSearch className="text-xl" />}
        className="sm:h-12 rounded-none border-black"
        placeholder="Search"
        type="text"
        value={searchValue}
        onChange={handleInputChange}
      />
    </>
  );
};

export default SearchBar;
