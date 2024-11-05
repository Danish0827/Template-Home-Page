"use client";
import React, { useContext } from "react";
import { AiTwotoneQuestionCircle } from "react-icons/ai";
import { AppContext } from "../context";

interface CostSummaryProps {
  Method: string;
}

interface RowProps {
  label: React.ReactNode;
  value: string | any;
  labelClass?: string;
  valueClass?: string;
  prefix?: React.ReactNode;
}

const CostSummary: React.FC<CostSummaryProps> = ({ Method }) => {
  const [cart] = useContext(AppContext) as [{ totalQty: number; totalPrice: any }];
  const charge = parseFloat("99").toFixed(2);

  return (
    <section className="p-4 bg-gray-100 rounded-md">
      <div className="mb-4">
        <h3 id="MoneyLine-Heading0" className="text-lg font-semibold text-gray-800">
          Cost summary
        </h3>
      </div>

      <div role="table" aria-labelledby="MoneyLine-Heading0">
        {/* Header Row */}
        <div role="rowgroup" className="mb-2">
          <div role="row" className="flex justify-between font-semibold text-gray-700">
            <div role="columnheader" className="w-1/2">Item</div>
            <div role="columnheader" className="w-1/2 text-right">{cart?.totalQty ?? 0}</div>
          </div>
        </div>

        {/* Body Rows */}
        <div role="rowgroup" className="space-y-2">
          {/* Subtotal Row */}
          <Row label="Subtotal" value={`₹${cart?.totalPrice.toFixed(2) || "0.00"}`} />

          {/* Shipping Row */}
          <Row
            label={
              <span className="flex items-center">
                Shipping
                <button
                  type="button"
                  aria-label="Shipping policy"
                  aria-haspopup="dialog"
                  className="ml-2 text-blue-500 hover:underline"
                >
                  <AiTwotoneQuestionCircle />
                </button>
              </span>
            }
            value={Method === "cashOnDelivery" ? `₹${charge}` : "FREE"}
            valueClass="text-gray-500"
          />

          {/* Total Row */}
          <Row
            label="Total"
            value={`₹${(parseFloat(cart?.totalPrice) + (Method === "cashOnDelivery" ? parseFloat(charge) : 0)).toFixed(2)}`}
            labelClass="font-semibold text-gray-900"
            valueClass="font-semibold text-gray-900"
            prefix={<span title="Indian Rupees" className="mr-1 text-xs text-gray-500">INR</span>}
          />
        </div>
      </div>
    </section>
  );
};

// Reusable row component with TypeScript props
const Row: React.FC<RowProps> = ({ label, value, labelClass = "text-gray-700", valueClass = "text-gray-800", prefix = null }) => (
  <div role="row" className="flex justify-between items-center border-b pb-2">
    <div role="rowheader" className={`w-1/2 ${labelClass}`}>{label}</div>
    <div role="cell" className={`w-1/2 text-right ${valueClass}`}>
      {prefix}{value}
    </div>
  </div>
);

export default CostSummary;
