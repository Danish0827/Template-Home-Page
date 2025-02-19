"use client";
import React, { useEffect, useState } from "react";
import "./thanks.css";

const Thank = () => {
  const [orderId, setOrderId] = useState<any>();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get("orderId");
    setOrderId(id);
  });
  return (
    <>
      <section className="login-main-wrapper">
        <div className="main-container">
          <div className="login-process">
            <div className="login-main-container pt-20">
              <div className="thankyou-wrapper text-center">
                <h1>
                  <img
                    className="mix-blend-multiply m-auto w-20"
                    src="./tick.jpg"
                    alt="tick"
                  />
                </h1>
                <h1>
                  <img
                    className="mix-blend-multiply m-auto -mt-12"
                    src="./thank.jpeg"
                    alt="thanks"
                  />
                </h1>
                <span className="text-3xl font-bold mb-5 px-3">
                  Your Order Id : #{orderId}
                </span>
                <p className="text-xl mb-10 px-3">
                  Your Order has been placed and is being processed. you will
                  receive an email with the order detail.
                </p>
                <a
                  className="text-center px-5 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-base my-5"
                  href="/"
                >
                  Back to home
                </a>
                <div className="clr"></div>
              </div>
              <div className="clr"></div>
            </div>
          </div>
          <div className="clr"></div>
        </div>
      </section>
    </>
  );
};

export default Thank;
