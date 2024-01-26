"use client";
import React, { useState } from "react";

interface FilterProps {
  options: string[];
}

const Filter = ({ options }: FilterProps) => {
  const [active, setActive] = useState(false);

  return (
    <div className="relative h-full flex-1">
      <button
        aria-label="none"
        onClick={() => setActive(!active)}
        type="button"
        className="flex h-full w-full items-center justify-center rounded-lg border border-bgray-300 bg-bgray-100 dark:border-darkblack-500 dark:bg-darkblack-500"
      >
        <div className="flex items-center space-x-3">
          <span>
            <svg
              className="stroke-bgray-900 dark:stroke-success-400"
              width="18"
              height="17"
              viewBox="0 0 18 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.55169 13.5022H1.25098"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10.3623 3.80984H16.663"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.94797 3.75568C5.94797 2.46002 4.88981 1.40942 3.58482 1.40942C2.27984 1.40942 1.22168 2.46002 1.22168 3.75568C1.22168 5.05133 2.27984 6.10193 3.58482 6.10193C4.88981 6.10193 5.94797 5.05133 5.94797 3.75568Z"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17.2214 13.4632C17.2214 12.1675 16.1641 11.1169 14.8591 11.1169C13.5533 11.1169 12.4951 12.1675 12.4951 13.4632C12.4951 14.7589 13.5533 15.8095 14.8591 15.8095C16.1641 15.8095 17.2214 14.7589 17.2214 13.4632Z"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="text-base font-medium text-success-300">
            Filters
          </span>
        </div>
      </button>
      <div
        id="table-filter"
        style={{ display: active ? "block" : "none" }}
        className="absolute right-0 top-[60px] z-10 hidden w-full overflow-hidden rounded-lg bg-white shadow-lg dark:bg-darkblack-500"
      >
        <ul>
          {options?.map((option) => (
            <li
              key={option}
              onClick={() => setActive(!active)}
              className="text-bgray-90 cursor-pointer px-5 py-2 text-sm font-semibold hover:bg-bgray-100 dark:text-white hover:dark:bg-darkblack-600"
            >
              {option}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Filter;
