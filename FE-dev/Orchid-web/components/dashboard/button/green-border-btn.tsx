'use client'

import React from 'react'

interface GreenBorderBtnProps {
    text: string;
    action?: () => void;
}
const GreenBorderBtn = ({ text, action }: GreenBorderBtnProps) => {
    return (
        <li onClick={action}>
          <button
            className="bg-white dark:bg-darkblack-500 dark:text-bgray-50 dark:border-success-300 border-2 text-bgray-900 rounded-lg px-4 py-3 font-semibold text-sm"
            aria-label="none"
          >
            {text}
          </button>
        </li>
      );
}

export default GreenBorderBtn