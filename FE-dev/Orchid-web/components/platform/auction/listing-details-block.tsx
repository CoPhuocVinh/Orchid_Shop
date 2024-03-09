"use client";

import { vendorData } from "@/data/user-working-data/listing-details";

import { Button } from "@/components/ui/button";
import ListingDetailsHeroBlock from "./hero-block";
import { Input } from "@/components/ui/input";
import { IAuction } from "@/types/dashboard";
import { useModal } from "@/hooks/use-modal";
interface ListingDetailsProps {
  auction: IAuction | null;
}
export default function ListingDetails({ auction }: ListingDetailsProps) {
  const { onOpen } = useModal();
  return (
    <>
      <div className="flex justify-between gap-5 lg:gap-8 xl:gap-12 4xl:gap-16">
        <div className="w-full">
          <Button
            variant="primary"
            onClick={() => onOpen("registerAtendAction")}
            className="mt-6"
          >
            Open Register Auction
          </Button>
          <ListingDetailsHeroBlock
            vendor={vendorData.vendor}
            auction={auction}
          />

          <div className=" bg-slate-200 h-[150px] p-4 rounded-md">
            <h1>Bind now</h1>
            <p>Bid Amount : Minimum Bid $20.00</p>

            <div className="flex mt-4 space-x-2">
              <Input
                type="email"
                placeholder="$00.00"
                className="bg-zinc-300/50 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
              />
              <Button>Place a bid</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
