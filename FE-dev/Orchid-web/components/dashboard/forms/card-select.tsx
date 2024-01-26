'use client'
import React, { useState } from 'react'

interface CardSelectProps {
    currencyOptions: string[]
}

const CardSelect = ({currencyOptions}: any) => {
    // const [activeFilter, setActiveFilter] = useState(false);
    const [activeFilter, setActiveFilter] = useState<number | null>(null);
    const [showFilter, setShowFilter] = useState(false);
  
    const handleActiveFilter = (index: any) => {
      setActiveFilter(index);
    };
  
    return (
      <div className="payment-select relative mb-3">
        <button
          aria-label="none"
          onClick={() => {
            setShowFilter(!showFilter);
          }}
          type="button"
          className="px-5 w-full h-[56px] border border-bgray-200 dark:border-darkblack-400 flex justify-between items-center rounded-lg overflow-hidden"
        >
          <div className="flex space-x-2 items-center">
            <span>
              {activeFilter ? currencyOptions[activeFilter] : currencyOptions[0]}
            </span>
          </div>
          <div className="flex space-x-2 items-center">
            <span className="text-sm font-bold text-bgray-900">$24,098.00</span>
            <span className="text-sm font-medium text-bgray-900">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 6L8 10L12 6"
                  stroke="#A0AEC0"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
        </button>
        <div
          id="paymentFilter"
          className={`rounded-lg shadow-lg w-full bg-white absolute right-0 z-10 top-full overflow-hidden ${
            showFilter ? "block" : "hidden"
          }`}
        >
          <ul>
            {currencyOptions.map((item: any, index: any) => (
              <li
                key={item + index}
                onClick={() => {
                  setShowFilter(!showFilter);
                  handleActiveFilter(index);
                }}
                className="text-sm  text-bgray-90 cursor-pointer px-5 py-2 hover:bg-bgray-100 font-semibold"
              >
                <span>{item} </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
}

export default CardSelect