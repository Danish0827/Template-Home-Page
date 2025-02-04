import { useState, useContext } from "react";
import cx from "classnames";

import YourOrder from "./YourOrder";
import PaymentModes from "./PaymentModes";
import validateAndSanitizeCheckoutForm from "../../validator/checkout";
import Address from "./Address";
import { AppContext } from "../context";
import CheckboxField from "./form-elements/CheckboxField";
import {
  handleBillingDifferentThanShipping,
  handleCreateAccount,
  handleOtherPaymentMethodCheckout,
  handleStripeCheckout,
  handleRazorpayCheckout,
  setStatesForCountry,
} from "@/utils/checkout";

// // Use this for testing purposes, so you dont have to fill the checkout form over an over again.
// const defaultCustomerInfo = {
//   firstName: "danish",
//   lastName: "shaikh",
//   address1: "123 Abc farm",
//   address2: "Hill Road",
//   city: "Mumbai",
//   country: "IN",
//   state: "Maharastra",
//   postcode: "221029",
//   email: "s.danish0827@gmail.com",
//   phone: "9867356907",
//   company: "The Company",
//   errors: null,
// };

const defaultCustomerInfo = {
  firstName: "",
  lastName: "",
  address1: "",
  address2: "",
  city: "",
  country: "",
  state: "",
  postcode: "",
  email: "",
  phone: "",
  company: "",
  errors: null,
};

