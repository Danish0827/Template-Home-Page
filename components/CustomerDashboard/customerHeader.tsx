"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaRegUserCircle } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { Avatar, Dropdown, Menu } from "antd";
import { IoStorefrontOutline } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { notification } from "antd";

const CustomerHeader = () => {
  const router = useRouter();

  // Redirect if auth cookie exists
  useEffect(() => {
    const authCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("auth="));
    if (!authCookie) {
      router.push("/login");
    }
  }, [router]);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const logo =
    "https://bovinosbck.demo-web.live/wp-content/uploads/2024/12/logo.jpg";
  const header = [
    {
      label: "Orders",
      href: "/account/orders",
    },
    {
      label: "Profile",
      href: "/account/profile",
    },
  ];

  const handleLogout = () => {
    // Remove the 'auth' cookie
    document.cookie = "auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    document.cookie = "user_g=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    // Display success notification
    notification.success({
      message: "Logged Out",
      description: "You have successfully logged out.",
      duration: 3,
    });

    // Redirect to the login page
    window.location.href = "/login";
  };

  const accountMenu = (
    <Menu>
      <div className="w-80">
        <div className="flex gap-2 items-center p-4 border-b">
          <Avatar className="font-thin uppercase w-8 h-8 text-base rounded-md">
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
              <CgProfile className="text-xl" />
              Profile
            </Link>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-1 text-left px-4 py-2 text-templatePrimaryText hover:bg-gray-100"
            >
              <IoMdLogOut className="text-xl" />
              Logout
            </button>
          </li>
        </ul>
      </div>
    </Menu>
  );

  return (
    <header className="bg-gray-100 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Mobile Menu"
          >
            <GiHamburgerMenu className="text-templatePrimaryText text-xl" />
          </button>
        </div>

        {/* Logo Section */}
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
        <div className="flex items-center gap-3">
          <Dropdown overlay={accountMenu} trigger={["click"]}>
            <button
              className="hidden md:flex items-center space-x-2 text-templatePrimaryText hover:text-templatePrimary"
              aria-label="Toggle Account Menu"
            >
              <div className="flex gap-2 items-center">
                <Avatar className="font-thin uppercase w-8 h-8 text-base rounded-md">
                  ds
                </Avatar>
                <MdKeyboardArrowDown />
              </div>
            </button>
          </Dropdown>
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

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 delay-1000">
          <div className="fixed top-0 left-0 bg-white w-full h-full shadow-lg">
            <div className="flex justify-between items-center p-4 border-b">
              <img
                src={logo}
                alt="logo"
                className="h-[50px] w-auto object-contain"
              />
              <button
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close Mobile Menu"
              >
                <IoClose className="text-xl text-templatePrimaryText" />
              </button>
            </div>
            <nav className="flex flex-col p-4 space-y-4">
              {header.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="text-templatePrimaryText hover:text-templatePrimary font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="fixed bottom-0 w-full border-t mt-4 pb-4">
              <div className="flex gap-2 items-center p-4">
                <Avatar className="font-thin uppercase w-8 h-8 text-base rounded-md">
                  <FaRegUserCircle />
                </Avatar>
                <p>s.danish@gamil.com</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-4 text-left px-5 py-2 text-templatePrimaryText hover:bg-gray-100"
              >
                <IoMdLogOut className="text-xl" />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default CustomerHeader;
