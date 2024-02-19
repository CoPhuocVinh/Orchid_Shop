import React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LeftSideAuction from "@/components/platform/auction/left-side-auction";
import ListingDetails from "@/components/platform/auction/listing-details-block";
import RelatedListingBlock from "@/components/platform/auction/related-listings-block";
import BreadCrumb from "@/components/platform/bread-crumb";
const AuctionIdPage = ({ params }: { params: { auctionId: string } }) => {
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
          <LeftSideAuction />

          <div className="w-full md:w-3/5 h-[250px] md:pl-4">
            <ListingDetails />
          </div>
        </div>

        <div className="mt-8 h-[500px] md:h-[350px]">
          <Tabs defaultValue="description" className="w-[350px] md:w-[700px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="description">description</TabsTrigger>
              <TabsTrigger value="Bidding">Bidding history</TabsTrigger>
            </TabsList>
            <TabsContent value="description">
              <h1 className="text-2xl font-bold mb-4">
                How can have anything you want in life if you ?
              </h1>

              <p>
                If you’ve been following the crypto space, you’ve likely heard
                of Non-Fungible Tokens (Biddings), more popularly referred to as
                ‘Crypto Collectibles.’ The world of Biddings is growing rapidly.
              </p>

              <ul className="">
                <li>
                  Amet consectetur adipisicing elit. Maxime reprehenderit
                  quaerat, velit rem atque vel impedit! Expensive Design.
                </li>
                <li>
                  Amet consectetur adipisicing elit. Maxime reprehenderit
                  quaerat, velit rem atque vel impedit! Expensive Design.
                </li>
                <li>
                  Amet consectetur adipisicing elit. Maxime reprehenderit
                  quaerat, velit rem atque vel impedit! Expensive Design.
                </li>
              </ul>
            </TabsContent>
            <TabsContent value="Bidding">contente 2</TabsContent>
          </Tabs>
        </div>

        <RelatedListingBlock />
      </div>
    </>
  );
};

export default AuctionIdPage;
