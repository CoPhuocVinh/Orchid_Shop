import { Card } from "@/components/ui/card";
import * as React from "react";

function Grid_DashBoard_table() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="grid grid-cols-2 gap-10">
        <div className="relative px-8 py-2 rounded-md bg-white isolation-auto z-10 border-2 border-lime-500 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-lime-500 before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700">
          <div className="bg-orange-300 rounded-lg p-2 shadow-md mb-4">
            <h2 className="text-xl font-semibold mb-2 text-gray-50">
              Order Pending
            </h2>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md">
            <span className="w-full border-t"></span>
            <p className="text-gray-600 text-5xl">00</p>
          </div>
        </div>
        <div className="relative px-8 py-2 rounded-md bg-white isolation-auto z-10 border-2 border-lime-500 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-lime-500 before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700">
          <div className="bg-orange-300 rounded-lg p-2 shadow-md mb-4">
            <h2 className="text-xl font-semibold mb-2 text-gray-50">
              Order Processign
            </h2>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md">
            <span className="w-full border-t"></span>
            <p className="text-gray-600 text-5xl">200</p>
          </div>
        </div>
        <div className="relative px-8 py-2 rounded-md bg-white isolation-auto z-10 border-2 border-lime-500 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-lime-500 before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700">
          <div className="bg-orange-300 rounded-lg p-2 shadow-md mb-4">
            <h2 className="text-xl font-semibold mb-2 text-gray-50">
              Order Picked
            </h2>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md">
            <span className="w-full border-t"></span>
            <p className="text-gray-600 text-5xl">160</p>
          </div>
        </div>
        <div className="relative px-8 py-2 rounded-md bg-white isolation-auto z-10 border-2 border-lime-500 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-lime-500 before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700">
          <div className="bg-orange-300 rounded-lg p-2 shadow-md mb-4">
            <h2 className="text-xl font-semibold mb-2 text-gray-50">
              Order Completed
            </h2>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md">
            <span className="w-full border-t"></span>
            <p className="text-gray-600 text-5xl">2200</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Grid_DashBoard_table;
