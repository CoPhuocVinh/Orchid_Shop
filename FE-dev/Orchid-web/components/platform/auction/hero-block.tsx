"use client";

import { Button } from "@/components/ui/button";

import useCountdownTimer from "@/hooks/use-countdown-time";
import { IAuction } from "@/types/dashboard";
import { VendorTypes } from "@/types/platform";
import { Menu } from "@headlessui/react";
import { HeartIcon, ShareIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

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
  auction,
}: ListingDetailsHeroBlockProps) {
  const startDate = useMemo(() => auction?.startDate?.toString(), [auction]);
  const endDate = useMemo(() => auction?.endDate?.toString(), [auction]);
  const countdownToStart = useCountdownTimer(startDate);
  const countdownToEnd = useCountdownTimer(endDate);

  const [showCountdownToStart, setShowCountdownToStart] = useState(true);
  const [showCountdownToEnd, setShowCountdownToEnd] = useState(false);

  const isStatusLive = auction?.status === "LIVE";
  useEffect(() => {
    if (isStatusLive) {
      setShowCountdownToStart(false);
      setShowCountdownToEnd(true);
    } else if (countdownToStart && countdownToStart.seconds <= 0) {
      setShowCountdownToStart(false);
      setShowCountdownToEnd(true);
    }
  }, [countdownToStart, isStatusLive]);

  return (
    <div className="flex justify-between border-b border-gray-lighter pb-6 md:pb-8 2xl:pb-10 mt-2">
      <div>
        <div className="py-4">
          {showCountdownToStart && countdownToStart && (
            <>
              <div className="text-black text-lg font-bold">
                <span>Bắt đầu sau</span>: ..
                <span className="inline-block w-6 text-center">{`${countdownToStart?.days
                  .toString()
                  .padStart(2, "0")}`}</span>
                d&nbsp;:&nbsp;
                <span className="inline-block w-6 text-center">{`${countdownToStart?.hours
                  .toString()
                  .padStart(2, "0")}`}</span>
                h&nbsp;:&nbsp;
                <span className="inline-block w-6 text-center">{`${countdownToStart?.minutes
                  .toString()
                  .padStart(2, "0")}`}</span>
                m&nbsp;:&nbsp;
                <span className="inline-block w-6 text-center">{`${countdownToStart?.seconds
                  .toString()
                  .padStart(2, "0")}`}</span>
                s
              </div>
            </>
          )}
          {showCountdownToEnd && countdownToEnd && (
            <>
              <div className="text-black text-lg font-bold">
                <span>Kết thúc sau</span>: ..
                <span className="inline-block w-6 text-center">{`${countdownToEnd?.days
                  .toString()
                  .padStart(2, "0")}`}</span>
                d&nbsp;:&nbsp;
                <span className="inline-block w-6 text-center">{`${countdownToEnd?.hours
                  .toString()
                  .padStart(2, "0")}`}</span>
                h&nbsp;:&nbsp;
                <span className="inline-block w-6 text-center">{`${countdownToEnd?.minutes
                  .toString()
                  .padStart(2, "0")}`}</span>
                m&nbsp;:&nbsp;
                <span className="inline-block w-6 text-center">{`${countdownToEnd?.seconds
                  .toString()
                  .padStart(2, "0")}`}</span>
                s
              </div>
            </>
          )}
        </div>
        <p className="text-gray-dark">{auction?.productName}</p>
        {auction?.productCode}

        <div className="mt-3 flex items-center gap-2 leading-4 text-gray-dark md:mt-4">
          <p> guests</p>
          <span className="mt-1 block h-1.5 w-1.5 rounded-full bg-gray-dark"></span>
          <p> cabins</p>
          <span className="mt-1 block h-1.5 w-1.5 rounded-full bg-gray-dark"></span>
          <p> bathrooms</p>
        </div>
      </div>
      <div className="relative">
        <ShareMenu />
        <ShareIcons />
      </div>
    </div>
  );
}
