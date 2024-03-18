"use client";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal";
import {
  getAuctionsWithStatus,
  updateStatusAcceptAuction,
  updateStatusRejectAuction,
} from "@/lib/actions";
import Image from "next/image";
import React, { startTransition } from "react";
import { toast } from "sonner";

interface IntegrationProps {
  auctionPromise: ReturnType<typeof getAuctionsWithStatus>;
}

const Integration = ({ auctionPromise }: IntegrationProps) => {
  const { data } = React.use(auctionPromise);

  const { onOpen } = useModal();

  return (
    <div className="grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-6">
      {data.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Hiện không có buổi đấu giá nào cần duyệt
        </p>
      ) : (
        data.map((auction) => (
          <div
            key={auction.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 relative  "
          >
            <div className="flex mb-4 min-h-32 lg:min-h-16">
              <div className="shrink-0 mr-4">
                <Image
                  priority={true}
                  height={64}
                  width={64}
                  src={auction.image_url}
                  alt="Stack Overflow"
                  className="rounded-full"
                />
              </div>
              <div>
                <h3 className="text-2xl text-gray-800 dark:text-white font-bold">
                  {auction.productName}
                </h3>
                <span className="text-lg text-gray-600 dark:text-gray-400">
                  Mã code {auction.productCode}
                </span>
              </div>
            </div>
            <div className="">
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                Giá khởi điểm : {auction.startPrice}
              </p>
              {/* <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            Ngày bắt đầu: {auction.startPrice}
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            Ngày kết thúc : {auction.startPrice}
          </p> */}
            </div>

            <div className="flex justify-between space-x-4">
              <Button
                onClick={() => {
                  startTransition(() => {
                    toast.promise(
                      updateStatusAcceptAuction({
                        id: auction.id,
                        approved: true,
                      }),
                      {
                        loading: "Update...",
                        success: () => "Auction update successfully.",
                        error: () => "Dellete error",
                      }
                    );
                  });
                }}
                className="text-base w-full text-green-600 font-medium h-12 rounded-md border border-green-600 hover:bg-green-600 hover:bg-opacity-75 hover:text-white transition-colors duration-300 ease-in-out"
              >
                Duyệt
              </Button>
              <Button
                // onClick={() => {
                //   startTransition(() => {
                //     toast.promise(
                //       updateStatusRejectAuction({
                //         id: auction.id,
                //         approved: true,
                //       }),
                //       {
                //         loading: "Update...",
                //         success: () => "Auction update successfully.",
                //         error: () => "Dellete error",
                //       }
                //     );
                //   });
                // }}
                onClick={() => onOpen("confirmAuction", { auction: auction })}
                className="text-base w-full text-red-600 font-medium h-12 rounded-md border border-red-600 hover:bg-red-600 hover:bg-opacity-75 hover:text-white transition-colors duration-300 ease-in-out"
              >
                Từ chối
              </Button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Integration;
