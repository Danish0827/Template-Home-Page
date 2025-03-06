import Error from "./Error";

const PaymentModes = ({ input, handleOnChange, Method }) => {
  const { errors, paymentMethod } = input || {};

  const handleDivClick = (value) => {
    Method(value);
    handleOnChange({ target: { name: "paymentMethod", value } });
  };

  return (
    <div className="mt-6 bg-white shadow-md rounded-lg p-6">
      <Error errors={errors} fieldName={"paymentMethod"} />
      <h2 className="text-xl font-bold text-gray-800 pb-4">Payment Options</h2>

      {/* Payment Options */}
      <div className="space-y-4">
        {/* Cash on Delivery */}
        <div
          onClick={() => handleDivClick("cashOnDelivery")}
          className={`flex items-center space-x-3 p-4 border rounded-md hover:shadow-lg transition-shadow cursor-pointer ${
            paymentMethod === "cashOnDelivery"
              ? "border-indigo-500 shadow-md"
              : ""
          }`}
        >
          <input
            value="cashOnDelivery"
            className="w-5 h-5 text-indigo-600 focus:ring-indigo-500 border-gray-300"
            name="paymentMethod"
            type="radio"
            checked={"cashOnDelivery" === paymentMethod}
            readOnly
          />
          <label className="text-base font-semibold text-gray-700 cursor-pointer">
            Cash on Delivery
          </label>
        </div>

        {/* Pay Online */}
        <div
          onClick={() => handleDivClick("paywithrazorpay")}
          className={`flex items-center space-x-3 p-4 border rounded-md hover:shadow-lg transition-shadow cursor-pointer ${
            paymentMethod === "paywithrazorpay"
              ? "border-indigo-500 shadow-md"
              : ""
          }`}
        >
          <input
            value="paywithrazorpay"
            className="w-5 h-5 text-indigo-600 focus:ring-indigo-500 border-gray-300"
            name="paymentMethod"
            type="radio"
            checked={"paywithrazorpay" === paymentMethod}
            readOnly
          />
          <label className="text-base font-semibold text-gray-700 cursor-pointer">
            Pay Online
          </label>
        </div>

        {/* Stripe */}
        {/* <div
          onClick={() => handleDivClick("stripe-mode")}
          className={`flex items-center space-x-3 p-4 border rounded-md hover:shadow-lg transition-shadow cursor-pointer ${
            paymentMethod === "stripe-mode" ? "border-indigo-500 shadow-md" : ""
          }`}
        >
          <input
            value="stripe-mode"
            className="w-5 h-5 text-indigo-600 focus:ring-indigo-500 border-gray-300"
            name="paymentMethod"
            type="radio"
            checked={"stripe-mode" === paymentMethod}
            readOnly
          />
          <label className="text-sm font-semibold text-gray-700 cursor-pointer">
            Stripe
          </label>
        </div> */}
      </div>
    </div>
  );
};

export default PaymentModes;
