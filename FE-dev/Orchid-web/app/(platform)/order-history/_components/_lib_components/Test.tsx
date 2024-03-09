"use client";

import * as React from "react";
import { Tab, initTE } from "tw-elements";

initTE({ Tab });

function Test() {
  const [openTab, setOpenTab] = React.useState(2);
  return (
    <div className="flex">
      <div className="container mx-auto mt-12 h-full w-1/5">
        <div className="flex flex-row items-start justify-center max-w-xl gap-10">
          <ul className="flex flex-col gap-5">
            <li>
              <a
                href="#"
                onClick={() => setOpenTab(1)}
                className={` ${
                  openTab === 1 ? "bg-purple-600 text-black bg-green-500  " : ""
                } inline-block px-4 py-2 text-gray-600 bg-white rounded shadow`}
              >
                React Tabs 1
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={() => setOpenTab(2)}
                className={` ${
                  openTab === 2 ? "bg-purple-600 text-black bg-green-500 " : ""
                } inline-block px-4 py-2 text-gray-600 bg-white rounded shadow`}
              >
                React Tabs 2
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={() => setOpenTab(3)}
                className={` ${
                  openTab === 3 ? "bg-purple-600 text-black bg-green-500 " : ""
                } inline-block px-4 py-2 text-gray-600 bg-white rounded shadow`}
              >
                React Tabs 3
              </a>
            </li>
          </ul>
          <div className="p-3 mt-6 bg-white border">
            <div className={openTab === 1 ? "block" : "hidden"}>
              test 1 dashboard
            </div>
            <div className={openTab === 2 ? "block" : "hidden"}>
              test 2 my profile
            </div>
            <div className={openTab === 3 ? "block" : "hidden"}>
              test 3 check table
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Test;
