"use client";
import { useState } from "react";

function PaymentSelect() {
  const [filterShow, setFilterShow] = useState(false);
  return (
    <div className="payment-select relative mb-3">
      <button
        aria-label="none"
        name="button"
        onClick={() => setFilterShow(!filterShow)}
        type="button"
      >
        <svg
          width="18"
          height="4"
          viewBox="0 0 18 4"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 2C8 2.55228 8.44772 3 9 3C9.55228 3 10 2.55228 10 2C10 1.44772 9.55228 1 9 1C8.44772 1 8 1.44772 8 2Z"
            stroke="#CBD5E0"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M1 2C1 2.55228 1.44772 3 2 3C2.55228 3 3 2.55228 3 2C3 1.44772 2.55228 1 2 1C1.44772 1 1 1.44772 1 2Z"
            stroke="#CBD5E0"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15 2C15 2.55228 15.4477 3 16 3C16.5523 3 17 2.55228 17 2C17 1.44772 16.5523 1 16 1C15.4477 1 15 1.44772 15 2Z"
            stroke="#CBD5E0"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div
        id="cardsOptions"
        style={{ display: filterShow ? "block" : "none" }}
        className="absolute right-0 top-full z-10 hidden min-w-[150px] overflow-hidden rounded-lg bg-white shadow-lg dark:bg-darkblack-500"
      >
        <ul>
          <li
            onClick={() => setFilterShow(!filterShow)}
            className="cursor-pointer px-5 py-2 text-sm font-semibold text-bgray-900 hover:bg-bgray-100 dark:text-white hover:dark:bg-darkblack-600"
          >
            Master Card
          </li>
          <li
            onClick={() => setFilterShow(!filterShow)}
            className="cursor-pointer px-5 py-2 text-sm font-semibold text-bgray-900 hover:bg-bgray-100 dark:text-white hover:dark:bg-darkblack-600"
          >
            VISA Card
          </li>
          <li
            onClick={() => setFilterShow(!filterShow)}
            className="cursor-pointer px-5 py-2 text-sm font-semibold text-bgray-900 hover:bg-bgray-100 dark:text-white hover:dark:bg-darkblack-600"
          >
            Others
          </li>
        </ul>
      </div>
    </div>
  );
}

export default PaymentSelect;
