"use client";
import PropTypes from "prop-types";

const CheckboxField = ({ handleOnChange, checked, containerClassNames }) => {
  const handleDivClick = (value) => {
    // Only trigger change if the value is different
    if ((value === "same" && !checked) || (value === "different" && checked)) {
      return;
    }
    handleOnChange({ target: { name: "billingDifferentThanShipping", value } });
  };

  return (
    <div className={`border rounded-md ${containerClassNames}`}>
      <div
        onClick={() => handleDivClick("same")}
        className={`flex items-center space-x-3 p-4 hover:shadow-lg transition-shadow cursor-pointer`}
      >
        <input
          onChange={() => handleDivClick("same")}
          type="radio"
          checked={!checked}
          name="billingDifferentThanShipping"
          className="w-5 h-5 text-indigo-600 focus:ring-indigo-500 border-gray-300"
        />
        <label className="leading-7 font-bold text-md text-gray-700 flex items-center cursor-pointer">
          Same as shipping address
        </label>
      </div>
      <div
        onClick={() => handleDivClick("different")}
        className={`flex items-center space-x-3 p-4 border-t hover:shadow-lg transition-shadow cursor-pointer`}
      >
        <input
          onChange={() => handleDivClick("different")}
          type="radio"
          checked={checked}
          name="billingDifferentThanShipping"
          className="w-5 h-5 text-indigo-600 focus:ring-indigo-500 border-gray-300"
        />
        <label className="leading-7 font-bold text-md text-gray-700 flex items-center cursor-pointer">
          Use a different billing address
        </label>
      </div>
    </div>
  );
};

CheckboxField.propTypes = {
  handleOnChange: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
  containerClassNames: PropTypes.string,
};

CheckboxField.defaultProps = {
  containerClassNames: "",
};

export default CheckboxField;
