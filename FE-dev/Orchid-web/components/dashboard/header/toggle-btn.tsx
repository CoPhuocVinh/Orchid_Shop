"use client";
import React from "react";
interface ToggleBtnProps {
  clickHandler: (name: string) => void;
  name: string;
  active?: boolean;
  icon: any;
}
const ToggleBtn = ({ clickHandler, name, icon, active }: ToggleBtnProps) => {
  return (
    <button
      aria-label="none"
      onClick={() => clickHandler(name)}
      type="button"
      id="store-btn"
      className="relative flex h-[52px] w-[52px] items-center justify-center rounded-[12px] border border-success-300 dark:border-darkblack-400"
    >
      <span
        className={`absolute -right-[5px] -top-[2px] h-3.5 w-3.5 rounded-full border-2 border-white  dark:border-none  ${
          active ? "bg-error-300" : "bg-bgray-300 dark:bg-bgray-600"
        }`}
      ></span>
      {icon}
    </button>
  );
};

export default ToggleBtn;
