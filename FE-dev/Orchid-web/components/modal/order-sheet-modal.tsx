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

export const OrderSheet = () => {
  const router = useRouter();
  const { isOpen, onClose, type } = useModal();
  const { data: session } = useSession();
  const isOpenModal = isOpen && type === "orderSheetModal";
  const searchParams = { page: "1", per_page: "100" };
  const { data: orders, isLoading } = useGetOrderByUserId(
    searchParams,
    session?.user.id!
  );

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
            <div className="py-4 ">
              {orders?.data.map((order) => (
                <div key={order.id}>
                  <div className="bg-white rounded-lg shadow-md border-2 overflow-hidden mb-4">
                    <div className="p-4 flex items-center">
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
                            {order.productName}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {order.productCode}
                          </p>
                        </div>
                        <p className="text-sm text-gray-500 flex items-center justify-center">
                          Total: 123
                        </p>
                      </div>
                    </div>
                    <div className="p-4 bg-gray-300 flex justify-between items-center">
                      <div className="flex items-center space-x-2">
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
                            24:00:00
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </SheetContent>
    </Sheet>
  );
};