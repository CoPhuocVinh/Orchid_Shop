"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group";

import clsx from "clsx";

import React, { useEffect, useState } from "react";

import { IAuction } from "@/types/dashboard";
import { format } from "date-fns";

import Fillter_Auction_Date from "./fillter-auction-date";

import PriceSlider from "./price-slider";

interface FilterTypes {
  className?: string;
  liveAuction?: IAuction[];
  auctionLoading: boolean;
  setFilterData: React.Dispatch<React.SetStateAction<IAuction[] | undefined>>;
}

function FillterAuctionTab({
  className,
  liveAuction,
  auctionLoading,
  setFilterData, // Nhận setFilterData từ props
}: FilterTypes) {
  const [value, setValue] = React.useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setFilterData(liveAuction);
  }, [liveAuction]);

  const handleChange = (e: any) => {
    // Xử lý logic khác tại đây
    if (e.target.value == "ALL") {
      setFilterData(liveAuction);
    } else if (e.target.value == "COMING") {
      const newFilteredAuctions = liveAuction?.filter((auction: IAuction) => {
        return auction.status === e.target.value;
      });
      setFilterData(newFilteredAuctions);

      // console.log(newFilteredAuctions);
    } else if (e.target.value == "LIVE") {
      const newFilteredAuctions = liveAuction?.filter((auction: IAuction) => {
        return auction.status === e.target.value;
      });
      setFilterData(newFilteredAuctions);
    } else if (e.target.value == "END") {
      const newFilteredAuctions = liveAuction?.filter((auction: IAuction) => {
        return auction.status === e.target.value;
      });
      setFilterData(newFilteredAuctions);
    }
  };

  // Thêm hàm handleChangeDate

  const handleChangeDate = (
    getDateChange: { startDate: string; endDate: string }[]
  ) => {
    getDateChange.forEach((d) => {
      const startDate = d.startDate;
      const endDate = d.endDate;

      const filteredAuctions: IAuction[] = [];

      liveAuction?.forEach((auction: IAuction) => {
        const formattedStartDate = format(
          new Date(auction.startDate as any),
          "yyyy-MM-dd"
        );
        const formattedEndDate = format(
          new Date(auction.endDate as any),
          "yyyy-MM-dd"
        );

        const isStartDateInRange = formattedStartDate >= startDate;
        const isEndDateInRange = formattedEndDate <= endDate;

        if (isStartDateInRange && isEndDateInRange) {
          filteredAuctions.push(auction);
        }
      });

      if (filteredAuctions.length > 0) {
        console.log(
          `Các auction từ ${startDate} đến ${endDate}:`,
          filteredAuctions
        );
        setFilterData([...filteredAuctions]);
      } else {
        console.log(`Không có auction nào từ ${startDate} đến ${endDate}.`);
      }
    });
  };

  const handleChangePrice = ({
    valueMin,
    valueMax,
  }: {
    valueMin: number;
    valueMax: number;
  }) => {
    // Lọc liveAuction
    const filteredAuctions = liveAuction?.filter((auction: IAuction) => {
      // Kiểm tra nếu biddingPrice không tồn tại hoặc null, lọc theo startPrice
      if (auction.biddingPrice === undefined || auction.biddingPrice === null) {
        return auction.startPrice >= valueMin && auction.startPrice <= valueMax;
      } else {
        // Lọc theo biddingPrice
        return (
          auction.biddingPrice >= valueMin && auction.biddingPrice <= valueMax
        );
      }
    });

    // Đẩy dữ liệu đã lọc vào setFilterData
    if (filteredAuctions) {
      setFilterData(filteredAuctions);
    }
  };

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Ngăn chặn reload trang khi submit form

    // Lọc liveAuction dựa trên searchTerm
    const filteredAuctions = liveAuction?.filter((auction: IAuction) => {
      // Kiểm tra nếu tên auction chứa searchTerm
      return auction.productName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    });

    // Đẩy dữ liệu đã lọc vào setFilterData
    if (filteredAuctions) {
      setFilterData(filteredAuctions);
    }
  };

  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className={clsx(" h-full bg-white xl:px-0.5 mx-4", className)}>
      <div className="grid grid-cols-1 gap-8 px-20 pb-3 md:px-7 xl:p-0 xl:pb-0  ">
        Component filter
        <form className="px-4 w-full max-w-[330px]" onSubmit={handleSearch}>
          <label
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            htmlFor="default-search"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
              >
                <path
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  strokeWidth="2"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  stroke="currentColor"
                ></path>
              </svg>
            </div>
            <input
              required
              placeholder="Search"
              className="block w-full p-4 py-5 ps-10 text-lg text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              id="default-search"
              type="search"
              value={searchTerm}
              onChange={handleChangeSearch}
            />
            <button
              type="submit"
              className="absolute end-2.5 bottom-1/2 translate-y-1/2 p-4 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="w-4 h-4"
              >
                <path
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  strokeWidth="2"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  stroke="currentColor"
                ></path>
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </div>
        </form>
        <form className=" h-full top-2">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Status</AccordionTrigger>
              <AccordionContent className="overflow-visible ">
                <div className="space-y-4">
                  <RadioGroup
                    defaultValue="ALL"
                    value={value}
                    onChange={handleChange as any}
                  >
                    <div className=" ml-4">
                      <input
                        type="radio"
                        id="all"
                        name="filter"
                        value="ALL"
                        defaultChecked
                        onChange={handleChange as any}
                      />
                      <Label
                        htmlFor="all"
                        className="font-serif ml-4 text-base font-medium cursor-pointer select-none"
                      >
                        ALL
                      </Label>
                    </div>
                    <div className=" ml-4">
                      <input
                        type="radio"
                        id="coming"
                        name="filter"
                        value="COMING"
                        onChange={handleChange as any}
                      />
                      <Label
                        htmlFor="coming"
                        className="font-serif ml-4 text-base font-medium cursor-pointer select-none"
                      >
                        COMING
                      </Label>
                    </div>
                    <div className=" ml-4">
                      <input
                        type="radio"
                        id="live"
                        name="filter"
                        value="LIVE"
                        onChange={handleChange as any}
                      />
                      <Label
                        htmlFor="live"
                        className="font-serif ml-4 text-base font-medium cursor-pointer select-none"
                      >
                        LIVE
                      </Label>
                    </div>
                    <div className=" ml-4">
                      <input
                        type="radio"
                        id="end"
                        name="filter"
                        value="END"
                        onChange={handleChange as any}
                      />
                      <Label
                        htmlFor="end"
                        className="font-serif ml-4 text-base font-medium cursor-pointer select-none"
                      >
                        END
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div>
            <Fillter_Auction_Date onChangeDate={handleChangeDate as any} />
          </div>
          <div>
            <PriceSlider onChangePrice={handleChangePrice as any} />
          </div>
          <div></div>
        </form>
      </div>
    </div>
  );
}

export default FillterAuctionTab;
