"use client";
import React, { useState } from "react";

interface DateFilterProps {
  options: string[];
}

const DateFilter = ({ options }: DateFilterProps) => {
  // const [activeFilter, setActiveFilter] = useState(false);
  const [activeFilter, setActiveFilter] = useState<number | null>(null);
  const [showFilter, setShowFilter] = useState(false);

  const handleActiveFilter = (e: any) => {
    setActiveFilter(e.target.innerText);
  };
  return (
    <div className="date-filter relative">
      <button
        aria-label="none"
        onClick={() => {
          setShowFilter(!showFilter);
        }}
        type="button"
        className="px-3 py-2 bg-bgray-100 dark:bg-darkblack-500 dark:text-white flex space-x-1 items-center rounded-lg overflow-hidden"
      >
        <span className="text-sm font-medium text-bgray-900 dark:text-white">
          {activeFilter ? activeFilter : options[0]}
        </span>
        <span>
          <svg
            className="stroke-bgray-900 dark:stroke-gray-50"
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 6.5L8 10.5L12 6.5"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
      <div
        id="date-filter-body"
        className={`rounded-lg shadow-lg bg-white dark:bg-darkblack-500 absolute right-0 z-10 top-[44px]  overflow-hidden ${
          showFilter ? "block" : "hidden"
        }`}
      >
        <ul>
          {options.map((item) => (
            <li
              key={item}
              onClick={(e) => {
                setShowFilter(!showFilter);
                handleActiveFilter(e);
              }}
              className="text-sm  text-bgray-90 dark:text-white cursor-pointer px-5 py-2 hover:bg-bgray-100 font-semibold hover:dark:bg-darkblack-600"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DateFilter;
