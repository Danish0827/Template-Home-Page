"use client";
import ProductDetailsCarousel from "@/components/ProductSingle/ProductDetailsCarousel";
import RelatedProducts from "@/components/ProductSingle/RelatedProducts";
import Wrapper from "@/components/ProductSingle/Wrapper";
import React from "react";
import { IoMdHeartEmpty } from "react-icons/io";

const ProductDetails = () => {
  return (
    <>
      <div className="w-full md:py-20">
        <Wrapper className="">
          <div className="flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[50px]">
            {/* left col start */}
            <div className="w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-[600px] mx-auto lg:mx-0">
              <ProductDetailsCarousel />
            </div>
            {/* left col end */}

            {/* right col start */}

            <div className="flex-[1] py-3">
              {/* Product title */}
              <div className="text-[34px] font-semibold mb-2 leading-tight uppercase border-b pb-3">
                Maroon Georgette Anarkali Embroidered Kurta Pant Suit Set
              </div>
              {/* Product title end */}

              {/* subtitle */}
              {/* <div className="text-lg font-semibold mb-5">
                Men&apos;s Golf Wear
              </div> */}
              {/* subtitle */}

              {/* Price */}
              <div className="py-4">
                <div className="text-lg font-semibold">MRP :$ 197.00</div>

                <div className="text-md font-medium text-black/[0.5]">
                  incl. of taxes
                </div>
              </div>
              {/* <div className="text-md font-medium text-black/[0.5] mb-20">
                {`(Also includes all applicable duties)`}
              </div> */}

              {/* PRODUCT SIZE RANGE START */}
              <div className="mb-10">
                {/* HEADING START */}
                <div className="flex justify-between mb-2">
                  <div className="text-md font-semibold">Select Size</div>
                  <div className="text-md font-medium text-black/[0.5] cursor-pointer">
                    Select Guide
                  </div>
                </div>
                {/* HEADING END */}

                {/* SIZE START */}
                <div id="sizesGrid" className="grid grid-cols-12 gap-2">
                  <div className="border rounded-md text-center py-3 font-medium hover:border-black cursor-pointer">
                    XS
                  </div>
                  <div className="border rounded-md text-center py-3 font-medium hover:border-black cursor-pointer">
                    S
                  </div>
                  <div className="border rounded-md text-center py-3 font-medium hover:border-black cursor-pointer">
                    M
                  </div>
                  <div className="border rounded-md text-center py-3 font-medium hover:border-black cursor-pointer">
                    L
                  </div>
                  <div className="border rounded-md text-center py-3 font-medium hover:border-black cursor-pointer">
                    XL
                  </div>
                  <div className="border rounded-md text-center py-3 font-medium hover:border-black cursor-not-allowed bg-black/[0.5] opacity-50">
                    XXL
                  </div>
                </div>

                {/* {Size End} */}

                {/* SHOW ERROR START */}

                {/* SHOW ERROR END */}
              </div>
              {/* PRODUCT SIZE RANGE End */}

              {/* ADD TO CART BUTTON START */}
              <div className="flex gap-1 items-center cursor-pointer mb-3">
                <div className="w-5 mt-1 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512.002 512.002"
                    className="kiwi-svg"
                    // crossorigin="Anonymous"
                  >
                    <path d="M509.502 104.908L407.097 2.502c-3.337-3.337-8.73-3.337-12.067 0L2.502 395.03c-3.337 3.337-3.337 8.73 0 12.067l102.405 102.405c1.596 1.604 3.772 2.5 6.033 2.5s4.43-.896 6.033-2.5L509.5 116.975c1.604-1.596 2.5-3.772 2.5-6.033s-.894-4.43-2.498-6.034zM110.94 491.402l-90.338-90.338 380.46-380.46L491.4 110.94 110.94 491.4zm298.7-414.605c-14.115 0-25.6 11.486-25.6 25.6s11.486 25.6 25.6 25.6 25.6-11.486 25.6-25.6-11.486-25.6-25.6-25.6zm0 34.135c-4.7 0-8.534-3.832-8.534-8.534s3.823-8.534 8.534-8.534 8.534 3.832 8.534 8.534-3.823 8.534-8.534 8.534z"></path>
                    <path d="M164.643 244.95l12.066-12.07 25.6 25.593-12.066 12.07z"></path>
                    <path d="M36.634 372.976l12.068-12.068 34.135 34.135L70.77 407.11z"></path>
                    <defs>
                      <path
                        id="B-inject-1"
                        d="M318.253 91.37l12.068-12.068 25.603 25.603-12.068 12.068z"
                      ></path>
                      <path
                        id="C-inject-1"
                        d="M292.648 116.973l12.068-12.068 34.135 34.135-12.068 12.068z"
                      ></path>
                    </defs>
                  </svg>
                </div>
                <p className=" text-lg hover:underline cursor-pointer">
                  Size Chart
                </p>
              </div>
              <button className="w-full py-2 border border-black text-lg font-medium transition-transform active:scale-95 flex items-center justify-center gap-2 hover:opacity-75 uppercase mb-3">
                Add to Cart
                {/* <IoMdHeartEmpty size={20} /> */}
              </button>
              <button className="w-full py-2 bg-black text-white text-lg font-medium transition-transform active:scale-95 hover:opacity-75 mb-10 uppercase">
                Buy it Now
              </button>

              {/* ADD TO CART BUTTON End */}

              {/* WHISHLIST BUTTON START */}
              {/* WHISHLIST BUTTON END */}

              <div>
                <div className="text-xl font-bold mb-5">Product Details</div>
                {/* Description of product */}
                <div className="text-md mb-5">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Distinctio dolor in maxime corrupti? Quas assumenda temporibus
                  nulla laborum ipsum mollitia. Soluta rem magnam ab sit,
                  veritatis maiores adipisci necessitatibus natus quam dolores
                  non ut perspiciatis quia explicabo culpa minus ipsa sequi quae
                  cum fugit. Doloribus repellendus sit illum suscipit corporis!
                </div>
                <div className="text-md mb-5">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Distinctio dolor in maxime corrupti? Quas assumenda temporibus
                  nulla laborum ipsum mollitia. Soluta rem magnam ab sit,
                  veritatis maiores adipisci necessitatibus natus quam dolores
                  non ut perspiciatis quia explicabo culpa minus ipsa sequi quae
                  cum fugit. Doloribus repellendus sit illum suscipit corporis!
                </div>
              </div>
            </div>
            {/* right col end */}
          </div>

          {/* <RelatedProducts /> */}
        </Wrapper>
      </div>
    </>
  );
};

export default ProductDetails;
