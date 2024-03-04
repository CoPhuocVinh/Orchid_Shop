import React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LeftSideAuction from "@/components/platform/auction/left-side-auction";
import ListingDetails from "@/components/platform/auction/listing-details-block";
import RelatedListingBlock from "@/components/platform/auction/related-listings-block";
import BreadCrumb from "@/components/platform/bread-crumb";
import { getAuctionByID } from "@/lib/actions";
const AuctionIdPage = async ({ params }: { params: { auctionId: string } }) => {
  const auction = await getAuctionByID(params.auctionId);
  // console.log(auction.data?.productID)

  return (
    <>
      <BreadCrumb
        descriptionTitle="Auction Detail"
        middlePath="Buổi đấu giá"
        title="Sản phẩm"
        routeUrl="auction"
      />

      <div className="container-fluid w-full 3xl:!px-12 mt-10 mb-4">
        <div className="flex flex-col md:flex-row">
          <LeftSideAuction productId={auction.data?.productID!} />

          <div className="w-full md:w-3/5 h-[250px] md:pl-4">
            <ListingDetails auction={auction.data} />
          </div>
        </div>

        <div className="mt-8 h-[500px] md:h-[350px]">
          <Tabs defaultValue="description" className="w-[350px] md:w-[700px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="description">description</TabsTrigger>
              <TabsTrigger value="Bidding">Bidding history</TabsTrigger>
            </TabsList>
            <TabsContent value="description">
              <h1 className="text-2xl font-bold mb-4">Mô tả chi tiết</h1>

              <p>
                {auction.data?.description
                  ? auction.data.description
                  : "EOS hog có desc"}
              </p>
            </TabsContent>
            <TabsContent value="Bidding">content 2</TabsContent>
          </Tabs>
        </div>

        <RelatedListingBlock />
      </div>
    </>
  );
};

export default AuctionIdPage;
