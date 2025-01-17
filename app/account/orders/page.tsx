import CustomerHeader from "@/components/CustomerDashboard/customerHeader";
import CustomerOrder from "@/components/CustomerDashboard/Order/CustomerOrder";
import React from "react";

const order = () => {
  return (
    <>
      <CustomerHeader />
      <CustomerOrder />
    </>
  );
};

export default order;