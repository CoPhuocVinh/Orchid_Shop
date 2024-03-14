import React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LeftSideAuction from "@/components/platform/auction/left-side-auction";
import ListingDetails from "@/components/platform/auction/listing-details-block";
import RelatedListingBlock from "@/components/platform/auction/related-listings-block";
import BreadCrumb from "@/components/platform/bread-crumb";
import { getAuctionByID } from "@/lib/actions";

const AuctionIdPage = async ({ params }: { params: { auctionId: string } }) => {
  const auction = await getAuctionByID(params.auctionId);

  return (
    <>
      <BreadCrumb
        descriptionTitle="Auction Detail"
        middlePath="Buổi đấu giá"
        title="Sản phẩm"
        routeUrl="auction"
      />

      <div className="container mx-auto px-4 md:px-12 mt-10 mb-4 flex flex-col md:flex-row">
        <LeftSideAuction productId={auction.data?.productID!} />

        <div className="w-full md:w-3/5 md:pl-4">
          <ListingDetails auction={auction.data} />

          <div className="mt-8 md:mt-0 md:h-72">
            <Tabs defaultValue="description" className="w-[350px] md:w-[700px]">
              <TabsList className="grid grid-cols-2 gap-4">
                <TabsTrigger
                  value="description"
                  className="p-2 text-center bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  Description
                </TabsTrigger>
                <TabsTrigger
                  value="bidding"
                  className="p-2 text-center bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  Bidding History
                </TabsTrigger>
              </TabsList>
              <TabsContent value="description">
                <h1 className="text-2xl font-bold mb-4">Mô tả chi tiết</h1>
                <p>
                  {auction.data?.description
                    ? auction.data.description
                    : "Không có mô tả"}
                </p>
              </TabsContent>
              <TabsContent
                value="bidding"
                className="overflow-y-auto max-h-72 md:max-h-[380px]"
              >
                <div>
                  <h2 className="text-lg font-bold mb-2">
                    Top 3 People Bidding
                  </h2>
                  <ul>
                    {auction.data?.bidList.slice(0, 3).map((bidder, index) => (
                      <li
                        key={index}
                        className={`flex items-center bg-white border-2 shadow-md rounded-md p-4 mb-4 space-y-3 ${
                          bidder.top1 ? "border-2 border-yellow-500" : ""
                        }`}
                      >
                        <div className="relative">
                          {bidder.top1 && (
                            <div className="absolute top-0 left-0 w-8 h-8  text-2xl  flex items-center justify-center text-gray-700 font-bold">
                              👑
                            </div>
                          )}
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 font-bold mr-4">
                            {bidder.top1 ? "" : index + 1}
                          </div>
                        </div>
                        <div className="flex-grow flex justify-between">
                          <div className="flex flex-col">
                            <span className="font-semibold">
                              User ID: {bidder.userID}
                            </span>
                            <span className="text-gray-600">
                              Ratings: {bidder.ratings}
                            </span>
                          </div>
                          <span className="text-gray-600 flex items-center">
                            Bidding Price: {bidder.biddingPrice}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-12">
        <RelatedListingBlock />
      </div>
    </>
  );
};

export default AuctionIdPage;
