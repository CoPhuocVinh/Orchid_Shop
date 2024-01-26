'use client'
import Image from "next/image";
import React from "react";

const Integration = ({ integration }: any) => {
  const { img, title, category, text, status } = integration;
  return (
    <div className="bg-white dark:bg-darkblack-600 rounded-lg p-6 relative">
      <span className="absolute right-6 top-6">
        <svg
          width="24"
          height="25"
          className="stroke-bgray-50"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 14.3066C10.8954 14.3066 10 13.4144 10 12.3137C10 11.2131 10.8954 10.3208 12 10.3208C13.1046 10.3208 14 11.2131 14 12.3137C14 13.4144 13.1046 14.3066 12 14.3066Z"
            strokeWidth="1.5"
          />
          <path
            d="M20 14.3066C18.8954 14.3066 18 13.4144 18 12.3137C18 11.2131 18.8954 10.3208 20 10.3208C21.1046 10.3208 22 11.2131 22 12.3137C22 13.4144 21.1046 14.3066 20 14.3066Z"
            strokeWidth="1.5"
          />
          <path
            d="M4 14.3066C2.89543 14.3066 2 13.4144 2 12.3137C2 11.2131 2.89543 10.3208 4 10.3208C5.10457 10.3208 6 11.2131 6 12.3137C6 13.4144 5.10457 14.3066 4 14.3066Z"
            strokeWidth="1.5"
          />
        </svg>
      </span>
      <div className="flex space-x-5">
        <div className="shrink-0">
          <Image
            priority={true}
            height={img.height}
            width={img.width}
            src={img.src}
            alt="Stack Overflow"
          />
        </div>
        <div>
          <h3 className="text-2xl text-bgray-900 dark:text-white font-bold">
            {title}
          </h3>
          <span className="text-lg text-bgray-600 dark:text-bgray-50">
            {category}
          </span>
        </div>
      </div>
      <p className="pt-5 pb-8 text-lg text-bgray-600 dark:text-bgray-50 ">
        {text}
      </p>
      {status === "connect" ? (
        <button
          aria-label="none"
          className="text-base w-full text-success-300 font-medium h-12 rounded-md border border-success-300 hover:text-white hover:bg-success-300 transition duration-300 ease-in-out"
        >
          Connect
        </button>
      ) : (
        <button
          aria-label="none"
          className="text-base w-full text-bgray-600 h-12 rounded-md border border-bgray-600 hover:text-white bg-white hover:bg-bgray-600 transition duration-300 ease-in-out dark:bg-darkblack-600 dark:text-bgray-300"
        >
          Disconnect
        </button>
      )}
    </div>
  );
};

export default Integration;
