"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaRegUserCircle } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { Avatar } from "antd";
import { IoStorefrontOutline } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";

const CustomerHeader = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const logo =
    "https://bovinosbck.demo-web.live/wp-content/uploads/2024/11/images-e1732688867572.jpeg";
  const header = [
    {
      label: "Orders",
      href: "/account/orders",
    },
  ];

  return (
    <header className="bg-gray-100 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div className="md:hidden">
          <GiHamburgerMenu className="text-templatePrimaryText text-xl" />
        </div>
        <div className="flex items-center gap-5">
          <div className="flex items-center">
            <Link href="/">
              <img
                src={logo}
                alt="logo"
                className="h-[70px] w-auto object-contain"
              />
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-4">
            {header.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="text-templatePrimaryText hover:text-templatePrimary font-medium"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Account Menu */}
        <div className="relative flex items-center gap-3">
          <button
            className="hidden md:flex items-center space-x-2 text-templatePrimaryText hover:text-templatePrimary"
            aria-label="Toggle Account Menu"
            aria-expanded={isDropdownOpen}
            onClick={() => setDropdownOpen(!isDropdownOpen)}
          >
            <div className="flex gap-2 items-center">
              <Avatar className=" font-thin uppercase w-8 h-8 text-base rounded-md">
                {/* <FaRegUserCircle /> */}ds
              </Avatar>
              <MdKeyboardArrowDown
                className={`${isDropdownOpen ? "rotate-180" : ""}`}
              />
            </div>
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 top-10 bg-white shadow-lg rounded-md w-80 z-50">
              <div className="flex gap-2 items-center p-4 border-b">
                <Avatar className=" font-thin uppercase w-8 h-8 text-base rounded-md">
                  <FaRegUserCircle />
                </Avatar>
                <p>s.danish@gamil.com</p>
              </div>
              <ul className="py-2">
                <li>
                  <Link
                    href="/account/profile"
                    className="flex items-center gap-1 px-4 py-2 text-templatePrimaryText hover:bg-gray-100"
                  >
                    <CgProfile className="text-xl font-thikn" />
                    Profile
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => alert("Logged out")}
                    className="w-full flex items-center gap-1 text-left px-4 py-2 text-templatePrimaryText hover:bg-gray-100"
                  >
                    <IoMdLogOut className="text-xl font-thikn" />
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
          <Link
            className="hidden md:block bg-templatePrimary hover:bg-templatePrimaryLight text-white px-6 py-2 rounded-md"
            href="/"
          >
            Go to Store
          </Link>
          <Link className="md:hidden" href="/">
            <IoStorefrontOutline className="text-xl font-thin" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default CustomerHeader;
