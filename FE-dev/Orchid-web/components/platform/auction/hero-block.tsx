"use client";

import { Button } from "@/components/ui/button";

import useCountdownTimer from "@/hooks/use-countdown-time";
import { IAuction } from "@/types/dashboard";
import { VendorTypes } from "@/types/platform";
import { Menu } from "@headlessui/react";
import { HeartIcon, ShareIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface ListingDetailsHeroBlockProps {
  vendor: VendorTypes;
  auction: IAuction | null;
}

// share icons
function ShareIcons() {
  return (
    <div className="mt-1 hidden items-center gap-3 bg-white md:flex 3xl:gap-6">
      <Button
        className="!border-none !bg-gray-lightest !p-4 text-gray-dark hover:!bg-gray-dark hover:text-white"
        size="sm"
        variant="outline"
        onClick={() => {}}
      >
        <ShareIcon className="h-auto w-5" />
      </Button>
      <Button
        className="!border-none !bg-gray-lightest !p-4 text-gray-dark hover:!bg-gray-dark hover:text-white"
        size="sm"
        variant="outline"
      >
        <HeartIcon className="h-auto w-5" />
      </Button>
    </div>
  );
}

function ShareMenu() {
  return (
    <Menu as="div" className="relative md:hidden">
      <div>
        <Menu.Button className="h-6 w-6 rounded-full border-none outline-none hover:ring-2 hover:ring-gray-lighter">
          {/* <EllipsisHorizontalIcon className="h-6 w-6" /> */}
        </Menu.Button>
        <Menu.Items className="absolute right-0">
          <div className="flex w-[150px] flex-col rounded-lg bg-white py-1 shadow-card">
            <Menu.Item>
              <button
                onClick={() => {}}
                className="border-gray-lightest py-2 text-base font-medium text-gray-dark hover:bg-gray-lightest"
              >
                Share Now
              </button>
            </Menu.Item>
            <Menu.Item>
              <button className="border-gray-lightest py-2 text-base font-medium text-gray-dark hover:bg-gray-lightest">
                Add to wishlist
              </button>
            </Menu.Item>
          </div>
        </Menu.Items>
      </div>
    </Menu>
  );
}

export default function ListingDetailsHeroBlock({
  vendor,
  auction,
}: ListingDetailsHeroBlockProps) {
  const startDate = auction?.startDate?.toString();
  const endDate = auction?.endDate?.toString();

  const countdownToStart = useCountdownTimer(startDate);
  // const countdownToEnd = useCountdownTimer(endDate);

  // console.log(countdownToStart)
  // console.log(countdownToEnd)
  return (
    <div className="flex justify-between border-b border-gray-lighter pb-6 md:pb-8 2xl:pb-10">
      <div>
        <p className="text-gray-dark">{auction?.productName}</p>
        {auction?.productCode} -
        {countdownToStart && (
          <span className="ml-2 text-red-500">
            {countdownToStart.days} days {countdownToStart.hours} hours{" "}
            {countdownToStart.minutes} minutes {countdownToStart.seconds}{" "}
            seconds until start
          </span>
        )}
        {/* {!countdownToStart && countdownToEnd && (
          <span className="ml-2 text-red-500">
            {countdownToEnd.days} days {countdownToEnd.hours} hours{" "}
            {countdownToEnd.minutes} minutes {countdownToEnd.seconds} seconds
            until end
          </span>
        )} */}
        {/* </Text> */}
        <div className="mt-3 flex items-center gap-2 leading-4 text-gray-dark md:mt-4">
          <p>{vendor.boatGuests} guests</p>
          <span className="mt-1 block h-1.5 w-1.5 rounded-full bg-gray-dark"></span>
          <p>{vendor.boatCabins} cabins</p>
          <span className="mt-1 block h-1.5 w-1.5 rounded-full bg-gray-dark"></span>
          <p>{vendor.boatBathrooms} bathrooms</p>
        </div>
      </div>
      <div className="relative">
        <ShareMenu />
        <ShareIcons />
      </div>
    </div>
  );
}
