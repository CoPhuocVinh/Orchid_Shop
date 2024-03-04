import { Button } from "@/components/ui/button";

import React, { useState } from "react";
import { ChevronRight } from "lucide-react";

function SelectPaymentMethod() {
  const [selectedMethod, setSelectedMethod] = useState<string>("card");

  const handleMethodChange = (method: string) => {
    setSelectedMethod(method);
  };
  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="font-semibold leading-none tracking-tight flex flex-wrap justify-between">
          Select Payment Method
          <Button
            variant="link"
            className="flex justify-end pb-7 text-blue-500"
          >
            View All Method
            <svg
              className="h-4 w-4 text-blue-500"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <polyline points="9 6 15 12 9 18" />
            </svg>
          </Button>
        </h3>
        <p className="text-sm text-muted-foreground">
          Add a new payment method to your account.
        </p>
      </div>
      <div className="p-6 pt-0 grid gap-6">
        <div
          role="radiogroup"
          aria-required="false"
          dir="ltr"
          className="grid grid-cols-3 gap-4"
          tabIndex={0}
        >
          <div>
            <button
              type="button"
              role="radio"
              aria-checked={selectedMethod === "card"}
              data-state={selectedMethod === "card" ? "checked" : "unchecked"}
              value="card"
              className="aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 peer sr-only"
              id="card"
              aria-label="Card"
              tabIndex={-1}
              onClick={() => handleMethodChange("card")}
            >
              <span
                data-state={selectedMethod === "card" ? "checked" : "unchecked"}
                className="flex items-center justify-center"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5 fill-primary"
                >
                  <path
                    d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </button>
            <label
              className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground ${
                selectedMethod === "card"
                  ? "peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  : ""
              }`}
              htmlFor="card"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="mb-3 h-6 w-6"
              >
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <path d="M2 10h20" />
              </svg>
              Card
            </label>
          </div>
          <div>
            <button
              type="button"
              role="radio"
              aria-checked={selectedMethod === "card"}
              data-state={selectedMethod === "card" ? "checked" : "unchecked"}
              value="card"
              className="aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 peer sr-only"
              id="card"
              aria-label="Card"
              tabIndex={-1}
              onClick={() => handleMethodChange("card")}
            >
              <span
                data-state={selectedMethod === "card" ? "checked" : "unchecked"}
                className="flex items-center justify-center"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5 fill-primary"
                >
                  <path
                    d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </button>
            <label
              className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground ${
                selectedMethod === "card"
                  ? "peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  : ""
              }`}
              htmlFor="card"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="mb-3 h-6 w-6"
              >
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <path d="M2 10h20" />
              </svg>
              Card
            </label>
          </div>
          <div>
            <button
              type="button"
              role="radio"
              aria-checked={selectedMethod === "card"}
              data-state={selectedMethod === "card" ? "checked" : "unchecked"}
              value="card"
              className="aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 peer sr-only"
              id="card"
              aria-label="Card"
              tabIndex={-1}
              onClick={() => handleMethodChange("card")}
            >
              <span
                data-state={selectedMethod === "card" ? "checked" : "unchecked"}
                className="flex items-center justify-center"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5 fill-primary"
                >
                  <path
                    d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </button>
            <label
              className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground ${
                selectedMethod === "card"
                  ? "peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  : ""
              }`}
              htmlFor="card"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="mb-3 h-6 w-6"
              >
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <path d="M2 10h20" />
              </svg>
              Card
            </label>
          </div>
          {/* Similar blocks for PayPal and Apple Pay */}
        </div>

        {/* Inputs for voucher, city, card number, expiration date, and CVC */}

        <label
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 pb-2"
          htmlFor="voucher"
        >
          Voucher
        </label>
        <div className="grid grid-cols-3 gap-4">
          <input
            className="col-span-2 flex h-11 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            id="voucher"
            placeholder="Enter voucher code"
          />
          <Button className="bg-emerald-500 hover:bg-green-800 col-span-1">
            Apply
          </Button>
        </div>

        {/* More input fields */}
      </div>
      <div className="flex flex-col">
        <label className="text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 pb-2 ml-4 mb-6">
          Invoice and Contact Info
        </label>
        <label className="text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 pb-2 ml-4">
          Order Summary
        </label>
        <div className="grid grid-cols-2 gap-10">
          <div className="flex flex-col ml-4 ">
            <label htmlFor="Subtotal">Subtotal</label>
            <label htmlFor="Shipping">Shipping</label>
            <label htmlFor="Shipping fee discount">Shipping fee discount</label>
          </div>
          <div className="flex flex-col items-end mr-5">
            <label htmlFor="number">đ 1242412</label>
            <label htmlFor="number">đ 1242412</label>
            <label htmlFor="number">-đ 1242412</label>
          </div>
        </div>
      </div>

      <div className="relative mt-5 mb-5">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t"></span>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Total Payment
          </span>
        </div>

        <div className="m-5 grid grid-cols-2 gap-10">
          <div className="flex flex-col mt-5 ">
            <label htmlFor="Subtotal">Total</label>
          </div>
          <div className="flex flex-col items-end mt-5 ">
            <label htmlFor="number">đ 1242412</label>
          </div>
        </div>
      </div>

      <div className="flex items-center p-6 pt-0">
        <Button className="bg-slate-400 hover:bg-green-800 w-full">
          Proceed to payment
        </Button>
      </div>
    </div>
  );
}

export default SelectPaymentMethod;
