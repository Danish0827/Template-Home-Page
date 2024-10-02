import React from "react";

const RefundPolicy = () => {
  return (
    <main className="main-content px-4 py-8" id="MainContent">
      <div className="container mx-auto max-w-2xl">
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl text-black tracking-tight uppercase">
            Refund Policy
          </h1>
        </header>

        <div className="shopify-policy__body">
          <div className="rte text-black">
            <p className="pb-3 text-2xl font-semibold">Cotton Culture Return Policy</p>
            <ul className="list-decimal list-inside mb-4 space-y-2">
              <li>
                Shipping costs vary based on location and the size/weight of the
                product.
              </li>
              <li>
                Our standard delivery time is 5-7 business days, depending on
                your location.
              </li>
              <li>
                Once your order is shipped, you will receive a tracking number
                via email to monitor your shipment.
              </li>
              <li>
                If your package is lost or damaged during transit, please
                contact our support team immediately for assistance.
              </li>
              <li>
                Please ensure your shipping address is accurate and complete. We
                are not responsible for delays or non-delivery due to incorrect
                or incomplete addresses.
              </li>
              <li className="font-semibold">
                Cash on Delivery charges are non-refundable.
              </li>
            </ul>
            <p>
              For any questions or concerns regarding shipping, please feel free
              to reach out to our customer support team at
              <span className="font-semibold">
                {" "}
                +919820535999/+918277997646{" "}
              </span>{" "}
              or mail us at
              <span className="font-semibold"> info@cottonculture.co.in</span>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default RefundPolicy;
