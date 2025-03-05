"use client";
import { div } from "framer-motion/client";
import Link from "next/link";
import React from "react";

const AccoutLogin = () => {
  return (
    <div className="max-w-md mx-auto ">
      <div className="border-b pb-5 mb-5">
        <p className="text-gray-400 mb-2">Account</p>
        <p className="mb-2">s.danish0827@gmail.com</p>
        <Link className="text-blue-500 underline " href="#">
          Log out
        </Link>
      </div>
    </div>
  );
};

export default AccoutLogin;
