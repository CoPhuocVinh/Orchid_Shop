"use client";

import AuctionListing from "@/components/platform/auction/auction-listing";

import FilterTopbar from "@/components/platform/auction/filter-topbar";
import BreadCrumb from "@/components/platform/bread-crumb";
import { IAuction } from "@/types/dashboard";

import React, { useEffect, useState } from "react";
import Fillter_Auction_Tab from "./_components/Fillter_Auction_tab";
import GetAllData_Auction from "./_components/GetAllData_Auction";
import { log } from "console";
import Fillter_Auction_Date from "./_components/Fillter_Auction_Date";

const AuctionPage = () => {
  //console.log(liveAuction?.data);
  const [filterData, setFilterData] = useState<IAuction[]>([]);
  const [filteredData, setFilteredData] = useState<IAuction[]>([]);

  // useEffect(() => {
  //   setFilteredData(filterData);
  // }, [filterData]);

  return (
    <>
      <BreadCrumb
        descriptionTitle="Live Auction"
        middlePath="Buổi đấu giá"
        routeUrl="auction"
      />

      <div className="container-fluid mb-12 pt-6 lg:mb-16">
        <FilterTopbar />
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-[330px_5fr] 3xl:gap-12">
          <GetAllData_Auction>
            {({ allAuctions, auctionLoading }) => (
              <>
                <Fillter_Auction_Tab
                  className="hidden xl:block"
                  liveAuction={allAuctions ?? []}
                  auctionLoading={auctionLoading}
                  setFilterData={(setFilterData as any) ?? []} // Truyền setFilterData vào component con
                />

                <AuctionListing
                  liveAuction={filterData ?? allAuctions}
                  auctionLoading={auctionLoading}
                />
              </>
            )}
          </GetAllData_Auction>
        </div>
      </div>
    </>
  );
};

export default AuctionPage;
