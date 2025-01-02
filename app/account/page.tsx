"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const account = () => {
  const route = useRouter();

  useEffect(() => {
    route.push("/login");
  }, [route]);
  return null;
};

export default account;