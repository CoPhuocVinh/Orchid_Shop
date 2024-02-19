import AuctionListing from "@/components/platform/auction/auction-listing";
import Filter from "@/components/platform/auction/filter";
import FilterTopbar from "@/components/platform/auction/filter-topbar";
import BreadCrumb from "@/components/platform/bread-crumb";
import React from "react";

const AuctionPage = () => {
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
          <AuctionListing />
        </div>
      </div>
    </>
  );
};

export default AuctionPage;
