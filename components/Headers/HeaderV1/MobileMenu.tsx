"use client";
import { menuItem } from "@/lib/MenuItem";
import Link from "next/link";
import React, { useState } from "react";
import { IoChevronForwardSharp } from "react-icons/io5";

const MobileMenu = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [openMegaIndex, setOpenMegaIndex] = useState<number | null>(null);
  const [openSubMenuIndex, setOpenSubMenuIndex] = useState<number | null>(null); // State for controlling submenus

  const toggleSubMenu = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
    setOpenMegaIndex(null);
    setOpenSubMenuIndex(null);
  };

  const toggleMegaMenu = (index: number) => {
    setOpenMegaIndex(openMegaIndex === index ? null : index);
  };

  const toggleSubMenuItem = (index: number) => {
    setOpenSubMenuIndex(openSubMenuIndex === index ? null : index);
  };

  return (
    <div className="p-4 overflow-y-scroll h-full">
      <ul className="space-y-6">
        {menuItem.map((item, index) => (
          <li key={index} className="relative group">
            <div
              onClick={() => toggleSubMenu(index)}
              className="text-base tracking-wide flex font-medium items-center justify-between capitalize text-templateText"
            >
              <span>{item.name}</span>
              {(item.dropdown || item.megamenu) && (
                <IoChevronForwardSharp
                  className={`transition-all ease-in-out ${
                    openIndex === index ? "rotate-90" : ""
                  }`}
                />
              )}
            </div>

            {/* Check if the item has a dropdown and if it's open */}
            {item.dropdown && openIndex === index && (
              <ul className="p-4 space-y-4">
                {item.dropdown.map((dropdownItem, dropdownIndex) => (
                  <li key={dropdownIndex}>
                    <div
                      onClick={() => toggleSubMenuItem(dropdownIndex)}
                      className="text-sm tracking-wide flex items-center justify-between capitalize text-templateText cursor-pointer"
                    >
                      {dropdownItem.name}
                      {dropdownItem.subMenuItem && (
                        <IoChevronForwardSharp
                          className={`transition-all ease-in-out ${
                            openSubMenuIndex === dropdownIndex
                              ? "rotate-90"
                              : ""
                          }`}
                        />
                      )}
                    </div>

                    {/* Check if there's a submenu for this dropdown item */}
                    {dropdownItem.subMenuItem &&
                      openSubMenuIndex === dropdownIndex && (
                        <ul className="ml-4 mt-2 space-y-2">
                          {dropdownItem.subMenuItem.map((subItem, subIndex) => (
                            <li key={subIndex}>
                              <Link
                                href={subItem.url}
                                className="text-sm tracking-wide capitalize text-templateText"
                              >
                                {subItem.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                  </li>
                ))}
              </ul>
            )}

            {/* Check if the item has a megamenu and if it's open */}
            {item.megamenu && openIndex === index && (
              <div className="py-4 pl-4">
                <ul className="space-y-4">
                  {item.megamenu.map((submenu, submenuIndex) => (
                    <li key={submenuIndex} className="relative">
                      <div
                        onClick={() => toggleMegaMenu(submenuIndex)}
                        className="flex justify-between items-center text-templateText"
                      >
                        <h4>{submenu.title}</h4>
                        <IoChevronForwardSharp
                          className={`transition-all ease-in-out ${
                            openMegaIndex === submenuIndex ? "rotate-90" : ""
                          }`}
                        />
                      </div>

                      {/* Show items when megamenu title is clicked */}
                      {openMegaIndex === submenuIndex && (
                        <ul className="p-4 space-y-4">
                          {submenu.items.map((subItem, subIndex) => (
                            <li key={subIndex}>
                              <Link
                                href={subItem.url}
                                className="text-templateText block text-sm"
                              >
                                {subItem.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MobileMenu;
