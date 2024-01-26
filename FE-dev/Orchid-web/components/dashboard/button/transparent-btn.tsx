'use client'

import React from 'react'

interface TransparentBtnProps {
    title: string;
    action?: () => void;
}
const TransparentBtn = ({ title, action }: TransparentBtnProps) => {
  return (
    <button
      aria-label="none"
      onClick={() => (action ? action() : "")}
      className="py-3 px-6 border bg-white border-bgray-500 rounded-lg text-sm font-medium text-bgray-600 dark:bg-darkblack-600 dark:text-white"
    >
      {title}
    </button>
  );
}

export default TransparentBtn