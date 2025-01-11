"use client";
import React from "react";
import SearchCard from "./SearchCard";
interface SearchResultProps {
  searchValue: string;
  products: any[];
  startSearch: any;
}
const SearchResult: React.FC<SearchResultProps> = ({
  searchValue,
  startSearch,
  products,
}) => {
  let limit = 5;
  if (startSearch) {
    limit = 10;
  }
  return (
    <div className="min-h-full lg:min-h-auto h-full w-full overflow-y-auto px-4 pt-6 pb-36 lg:pb-6">
      {products.length === 0 ? (
        <div className="flex items-center justify-center">
          <h2 className="text-sm tracking-wider font-medium text-templateText">
            No Result Found for '{searchValue}'
          </h2>
        </div>
      ) : (
        <div className="space-y-2.5">
          <h2 className="text-[13px] md:text-base lg:text-lg tracking-wide font-bold text-templateText">
            {startSearch ? "Search Results" : "Best Selling Products"}
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
            {products.slice(0, limit).map((item, i) => (
              <SearchCard key={i} data={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResult;
