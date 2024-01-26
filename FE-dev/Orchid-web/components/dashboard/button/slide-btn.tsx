'use client'

import React from 'react'
interface SlideBtnProps {
    name: string,
    handleBtn: (name: string) => void;
    status: { [key: string]: boolean }
}
const SlideBtn = ({ name, handleBtn, status }: SlideBtnProps) => {
    return (
        <div className="flex items-center justify-between">
          <span
            className="text-base font-medium text-bgray-800 dark:text-white capitalize"
            id="availability-label"
          >
            {name}
          </span>
          <button
            aria-label="none"
            type="button"
            onClick={() => handleBtn(name)}
            className="switch-btn text-center relative inline-flex h-5 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"
            role="switch"
            aria-checked="false"
            aria-labelledby="availability-label"
            aria-describedby="availability-description"
            style={{ background: status[name] ? "#22C55E" : undefined }}
          >
            <span
              aria-hidden="true"
              className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                status[name] ? "translate-x-5" : ""
              }`}
            ></span>
          </button>
        </div>
      );
}

export default SlideBtn