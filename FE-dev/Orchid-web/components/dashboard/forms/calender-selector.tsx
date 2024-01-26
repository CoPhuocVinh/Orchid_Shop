"use client";
import React, { useState } from "react";

const CalenderSelector = () => {
  const [active, setActive] = useState(false);
  return (
    <div className="w-full h-full relative mb-5">
      <button
        aria-label="none"
        onClick={() => setActive(!active)}
        type="button"
        className="w-full h-full flex justify-center items-center"
      >
        <div className="flex justify-between w-full items-center">
          <span className="text-base text-bgray-600 dark:text-bgray-50 font-semibold">
            June 2022
          </span>
          <span>
            <svg
              className="fill-bgray-900 dark:fill-white"
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M13.1901 15.1084L18.6831 9.60565C18.7742 9.51527 18.8466 9.40774 18.8959 9.28927C18.9453 9.1708 18.9707 9.04372 18.9707 8.91538C18.9707 8.78703 18.9453 8.65996 18.8959 8.54148C18.8466 8.42301 18.7742 8.31548 18.6831 8.2251C18.501 8.04402 18.2546 7.94238 17.9977 7.94238C17.7409 7.94238 17.4944 8.04402 17.3123 8.2251L12.4512 13.0376L7.63868 8.2251C7.45652 8.04402 7.21011 7.94238 6.95326 7.94238C6.69641 7.94238 6.45 8.04402 6.26785 8.2251C6.17598 8.31514 6.1029 8.42252 6.05283 8.54101C6.00277 8.6595 5.97671 8.78674 5.97618 8.91538C5.97671 9.04401 6.00277 9.17125 6.05283 9.28974C6.1029 9.40823 6.17598 9.51561 6.26785 9.60565L11.7609 15.1084C11.8519 15.2071 11.9624 15.2859 12.0854 15.3397C12.2084 15.3936 12.3412 15.4214 12.4755 15.4214C12.6097 15.4214 12.7426 15.3936 12.8655 15.3397C12.9885 15.2859 13.099 15.2071 13.1901 15.1084Z" />
            </svg>
          </span>
        </div>
      </button>
      <div
        id="date-selector-filter"
        className={`rounded-lg shadow-lg bg-white w-full absolute right-0 z-10 top-5 overflow-hidden ${
          active ? "block" : "hidden"
        } `}
      >
        <ul>
          <li
            onClick={() => setActive(!active)}
            className="text-sm  text-bgray-90 cursor-pointer px-5 py-2 hover:bg-bgray-100 font-semibold"
          >
            January
          </li>
          <li
            onClick={() => setActive(!active)}
            className="text-sm  text-bgray-900 cursor-pointer px-5 py-2 hover:bg-bgray-100 font-semibold"
          >
            February
          </li>

          <li
            onClick={() => setActive(!active)}
            className="text-sm  text-bgray-900 cursor-pointer px-5 py-2 hover:bg-bgray-100 font-semibold"
          >
            March
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CalenderSelector;
