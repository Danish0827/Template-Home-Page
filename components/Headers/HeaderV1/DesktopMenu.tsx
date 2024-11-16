'use client'
import { menuItem } from "@/lib/MenuItem";
import Link from "next/link";
import React, { useState } from "react";
import { IoChevronForwardSharp } from "react-icons/io5";

const DesktopMenu = () => {
  const [hoveredDropdown, setHoveredDropdown] = useState<any>(null);
  const [hoveredSubMenu, setHoveredSubMenu] = useState<any>(null);
  const [hoveredMegaMenu, setHoveredMegaMenu] = useState<any>(null);

  return (
    <div>
      <ul className="flex items-center justify-center gap-1">
        {menuItem.map((item, index) => (
          <li
            key={index}
            className="relative hover-class"
            onMouseEnter={() => setHoveredDropdown(index)}
            onMouseLeave={() => {
              setHoveredDropdown(null);
              setHoveredSubMenu(null); // Reset submenu state when leaving dropdown
              setHoveredMegaMenu(null); // Reset megamenu state when leaving main item
            }}
          >
            <Link
              className="text-sm lg:text-xs xl:text-sm tracking-wide flex items-center gap-0.5 px-4 capitalize text-templateText"
              href={item.url}
            >
              {item.name}
              {(item.dropdown || item.megamenu) && (
                <IoChevronForwardSharp className={`mt-0.5 rotate-90`} />
              )}
            </Link>

            {/* Check if the item has a dropdown */}
            {item.dropdown && hoveredDropdown === index && (
              <div className="absolute w-[200px] left-0">
                <ul className="mt-4 bg-white shadow-lg p-4">
                  {item.dropdown.map((dropdownItem, dropdownIndex) => (
                    <li
                      key={dropdownIndex}
                      className="relative"
                      onMouseEnter={() => setHoveredSubMenu(dropdownIndex)}
                      onMouseLeave={() => setHoveredSubMenu(null)}
                    >
                      <Link
                        href={dropdownItem.url}
                        className="text-sm flex items-center justify-between hover:text-templatePrimary py-2 hover:pl-0.5 transition-all ease-linear text-templateText"
                      >
                        {dropdownItem.name}
                        {/* Indicate sub-menu exists */}
                        {dropdownItem.subMenuItem && <IoChevronForwardSharp />}
                      </Link>

                      {/* Show subMenuItem only if this item is hovered */}
                      {dropdownItem.subMenuItem &&
                        hoveredSubMenu === dropdownIndex && (
                          <div className="absolute left-full top-0 w-[200px] bg-white shadow-lg">
                            <ul className="px-4 py-2">
                              {dropdownItem.subMenuItem.map(
                                (subItem, subIndex) => (
                                  <li key={subIndex}>
                                    <Link
                                      href={subItem.url}
                                      className="text-sm block hover:text-templatePrimary py-2 hover:pl-0.5 transition-all ease-linear text-templateText"
                                    >
                                      {subItem.name}
                                    </Link>
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                        )}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Check if the item has a megamenu */}
            {item.megamenu && (
              <div
                className={`fixed left-0 w-full ${
                  hoveredDropdown === index ? "block" : "hidden"
                }`}
                onMouseEnter={() => setHoveredMegaMenu(index)}
                onMouseLeave={() => setHoveredMegaMenu(null)}
              >
                <div className="bg-white mt-5 templateContainer mx-auto shadow-lg py-6 w-full left-0">
                  <div className={`grid grid-cols-5`}>
                  {/* ${item.megamenu.length} */}
                    {item.megamenu.map((submenu, submenuIndex) => (
                      <div key={submenuIndex} className=" space-y-4">
                        <h4 className="text-templatePrimary font-medium">
                          {submenu.title}
                          {item.megamenu.length}
                        </h4>
                        <ul className="space-y-2">
                          {submenu.items.map((subItem, subIndex) => (
                            <li key={subIndex}>
                              <Link
                                href={subItem.url}
                                className="hover:text-templatePrimary hover:pl-0.5 transition-all ease-in-out text-sm text-templateText"
                              >
                                {subItem.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DesktopMenu;
