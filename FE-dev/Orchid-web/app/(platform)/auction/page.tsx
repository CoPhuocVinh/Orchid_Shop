"use client";

import AuctionListing from "@/components/platform/auction/auction-listing";
import Filter from "@/components/platform/auction/filter";
import FilterTopbar from "@/components/platform/auction/filter-topbar";
import BreadCrumb from "@/components/platform/bread-crumb";
import { useGetAuctionsWithStatus } from "@/lib/react-query/queries";
import { AuctionStatus } from "@/types/dashboard";

import { useRouter } from "next/navigation";
import React from "react";


const AuctionPage = () => {
  const { data: liveAuction, isLoading: auctionLoading } =
    useGetAuctionsWithStatus(AuctionStatus.END);

  // call api
  // axios.get("/actions?${searchParams}")

  // 1 filter theo array data lấy ra rồi
  // console.log(liveAuction?.data)

  // optimitic
  // 2 filter ở đây rồi truyền xuống cho be filter
  
  //  note  cho phân optimic
  // a/ searchParams
  // console.log(searchParams);
  // const router = useRouter()

  // router. 

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
          <Filter className="hidden xl:block" />
          <AuctionListing
            liveAuction={liveAuction?.data ?? []}
            auctionLoading={auctionLoading}
          />
        </div>
      </div>
    </>
  );
};

export default AuctionPage;
