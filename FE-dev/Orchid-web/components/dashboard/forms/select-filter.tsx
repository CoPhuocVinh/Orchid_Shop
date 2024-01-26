"use client";
import React, { useState } from "react";

interface SelectFilterProps {
  title: string;
  placeHolder: string;
  options: string[];
  icon?: any;
}
const SelectFilter = ({
  title,
  placeHolder,
  options,
  icon,
}: SelectFilterProps) => {
  const [active, setActive] = useState(false);
  return (
    <div className="w-full">
      <p className="mb-2 text-base font-bold leading-[24px] text-bgray-900 dark:text-white">
        {title}
      </p>
      <div className="relative h-[56px] w-full">
        <button
          aria-label="none"
          onClick={() => setActive(!active)}
          type="button"
          className="relative flex h-full w-full items-center justify-between rounded-lg bg-bgray-100 px-4 dark:bg-darkblack-500"
        >
          <span className="text-base text-bgray-500">{placeHolder}</span>
          <span>
            {icon ? (
              icon
            ) : (
              <svg
                width="21"
                height="21"
                viewBox="0 0 21 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.58203 8.3186L10.582 13.3186L15.582 8.3186"
                  stroke="#A0AEC0"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </span>
        </button>
        <div
          id="province-filter"
          style={{ display: active ? "block" : "none" }}
          className="absolute right-0 top-14 z-10 hidden w-full overflow-hidden rounded-lg bg-white shadow-lg dark:bg-darkblack-500"
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
    </div>
  );
};

export default SelectFilter;
