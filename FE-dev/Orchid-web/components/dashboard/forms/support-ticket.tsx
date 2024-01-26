"use client";
import { useState } from "react";
import Quill from "./quill";
const SupportTicket = () => {
  const [text, setText] = useState({ text: "" });
  const toolbarOptions = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
  ];

  const handleChange = (value: any) => {
    setText({ text: value });
  };
  return (
    <form action="">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="fn"
            className="block text-basse dark:text-bgray-50 font-medium text-bgray-600 mb-2"
          >
            First Name
          </label>
          <input
            type="text"
            className="bg-bgray-50 dark:bg-darkblack-500 dark:text-white p-4 rounded-lg border-0 focus:border focus:border-success-300 focus:ring-0 w-full"
          />
        </div>
        <div>
          <label
            htmlFor="ln"
            className="block text-basse dark:text-bgray-50 font-medium text-bgray-600 mb-2"
          >
            Last Name
          </label>
          <input
            type="text"
            className="bg-bgray-50 dark:bg-darkblack-500 dark:text-white p-4 rounded-lg border-0 focus:border focus:border-success-300 focus:ring-0 w-full"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-basse dark:text-bgray-50 font-medium text-bgray-600 mb-2"
          >
            Email
          </label>
          <input
            type="text"
            className="bg-bgray-50 dark:text-white dark:bg-darkblack-500 p-4 rounded-lg border-0 focus:border focus:border-success-300 focus:ring-0 w-full"
          />
        </div>
        <div>
          <label
            htmlFor="fn"
            className="block text-basse dark:text-bgray-50 font-medium text-bgray-600 mb-2"
          >
            Phone Number(Optional)
          </label>
          <input
            type="text"
            className="bg-bgray-50 dark:text-white dark:bg-darkblack-500 p-4 rounded-lg border-0 focus:border focus:border-success-300 focus:ring-0 w-full"
          />
        </div>
      </div>
      <div className="mt-10 mb-6">
        <h4 className="font-bold text-bgray-900 dark:text-white text-lg mb-4">
          Support issues
        </h4>
        <label
          htmlFor=""
          className="block text-base dark:text-white font-semibold mb-2"
        >
          Title
        </label>
        <input
          type="text"
          className="bg-bgray-50 dark:bg-darkblack-500 dark:text-white w-full p-4 rounded-lg border-0 focus:border focus:border-success-300 focus:ring-0"
        />
      </div>
      <div className="mt-10 mb-6 custom-quill">
        <label
          htmlFor=""
          className="block text-base font-semibold dark:text-white mb-2"
        >
          Description
        </label>
        <Quill
          value={text.text}
          onChange={handleChange}
          modules={{
            toolbar: toolbarOptions,
          }}
          className=" react-quill-1 w-full relative"
        />
      </div>
      <div className="flex justify-end">
        <button
          aria-label="none"
          className="rounded-lg bg-success-300 px-12 py-3.5 transition-all text-white font-semibold hover:bg-success-400"
        >
          Submit Ticket
        </button>
      </div>
    </form>
  );
};

export default SupportTicket;
