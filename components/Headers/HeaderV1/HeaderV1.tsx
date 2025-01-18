"use client";
import React, { useEffect, useState } from "react";
import Banner from "./Banner";
import MobileMenu from "./MobileMenu";
import DesktopMenu from "./DesktopMenu";
import Image from "next/image";
import { headers } from "@/lib/headerData";
import AddCart from "./AddCart";
import SearchBar from "./SearchBar";
import { GrClose } from "react-icons/gr";
import TopHeader from "./TopHeader";
import { useScroll } from "framer-motion";
import Link from "next/link";
import { IoIosHeartEmpty } from "react-icons/io";
const HeaderV1 = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      document.body.style.position = "unset";
    }, 5000);
    return () => {
      clearTimeout(timer);
      document.body.style.position = "";
    };
  }, []);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const handleShowSearch = () => setShowSearch(true);
  const handleHideSearch = () => setShowSearch(false);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const [isFixed, setIsFixed] = useState(false);
  const { scrollY } = useScroll();

  // Hook to track scroll position
  scrollY.onChange((latest) => {
    if (latest > 0) {
      setIsFixed(true);
    } else {
      setIsFixed(false);
    }
  });

  return (
    <>
      <Banner />
      <TopHeader />

      {showSearch === false ? (
        // Add `fixed`, `top-0`, `left-0`, and `w-full` for a fixed header
        <div
          id="header"
          className={`bg-white text-templateDark shadow-md pb-2 pt-2 md:py-4 lg:py-3 space-y-3  z-50 w-full ${
            isFixed ? "fixed top-0 left-0" : "relative"
          }`}
        >
          <div className="px-4 lg:px-10 flex items-center justify-between">
            {/* Logo */}
            <div className="w-full flex items-center">
              <Link href="/">
                <img
                  src={headers.logo}
                  alt="logo"
                  className="h-[90px] w-auto object-contain"
                />
              </Link>
            </div>
            {/* -----------------DESKTOP MENU-------------- */}
            <div className="templateContainer hidden lg:block">
              <DesktopMenu />
            </div>
            {/* Account and Cart Icons */}
            <div className="w-full flex items-center justify-end gap-2 xl:gap-5">
              <div>
                <Link href="/wishlist">
                  <IoIosHeartEmpty className="w-[23px] h-[23px]"/>
                </Link>
              </div>
              <div>
                <Link href="/account/orders">
                  <Image
                    className="cursor-pointer hover:scale-110 transition-all ease-linear "
                    height={23}
                    width={23}
                    src="/svgs/account.svg"
                    alt="account"
                  />
                </Link>
              </div>
              <div className="">
                <Image
                  onClick={handleShowSearch}
                  height={23}
                  className="cursor-pointer hover:scale-110 transition-all ease-linear"
                  width={23}
                  src="/svgs/search.svg"
                  alt="search"
                />
              </div>
              <div className="lg:hidden" onClick={toggleMobileMenu}>
                <Image
                  height={23}
                  className="text-templatePrimary cursor-pointer hover:scale-110 transition-all ease-linear"
                  width={23}
                  src="/svgs/menu.svg"
                  alt="menu"
                />
              </div>
              <AddCart />
            </div>
          </div>

          {/* -----------------MOBILE MENU DRAWER-------------- */}
          <div
            className={`fixed top-0 right-0 h-full w-full md:w-[80%] !mt-0 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
              isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex items-center justify-between p-4">
              <Link href="/">
                <img
                  src={headers.logo}
                  alt="logo"
                  height={100}
                  width={200}
                  className="h-[50px] w-auto object-contain"
                />
              </Link>
              <Image
                onClick={toggleMobileMenu}
                className="cursor-pointer hover:scale-110 transition-all ease-linear"
                height={23}
                width={23}
                src="/svgs/X.svg"
                alt="cart"
              />
            </div>
            <hr />
            <MobileMenu />
          </div>
          {/* Overlay for closing mobile menu */}
          {isMobileMenuOpen && (
            <div
              onClick={toggleMobileMenu}
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            ></div>
          )}
        </div>
      ) : (
        <div
          className={`py-6 lg:py-8 px-5 bg-[#ededed] w-full z-20 ${
            isFixed ? "fixed top-0 left-0" : "relative"
          }`}
        >
          <div className="flex items-center gap-3 w-full lg:w-9/12 m-auto">
            <SearchBar />
            <GrClose
              className="text-xl cursor-pointer"
              onClick={handleHideSearch}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default HeaderV1;
