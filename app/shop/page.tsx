"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const shop = () => {
  const route = useRouter();

  useEffect(() => {
    route.push("/");
  }, [route]);
  return null;
};

export default shop;
