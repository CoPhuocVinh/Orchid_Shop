"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { IAuction } from "@/types/dashboard";

function Fillter_Auction_Price() {
  const [valueMinPrice, setValueMinPrice] = React.useState(0);
  const [valueMaxPrice, setValueMaxPrice] = React.useState(5000);
  const [loading, setLoading] = useState(false); // State để kiểm soát trạng thái loading
  const [resultCount, setResultCount] = useState(0); // State để lưu kết quả

  const handleCheckChange = () => {
    // Xử lý thay đổi trong checkbox
    setLoading(true); // Bắt đầu hiển thị loading icon
    setTimeout(() => {
      setLoading(false); // Kết thúc hiển thị loading icon sau khoảng 1 giây
      // Tính toán kết quả ở đây
      const numberOfResults = 10; // Đây là giả sử số kết quả

      // const getStarPrice = liveAuction?.filter((item) => {
      //   item.startPrice >= valueMinPrice && item.startPrice <= valueMaxPrice;
      //   return item.startPrice;
      // });
      // setResultCount(getStarPrice?.length || 0);
      setResultCount(numberOfResults);
    }, 200);
  };
  const handleChangePrice = () => {};
  return (
    <>
      <div className="mt-2">
        <div className="flex flex-col items-center">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Giá</Button>
            </PopoverTrigger>
            <PopoverContent className="w-96">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">
                    Chọn giá khởi điểm
                  </h4>
                </div>
                <div className="grid gap-2">
                  <div className="relative flex w-full max-w-[24rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                    <nav className="flex min-w-[240px] flex-row gap-1 p-2 font-sans text-base font-normal text-blue-gray-700">
                      <div
                        role="button"
                        className="flex items-center w-full p-0 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
                      >
                        <label
                          htmlFor="horizontal-list-react"
                          className="flex items-center w-full px-3 py-2 cursor-pointer"
                        >
                          <div className="grid mr-3 place-items-center">
                            <div className="inline-flex items-center">
                              <label
                                className="relative flex items-center p-0 rounded-full cursor-pointer"
                                htmlFor="horizontal-list-react"
                              >
                                <input
                                  id="horizontal-list-react"
                                  type="checkbox"
                                  value={"1000"}
                                  onChange={handleCheckChange} // Gọi handleCheckChange khi checkbox thay đổi
                                  className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-0"
                                />
                                <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-3.5 w-3.5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    stroke="currentColor"
                                    strokeWidth="1" // Sửa thành strokeWidth
                                    stroke-width="1"
                                  >
                                    <path
                                      fillRule="evenodd" // Sửa thành fillRule
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd" // Sửa thành clipRule
                                    ></path>
                                  </svg>
                                </span>
                              </label>
                            </div>
                          </div>
                          <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                            1000đ
                          </p>
                        </label>
                      </div>
                      <div
                        role="button"
                        className="flex items-center w-full p-0 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
                      >
                        <label
                          htmlFor="horizontal-list-vue"
                          className="flex items-center w-full px-3 py-2 cursor-pointer"
                        >
                          <div className="grid mr-3 place-items-center">
                            <div className="inline-flex items-center">
                              <label
                                className="relative flex items-center p-0 rounded-full cursor-pointer"
                                htmlFor="horizontal-list-vue"
                              >
                                <input
                                  id="horizontal-list-vue"
                                  type="checkbox"
                                  value={"10000"}
                                  onChange={handleCheckChange} // Gọi handleCheckChange khi checkbox thay đổi
                                  className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-0"
                                />
                                <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-3.5 w-3.5"
                                    strokeWidth="2" // Sửa thành strokeWidth
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    stroke="currentColor"
                                  >
                                    <path
                                      fillRule="evenodd" // Sửa thành fillRule
                                      clipRule="evenodd" // Sửa thành clipRule
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    ></path>
                                  </svg>
                                </span>
                              </label>
                            </div>
                          </div>
                          <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                            10000đ
                          </p>
                        </label>
                      </div>
                      <div
                        role="button"
                        className="flex items-center w-full p-0 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
                      >
                        <label
                          htmlFor="horizontal-list-svelte"
                          className="flex items-center w-full px-3 py-2 cursor-pointer"
                        >
                          <div className="grid mr-3 place-items-center">
                            <div className="inline-flex items-center">
                              <label
                                className="relative flex items-center p-0 rounded-full cursor-pointer"
                                htmlFor="horizontal-list-svelte"
                              >
                                <input
                                  id="horizontal-list-svelte"
                                  type="checkbox"
                                  value={"100000"}
                                  onChange={handleCheckChange} // Gọi handleCheckChange khi checkbox thay đổi
                                  className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-0"
                                />
                                <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-3.5 w-3.5"
                                    viewBox="0 0 20 20"
                                    strokeWidth="3" // Sửa thành strokeWidth
                                    fill="currentColor"
                                    stroke="currentColor"
                                  >
                                    <path
                                      fillRule="evenodd" // Sửa thành fillRule
                                      clipRule="evenodd" // Sửa thành clipRule
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    ></path>
                                  </svg>
                                </span>
                              </label>
                            </div>
                          </div>
                          <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                            100000đ
                          </p>
                        </label>
                      </div>
                    </nav>
                  </div>
                </div>
                <div className="grid gap-2">
                  <div className="grid gap-2">
                    {/* Hiển thị loading icon khi loading */}
                    {loading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-gray-900"></div>
                    ) : (
                      // Hiển thị kết quả khi không loading
                      <button type="submit">
                        Xem Kết Quả ({resultCount} kết quả)
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </>
  );
}

export default Fillter_Auction_Price;
