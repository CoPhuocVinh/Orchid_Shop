"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";

import Image from "next/image";
import { ScrollArea } from "../ui/scroll-area";
import { useGetOrderByUserId } from "@/lib/react-query/queries";
import useCountdownTimer from "@/hooks/use-countdown-time";
import FancyText from "@carefully-coded/react-text-gradient";

export const OrderSheet = () => {
  const router = useRouter();
  const { isOpen, onClose, type } = useModal();
  const { data: session } = useSession();
  const isOpenModal = isOpen && type === "orderSheetModal";
  const searchParams = { page: "1", per_page: "100", status: "PENDING" }; //TODO: add status
  const { data: orders, isLoading } = useGetOrderByUserId(
    searchParams,
    session?.user.id || ''
  );

  const getDataOrderList = () => {
    return orders?.data.filter((order) => order.expiredAt);
  };

  const expiredAtList: Date[] | undefined = getDataOrderList()?.map(
    (order) => order.expiredAt
  ); // Mảng Date
  const firstExpiredAt: string | undefined = expiredAtList?.[0]?.toString(); // Lấy thời gian đầu tiên dưới dạng chuỗi

  const countdown = useCountdownTimer(firstExpiredAt); // Truyền chuỗi thời gian đầu tiên vào useCountdownTimer

  return (
    <Sheet open={isOpenModal} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-xl font-bold">
            Danh sách đấu giá thành công
          </SheetTitle>
          <SheetDescription className="text-gray-500">
            Xem và quản lý order tại đây
          </SheetDescription>
        </SheetHeader>
        {isLoading ? (
          <div>...Loading</div>
        ) : (
          <ScrollArea className="w-full h-full ">
            <div className="py-4 mr-4">
              {orders?.data.map((order) => (
                <div key={order.id}>
                  <div className="transform transition duration-300 hover:scale-y-110 rounded-lg shadow-lg h-60 w-80 hover:shadow-xl bg-white">
                    <div className="bg-gradient-to-br from-rose-100 via-purple-200 to-purple-200 m-2 h-3/6 rounded-lg">
                      <Image
                        src="/images/hoa-lan/hoa-lan-3.jfif"
                        alt="Product Image"
                        className="object-cover rounded-md mr-4 h-16 w-16"
                        width={64}
                        height={64}
                      />
                      <div className="space-y-1 flex justify-between w-full">
                        <div>
                          <h3 className="text-sm font-semibold min-w-0">
                            Tên sản phẩm: {order.productName}
                          </h3>
                          <p className="text-sm text-gray-500">
                            Code: {order.productCode}
                          </p>
                          <p className="text-sm text-gray-500">
                            Total: {order.total} VNĐ
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="px-5 pt-2 flex flex-col">
                      <div className="mt-8 flex justify-between items-center">
                        <Button
                          variant="outline"
                          className="mr-2 px-4 py-2 rounded-md text-sm"
                          onClick={() => router.push(`/order/${order.id}`)}
                        >
                          Thanh toán
                        </Button>
                        <span className="text-sm text-red-500">
                          Cancel in:
                          <span id="countdown" className="font-semibold">
                            {countdown && (
                              <div className=" text-black  text-xs font-bold">
                                <span className="inline-block w-6 text-center">{`${countdown.hours
                                  .toString()
                                  .padStart(2, "0")}`}</span>
                                h&nbsp; :&nbsp;
                                <span className="inline-block w-6 text-center">{`${countdown.minutes
                                  .toString()
                                  .padStart(2, "0")}`}</span>
                                m&nbsp; :&nbsp;
                                <span className="inline-block w-6 text-center">{`${countdown.seconds
                                  .toString()
                                  .padStart(2, "0")}`}</span>
                                s
                              </div>
                            )}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-md border-2 overflow-hidden mb-4"></div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </SheetContent>
    </Sheet>
  );
};
