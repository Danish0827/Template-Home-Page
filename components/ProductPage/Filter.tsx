import React, { useState, useEffect, useRef } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { SlEqualizer } from "react-icons/sl";
import FilterTab from "./FilterTab";

const Filter: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false); // Ensure boolean typing for dropdown state
  const [selectedOption, setSelectedOption] = useState<string>("Sort"); // Ensure string typing for selected option
  const dropdownRef = useRef<HTMLDivElement | null>(null); // Use correct typing for the ref (HTMLDivElement)

  const toggleDropdown = (): void => {
    setIsDropdownOpen((prev) => !prev); // No type error here
  };

  const handleOptionClick = (option: string): void => {
    setSelectedOption(option); // Set the selected option
    setIsDropdownOpen(false); // Close the dropdown after selecting
  };

  // Close dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false); // Close the dropdown
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="flex flex-wrap items-center py-5">
        <div className="w-1/2 flex gap-2 items-center">
          <FilterTab />
        </div>

        <div className="w-1/2 flex gap-2 items-center justify-end">
          <div className="relative" ref={dropdownRef}>
            <div
              onClick={toggleDropdown}
              className="flex gap-2 items-center border border-solid py-3 px-6 cursor-pointer rounded-md"
            >
              <p className="w-[190px]">{selectedOption}</p>
              {isDropdownOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </div>

            {isDropdownOpen && (
              <div className="absolute z-10 top-full left-0 mt-2 w-full border border-solid shadow-lg bg-white">
                <ul className="py-2">
                  <li
                    className="px-6 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleOptionClick("Featured")}
                  >
                    Featured
                  </li>
                  <li
                    className="px-6 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleOptionClick("Best selling")}
                  >
                    Best selling
                  </li>
                  <li
                    className="px-6 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleOptionClick("Alphabetically, A-Z")}
                  >
                    Alphabetically, A-Z
                  </li>
                  <li
                    className="px-6 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleOptionClick("Alphabetically, Z-A")}
                  >
                    Alphabetically, Z-A
                  </li>
                  <li
                    className="px-6 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleOptionClick("Price, low to high")}
                  >
                    Price, low to high
                  </li>
                  <li
                    className="px-6 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleOptionClick("Price, high to low")}
                  >
                    Price, high to low
                  </li>
                  <li
                    className="px-6 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleOptionClick("Date, old to new")}
                  >
                    Date, old to new
                  </li>
                  <li
                    className="px-6 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleOptionClick("Date, new to old")}
                  >
                    Date, new to old
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Filter;
