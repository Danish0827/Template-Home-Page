import CustomerHeader from "@/components/CustomerDashboard/customerHeader";
import CustomerSingleOrder from "@/components/CustomerDashboard/Order/CustomerSingleOrder";
import React from "react";

const orderDetails = ({ params }: any) => {
  return (
    <>
      <CustomerHeader />
      <CustomerSingleOrder params={params.slug} />
    </>
  );
};

export default orderDetails;
