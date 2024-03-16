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

import React, { useEffect } from "react";

import { IAuction } from "@/types/dashboard";
import { format } from "date-fns";

import Fillter_Auction_Date from "./fillter-auction-date";

import PriceSlider from "./Price-Slider";
//import Fillter_CheckBox from "./Fillter_CheckBox";

interface FilterTypes {
  className?: string;
  liveAuction?: IAuction[];
  auctionLoading: boolean;
  setFilterData: React.Dispatch<React.SetStateAction<IAuction[] | undefined>>;
}

const fillters = [
  {
    id: "status",
    name: "Status",
  },
];

function Fillter_Auction_Tab({
  className,
  liveAuction,
  auctionLoading,
  setFilterData, // Nhận setFilterData từ props
}: FilterTypes) {
  const [value, setValue] = React.useState("ALL");

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

  return (
    <div className={clsx(" h-full bg-white xl:px-0.5 mx-4", className)}>
      <div className="grid grid-cols-1 gap-8 px-20 pb-3 md:px-7 xl:p-0 xl:pb-0  ">
        Component filter
        <form className=" h-full top-2">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Status</AccordionTrigger>
              <AccordionContent className="overflow-visible">
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
        </form>
      </div>
    </div>
  );
}

export default Fillter_Auction_Tab;