const CheckoutForm = ({ countriesData }) => {
  const { billingCountries, shippingCountries } = countriesData || {};

  const initialState = {
    billing: {
      ...defaultCustomerInfo,
    },
    shipping: {
      ...defaultCustomerInfo,
    },
    createAccount: false,
    orderNotes: "",
    billingDifferentThanShipping: false,
    paymentMethod: "cashOnDelivery",
  };

  const [cart, setCart] = useContext(AppContext);
  const [input, setInput] = useState(initialState);
  const [method, setMethod] = useState("cashOnDelivery");
  const [requestError, setRequestError] = useState(null);
  const [theShippingStates, setTheShippingStates] = useState([]);
  const [isFetchingShippingStates, setIsFetchingShippingStates] =
    useState(false);
  const [theBillingStates, setTheBillingStates] = useState([]);
  const [isFetchingBillingStates, setIsFetchingBillingStates] = useState(false);
  const [isOrderProcessing, setIsOrderProcessing] = useState(false);
  const [createdOrderData, setCreatedOrderData] = useState({});

  // leave

  //  // const [currencyCode, setCurrencyCode] = useState<any>();
  //   // const [convergenceData, setConvergenceData] = useState();
  //   const [currencySymbol, setCurrencySymbol] = useState();
  //   const [countryValue, setCountryValue] = useState(); // For storing your country's value

  //   useEffect(() => {
  //     const someFunction = async () => {
  //       const currencyData = await fetchCountryCurrencyData();
  //       console.log(currencyData, "currencyData yourOrderPage");

  //       if (currencyData) {
  //         // setCurrencyCode(currencyData.currencyCode);
  //         setCurrencySymbol(currencyData.currencySymbol);
  //         // setConvergenceData(currencyData.ConvergenceData);

  //         // Extracting your country's value
  //         const countryValue =
  //           currencyData.ConvergenceData[currencyData.currencyCode];
  //         setCountryValue(countryValue);
  //       } else {
  //         console.log("Failed to fetch currency data");
  //       }
  //     };
  //     someFunction();
  //   }, []);

  // leave

  /**
   * Handle form submit.
   *
   * @param {Object} event Event Object.
   *
   * @return Null.
   */
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    /**
     * Validate Billing and Shipping Details
     *
     * Note:
     * 1. If billing is different than shipping address, only then validate billing.
     * 2. We are passing theBillingStates?.length and theShippingStates?.length, so that
     * the respective states should only be mandatory, if a country has states.
     */
    const billingValidationResult = input?.billingDifferentThanShipping
      ? validateAndSanitizeCheckoutForm(
          input?.billing,
          theBillingStates?.length
        )
      : {
          errors: null,
          isValid: true,
        };
    const shippingValidationResult = validateAndSanitizeCheckoutForm(
      input?.shipping,
      theShippingStates?.length
    );

    setInput({
      ...input,
      billing: { ...input.billing, errors: billingValidationResult.errors },
      shipping: { ...input.shipping, errors: shippingValidationResult.errors },
    });

    // If there are any errors, return.
    if (!shippingValidationResult.isValid || !billingValidationResult.isValid) {
      return null;
    }

    // For stripe payment mode, handle the strip payment and thank you.
    if ("stripe-mode" === input.paymentMethod) {
      const createdOrderData = await handleStripeCheckout(
        input,
        cart?.cartItems,
        setRequestError,
        setCart,
        setIsOrderProcessing,
        setCreatedOrderData
      );
      return null;
    }

    // console.log(input.paymentMethod, "payment");
    // console.log(input, "input ");

    if ("paywithrazorpay" === input.paymentMethod) {
      // console.log("paywithrazorpay");

      const createdOrderData = await handleRazorpayCheckout(
        input,
        cart?.cartItems,
        setRequestError,
        setCart,
        setIsOrderProcessing,
        setCreatedOrderData,
        isOrderProcessing
      );
      return null;
    }

    // For Any other payment mode, create the order and redirect the user to payment url.
    const createdOrderData = await handleOtherPaymentMethodCheckout(
      input,
      cart?.cartItems,
      setRequestError,
      setCart,
      setIsOrderProcessing,
      setCreatedOrderData
    );

    // console.log(createdOrderData, "createdOrderData danish main");
    // const thankYouUrl = "http://localhost:3000/thank-you";
    if (createdOrderData?.orderDetails?.orderDetails?.id) {
      window.location.href = `${process.env.NEXT_PUBLIC_SITE_URL}/thank-you?orderId=${createdOrderData.orderDetails.orderDetails.id}`;

      return;
    } else {
      console.error("Failed to redirect: No valid order details.");
    }

    setRequestError(null);
  };

  /*
   * Handle onchange input.
   *
   * @param {Object} event Event Object.
   * @param {bool} isShipping If this is false it means it is billing.
   * @param {bool} isBillingOrShipping If this is false means its standard input and not billing or shipping.
   *
   * @return {void}
   */
  const handleOnChange = async (
    event,
    isShipping = false,
    isBillingOrShipping = false
  ) => {
    const { target } = event || {};

    if ("createAccount" === target.name) {
      handleCreateAccount(input, setInput, target);
    } else if ("billingDifferentThanShipping" === target.name) {
      handleBillingDifferentThanShipping(input, setInput, target);
    } else if (isBillingOrShipping) {
      if (isShipping) {
        await handleShippingChange(target);
      } else {
        await handleBillingChange(target);
      }
    } else {
      const newState = { ...input, [target.name]: target.value };
      setInput(newState);
      // console.log(newState, "newState danish");
    }
  };

  const handleShippingChange = async (target) => {
    const newState = {
      ...input,
      shipping: { ...input?.shipping, [target.name]: target.value },
    };
    setInput(newState);
    await setStatesForCountry(
      target,
      setTheShippingStates,
      setIsFetchingShippingStates
    );
  };

  const handleBillingChange = async (target) => {
    const newState = {
      ...input,
      billing: { ...input?.billing, [target.name]: target.value },
    };
    setInput(newState);
    await setStatesForCountry(
      target,
      setTheBillingStates,
      setIsFetchingBillingStates
    );
  };
  // console.log(input, "inputinput");

  return (
    <>
      {cart ? (
        <form
          onSubmit={handleFormSubmit}
          className="woo-next-checkout-form py-4 px-4 md:px-6 lg:px-12 xl:px-20"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-12 lg:gap-20">
            <div>
              {/*Shipping Details*/}
              <div className="billing-details">
                <h2 className="text-xl font-bold text-gray-800 py-2">
                  Shipping Details
                </h2>
                <Address
                  states={theShippingStates}
                  countries={shippingCountries}
                  input={input?.shipping}
                  handleOnChange={(event) => handleOnChange(event, true, true)}
                  isFetchingStates={isFetchingShippingStates}
                  isShipping
                  isBillingOrShipping
                />
              </div>
              <h2 className="text-xl font-bold text-gray-800 pb-4">
                Billing Address
              </h2>
              <div>
                <CheckboxField
                  name="billingDifferentThanShipping"
                  type="checkbox"
                  checked={input?.billingDifferentThanShipping}
                  handleOnChange={handleOnChange}
                  containerClassNames="mb-4"
                />
              </div>
              {/*Billing Details*/}
              {input?.billingDifferentThanShipping ? (
                <div className="billing-details">
                  <h2 className="text-xl font-bold text-gray-800 pb-4">
                    Billing Details
                  </h2>
                  <Address
                    states={theBillingStates}
                    countries={
                      billingCountries.length
                        ? billingCountries
                        : shippingCountries
                    }
                    input={input?.billing}
                    handleOnChange={(event) =>
                      handleOnChange(event, false, true)
                    }
                    isFetchingStates={isFetchingBillingStates}
                    isShipping={false}
                    isBillingOrShipping
                  />
                </div>
              ) : null}
            </div>
            {/* Order & Payments*/}
            <div className="your-orders">
              {/*	Order*/}

              <YourOrder cart={cart} Method={method} />

              {/*Payment*/}
              <PaymentModes
                input={input}
                handleOnChange={handleOnChange}
                Method={setMethod}
              />

              <div className="woo-next-place-order-btn-wrap mt-5">
                <button
                  disabled={isOrderProcessing}
                  className={cx(
                    "bg-[#E4322D] text-white px-5 py-3 rounded-sm w-full",
                    { "opacity-50": isOrderProcessing }
                  )}
                  type="submit"
                >
                  Place Order
                </button>
              </div>

              {/* Checkout Loading*/}
              {isOrderProcessing && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 z-50 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 block m-auto border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
                    <p className="mt-4 text-white font-medium">
                      Processing your order...
                    </p>
                  </div>
                </div>
              )}

              {requestError && (
                <p>Error : {requestError} :( Please try again</p>
              )}
            </div>
          </div>
        </form>
      ) : null}
      {/* <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      /> */}
    </>
  );
};

export default CheckoutForm;
