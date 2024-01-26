"use client";
import React, { useState } from 'react'

const LocationSelector = () => {
    const [filterShow, setFilterShow] = useState(false);
    return (
      <div className="date-filter relative">
        <button
          aria-label="none"
          onClick={() => setFilterShow(!filterShow)}
          type="button"
          className="p-3.5 border border-bgray-300 dark:border-darkblack-400 flex space-x-1 items-center rounded-lg overflow-hidden"
        >
          <span className="text-sm font-medium text-bgray-900 dark:text-white">
            This Year
          </span>
          <span>
            <svg
              className="stroke-bgray-900 dark:stroke-white"
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
          id="location-filter"
          className={`rounded-lg w-[150px] shadow-lg bg-white dark:bg-darkblack-500 absolute right-0 z-10 top-ful  overflow-hidden ${
            filterShow ? "block" : "hidden"
          }`}
        >
          <ul>
            <li
              onClick={() => setFilterShow(!filterShow)}
              className="text-sm  text-bgray-90 cursor-pointer px-5 py-2 hover:bg-bgray-100 dark:text-white hover:dark:bg-darkblack-600 font-semibold"
            >
              Jan 10 - Jan 16
            </li>
            <li
              onClick={() => setFilterShow(!filterShow)}
              className="text-sm  text-bgray-900 cursor-pointer px-5 py-2 hover:bg-bgray-100 dark:text-white hover:dark:bg-darkblack-600 font-semibold"
            >
              Jan 10 - Jan 16
            </li>
            <li
              onClick={() => setFilterShow(!filterShow)}
              className="text-sm  text-bgray-900 cursor-pointer px-5 py-2 hover:bg-bgray-100 dark:text-white hover:dark:bg-darkblack-600 font-semibold"
            >
              Jan 10 - Jan 16
            </li>
          </ul>
        </div>
      </div>
    );
}

export default LocationSelector