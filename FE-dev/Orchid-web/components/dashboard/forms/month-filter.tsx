'use client'

import React, { useState } from "react";

interface MonthFilterProps {
  options: string[];
}
const MonthFilter = ({ options }: MonthFilterProps) => {
  // const [activeFilter, setActiveFilter] = useState(false);
  const [activeFilter, setActiveFilter] = useState<number | null>(null);
  const [showFilter, setShowFilter] = useState(false);

  const handleActiveFilter = (index: any) => {
    setActiveFilter(index);
  };

  return (
    <div className="date-filter relative">
      <button
        aria-label="none"
        onClick={() => setShowFilter(!showFilter)}
        type="button"
        className="flex items-center space-x-1"
      >
        <span className="text-base font-semibold text-bgray-900 dark:text-white">
          {activeFilter ? options[activeFilter] : "Monthly"}
        </span>
        <span>
          <svg
            className="stroke-bgray-900 dark:stroke-bgray-50"
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
        id="month-filter"
        className={`absolute right-0 top-5 z-10 overflow-hidden rounded-lg bg-white shadow-lg dark:bg-darkblack-500 ${
          showFilter ? "block" : "hidden"
        }`}
      >
        <ul>
          {options.map((item, index) => (
            <li
              key={item + index}
              onClick={() => {
                setShowFilter(!showFilter);
                handleActiveFilter(index);
              }}
              className="text-bgray-90 cursor-pointer px-5 py-2 text-sm font-semibold hover:bg-bgray-100 dark:text-white hover:dark:bg-darkblack-600"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MonthFilter;
