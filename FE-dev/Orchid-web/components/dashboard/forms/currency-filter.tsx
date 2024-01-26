'use client'
import React, { useState } from 'react'

interface CurrencyFilterProps {
    currencyOptions: string[]
}

const CurrencyFilter = ({currencyOptions}:CurrencyFilterProps) => {
    // const [activeFilter, setActiveFilter] = useState(false);
    const [activeFilter, setActiveFilter] = useState<number | null>(null);
    const [showFilter, setShowFilter] = useState(false);
  
    const handleActiveFilter = (e: any) => {
      setActiveFilter(e.target.innerText);
    };
    return (
      <div className="flex space-x-3 mb-4 w-full h-[48px]">
        <div className="relative">
          <button
            aria-label="none"
            onClick={() => {
              setShowFilter(!showFilter);
            }}
            type="button"
            className="w-[80px] px-2.5 py-[14px] border rounded-lg  border-bgray-300 dark:border-darkblack-400 dark:bg-darkblack-500 dark:text-white flex flex-row justify-center items-center"
          >
            <span className="text-sm font-bold text-bgray-900 dark:text-white">
              {activeFilter ? activeFilter : currencyOptions[0]}
            </span>
            <span>
              <svg
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.03516 6.03271L8.03516 10.0327L12.0352 6.03271"
                  stroke="#A0AEC0"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </span>
          </button>
          <div
            id="usd-filter"
            className={`rounded-lg w-full shadow-lg bg-white dark:bg-darkblack-500 absolute right-0 z-10 top-14 overflow-hidden ${
              showFilter ? "block" : "hidden"
            }`}
          >
            <ul>
              {currencyOptions.map((item) => (
                <li
                  key={item}
                  onClick={(e) => {
                    setShowFilter(!showFilter);
                    handleActiveFilter(e);
                  }}
                  className="text-sm  text-bgray-90 cursor-pointer px-5 py-2 dark:text-white hover:bg-bgray-100 hover:dark:bg-darkblack-500 font-semibold"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="w-full h-full   overflow-hidden">
          <input
            type="text"
            className="w-full h-full border border-bgray-300  rounded-lg focus:ring-0 dark:bg-darkblack-500 dark:border-darkblack-400 focus:border-none text-base text-bgray-900  dark:border dark:text-white"
          />
        </div>
      </div>
    );
}

export default CurrencyFilter