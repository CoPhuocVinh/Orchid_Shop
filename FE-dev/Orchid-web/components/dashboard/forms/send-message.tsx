"use client";

import React, { useState } from "react";
import Quill from "./quill";

const SendMassage = () => {
  const [text, setText] = useState({ text: "" });
  const toolbarOptions = [["bold", "italic", "underline"], ["image"]];

  const handleChange = (value: any) => {
    setText({ text: value });
  };

  return (
    <div className="lg:absolute bottom-10 lg:px-11 px-5 lg:mb-0 mb-5 w-full">
      <div>
        <Quill
          value={text.text}
          onChange={handleChange}
          modules={{
            toolbar: toolbarOptions,
          }}
          className="custom-quill-2 w-full relative"
        />
      </div>
      <div className="flex justify-end mt-4">
        <button
          aria-label="none"
          name="button"
          className="bg-success-400 rounded-lg flex items-center justify-center px-4 py-2.5 font-semibold text-sm gap-1.5 text-white"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.0586 7.09154L7.92522 3.52487C3.13355 1.12487 1.16689 3.09153 3.56689 7.8832L4.29189 9.3332C4.50022 9.7582 4.50022 10.2499 4.29189 10.6749L3.56689 12.1165C1.16689 16.9082 3.12522 18.8749 7.92522 16.4749L15.0586 12.9082C18.2586 11.3082 18.2586 8.69153 15.0586 7.09154ZM12.3669 10.6249H7.86689C7.52522 10.6249 7.24189 10.3415 7.24189 9.99987C7.24189 9.6582 7.52522 9.37487 7.86689 9.37487H12.3669C12.7086 9.37487 12.9919 9.6582 12.9919 9.99987C12.9919 10.3415 12.7086 10.6249 12.3669 10.6249Z"
              fill="white"
            />
          </svg>
          <span>Send</span>
        </button>
      </div>
    </div>
  );
};

export default SendMassage;
